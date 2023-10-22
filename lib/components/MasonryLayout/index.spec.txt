import React from 'react'
import { render } from '@testing-library/react'
import MasonryLayout from './MasonryLayout'

describe('MasonryLayout', () => {
  const defaults = {
    sizes: [{ columns: 2, gutter: 5 }],
  }

  const buildSubject = (props = defaults) =>
    render(
      <MasonryLayout {...props}>
        <div>Foo1</div>
        <div>Foo2</div>
      </MasonryLayout>,
    )

  test('render the passed children elements', () => {
    const { getByTestId } = buildSubject()

    expect(
      getByTestId('MasonryLayoutContainer').children[0].getAttribute(
        'data-packed',
      ),
    ).toBe('')
    expect(
      getByTestId('MasonryLayoutContainer').children[1].getAttribute(
        'data-packed',
      ),
    ).toBe('')
    expect(getByTestId('MasonryLayoutContainer').children.length).toBe(2)
  })
})
