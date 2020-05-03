import fetchMock from 'fetch-mock-jest'
import { renderHook, act } from '@testing-library/react-hooks'
import useApi from './useApi'

describe('useApi', () => {
  const fetchingValues = {
    loading: true,
    error: false,
    data: [],
    lastPage: false,
  }

  fetchMock.mock('/foo', {
    status: 200,
    data: [{ foo: 'foo' }],
    pagination: {
      total_count: 200,
      count: 25,
      offset: 0,
    },
  })

  fetchMock.mock('/foo2', { status: 500 })

  test('perform a get request and receive some data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())

    const [, fetchImages] = result.current

    act(() => {
      fetchImages('/foo')
    })

    expect(result.current[0]).toEqual(fetchingValues)
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({
      loading: false,
      error: false,
      data: [{ foo: 'foo' }],
      lastPage: false,
    })
  })

  test('perform a get request with `isMore` option and receive some data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())

    const [, fetchImages] = result.current

    act(() => {
      fetchImages('/foo', true)
    })

    expect(result.current[0]).toEqual(fetchingValues)
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({
      loading: false,
      error: false,
      data: [{ foo: 'foo' }],
      lastPage: false,
    })
  })

  test('perform a get request and receive an error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())

    const [, fetch] = result.current

    act(() => {
      fetch('/foo2')
    })

    expect(result.current[0]).toEqual(fetchingValues)
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({
      loading: false,
      error: true,
      data: [],
      lastPage: false,
    })
  })
})
