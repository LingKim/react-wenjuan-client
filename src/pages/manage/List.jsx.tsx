import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  const [questionList, setQuestionList] = useState([
    {
      _id: 'q1',
      title: '问卷1',
      isPublished: false,
      isStar: false,
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
      isStar: false,
      answerCount: 22,
      createdAt: '3月18日',
    },
    {
      _id: 'q4',
      title: '问卷4',
      isPublished: false,
      isStar: true,
      answerCount: 22,
      createdAt: '5月18日',
    },
  ])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className={styles.footer}>LoadMore...</div>
    </>
  )
}

export default List
