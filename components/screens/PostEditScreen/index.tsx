import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Button, View, Input, useToast, Text, Pressable } from 'native-base'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'

// src
import { FeedStackNavigationParamList } from '../../stacks/FeedScreenStack'

type PostEditScreenNavigation = NativeStackNavigationProp<FeedStackNavigationParamList, 'PostEditScreen'>

interface Props {
  navigation: PostEditScreenNavigation
}

export default function PostEditScreen({ navigation }: Props) {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
})
