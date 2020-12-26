import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
  const onSubmit = jest.fn()
  const setValue = jest.fn()
  const defaults = {
    onSubmit,
    placeholder: 'Search for GIFs',
    searchFormClassName: '',
    setValue,
    value: '',
    autoFocus: false,
  }

  const buildSubject = (props = defaults) => render(<SearchForm {...props} />)

  test('dispatch the onSubmit action on form submit', () => {
    const { getByTestId } = buildSubject()

    fireEvent.submit(getByTestId('SearchFormForm'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  test('on value change, dispatch the setValue action', () => {
    const { getByTestId } = buildSubject()

    fireEvent.change(getByTestId('SearchFormInput'), {
      target: { value: 'foo' },
    })
    expect(setValue).toHaveBeenCalledTimes(1)
  })

  test('display a custom class name', () => {
    const props = { ...defaults, searchFormClassName: 'foo' }
    const { getByTestId } = buildSubject(props)

    expect(getByTestId('SearchFormForm').getAttribute('class')).toBe(
      'reactGiphySearchbox-searchForm-form foo',
    )
  })

  test('if autofocus is true, the input field is focused', () => {
    const props = { ...defaults, autoFocus: true }
    const { getByTestId } = buildSubject(props)

    expect(getByTestId('SearchFormInput')).toHaveFocus()
  })

  test('if autofocus is false, the input field is not focused', () => {
    const props = { ...defaults, autoFocus: false }
    const { getByTestId } = buildSubject(props)

    expect(getByTestId('SearchFormInput')).not.toHaveFocus()
  })
})
