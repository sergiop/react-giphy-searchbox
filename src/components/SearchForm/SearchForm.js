// @flow
import React from 'react'
import styles from './SearchForm.css'

type Props = {
  onSubmit: Function,
  placeholder: string,
  searchFormClassName: string,
  setValue: Function,
  value: string,
}

const SearchForm = ({
  onSubmit,
  placeholder,
  searchFormClassName,
  setValue,
  value,
}: Props) => (
  <form
    onSubmit={onSubmit}
    autoComplete="off"
    className={`${styles.form}  ${searchFormClassName}`}
  >
    <input
      type="text"
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      name="search"
      className={styles.input}
    />
  </form>
)

export default SearchForm
