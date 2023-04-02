import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAMS_KEY } from '../constant'

interface OptionType {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { loading, data } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
      return await getQuestionListService({ keyword, isStar, isDeleted })
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return [loading, data as any]
}

export default useLoadQuestionListData
