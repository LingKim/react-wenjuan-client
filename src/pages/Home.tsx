import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    return () => {
      fetch('/api/test')
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计收到199份答卷,发布了100份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
