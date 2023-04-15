import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAMS_KEY, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'

interface OptionType {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { loading, data, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10
      return await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return [loading, data as any, refresh]
}

export default useLoadQuestionListData
