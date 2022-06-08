import React, {useContext} from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Button } from 'native-base'
import { StyleSheet } from 'react-native'

// src
import { MainNavigationParamList } from '../../../navigation/MainNavigation'
import { sendPushNotification } from '../../../utills/notificationUtils'
import ScreenView from '../../atoms/ScreenView'
import {PushNotificationsContext} from '../../providers/PushNotificationsContextProvider'

type TestScreenNavigation = NativeStackNavigationProp<MainNavigationParamList, 'TestScreen'>

interface Props {
  navigation: TestScreenNavigation
}

export default function TestScreen({ navigation }: Props) {
  const { expoPushToken } = useContext(PushNotificationsContext)

  return (
    <ScreenView style={styles.container}>
      <Button onPress={async () => await sendPushNotification(expoPushToken)}>
        Send test notification
      </Button>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
