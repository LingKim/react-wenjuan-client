import userGetUserInfo from './userGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '../router'
function useNavPage(waitingUserData: boolean) {
  const { username } = userGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) {
      return
    }
    //已经登录了
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    //未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [username, pathname, waitingUserData])
}

export default useNavPage
