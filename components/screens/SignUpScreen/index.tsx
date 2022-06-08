import React, { useState, useContext } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Button, Input, useToast, Text, VStack, Icon } from 'native-base'
import { Keyboard, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
// @ts-ignore
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

// src
import { axiosClient } from '../../../utills/apiUtills'
import { AuthNavigationParamList } from '../../../navigation/AuthNavigation'
import ScreenView from '../../atoms/ScreenView'
import {AuthContext} from '../../providers/AuthContextProvider'

type SignInScreenNavigation = NativeStackNavigationProp<AuthNavigationParamList, 'SignInScreen'>

interface Props {
  navigation: SignInScreenNavigation
}

export default function SignUpScreen({ navigation }: Props) {
  const toast = useToast()
  const auth = useContext(AuthContext)

  const [name, setName] = useState<string>('Vladimir')
  const [code, setCode] = useState<string>('1111')
  const [phone, setPhone] = useState<string>('89996985702')
  const [birthDate, setBirthDate] = useState<Date>(new Date())
  const [showCode, setShowCode] = useState<boolean>(false)

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      setBirthDate(selectedDate)
    }
  }

  const onSubmit = () => {
    Keyboard.dismiss()
    if (showCode) {
      const user = { code, name, phone, birthDate }

      axiosClient.post('/users', { user })
        .then((response) => {
          auth.setAuth({
            isSignedIn: true,
            isLoading: false,
            user: response.data.data,
            token: response?.config?.headers?.authorization as string
          })
        })
        .catch((error) => {
          toast.show({
            description: error.message
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
    <ScreenView style={styles.container} include={['bottom', 'left', 'right']}>
      <Text fontSize="3xl" bold alignSelf="center">Five Labs</Text>

      <VStack space={4} style={{ alignItems: 'center' }}>
        <Text fontSize="md">Sign up into account to continue</Text>

        <Input
          size="xl"
          value={name}
          onChangeText={setName}
          placeholder="Name"
          InputLeftElement={<Icon ml="2" as={FontAwesome} size={5} name="user"/>}
        />

        <Input
          size="xl"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Phone"
          InputLeftElement={<Icon ml="2" as={FontAwesome} size={5} name="phone"/>}
        />

        <DateTimePicker
          mode="date"
          style={styles.pickerInput}
          is24Hour={true}
          value={birthDate}
          onChange={onChangeDate}
        />

        {showCode && (
          <Input
            value={code}
            onChangeText={setCode}
          />
        )}

        <Button
          style={styles.submitButton}
          onPress={onSubmit}
        >
          Sign Up
        </Button>
      </VStack>


      <Button
        size="lg"
        variant="link"
        onPress={() => navigation.navigate('SignInScreen')}
      >
        Already have an account?
      </Button>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },
  submitButton: {
    paddingLeft: 25,
    paddingRight: 25
  },
  pickerInput: {
    width: '30%'
  }
})
