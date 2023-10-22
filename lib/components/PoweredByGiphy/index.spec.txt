import React from 'react'
import { render } from '@testing-library/react'
import PoweredByGiphy from './PoweredByGiphy'

describe('PoweredByGiphy', () => {
  const defaults = {
    image: '/path/to/image.png',
  }

  const buildSubject = (props = defaults) =>
    render(<PoweredByGiphy {...props} />)

  test('render the image', () => {
    const { getByTestId } = buildSubject()

    expect(getByTestId('PoweredByGiphy').getAttribute('src')).toBe(
      defaults.image,
    )
  })
})
