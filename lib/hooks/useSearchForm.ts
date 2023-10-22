import { useState } from 'react'

export const useSearchForm = () => {
  const [query, setInputs] = useState('')

  const handleSubmit = e => {
    if (e) {
      e.preventDefault()
    }
  }
  const handleInputChange = e => {
    e.persist()
    setInputs(e.target.value)
  }

  return {
    handleSubmit,
    handleInputChange,
    query,
  }
}
