import React, { useEffect, useState } from 'react'
import type { FC, ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAMS_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAMS_KEY}=${value}`,
    })
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }
  return (
    <>
      <Search
        size="middle"
        allowClear
        value={value}
        placeholder="请输入关键字"
        onSearch={handleSearch}
        onChange={handleChange}
        style={{ width: 220 }}
      />
    </>
  )
}

export default ListSearch
