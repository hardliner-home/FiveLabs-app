import React, {useContext, useEffect, useState} from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
// @ts-ignore
import { deserialize } from 'deserialize-json-api'

// src
import { ChatsStackNavigationParamList } from '../../stacks/ChatScreenStack'
import { Divider, FlatList, HStack, Icon, IconButton, Input, useToast, VStack } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { axiosClient } from '../../../utills/apiUtills'
import ScreenView from '../../atoms/ScreenView'
import MessageItem, { MessageTypeProps } from '../../atoms/MessageItem'
import {ChatMessagesContext} from '../../providers/ChatMessagesContextProvider'

type ChatScreenNavigation = NativeStackNavigationProp<ChatsStackNavigationParamList, 'ChatsScreen'>
type ChatScreenRoute = RouteProp<ChatsStackNavigationParamList, 'ChatsScreen'>

interface Props {
  navigation: ChatScreenNavigation
  route: ChatScreenRoute
}

export default function ChatScreen({ navigation, route }: Props) {
  const toast = useToast()
  const { messages, setMessages } = useContext(ChatMessagesContext)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const onSend = () => {
    if (message) {
      // @ts-ignore
      axiosClient.post(`/v1/rooms/${route.params.id}/messages`, {
        message: { message }
      })
        .then((response) => {
          // setMessages([response.data.data, ...messages])
        })
        .catch((error) => {
          toast.show({ description: error.message })
        })
        .finally(() => {
          setMessage('')
        })
    }
  }

  useEffect(() => {
    setLoading(true)
    // @ts-ignore
    axiosClient.get(`v1/rooms/${route.params.id}/messages?per=20&page=1`)
      .then((response) => {
        setMessages(response.data.data)
      })
      .catch((error) => {
        toast.show({ description: error.message })
      })
      .finally(() => {
        setLoading(false)
      })
  // @ts-ignore
  }, [route.params.id])

  return (
    <ScreenView style={styles.container} include={['bottom']}>
      <VStack style={styles.container}>
        <FlatList
          inverted
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
        />

        <VStack space={2}>
          <Divider />
          <HStack space={2} alignItems="center" justifyContent="center">
            {/*<IconButton borderRadius="full">*/}
            {/*  <Icon as={FontAwesome} size={5} name="paperclip" />*/}
            {/*</IconButton>*/}

            <Input
              w="5/6"
              size="lg"
              totalLines={5}
              value={message}
              onChangeText={setMessage}
              placeholder="Typo message..."
            />

            <IconButton borderRadius="full" onPress={onSend}>
              <Icon as={FontAwesome} size={5} name="arrow-right" />
            </IconButton>
          </HStack>
        </VStack>
      </VStack>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
