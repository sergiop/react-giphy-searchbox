// @flow
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './index.css'
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
  gifPerPage?: number,
  gifListHeight?: string,
  masonryConfig?: Array<MasonryConfig>,
  rating?: string,
  messageNoMatches?: string,
  messageError?: string,
  messageLoading?: string,
  poweredByGiphy?: boolean,

  wrapperClass?: string,
  wrapperStyle?: Object,
}

const ReactGiphySearchBox = ({
  apiKey,
  gifPerPage,
  gifListHeight,
  masonryConfig,
  rating,
  messageNoMatches,
  messageError,
  messageLoading,
  poweredByGiphy,

  wrapperClass,
  wrapperStyle,
}: Props) => {
  const { query, handleInputChange, handleSubmit } = useSearchForm()
  const debouncedQuery = useDebounce(query, 500)

  const apiEndpoint = query ? 'search' : 'trending'
  const apiUrl = offset =>
    `https://api.giphy.com/v1/gifs/${apiEndpoint}?api_key=${apiKey}&limit=${gifPerPage}&rating=${rating}&offset=${offset}&q=${query}`

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
      className={`${styles.componentWrapper} ${wrapperClass}`}
      style={Object.assign(
        { width: getComponentWrapperWidth(masonryConfigMatchMedia) },
        wrapperStyle,
      )}
    >
      <SearchForm
        value={query}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
        loadingData={loading}
      />

      <div className={styles.listWrapper} style={{ height: gifListHeight }}>
        <Alert
          show={data.length === 0 && !loading && !error && !firstRun}
          message={messageNoMatches}
        />

        <Alert show={error} message={messageError} />

        <Spinner show={loading} />

        <InfiniteScroll
          pageStart={0}
          loadMore={page => fetch(apiUrl(page * gifPerPage), true)}
          hasMore={!loading && !lastPage}
          useWindow={false}
          initialLoad={false}
          loader={
            !firstRun && (
              <div key="loading">
                <Spinner show={loading} />
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
                />
              ))}
            </MasonryLayout>
          )}
        </InfiniteScroll>
      </div>
      {poweredByGiphy && <PoweredByGiphy />}
    </div>
  )
}

// TODO: add props for styles and class names
// TODO: add gif onClick action
// TODO: add loading animation
// TODO: add dedicated component for output messages (noMatches and error)
// TODO: props typechecking: flow or proptypes?

ReactGiphySearchBox.defaultProps = {
  gifPerPage: 20,
  gifListHeight: '300px',
  masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  rating: 'g',
  messageNoMatches: 'No matches found.',
  messageError: 'Oops! Something went wrong. Please, try again.',
  messageLoading: 'Loading...',
  poweredByGiphy: true,

  wrapperClass: '',
  wrapperStyle: {},
}

export default ReactGiphySearchBox
