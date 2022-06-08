import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// src
import FeedScreen from '../../screens/FeedScreen'
import PostScreen from '../../screens/PostScreen'
import PostEditScreen from '../../screens/PostEditScreen'
import ModalScreen from '../../screens/ModalScreen'
import PostCreateModal from '../../modals/PostCreateModal'

export type FeedStackNavigationParamList = {
  FeedScreen: undefined,
  PostScreen: { id: string },
  PostEditScreen: undefined,
}

// type TabBarIconType = {
//   focused: boolean,
//   color: string,
//   size: number
// }

const FeedStack = createNativeStackNavigator()

// @ts-ignore
export default function FeedScreenStack({ navigation }) {
  return (
    // @ts-ignore
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerRight: () => (
            <ModalScreen iconName="plus">
              <PostCreateModal navigation={navigation} />
            </ModalScreen>
          )
        }}
      />
      <FeedStack.Screen name="Post" component={PostScreen} />
      <FeedStack.Screen name="PostEdit" component={PostEditScreen} />
    </FeedStack.Navigator>
  );
}
