import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {Button, Input, Text, TextArea, Image, VStack, Pressable, View} from 'native-base'
import { StyleSheet } from 'react-native'

// src
import { baseURL } from '../../../utills/apiUtills'
import { imageChangeUri } from '../../../utills/imageUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ImageType = {
  cancelled: boolean,
  height: number,
  type: string,
  uri: string,
  width: number
}

interface Props {
  closeModal?: () => void | undefined,
  navigation?: any
}

export default function PostCreateModal({ closeModal, navigation }: Props) {
  const insets = useSafeAreaInsets()

  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<ImageType | null>(null)
  const [text, setText] = useState<string>('')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      // @ts-ignore
      setImage(result)
    }
  }

  const onSubmit = async () => {
    let post = new FormData()
    title && post.append('post[title]', title)
    if (image) {
      const localUri = image.uri
      const filename = localUri.split('/').pop()

      const match = filename ? /\.(\w+)$/.exec(filename) : null
      const type = match ? `image/${match[1]}` : `image`

      post.append('post[image]', {
        // @ts-ignore
        uri: localUri,
        name: filename,
        type
      })
    }
    text && post.append('post[text]', text)

    const token = await AsyncStorage.getItem('jwt')

    fetch(baseURL + '/v1/posts', {
      method: "POST",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: token
      },
      body: post,
    })
      .then(() => {
        // @ts-ignore
        if (closeModal) closeModal()
      })
      .catch(() => {
      })
  }

  return (
    <VStack
      space={2}
      style={[styles.view, { paddingBottom: insets.bottom }]}
      _light={{ backgroundColor: 'white' }}
      _dark={{ backgroundColor: 'black' }}
    >
      <Text alignSelf="center" fontSize="20" bold>Create a post</Text>

      <Input
        size="lg"
        value={title}
        placeholder="Title"
        onChangeText={setTitle}
      />

      <Pressable onPress={pickImage}>
        {image
          ? <Image
              alt="Post Image"
              resizeMode="cover"
              source={{ uri: imageChangeUri(image) }}
              style={{ width: "100%", height: 200 }}
            />
          : <View style={styles.imagePlaceholder}>
              <Text fontSize="16">Pick an Image</Text>
            </View>
        }
      </Pressable>

      <TextArea
        size="lg"
        value={text}
        placeholder="Post body"
        onChangeText={setText}
      />

      <Button onPress={onSubmit}>Create post</Button>
    </VStack>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 14,
  },
  imagePlaceholder:  {
    width: "100%",
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000030'
  }
})
