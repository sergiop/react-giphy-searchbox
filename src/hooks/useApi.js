import { useReducer } from 'react'
import dataFetchReducer from '../reducers/dataFetchReducer'

const useApi = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: [],
    lastPage: false,
  })

  const fetchImages = (url, isMore) => {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' })
    } else {
      dispatch({ type: 'FETCH_INIT' })
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          return response.json().then(json => {
            throw json
          })
        }

        return response.json()
      })
      .then(response => {
        if (!response.pagination) {
          return dispatch({ type: 'FETCH_FAILURE' })
        }

        if (isMore) {
          return dispatch({
            type: 'FETCH_MORE_SUCCESS',
            payload: response.data,
            pagination: response.pagination,
          })
        }

        return dispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
          pagination: response.pagination,
        })
      })
      .catch(() => {
        dispatch({ type: 'FETCH_FAILURE' })
      })
  }

  return [state, fetchImages]
}

export default useApi
