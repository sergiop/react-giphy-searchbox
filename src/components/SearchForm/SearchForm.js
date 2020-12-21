// @flow
import React from 'react'
import styles from './SearchForm.module.css'

type Props = {
  onSubmit: Function,
  placeholder: string,
  searchFormClassName: string,
  setValue: Function,
  value: string,
  autoFocus: boolean,
}

const SearchForm = ({
  onSubmit,
  placeholder,
  searchFormClassName,
  setValue,
  value,
  autoFocus,
}: Props) => (
  <form
    data-testid="SearchFormForm"
    onSubmit={onSubmit}
    autoComplete="off"
    className={`${styles.form}${
      searchFormClassName ? ` ${searchFormClassName}` : ''
    }`}
  >
    <input
      data-testid="SearchFormInput"
      type="text"
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      name="search"
      className={styles.input}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
    />
  </form>
)

export default SearchForm
