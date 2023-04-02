export interface IList {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean // 假删除
}

export interface IQuestionList {
  list: IList[]
  total: number
}

export interface IKeyWord {
  keyword: string
}
