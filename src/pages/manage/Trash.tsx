import React, { FC, useState } from 'react'
import { Button, Empty, Modal, Space, Spin, Table, Tag, Typography, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/listPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useRequest } from 'ahooks'
import { updateQuestionService, deleteQuestionService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal
const Trash: FC = () => {
  const [loading, data, refresh] = useLoadQuestionListData({ isDeleted: true })

  const [selectIds, setSelectIds] = useState<string[]>([])

  //恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectIds) {
        await updateQuestionService(id, {
          isDeleted: true,
        })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh()
      },
    }
  )

  //恢复
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectIds)
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectIds([])
      },
    }
  )

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
        deleteQuestion()
      },
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0} onClick={recover}>
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
      <div className={styles.footer}>
        <ListPage total={data && data.total} />
      </div>
    </>
  )
}

export default Trash
