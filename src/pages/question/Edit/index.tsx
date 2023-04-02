import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
const Edit: FC = () => {
  const [loading, data, error] = useLoadQuestionData()
  if (error) {
    return <div>error</div>
  }
  return <div>{loading ? <p>loading</p> : JSON.stringify(data)}</div>
}

export default Edit
