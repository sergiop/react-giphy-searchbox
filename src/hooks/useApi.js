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

  const fetch = (url, isMore) => {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' })
    } else {
      dispatch({ type: 'FETCH_INIT' })
    }

    axios
      .get(url)
      .then(response => {
        if (isMore) {
          dispatch({
            type: 'FETCH_MORE_SUCCESS',
            payload: response.data.data,
            pagination: response.data.pagination,
          })
        } else {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: response.data.data,
            pagination: response.data.pagination,
          })
        }
      })
      .catch(() => {
        dispatch({ type: 'FETCH_FAILURE' })
      })
  }

  return [state, fetch]
}

export default useApi
