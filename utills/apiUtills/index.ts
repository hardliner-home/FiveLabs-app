import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import AsyncStorage from '@react-native-async-storage/async-storage'
// @ts-ignore
import { deserialize } from 'deserialize-json-api'

const headers = {
  'Accept': 'application/json'
}

const baseIP = '192.168.1.105'

const baseURL = `http://${baseIP}:3000`

const axiosClient = applyCaseMiddleware(
  axios.create({
    headers,
    baseURL
  }), {
  ignoreHeaders: true
})

axiosClient.interceptors.request.use(
  async (request) => {
    const token = await AsyncStorage.getItem('jwt')
    if (token) {
      if (request && request.headers) {
        request.headers.authorization = token
      }
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  async (response) => {
    if (response.headers.authorization) {
      await AsyncStorage.setItem('jwt', response.headers.authorization)
    }
    response.data = deserialize(response.data)
    return response
  },
  async (error) => {
    await AsyncStorage.removeItem('jwt')
    return Promise.reject(error)
  }
)

export {
  baseIP,
  headers,
  baseURL,
  axiosClient
}
