import { useReducer } from 'react'
import axios from 'axios'
import dataFetchReducer from '../reducers/dataFetchReducer'

const useApi = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: [],
    lastPage: false,
  })

  const fetch = async (url, isMore) => {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' })
    } else {
      dispatch({ type: 'FETCH_INIT' })
    }

    try {
      const result = await axios(url)

      if (isMore) {
        dispatch({
          type: 'FETCH_MORE_SUCCESS',
          payload: result.data.data,
          pagination: result.data.pagination,
        })
      } else {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.data,
          pagination: result.data.pagination,
        })
      }
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE' })
    }
  }
  return [state, fetch]
}

export default useApi
