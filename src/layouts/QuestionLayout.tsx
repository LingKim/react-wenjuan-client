import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import userLoadUserData from '../hooks/userLoadUserData'
import useNavPage from '../hooks/useNavPage'
import { Spin } from 'antd'
const QuestionLayout: FC = () => {
  const { waitingUserData } = userLoadUserData()
  useNavPage(waitingUserData)
  return (
    <>
      <div>QuestionLayout header</div>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <div>QuestionLayout footer</div>
    </>
  )
}

export default QuestionLayout
