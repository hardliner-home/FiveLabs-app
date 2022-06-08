import React, { createContext, ReactNode, useEffect, useState } from 'react'

// src
import { axiosClient } from '../../../utills/apiUtills'

type defaultAuthContextPropsType = {
  user: any,
  isSignedIn: boolean,
  isLoading: boolean,
  token?: string,
  setAuth: (user: any) => void
}

interface contextPropsType extends defaultAuthContextPropsType {
  setAuth: (user: any) => void
}

interface Props {
  children: ReactNode
}

const defaultAuthContextProps: defaultAuthContextPropsType = {
  user: null,
  isSignedIn: true,
  isLoading: false,
  setAuth: (user) => user
}

export const AuthContext = createContext(defaultAuthContextProps)

export default function AuthContextProvider({ children }: Props) {
  const [auth, setAuth] = useState(defaultAuthContextProps)

  const authContextProps: contextPropsType = {
    ...auth,
    setAuth
  }

  useEffect(() => {
    axiosClient.get('/users/sign_in')
      .then((response) => {
        setAuth({
          ...auth,
          isSignedIn: true,
          user: response.data.data,
          token: response?.config?.headers?.authorization as string
        })
      })
      .catch((error) => {

      })
  }, [])

  return (
    <AuthContext.Provider value={authContextProps}>
      {children}
    </AuthContext.Provider>
  )
}
