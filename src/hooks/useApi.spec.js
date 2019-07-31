import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { renderHook, act } from '@testing-library/react-hooks'
import useApi from './useApi'

// Unmock Jest Axios mock used in index.spec.js to allow the use of 'axios-mock-adapter' module
// TODO: this test should be rewritten with Jest Axios mock, instead of 'axios-mock-adapter'
// No need to use two different kind of axios mock.
jest.unmock('axios')

describe('useApi', () => {
  const fetchingValues = {
    loading: true,
    error: false,
    data: [],
    lastPage: false,
  }

  const mock = new MockAdapter(axios)

  mock.onGet('/foo').reply(200, {
    data: [{ foo: 'foo' }],
    pagination: {
      total_count: 200,
      count: 25,
      offset: 0,
    },
  })

  mock.onGet('/foo2').reply(500, {})

  test('perform a get request and receive some data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi())

    const [, fetch] = result.current

    act(() => {
      fetch('/foo')
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

    const [, fetch] = result.current

    act(() => {
      fetch('/foo', true)
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
