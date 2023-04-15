import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  pageSize: number
  page: number
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

//修改单个问卷
export async function updateQuestionService(
  id: string,
  opt: Record<string, any>
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return (await axios.patch(url, opt)) as ResDataType
}

//获取问卷列表
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  return (await axios.post(url)) as ResDataType
}

//批量彻底删除
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = `/api/question`
  return (await axios.delete(url, { data: { ids } })) as ResDataType
}
