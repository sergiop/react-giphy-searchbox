// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './searchFormStyles'

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
}: Props) => {
  useStyle('SearchForm', styles)

  return (
    <form
      data-testid="SearchFormForm"
      onSubmit={onSubmit}
      autoComplete="off"
      className={`reactGiphySearchbox-searchForm-form${
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
        className="reactGiphySearchbox-searchForm-input"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
      />
    </form>
  )
}
export default SearchForm
