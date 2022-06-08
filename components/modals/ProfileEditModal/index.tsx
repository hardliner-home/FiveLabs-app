import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  VStack,
  Avatar,
  Pressable,
  Input,
  Button,
  useToast, TextArea,
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// @ts-ignore
import { deserialize } from 'deserialize-json-api'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

// src
import { baseURL } from '../../../utills/apiUtills'
import { initials } from '../../../utills/textUtils'
import { imageChangeUri } from '../../../utills/imageUtils'
import {AuthContext} from '../../providers/AuthContextProvider'

interface Props {
  closeModal?: () => void | undefined
}

export default function ProfileEditModal({ closeModal }: Props) {
  const toast = useToast()
  const insets = useSafeAreaInsets()

  const auth = useContext(AuthContext)

  const [image, setImage] = useState<any>(auth.user.image)
  const [name, setName] = useState<string>(auth.user.name ?? '')
  const [nickname, setNickname] = useState<string>(auth.user.nickname ?? '')
  const [description, setDescription] = useState<string>(auth.user.description ?? '')
  const [email, setEmail] = useState<string>(auth.user.email ?? '')

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
    name && user.append('user[name]', name)
    nickname && user.append('user[nickname]', nickname)
    description && user.append('user[description]', description)
    email && user.append('user[email]', email)

    if (image) {
      const localUri = image.uri
      const filename = localUri.split('/').pop()

      const match = filename ? /\.(\w+)$/.exec(filename) : null
      const type = match ? `image/${match[1]}` : `image`

      user.append('user[image]', {
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

    fetch(baseURL + '/users', {
      method: "PUT",
      headers,
      body: user,
    })
    .then(async(response) => {
      let res = await response.json()
      res = deserialize(res, { transformKeys: "camelCase" })
      auth.setAuth({
        ...auth,
        user: res.data
      })
      if (closeModal) closeModal()
    })
    .catch((error) => {
      toast.show({ description: error.message })
    })
  }

  return (
    <VStack
      space={2}
      style={[styles.view, { paddingBottom: insets.bottom }]}
      _light={{ backgroundColor: 'white' }}
      _dark={{ backgroundColor: 'black' }}
    >
      <Pressable onPress={pickImage} alignItems="center">
        <Avatar
          size="2xl"
          source={{ uri: imageChangeUri(image) }}
        >
          {initials(auth.user.name)}
        </Avatar>
      </Pressable>

      <Input
        size="lg"
        value={name}
        placeholder="Name"
        onChangeText={setName}
      />

      <Input
        size="lg"
        value={nickname}
        placeholder="Nickname"
        onChangeText={setNickname}
      />

      <TextArea
        size="lg"
        value={description}
        placeholder="Description"
        onChangeText={setDescription}
      />

      <Input
        size="lg"
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
      />

      <Button size="lg" onPress={onSubmit}>Save</Button>
    </VStack>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  view: {
    paddingHorizontal: 14,
    paddingTop: 16
  }
})
