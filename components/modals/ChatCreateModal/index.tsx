import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import {
  VStack,
  Avatar,
  Pressable,
  Input,
  Button,
  useToast,
  Text,
  FlatList, HStack, Checkbox, Divider,
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// @ts-ignore
import { deserialize } from 'deserialize-json-api'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { BottomSheetFlatList } from '@gorhom/bottom-sheet'

// src
import { axiosClient, baseURL } from '../../../utills/apiUtills'
import { imageChangeUri, imageUri } from '../../../utills/imageUtils'
import { UserType } from '../../atoms/Post'
import { userList } from '../../../utills/mocks/users'
import {initials } from '../../../utills/textUtils'

interface Props {
  closeModal?: () => void | undefined,
  navigation?: any
}

export default function ChatCreateModal({ closeModal, navigation }: Props) {
  const toast = useToast()
  const insets = useSafeAreaInsets()

  const [image, setImage] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  // const [users, setUsers] = useState<UserType[]>([])
  const [users, setUsers] = useState<UserType[]>(userList)
  const [chatUsers, setChatUsers] = useState<string[]>([])

  useEffect(() => {
    axiosClient.get('/v1/users?per=10&page=1')
      .then((response) => {
        setUsers(response.data.data)
      })
      .catch((error) => {
        toast.show({ description: error.message })
      })
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) setImage(result)
  }

  const onSubmit = async () => {
    let user = new FormData()
    user.append('room[title]', title)

    chatUsers.forEach((value) => {
      user.append(`room[user_ids][]`, value)
    })

    if (image) {
      const localUri = image.uri
      const filename = localUri.split('/').pop()

      const match = filename ? /\.(\w+)$/.exec(filename) : null
      const type = match ? `image/${match[1]}` : `image`

      user.append('room[image]', {
        // @ts-ignore
        uri: localUri,
        name: filename,
        type
      })
    }

    const token = await AsyncStorage.getItem('jwt')

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: ''
    }

    if (token) headers.authorization = token

    fetch(baseURL + '/v1/rooms', {
      method: "POST",
      headers,
      body: user,
    })
    .then(async(response) => {
      let res = await response.json()
      const { data } = deserialize(res, { transformKeys: "camelCase" })
      if (closeModal) closeModal()
      navigation.navigate('Chat', { id: data.id, header: data.title })
    })
    .catch((error) => {
      toast.show({ description: error.message })
    })
  }

  return (
    <VStack
      h="98%"
      space={2}
      justifyContent="space-between"
      style={[styles.view, { paddingBottom: insets.bottom }]}
      _light={{ backgroundColor: 'white' }}
      _dark={{ backgroundColor: 'black' }}
    >
      <VStack space={2}>
        <Text alignSelf="center" fontSize="20" bold>Create a chat</Text>

        <HStack space={2} alignItems="center">
          <Pressable onPress={pickImage} alignItems="center">
            <Avatar
              size="lg"
              source={{ uri: imageChangeUri(image) }}
            >
              IMG
            </Avatar>
          </Pressable>

          <Input
            size="lg"
            w="75%"
            value={title}
            placeholder="Title"
            onChangeText={setTitle}
          />
        </HStack>

        <Checkbox.Group value={chatUsers} onChange={setChatUsers}>
          <FlatList
            w="100%"
            data={users}
            renderItem={({ item }) => (
              <HStack
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack
                  space={2}
                  alignItems="center"
                >
                  <Avatar
                    size="md"
                    source={{ uri: imageUri(item.image) }}
                  >
                    {initials(item.name)}
                  </Avatar>
                  <Text>{item.name}</Text>
                </HStack>

                <Checkbox value={item.id.toString()} />
              </HStack>
            )}
            ItemSeparatorComponent={Divider}
          />
        </Checkbox.Group>

      </VStack>

      <Button size="lg" onPress={onSubmit}>Save</Button>
    </VStack>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 14,
    paddingVertical: 16
  }
})
