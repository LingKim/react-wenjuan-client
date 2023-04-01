import React, { FC, useState } from 'react'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const Star: FC = () => {
  const [questionList, setQuestionList] = useState([
    {
      _id: 'q1',
      title: '问卷1',
      isPublished: false,
      isStar: true,
      answerCount: 5,
      createdAt: '3月8日',
    },
    {
      _id: 'q2',
      title: '问卷2',
      isPublished: true,
      isStar: true,
      answerCount: 6,
      createdAt: '4月8日',
    },
    {
      _id: 'q3',
      title: '问卷3',
      isPublished: true,
      isStar: true,
      answerCount: 22,
      createdAt: '3月18日',
    },
  ])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 &&
          questionList.map(item => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
