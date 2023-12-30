import { ChangeEvent, FormEvent, useState } from 'react'

export const useSearchForm = () => {
  const [query, setInputs] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setInputs(e.target.value)
  }

  return {
    handleSubmit,
    handleInputChange,
    query,
  }
}
