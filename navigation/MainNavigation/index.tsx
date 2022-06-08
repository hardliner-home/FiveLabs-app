import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// src
import TestScreen from '../../components/screens/TestScreen'
import ProfileScreen from '../../components/screens/ProfileScreen'
import FeedScreenStack, { FeedStackNavigationParamList } from '../../components/stacks/FeedScreenStack'
import ChatScreenStack, { ChatsStackNavigationParamList } from '../../components/stacks/ChatScreenStack'
import { Icon } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import ProfileEditModal from '../../components/modals/ProfileEditModal'
import ModalScreen from '../../components/screens/ModalScreen'

export type MainNavigationParamList = {
  FeedStack: FeedStackNavigationParamList,
  ChatsStack: ChatsStackNavigationParamList,
  ProfileScreen: undefined,
  TestScreen: undefined,
}

type TabBarIconType = {
  focused: boolean,
  color: string,
  size: number
}

const Tab = createBottomTabNavigator()

export default function MainNavigation() {

  return (
    // @ts-ignore
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: TabBarIconType) => {
          let iconName

          switch (route.name) {
            case 'FeedStack':
              iconName = 'feed'
              break
            case 'ChatStack':
              iconName = 'list-alt'
              break
            case 'Test':
              iconName = 'cog'
              break
            case 'Profile':
              iconName = 'user'
              break
            default: break
          }

          return <Icon as={FontAwesome} size={5} name={iconName} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="FeedStack"
        component={FeedScreenStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatScreenStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <ModalScreen iconName="edit">
              <ProfileEditModal />
            </ModalScreen>
          )
        }}
      />
    </Tab.Navigator>
  )
}
