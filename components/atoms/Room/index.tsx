import React from 'react'
import { Box, Image, Pressable, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import { RoomType } from '../../atoms/ChatItem'

interface Props {
  room: RoomType
}

export default function Room({ room }: Props) {
  const onRoomPress = () => {
    // @ts-ignore
    navigation.navigate('Room', { id: room.id })
  }

  return (
    <Pressable onPress={onRoomPress} style={styles.pressable}>
      {({ isHovered, isPressed }) => (
        <Box
          shadow={3}
          borderWidth="1"
          _light={{ backgroundColor: 'white', borderColor: 'black' }}
          _dark={{ backgroundColor: 'black', borderColor: 'white' }}
          style={{
            transform: [{ scale: isPressed ? 0.99 : 1 }],
            ...styles.postCard,
          }}
        >
          {room.title && <Text fontSize="2xl">{room.title}</Text>}
          {room.image && (
            <Image
              alt="Post Image"
              source={{ uri: room.image }}
              style={{ width: "100%", height: 200 }}
            />
          )}
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
    padding: 10,
    shadowRadius: 10
  }
})
