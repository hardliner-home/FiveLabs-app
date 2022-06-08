import { HStack, View, Avatar, Text, VStack, Pressable } from 'native-base'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'

// src
import { imageUri } from '../../../utills/imageUtils'
import {initials} from '../../../utills/textUtils'

export type UserMessageType = {
  id: number,
  image: string | null,
  nickname: string,
  name: string,
  createdAt: string
}

export type MessageType = {
  id: number,
  message: string,
  createdAt: string
}

export type RoomType = {
  id: number,
  image: string | null,
  title: string,
  createdAt: string,
  lastMessage?: MessageType
}

interface Props {
  room: RoomType
}

export default function ChatItem({ room }: Props) {
  const navigation = useNavigation()

  const onPress = () => {
    // @ts-ignore
    navigation.navigate('Chat', { id: room.id, header: room.title })
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {({ isHovered, isPressed }) => (
        <HStack
          justifyContent="space-between"
          style={{ transform: [{ scale: isPressed ? 0.99 : 1 }] }}
        >
          <HStack space={2}>
            <Avatar
              size="md"
              source={{ uri: imageUri(room.image) }}
            >
              {initials(room.title)}
            </Avatar>

            <VStack space={1}>
              <Text bold isTruncated w="48">{room.title}</Text>
              {room.lastMessage && (
                <Text isTruncated w="48">{room.lastMessage.message}</Text>
              )}
            </VStack>
          </HStack>

          <View>
            {room.lastMessage && (
              <Text>{moment(room.lastMessage.createdAt).fromNow(true)}</Text>
            )}
          </View>
        </HStack>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
})
