import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'
const instance = axios.create({
  timeout: 10 * 10000,
})

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData
    if (errno !== 0) {
      if (msg) {
        message.error(msg)
      }
      throw new Error(msg)
    }
    return data as any
  },
  (error: AxiosError) => {
    throw error
  }
)

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
