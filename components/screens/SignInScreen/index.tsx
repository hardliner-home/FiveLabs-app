import React, { useContext, useState } from 'react'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Button, VStack, Input, useToast, Text, Icon } from 'native-base'
import { Keyboard, StyleSheet } from 'react-native'

// src
import { axiosClient } from '../../../utills/apiUtills'
import { AuthNavigationParamList } from '../../../navigation/AuthNavigation'
import { FontAwesome } from '@expo/vector-icons'
import Faded from '../../atoms/Faded'
import ScreenView from '../../atoms/ScreenView'
import {AuthContext} from '../../providers/AuthContextProvider'

type SignInScreenNavigation = NativeStackNavigationProp<AuthNavigationParamList, 'SignInScreen'>

interface Props {
  navigation: SignInScreenNavigation
}

export default function SignInScreen({ navigation }: Props) {
  const auth = useContext(AuthContext)

  const [phone, setPhone] = useState<string>('89220599210')
  const [code, setCode] = useState<string>('1111')
  const [showCode, setShowCode] = useState<boolean>(false)

  const toast = useToast()

  const onSubmit = () => {
    Keyboard.dismiss()
    if (showCode) {
      axiosClient.post('/users/sign_in', { phone, code })
        .then((response) => {
          auth.setAuth({
            isSignedIn: true,
            isLoading: false,
            user: response.data.data,
            token: response?.headers?.authorization as string
          })
        })
        .catch((error) => {
          toast.show({ description: error.message })
          auth.setAuth({
            user: null,
            isSignedIn: false,
            isLoading: false,
          })
        })
    } else {
      axiosClient.post('/phone_check', { phone })
        .then((response) => {
          setShowCode(true)
        })
        .catch((error) => {
          toast.show({
            description: error.message
          })
        })
    }
  }

  return (
    <ScreenView style={styles.container} include={['top', 'bottom', 'left', 'right']}>
      <Faded style={{ alignItems: 'center' }}>
        <Text fontSize="3xl" bold pt={10}>Five Labs</Text>
      </Faded>

      <Faded delay={100}>
        <VStack space={4} style={{ alignItems: 'center' }}>
          <Text fontSize="md">Sign in into account to continue</Text>

          <Input
            size="xl"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Phone"
            InputLeftElement={<Icon ml="2" as={FontAwesome} size={5} name="phone"/>}
          />

          {showCode && (
            <Faded style={styles.codeInput}>
              <Input
                size="xl"
                value={code}
                onChangeText={setCode}
                keyboardType="phone-pad"
                placeholder="Code"
                InputLeftElement={<Icon ml="2" as={FontAwesome} size={5} name="at"/>}
              />
            </Faded>
          )}

          <Button
            size="md"
            style={styles.submitButton}
            disabled={!phone}
            onPress={onSubmit}
          >
            Sign In
          </Button>
        </VStack>
      </Faded>

      <Faded delay={200}>
        <Button
          size="lg"
          variant="link"
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          Do not have an account?
        </Button>
      </Faded>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  submitButton: {
    paddingLeft: 25,
    paddingRight: 25
  },
  codeInput: {
    width: '100%'
  }
})
