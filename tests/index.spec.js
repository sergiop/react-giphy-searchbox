import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import ReactGiphySearchbox from '../src/index'
import giphyTrendingGetSuccess from './fixtures/giphyTrendingGetSuccess.json'
import giphyTrendingGet404Error from './fixtures/giphyTrendingGet404Error.json'
import giphySearchGetSuccessEmpty from './fixtures/giphySearchGetSuccessEmpty.json'
import giphySearchGetSuccess from './fixtures/giphySearchGetSuccess.json'

// TO-DO: Test the loading more (infinite scrolling)

describe('ReactGiphySearchbox', () => {
  const onSelect = jest.fn()
  const onSearch = jest.fn()
  const defaults = {
    apiKey: '9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7',
    autoFocus: false,
    gifListHeight: '300px',
    gifPerPage: 5,
    imageRenditionFileType: 'gif',
    imageRenditionName: 'fixed_width_downsampled',
    listItemClassName: '',
    listWrapperClassName: '',
    masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
    messageError: 'Oops! Something went wrong. Please, try again.',
    messageLoading: 'Loading...',
    messageNoMatches: 'No matches found.',
    onSearch,
    onSelect,
    poweredByGiphy: true,
    rating: 'g',
    searchFormClassName: '',
    searchPlaceholder: 'Search for GIFs',
    wrapperClassName: '',
  }

  const buildSubject = (props = defaults) =>
    render(<ReactGiphySearchbox {...props} />)

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('fetches Giphy Api and displays trending gifs', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphyTrendingGetSuccess,
    })

    const { getByTestId } = buildSubject()
    // Loading message displayed
    const Loader = await waitForElement(() => getByTestId('SpinnerText'))
    expect(Loader).toHaveTextContent(defaults.messageLoading)

    const MasonryLayoutContainer = await waitForElement(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Trending gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('fetches Giphy Api and returns an error', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => giphyTrendingGet404Error,
    })
    const { getByTestId } = buildSubject()

    expect(getByTestId('SpinnerText')).toHaveTextContent(
      defaults.messageLoading,
    )

    const Alert = await waitForElement(() => getByTestId('Alert'))

    expect(Alert).toHaveTextContent(defaults.messageError)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('dispatches the onSearch action and shows some gifs', async () => {
    let MasonryLayoutContainer
    let Loader
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphyTrendingGetSuccess,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphySearchGetSuccess,
      })

    const { getByTestId } = buildSubject()

    // Loading message displayed
    Loader = await waitForElement(() => getByTestId('SpinnerText'))
    expect(Loader).toHaveTextContent(defaults.messageLoading)

    MasonryLayoutContainer = await waitForElement(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Trending gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(1)

    // Search something typing 'pizza' on input field
    // to simulate a full response
    fireEvent.change(getByTestId('SearchFormInput'), {
      target: { value: 'Pizza' },
    })

    // Loading message displayed
    Loader = await waitForElement(() => getByTestId('SpinnerText'))
    expect(Loader).toHaveTextContent(defaults.messageLoading)

    MasonryLayoutContainer = await waitForElement(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Searched gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(onSearch).toHaveBeenLastCalledWith('Pizza')
  })

  test('dispatches the onSearch action and shows an empty response', async () => {
    let Loader
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphyTrendingGetSuccess,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphySearchGetSuccessEmpty,
      })

    const { getByTestId } = buildSubject()

    // Loading message displayed
    Loader = await waitForElement(() => getByTestId('SpinnerText'))
    expect(Loader).toHaveTextContent(defaults.messageLoading)

    const MasonryLayoutContainer = await waitForElement(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Trending gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(1)

    // Search something typing 'foo' on input field
    // to simulate an empty response
    fireEvent.change(getByTestId('SearchFormInput'), {
      target: { value: 'foo' },
    })

    // Loading message displayed
    Loader = await waitForElement(() => getByTestId('SpinnerText'))
    expect(Loader).toHaveTextContent(defaults.messageLoading)

    const Alert = await waitForElement(() => getByTestId('Alert'))

    // No matcher message displayed
    expect(Alert).toHaveTextContent(defaults.messageNoMatches)
    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(onSearch).toHaveBeenLastCalledWith('foo')
  })
})
