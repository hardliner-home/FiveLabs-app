import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

// src
import AuthNavigation from '../AuthNavigation'
import WrapScreenStack from '../../components/stacks/WrapScreenStack'
import {StatusBar} from 'native-base'
import {AuthContext} from '../../components/providers/AuthContextProvider'

export default function RootNavigation() {
  const { isSignedIn } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <StatusBar />
      {isSignedIn && (
        <WrapScreenStack />
      )}

      {!isSignedIn && (
        <AuthNavigation />
      )}
    </NavigationContainer>
  )
}
