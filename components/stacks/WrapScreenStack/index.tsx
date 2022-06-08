import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// src
import MainNavigation from '../../../navigation/MainNavigation'
import ChatScreen from '../../screens/ChatScreen'
import ChatMessagesContextProvider from '../../providers/ChatMessagesContextProvider'

const WrapStack = createNativeStackNavigator()

export default function WrapScreenStack() {

  return (
    <ChatMessagesContextProvider>
      {/*@ts-ignore*/}
      <WrapStack.Navigator>
        <WrapStack.Screen
          name="MainNavigation"
          options={{ headerShown: false }}
          component={ MainNavigation }
        />
        <WrapStack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            // @ts-ignore
            title: route.params.header,
          })}
        />
      </WrapStack.Navigator>
    </ChatMessagesContextProvider>
  )
}
