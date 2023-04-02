import React, { FC } from 'react'
import { Typography, Spin } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'
import type { IList } from '../../types/list'
const { Title } = Typography

const List: FC = () => {
  const [loading, data] = useLoadQuestionListData({})
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          data.list.length > 0 &&
          data.list.map((item: IList) => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>LoadMore...</div>
    </>
  )
}

export default List
