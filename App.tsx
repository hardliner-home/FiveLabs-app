import React from 'react'
import { LogBox } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// src
import RootNavigation from './navigation/RootNavigation'
import AuthContextProvider from './components/providers/AuthContextProvider'
import PushNotificationsContextProvider from './components/providers/PushNotificationsContextProvider'

LogBox.ignoreLogs(['Require cycle:', 'Require cycles', 'Can\'t perform'])

export default function App() {
  return (
    <AuthContextProvider>
      <PushNotificationsContextProvider>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <BottomSheetModalProvider>
              <RootNavigation />
            </BottomSheetModalProvider>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </PushNotificationsContextProvider>
    </AuthContextProvider>
  )
}
