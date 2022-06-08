import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { View } from 'native-base'
import {
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'

interface Props {
  style?: any
  include?: string[]
  children: ReactNode
  props?: any
}

export default function ScreenView({ children, style = {}, include = [], ...props }: Props) {
  const insets = useSafeAreaInsets()

  const options = {
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: insets.bottom,
    paddingTop: insets.top
  }

  let containerStyle = {
    ...styles.container
  }

  include?.forEach((value) => {
    let paddingKey = 'padding' + value.charAt(0).toUpperCase() + value.slice(1)

    // @ts-ignore
    containerStyle[paddingKey] = options[paddingKey]
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={68}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          {...props}
          style={{ ...containerStyle, ...style }}
          _light={{ backgroundColor: 'white' }}
          _dark={{ backgroundColor: 'black' }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
