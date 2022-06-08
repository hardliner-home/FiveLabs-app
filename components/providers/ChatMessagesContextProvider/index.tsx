import React, { createContext, ReactNode, useEffect, useState } from 'react'
// @ts-ignore
import { deserialize } from 'deserialize-json-api'
import Pusher from 'pusher-js/react-native'

// src
import { MessageTypeProps } from '../../atoms/MessageItem'
import { RoomType } from '../../atoms/ChatItem'

type defaultChatMessagesContextType = {
  chats: RoomType[],
  messages: MessageTypeProps[],
  setMessages: (messages: MessageTypeProps[]) => void,
  setChats: (chats: RoomType[]) => void,
}

interface Props {
  children: ReactNode
}

const defaultChatMessagesContext: defaultChatMessagesContextType = {
  chats: [],
  messages: [],
  setMessages: (messages) => messages,
  setChats: (chats) => chats
}

export const ChatMessagesContext = createContext(defaultChatMessagesContext)

// Pusher.logToConsole = true

const pusher = new Pusher('592faa1fa364b6ea55fe', {
  cluster: 'eu'
})

export default function ChatMessagesContextProvider({ children }: Props) {
  const [chats, setChats] = useState<RoomType[]>([])
  const [messages, setMessages] = useState<MessageTypeProps[]>([])

  const changeLastChatMessage = (newMessage: any) => {
    const lastRoomId = newMessage.room.id
    const lastChatMessage = newMessage.room.lastMessage

    const index = chats.findIndex((chat) => chat.id === lastRoomId)

    const newChats = [...chats]

    if (index >= 0) newChats[index].lastMessage = lastChatMessage

    return newChats
  }

  useEffect(() => {
    const channel = pusher.subscribe('chat_channel')
    channel.bind('message_create', (data: any) => {
      const newMessage = deserialize(data.message, { transformKeys: "camelCase" }).data
      const newChats = changeLastChatMessage(newMessage)

      setMessages([newMessage, ...messages])
      setChats(newChats)
    })

    return  () => {
      channel.unbind('message_create')
    }
  }, [messages])

  const chatMessagesContext: defaultChatMessagesContextType = {
    chats,
    messages,
    setMessages,
    setChats,
  }

  return (
    <ChatMessagesContext.Provider value={chatMessagesContext}>
      {children}
    </ChatMessagesContext.Provider>
  )
}
