import React, { useContext } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {Avatar, HStack, Icon, Text, VStack, Divider, Button} from 'native-base'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

// src
import { MainNavigationParamList } from '../../../navigation/MainNavigation'
import ScreenView from '../../atoms/ScreenView'
import { initials } from '../../../utills/textUtils'
import {imageUri} from '../../../utills/imageUtils'
import {AuthContext} from '../../providers/AuthContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ProfileScreenNavigation = NativeStackNavigationProp<MainNavigationParamList, 'ProfileScreen'>

interface Props {
  navigation: ProfileScreenNavigation
}

export default function ProfileScreen({ navigation }: Props) {
  const auth = useContext(AuthContext)
  const { user } = auth

  return (
    <ScreenView style={styles.container}>
      <VStack p="4" space={6}>
        <HStack space={3} alignItems="center">
          <Avatar
            size="lg"
            source={{ uri: imageUri(user.image) }}
          >
            {initials(user.name)}
          </Avatar>

          <VStack>
            {user.name && <Text fontSize="24" bold>{user.name}</Text>}
            {user.nickname && <Text fontSize="16">@{user.nickname}</Text>}
          </VStack>
        </HStack>


        <VStack space={2}>
          <HStack space={2} alignItems="center">
            <Icon as={FontAwesome} name="phone" size={5} />
            <Text fontSize="14">{user.phone}</Text>
          </HStack>

          <HStack space={2} alignItems="center">
            <Icon as={FontAwesome} name="at" size={5} />
            <Text fontSize="14">{user.email}</Text>
          </HStack>

          <Divider />

          {user.description && <Text>{user.description}</Text>}

          <Button
            onPress={async () => {
              await AsyncStorage.removeItem('jwt')
              auth.setAuth({
                ...auth,
                user: null,
                token: undefined,
                isSignedIn: false,
                isLoading: false
              })
            }}
          >
            Logout
          </Button>
        </VStack>
      </VStack>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameContainer: {
    padding: 10
  }
})
