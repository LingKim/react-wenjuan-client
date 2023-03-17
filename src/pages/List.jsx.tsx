import React, { FC, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import styles from './List.module.scss'

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
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List