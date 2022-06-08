import { Avatar, HStack, Pressable, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import moment from 'moment'
import Animated, {
  Extrapolate, FadeInDown,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

// src
import { imageUri } from '../../../utills/imageUtils'
import { MessageType, UserMessageType } from '../ChatItem'
import { useContext } from 'react'
import {AuthContext} from '../../providers/AuthContextProvider'

export type MessageTypeProps = {
  user: UserMessageType
} & MessageType

interface Props {
  message: MessageTypeProps
}

export default function MessageItem({ message }: Props) {
  const { user } = useContext(AuthContext)

  let mainContainerStyles = { ...styles.container }
  let messageBoxStyles = { ...styles.messageBox }

  const isMine = user.id == message.user.id

  if (isMine) {
    mainContainerStyles = Object.assign(mainContainerStyles, styles.myMessageContainer)
    messageBoxStyles = Object.assign(messageBoxStyles, styles.myMessageBox)
  }

  return (
    // @ts-ignore
    <Animated.View entering={FadeInDown}>
      <HStack
        space={2}
        alignItems="center"
        style={mainContainerStyles}
      >
        {!isMine && (
          <Pressable style={styles.avatarPressable}>
            <Avatar
              size="sm"
              source={{ uri: imageUri(message.user.image) }}
            />
          </Pressable>
        )}

        <Pressable style={messageBoxStyles} maxW="70%">
          <Text fontSize={16}>{message.message}</Text>
        </Pressable>

        <Text style={styles.messageTime} fontSize={12}>
          {moment(message.createdAt).format('HH:MM')}
        </Text>
      </HStack>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  myMessageContainer: {
    flexDirection: 'row-reverse'
  },
  messageBox: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'lightblue',
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  myMessageBox: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 12,
  },
  avatarPressable: {
    alignSelf: 'flex-end'
  },
  messageTime: {
    alignSelf: 'flex-end',
    paddingBottom: 6
  }
})
