import {Text, Pressable, Box, Image, HStack, VStack, Avatar} from 'native-base'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// src
import { PostType } from '../../screens/FeedScreen'
import React from 'react'
import {initials} from '../../../utills/textUtils'
import {imageUri} from '../../../utills/imageUtils'
import moment from 'moment'

export type UserType = {
  id: number,
  name: string,
  nickname: string | null,
  image: string | null,
  birthDate: string,
  description: string | null,
  status: string | null,
  number: string,
}

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  const navigation = useNavigation()

  const onPostPress = () => {
    // @ts-ignore
    navigation.navigate('Post', { id: post.id })
  }

  return (
    <Pressable onPress={onPostPress} style={styles.pressable}>
      {({ isHovered, isPressed }) => (
        <Box
          shadow={3}
          _light={{ backgroundColor: 'white', borderColor: 'black' }}
          _dark={{ backgroundColor: 'black', borderColor: 'white' }}
          style={{
            transform: [{ scale: isPressed ? 0.99 : 1 }],
            ...styles.postCard,
          }}
        >
          <VStack>
            <Text p={2} fontSize="2xl" bold>{post.title}</Text>

            {post.image && (
              <Image
                alt="Post Image"
                source={{ uri: post.image }}
                style={{ width: "100%", height: 200 }}
              />
            )}

            {post.text && <Text p={2} isTruncated>{post.text}</Text>}

            <HStack p={2} space={2} alignItems="flex-end" justifyContent="space-between">
              <HStack space={2} alignItems="center">
                <Avatar
                  size="md"
                  source={{ uri: imageUri(post.user.image) }}
                >
                  {initials(post.user.name)}
                </Avatar>

                <VStack>
                  <Text bold>{post.user.name}</Text>
                  <Text>@{post.user.nickname}</Text>
                </VStack>
              </HStack>

              <Text fontSize={10}>{moment(post.createdAt).format('DD.MM.yyyy hh:mm')}</Text>
            </HStack>
          </VStack>
        </Box>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pressable: {
    padding: 10,
  },
  postCard: {
    borderRadius: 10,
  }
})
