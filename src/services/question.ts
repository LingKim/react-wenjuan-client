import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}

//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return await axios.get(url)
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`
  return await axios.post(url)
}

//获取问卷列表
export async function getQuestionListService(opt: Partial<SearchOption>): Promise<ResDataType> {
  const url = `/api/question`
  return (await axios.get(url, { params: opt })) as ResDataType
}
