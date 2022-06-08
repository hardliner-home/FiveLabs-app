import React, {useContext, useEffect, useState} from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Divider, FlatList, useToast } from 'native-base'

// src
import ScreenView from '../../atoms/ScreenView'
import ChatItem, {RoomType} from '../../atoms/ChatItem'
import { ChatsStackNavigationParamList } from '../../stacks/ChatScreenStack'
import {axiosClient} from '../../../utills/apiUtills'
import {ChatMessagesContext} from '../../providers/ChatMessagesContextProvider'

type ChatsScreenNavigation = NativeStackNavigationProp<ChatsStackNavigationParamList, 'ChatsScreen'>

interface Props {
  navigation: ChatsScreenNavigation
}

export default function ChatsScreen({ navigation }: Props) {
  const toast = useToast()
  const { chats, setChats } = useContext(ChatMessagesContext)

  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axiosClient.get('v1/rooms?per=100&page=1')
      .then((response) => {
        setChats(response.data.data)
      })
      .catch((error) => {
        toast.show({ description: error.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <ScreenView>
      <FlatList
        data={chats}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <ChatItem room={item} />}
      />
    </ScreenView>
  )
}
