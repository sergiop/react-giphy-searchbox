import { renderHook, act } from '@testing-library/react-hooks'
import useMedia from './useMedia'

const matchMediaMock = require('match-media-mock').create()

const queries = ['(min-width: 1000px)', '(min-width: 700px)']
const values = [220, 200]
const defaultValue = 140
const mockAddListener = jest.fn()
const mockRemoveListener = jest.fn()

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: matchMediaMock(query).matches,
    media: query,
    onchange: null,
    addListener: mockAddListener,
    removeListener: mockRemoveListener,
  }
})

describe('useMedia', () => {
  test('with a screen width of 1001px, return the first value in the list of values', () => {
    act(() => matchMediaMock.setConfig({ type: 'screen', width: 1001 }))
    const { result } = renderHook(() => useMedia(queries, values, defaultValue))

    expect(result.current).toBe(220)
    expect(mockAddListener).toHaveBeenCalledTimes(2)
    expect(mockRemoveListener).toHaveBeenCalledTimes(0)
  })

  test('with a screen width of 701px, return the second value in the list of values', () => {
    act(() => matchMediaMock.setConfig({ type: 'screen', width: 701 }))
    const { result } = renderHook(() => useMedia(queries, values, defaultValue))

    expect(result.current).toBe(200)
  })

  test('with a screen width of 300px, return the default value', () => {
    act(() => matchMediaMock.setConfig({ type: 'screen', width: 300 }))
    const { result } = renderHook(() => useMedia(queries, values, defaultValue))

    expect(result.current).toBe(140)
  })
})
