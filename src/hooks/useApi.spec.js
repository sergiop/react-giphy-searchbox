import { renderHook, act } from '@testing-library/react-hooks'
import giphyTrendingGet404Error from '../../tests/fixtures/giphyTrendingGet404Error.json'
import giphyTrendingGetSuccess from '../../tests/fixtures/giphyTrendingGetSuccess.json'
import giphySearchGetSuccessMissingPagination from '../../tests/fixtures/giphySearchGetSuccessMissingPagination.json'
import useApi from './useApi'

describe('useApi', () => {
  const fetchingInitValues = {
    loading: true,
    error: false,
    data: [],
    lastPage: false,
  }

  test('perform a get request and receive some data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())
    const [, fetchImages] = result.current

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphyTrendingGetSuccess,
    })

    act(() => {
      fetchImages()
    })

    expect(result.current[0]).toEqual(fetchingInitValues)
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({
      loading: false,
      error: false,
      data: giphyTrendingGetSuccess.data,
      lastPage: false,
    })
  })

  test('perform a get request with `isMore` option and receive some data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())
    const [, fetchImages] = result.current

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphyTrendingGetSuccess,
    })

    act(() => {
      fetchImages('', true)
    })

    expect(result.current[0]).toEqual(fetchingInitValues)
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({
      loading: false,
      error: false,
      data: giphyTrendingGetSuccess.data,
      lastPage: false,
    })
  })

  test('perform a get request and receive an error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())
    const [, fetchImages] = result.current

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => giphyTrendingGet404Error,
    })

    act(() => {
      fetchImages()
    })

    expect(result.current[0]).toEqual(fetchingInitValues)

    await waitForNextUpdate()

    expect(result.current[0]).toEqual({
      loading: false,
      error: true,
      data: [],
      lastPage: false,
    })
  })

  // It has been reported that sometimes Giphy API, probably due to a bug, return a malformed
  // response, missing the pagination key.
  test.only('perform a get request and receive a response without the pagination', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())
    const [, fetchImages] = result.current

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphySearchGetSuccessMissingPagination,
    })

    act(() => {
      fetchImages()
    })

    expect(result.current[0]).toEqual(fetchingInitValues)
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({
      loading: false,
      error: true,
      data: [],
      lastPage: false,
    })
  })
})
