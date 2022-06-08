import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react'
import * as Notifications from 'expo-notifications'

// src
import {registerForPushNotificationsAsync} from '../../../utills/notificationUtils'

type expoPushContextPropsType = {
  expoPushToken: string,
  notification: boolean | any
}

interface Props {
  children: ReactNode
}

const defaultExpoPushContextProps: expoPushContextPropsType = {
  expoPushToken: '',
  notification: false
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export const PushNotificationsContext = createContext(defaultExpoPushContextProps)

export default function PushNotificationsContextProvider({ children }: Props) {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<boolean | any>(false)

  const notificationListener = useRef()
  const responseListener = useRef()

  const expoPushContextProps: expoPushContextPropsType = {
    expoPushToken,
    notification
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token))

    // @ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    // @ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // TODO process onPress on notifications
      console.log('responseListener.current', response)
    })

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener.current)
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <PushNotificationsContext.Provider value={expoPushContextProps}>
      {children}
    </PushNotificationsContext.Provider>
  )
}
