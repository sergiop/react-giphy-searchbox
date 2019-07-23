import { renderHook, act } from '@testing-library/react-hooks'
import useSearchForm from './useSearchForm'

describe('useSearchForm', () => {
  test('return the typed value in input field', () => {
    const mockEvent = {
      persist: jest.fn(),
      target: {
        value: 'foo',
      },
    }

    const { result } = renderHook(() => useSearchForm())

    act(() => {
      result.current.handleInputChange(mockEvent)
    })

    expect(result.current.query).toBe('foo')
  })

  describe('handleSubmit', () => {
    test('if event is defined, prevent the submit to be triggered', () => {
      const mockPreventDefault = jest.fn()
      const mockEvent = {
        preventDefault: mockPreventDefault,
      }

      const { result } = renderHook(() => useSearchForm())

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(mockPreventDefault).toHaveBeenCalledTimes(1)
    })

    test('if event is not defined, do nothing', () => {
      const mockPreventDefault = jest.fn()
      const mockEvent = undefined

      const { result } = renderHook(() => useSearchForm())

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(mockPreventDefault).not.toHaveBeenCalled()
    })
  })
})
