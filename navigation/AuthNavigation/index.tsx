import { createNativeStackNavigator } from '@react-navigation/native-stack'

// src
import SignInScreen from '../../components/screens/SignInScreen'
import SignUpScreen from '../../components/screens/SignUpScreen'

export type AuthNavigationParamList = {
  SignInScreen: undefined,
  SignUpScreen: undefined
}

export default function AuthNavigation() {
  const Stack = createNativeStackNavigator()

  return (
    // @ts-ignore
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
    </Stack.Navigator>
  )
}
