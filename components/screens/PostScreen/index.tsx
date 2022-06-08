import React, {useEffect, useState} from 'react'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {RouteProp} from '@react-navigation/native'
import { useWindowDimensions } from 'react-native';

import {Button, View, Input, Image, Text, Pressable} from 'native-base'
import {Keyboard, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform} from 'react-native'

// src
import {PostType} from '../FeedScreen'
import {FeedStackNavigationParamList} from '../../stacks/FeedScreenStack'
import {axiosClient} from '../../../utills/apiUtills'
import ScreenView from '../../atoms/ScreenView'

type PostScreenNavigation = NativeStackNavigationProp<FeedStackNavigationParamList, 'PostScreen'>
type PostScreenRouteProp = RouteProp<FeedStackNavigationParamList, 'PostScreen'>;

interface Props {
  route: PostScreenRouteProp
  navigation: PostScreenNavigation
}

export default function PostScreen({navigation, route}: Props) {
  const { id } = route.params
  const { width } = useWindowDimensions();

  const [post, setPost] = useState<PostType | null>(null)

  useEffect(() => {
    if (id) {
      axiosClient.get(`/v1/posts/${id}`)
        .then((response) => {
          setPost(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [id])

  return (
    <ScreenView>
      {post && (
        <View p={2}>
          <Text px={2} fontSize="3xl" bold>{post.title}</Text>
          {post.image && (
            <Image
              alt="Post Image"
              resizeMode="contain"
              source={{ uri: post.image }}
              style={{ width, height: width }}
            />
          )}
          <Text px={2} fontSize="xl">{post.text}</Text>
        </View>
      )}
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
})
