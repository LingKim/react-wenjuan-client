import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'

interface PropTypes {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropTypes> = props => {
  const nav = useNavigate()
  const { _id, isStar, title, createdAt, answerCount, isPublished } = props

  function duplicate() {
    console.log(11)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span> {createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" icon={<StarOutlined />}>
              {isStar ? '取消星标' : '星标'}
            </Button>
            <Button type="text" icon={<CopyOutlined />} onClick={duplicate}>
              复制
            </Button>
            <Button type="text" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
