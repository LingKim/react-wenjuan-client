import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME } from '../router'
const UserInfo: FC = () => {
  return (
    <>
      <Link to={HOME_PATHNAME}>登录</Link>
    </>
  )
}

export default UserInfo
