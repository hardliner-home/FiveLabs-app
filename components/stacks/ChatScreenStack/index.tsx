import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// src
import ChatsScreen from '../../screens/ChatsScreen'
import ModalScreen from '../../screens/ModalScreen'
import ChatCreateModal from '../../modals/ChatCreateModal'
// import ChatCreateModal from '../../modals/ChatCreateModal'

export type ChatsStackNavigationParamList = {
  ChatsScreen: undefined,
  ChatScreen: { id: number, header: string },
}

// type TabBarIconType = {
//   focused: boolean,
//   color: string,
//   size: number
// }

const ChatStack = createNativeStackNavigator()

// @ts-ignore
export default function ChatScreenStack({ navigation }) {

  return (
    // @ts-ignore
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerRight: () => (
            <ModalScreen iconName="plus" snaps={['70%', '95%']}>
              <ChatCreateModal navigation={navigation} />
            </ModalScreen>
          )
        }}
      />
    </ChatStack.Navigator>
  );
}
