import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ImageItem from './ImageItem'

describe('ImageItem', () => {
  const onSelect = jest.fn()
  const defaults = {
    item: {
      images: {
        fixed_width_downsampled: {
          height: 310,
          width: 250,
          url: 'http://imageurl.com/image',
        },
      },
      title: 'Image title',
    },
    imageRenditionName: 'fixed_width_downsampled',
    imageRenditionFileType: 'gif',
    listItemClassName: '',
    onSelect,
    size: 200,
    backgroundColor: '#eee',
  }

  const buildSubject = (props = defaults) => render(<ImageItem {...props} />)

  test('render the image with the proper attributes', () => {
    const { getByTestId } = buildSubject()
    const image = getByTestId('ImageItemImage')

    expect(image.getAttribute('width')).toBe(
      defaults.item.images.fixed_width_downsampled.width.toString(),
    )
    expect(image.getAttribute('height')).toBe(
      defaults.item.images.fixed_width_downsampled.height.toString(),
    )
    expect(image.getAttribute('alt')).toBe(defaults.item.title)
    expect(image.getAttribute('src')).toBe(
      defaults.item.images.fixed_width_downsampled.url,
    )
    expect(image.getAttribute('class')).toBe('image')
  })

  test('render the button', () => {
    const { getByTestId } = buildSubject()
    const button = getByTestId('ImageItemButton')

    expect(button.getAttribute('class')).toBe('imageButton')
    expect(button.getAttribute('type')).toBe('button')
    expect(button.getAttribute('style')).toBe(
      'background-color: rgb(238, 238, 238); width: 200px; height: 248px;',
    )
  })

  test('render the button with a custom background color', () => {
    const props = { ...defaults, backgroundColor: '#f00' }
    const { getByTestId } = buildSubject(props)

    expect(getByTestId('ImageItemButton').getAttribute('style')).toBe(
      'background-color: rgb(255, 0, 0); width: 200px; height: 248px;',
    )
  })

  test('dispatch the onClick action on button click', () => {
    const { getByTestId } = buildSubject()

    fireEvent.click(getByTestId('ImageItemButton'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  test('display a custom class name', () => {
    const props = { ...defaults, listItemClassName: 'foo' }
    const { getByTestId } = buildSubject(props)

    expect(getByTestId('ImageItemButton').getAttribute('class')).toBe(
      'imageButton foo',
    )
  })
})
