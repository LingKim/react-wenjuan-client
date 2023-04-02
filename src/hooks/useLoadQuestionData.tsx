import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'

function useLoadQuestionData() {
  const { id = '' } = useParams()

  async function load() {
    return await getQuestionService(id)
  }

  const { loading, data, error } = useRequest(load)

  return [loading, data, error]
}

export default useLoadQuestionData
