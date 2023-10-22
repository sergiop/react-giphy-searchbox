import React from 'react'
import { render } from '@testing-library/react'
import Alert from './Alert'

describe('Alert', () => {
  const defaults = {
    show: true,
    message: 'Alert message',
  }

  const buildSubject = (props = defaults) => render(<Alert {...props} />)

  test('print the alert message', () => {
    const { getByTestId } = buildSubject()

    expect(getByTestId('Alert')).toHaveTextContent(defaults.message)
  })
})
