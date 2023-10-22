import {
  getComponentWrapperWidth,
  getDefaultMasonryConfig,
  getMasonryConfig,
  getMasonryConfigExceptLast,
  getMediaBreakpoints,
} from './masonry'

describe('masonry', () => {
  const masonryConfig = [
    { columns: 2, imageWidth: 140, gutter: 10 },
    { mq: '700px', columns: 3, imageWidth: 200, gutter: 10 },
    { mq: '1000px', columns: 4, imageWidth: 220, gutter: 10 },
  ]

  const masonryConfigMediaDefault = {
    columns: 2,
    imageWidth: 140,
    gutter: 10,
  }

  describe('getMasonryConfig', () => {
    test('return a inverted order list of masonryConfig without `mq` property', () => {
      expect(getMasonryConfig(masonryConfig)).toEqual([
        { columns: 4, imageWidth: 220, gutter: 10 },
        { columns: 3, imageWidth: 200, gutter: 10 },
        { columns: 2, imageWidth: 140, gutter: 10 },
      ])
    })
  })

  describe('getMasonryConfigExceptLast', () => {
    test('return the list without the last value', () => {
      expect(getMasonryConfigExceptLast(masonryConfig)).toEqual([
        { columns: 4, imageWidth: 220, gutter: 10 },
        { columns: 3, imageWidth: 200, gutter: 10 },
      ])
    })
  })

  describe('getDefaultMasonryConfig', () => {
    test('return only the last value of the list', () => {
      expect(getDefaultMasonryConfig(masonryConfig)).toEqual({
        columns: 2,
        imageWidth: 140,
        gutter: 10,
      })
    })
  })

  describe('getMediaBreakpoints', () => {
    test('return valid MediaQueryList from `mq` values', () => {
      expect(getMediaBreakpoints(masonryConfig)).toEqual([
        '(min-width: 1000px)',
        '(min-width: 700px)',
      ])
    })
  })

  describe('getComponentWrapperWidth', () => {
    test('return the component wrapper width', () => {
      expect(getComponentWrapperWidth(masonryConfigMediaDefault)).toBe(290)
    })
  })
})
