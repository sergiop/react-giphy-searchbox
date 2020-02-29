// @flow
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './index.module.css'
import SearchForm from './components/SearchForm/SearchForm'
import ImageItem from './components/ImageItem/ImageItem'
import PoweredByGiphy from './components/PoweredByGiphy/PoweredByGiphy'
import MasonryLayout from './components/MasonryLayout/MasonryLayout'
import Alert from './components/Alert/Alert'
import Spinner from './components/Spinner/Spinner'
import useSearchForm from './hooks/useSearchForm'
import useDebounce from './hooks/useDebounce'
import useMedia from './hooks/useMedia'
import useApi from './hooks/useApi'
import assetsSpinner from './assets/spinner.svg'
import assetsPoweredByGiphy from './assets/poweredByGiphy.png'
import {
  getComponentWrapperWidth,
  getDefaultMasonryConfig,
  getMasonryConfigExceptLast,
  getMediaBreakpoints,
} from './utils/masonry'

type MasonryConfig = {
  mq?: string,
  columns: number,
  imageWidth: number,
  gutter: number,
}

type Props = {
  apiKey: string,
  gifListHeight: string,
  gifPerPage: number,
  imageBackgroundColor: string,
  library: 'gifs' | 'stickers',
  listItemClassName: string,
  listWrapperClassName: string,
  loadingImage: string,
  masonryConfig: Array<MasonryConfig>,
  messageError: string,
  messageLoading: string,
  messageNoMatches: string,
  onSelect: Function,
  poweredByGiphy: boolean,
  poweredByGiphyImage: string,
  rating: string,
  searchFormClassName: string,
  searchPlaceholder: string,
  wrapperClassName: string,
}

const ReactGiphySearchBox = ({
  apiKey,
  gifListHeight,
  gifPerPage,
  imageBackgroundColor,
  library,
  listItemClassName,
  listWrapperClassName,
  loadingImage,
  masonryConfig,
  messageError,
  messageLoading,
  messageNoMatches,
  onSelect,
  poweredByGiphy,
  poweredByGiphyImage,
  rating,
  searchFormClassName,
  searchPlaceholder,
  wrapperClassName,
}: Props) => {
  const { query, handleInputChange, handleSubmit } = useSearchForm()
  const debouncedQuery = useDebounce(query, 500)

  const apiEndpoint = query ? 'search' : 'trending'
  const apiUrl = offset =>
    `https://api.giphy.com/v1/${library}/${apiEndpoint}?api_key=${apiKey}&limit=${gifPerPage}&rating=${rating}&offset=${offset}&q=${query}`

  const [{ data, loading, error, lastPage }, fetch] = useApi()

  const masonryConfigMatchMedia = useMedia(
    getMediaBreakpoints(masonryConfig),
    getMasonryConfigExceptLast(masonryConfig),
    getDefaultMasonryConfig(masonryConfig),
  )

  // Fetch Giphy Api on component mount and on search query change
  const [firstRun, setFirstRun] = useState(true)
  const isFirstRun = useRef(true)
  useEffect(() => {
    fetch(apiUrl(0))

    if (isFirstRun.current) {
      isFirstRun.current = false
      setFirstRun(false)
    }
  }, [debouncedQuery])

  return (
    <div
      className={`${styles.componentWrapper}${
        wrapperClassName ? ` ${wrapperClassName}` : ''
      }`}
      style={{ width: getComponentWrapperWidth(masonryConfigMatchMedia) }}
    >
      <SearchForm
        value={query}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
        loadingData={loading}
        searchFormClassName={searchFormClassName}
        placeholder={searchPlaceholder}
      />

      <div
        className={`${styles.listWrapper}${
          listWrapperClassName ? ` ${listWrapperClassName}` : ''
        }`}
        style={{ height: gifListHeight }}
      >
        <Alert
          show={data.length === 0 && !loading && !error && !firstRun}
          message={messageNoMatches}
        />

        <Alert show={error} message={messageError} />

        <Spinner show={loading} message={messageLoading} image={loadingImage} />

        <InfiniteScroll
          pageStart={0}
          loadMore={page => fetch(apiUrl(page * gifPerPage), true)}
          hasMore={!loading && !lastPage}
          useWindow={false}
          initialLoad={false}
          loader={
            !firstRun && (
              <div key="loading">
                <Spinner
                  show={loading}
                  message={messageLoading}
                  image={loadingImage}
                />
              </div>
            )
          }
        >
          {data.length > 0 && (
            <MasonryLayout sizes={masonryConfig}>
              {data.map(item => (
                <ImageItem
                  item={item}
                  size={masonryConfigMatchMedia.imageWidth}
                  key={item.id}
                  listItemClassName={listItemClassName}
                  onSelect={onSelect}
                  backgroundColor={imageBackgroundColor}
                />
              ))}
            </MasonryLayout>
          )}
        </InfiniteScroll>
      </div>
      {poweredByGiphy && <PoweredByGiphy image={poweredByGiphyImage} />}
    </div>
  )
}

ReactGiphySearchBox.defaultProps = {
  gifListHeight: '300px',
  gifPerPage: 20,
  imageBackgroundColor: '#eee',
  library: 'gifs',
  listItemClassName: '',
  listWrapperClassName: '',
  loadingImage: assetsSpinner,
  masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  messageError: 'Oops! Something went wrong. Please, try again.',
  messageLoading: 'Loading...',
  messageNoMatches: 'No matches found.',
  poweredByGiphy: true,
  poweredByGiphyImage: assetsPoweredByGiphy,
  rating: 'g',
  searchFormClassName: '',
  wrapperClassName: '',
  searchPlaceholder: 'Search for GIFs',
}

export default ReactGiphySearchBox
