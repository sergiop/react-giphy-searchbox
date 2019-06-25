import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = ({ url, method, options, triggers }) => {
  const [response, setResponse] = useState({
    response: null,
    error: null,
    loading: true,
    noResults: false,
  })

  useEffect(() => {
    axios({ url, method, ...options })
      .then(res => {
        if (res.data.data.length > 0) {
          setResponse({
            response: res,
            error: null,
            loading: false,
            noResults: false,
          })
        } else {
          setResponse({
            response: res,
            error: null,
            loading: false,
            noResults: true,
          })
        }
      })
      .catch(error =>
        setResponse({
          response: null,
          error,
          loading: false,
          noResults: false,
        }),
      )
    return setResponse({ loading: true })
  }, triggers)

  return response
}

export default useAxios
