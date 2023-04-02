import React, { FC, useState } from 'react'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'
import type { IList } from '../../types/list'
const { Title } = Typography
const { confirm } = Modal
const Trash: FC = () => {
  const [loading, data] = useLoadQuestionListData({ isDeleted: true })

  const [selectIds, setSelectIds] = useState<string[]>([])
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => {
        console.log('1111')
      },
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={data && data.list}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && data.list.length > 0 && TableElem}
      </div>
    </>
  )
}

export default Trash
