import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner', () => {
  const defaults = {
    show: true,
    message: 'Loading...',
    image: 'path/to/image.png',
  }

  const buildSubject = (props = defaults) => render(<Spinner {...props} />)

  test('render the spinner', () => {
    const { getByTestId } = buildSubject()

    expect(getByTestId('SpinnerText')).toHaveTextContent(defaults.message)
  })

  test('if `show` prop is set to false, render nothing', () => {
    const props = { ...defaults, show: false }
    const { container } = buildSubject(props)

    expect(container.firstChild).toBeNull()
  })
})
