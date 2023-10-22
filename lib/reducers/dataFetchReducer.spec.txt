import { useReducer } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import dataFetchReducer from './dataFetchReducer'

describe('dataFetchReducer', () => {
  const initialState = {
    loading: false,
    error: false,
    data: [{ foo: 'foo' }],
    lastPage: false,
  }

  test('FETCH_INIT action', () => {
    expect.assertions(1)

    const { result } = renderHook(() =>
      useReducer(dataFetchReducer, initialState),
    )
    const [, dispatch] = result.current

    act(() => {
      dispatch({ type: 'FETCH_INIT' })
    })

    const [state] = result.current

    expect(state).toEqual({
      data: [],
      loading: true,
      error: false,
      lastPage: false,
    })
  })

  test('FETCH_MORE_INIT action', () => {
    expect.assertions(1)

    const { result } = renderHook(() =>
      useReducer(dataFetchReducer, initialState),
    )
    const [, dispatch] = result.current

    act(() => {
      dispatch({ type: 'FETCH_MORE_INIT' })
    })

    const [state] = result.current

    expect(state).toEqual({
      data: [{ foo: 'foo' }],
      loading: true,
      error: false,
      lastPage: false,
    })
  })

  test('FETCH_SUCCESS action', () => {
    expect.assertions(1)

    const { result } = renderHook(() =>
      useReducer(dataFetchReducer, initialState),
    )
    const [, dispatch] = result.current

    act(() => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: [],
        pagination: {
          count: 25,
          offset: 0,
          total_count: 100,
        },
      })
    })

    const [state] = result.current

    expect(state).toEqual({
      data: [],
      loading: false,
      error: false,
      lastPage: false,
    })
  })

  test('FETCH_MORE_SUCCESS action', () => {
    expect.assertions(1)

    const { result } = renderHook(() =>
      useReducer(dataFetchReducer, initialState),
    )
    const [, dispatch] = result.current

    act(() => {
      dispatch({
        type: 'FETCH_MORE_SUCCESS',
        payload: [{ foo: 'foo2' }],
        pagination: {
          count: 25,
          offset: 0,
          total_count: 100,
        },
      })
    })

    const [state] = result.current

    expect(state).toEqual({
      data: [{ foo: 'foo' }, { foo: 'foo2' }],
      loading: false,
      error: false,
      lastPage: false,
    })
  })

  test('FETCH_FAILURE action', () => {
    expect.assertions(1)

    const { result } = renderHook(() =>
      useReducer(dataFetchReducer, initialState),
    )
    const [, dispatch] = result.current

    act(() => {
      dispatch({
        type: 'FETCH_FAILURE',
        payload: [],
        pagination: {
          count: 25,
          offset: 0,
          total_count: 100,
        },
      })
    })

    const [state] = result.current

    expect(state).toEqual({
      data: [{ foo: 'foo' }],
      loading: false,
      error: true,
      lastPage: false,
    })
  })

  test('throws an error when dispatched with an unknown action type', () => {
    expect.assertions(1)

    const { result } = renderHook(() =>
      useReducer(dataFetchReducer, initialState),
    )
    const [, dispatch] = result.current

    act(() => {
      dispatch({ type: 'FOO' })
    })

    expect(result.error).toEqual(Error('Unknown action type'))
  })
})
