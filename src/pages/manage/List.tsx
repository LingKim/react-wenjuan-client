import React, { FC, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import type { IList } from '../../types/list'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE_PARAM_KEY } from '../../constant'
const { Title } = Typography

const List: FC = () => {
  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const containerRef = useRef<HTMLInputElement>(null)
  const hasMoreData = list.length < total
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  const { run: load, loading } = useRequest(
    async () => {
      return await getQuestionListService({
        keyword,
        page,
        pageSize: 10,
      })
    },
    {
      manual: true,
      onSuccess(data) {
        const { list: l = [], total = 0 } = data
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  //触发加载
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return
      const domRect = ele.getBoundingClientRect()
      if (domRect == null) return
      if (domRect.bottom < document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (hasMoreData) {
      setPage(page + 1)
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, hasMoreData])

  const loadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!hasMoreData) return <span>没有更多了...</span>
    return <span>加载下一页</span>
  }

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
        {list.length > 0 &&
          list.map((item: IList) => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()}</div>
      </div>
    </>
  )
}

export default List
