import { useState } from 'react'

const useSearchForm = () => {
  const [searchInput, setInputs] = useState('')

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
    searchInput,
  }
}

export default useSearchForm
