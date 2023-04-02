import React, { FC } from 'react'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'
import type { IList } from '../../types/list'
const { Title } = Typography
const Star: FC = () => {
  const [loading, data] = useLoadQuestionListData({ isStar: true })
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && data.list.length === 0 && <Empty />}
        {!loading &&
          data.list.length > 0 &&
          data.list.map((item: IList) => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
