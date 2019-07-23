// @flow
import React from 'react'
import styles from './SearchForm.css'

type Props = {
  value: string,
  setValue: Function,
  onSubmit: Function,
}

const SearchForm = ({ value, setValue, onSubmit }: Props) => (
  <form onSubmit={onSubmit} autoComplete="off" className={styles.form}>
    <input
      type="text"
      placeholder="Search for GIFs"
      onChange={setValue}
      value={value}
      name="search"
      className={styles.input}
    />
  </form>
)

export default SearchForm
