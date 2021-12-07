// @flow
import React, {forwardRef, useEffect, useRef, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useStyle } from './style'
import { styles } from './indexStyles'
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

export type ImageRenditionFileType = 'gif' | 'webp'

type Props = {
  apiKey: string,
  autoFocus: boolean,
  gifListHeight: string,
  gifPerPage: number,
  imageBackgroundColor: string,
  imageRenditionFileType: ImageRenditionFileType,
  imageRenditionName: string,
  library: 'gifs' | 'stickers',
  listItemClassName: string,
  listWrapperClassName: string,
  loadingImage: ?string,
  masonryConfig: Array<MasonryConfig>,
  messageError: string,
  messageLoading: string,
  messageNoMatches: string,
  onSearch: Function,
  onSelect: Function,
  poweredByGiphy: boolean,
  poweredByGiphyImage: ?string,
  rating: string,
  searchFormClassName: string,
  searchPlaceholder: string,
  wrapperClassName: string,
  externalCss: boolean,
}

const ReactGiphySearchBox = forwardRef((props, ref) => {
  const {
    apiKey,
    autoFocus,
    gifListHeight,
    gifPerPage,
    imageBackgroundColor,
    imageRenditionFileType,
    imageRenditionName,
    library,
    listItemClassName,
    listWrapperClassName,
    loadingImage,
    masonryConfig,
    messageError,
    messageLoading,
    messageNoMatches,
    onSearch,
    onSelect,
    poweredByGiphy,
    poweredByGiphyImage,
    rating,
    searchFormClassName,
    searchPlaceholder,
    wrapperClassName,
    externalCss,
  }: Props = props;

  useStyle('Index', !externalCss ? styles : null);
  const { query, handleInputChange, handleSubmit } = useSearchForm()
  const debouncedQuery = useDebounce(query, 500)

  const apiEndpoint = query ? 'search' : 'trending'
  const apiUrl = offset =>
    `https://api.giphy.com/v1/${library}/${apiEndpoint}?api_key=${apiKey}&limit=${gifPerPage}&rating=${rating}&offset=${offset}&q=${query}`

  const [{ data, loading, error, lastPage }, fetchImages] = useApi()

  const masonryConfigMatchMedia = useMedia(
    getMediaBreakpoints(masonryConfig),
    getMasonryConfigExceptLast(masonryConfig),
    getDefaultMasonryConfig(masonryConfig),
  )

  // Fetch Giphy Api on component mount and on search query change
  const [firstRun, setFirstRun] = useState(true)
  const isFirstRun = useRef(true)
  useEffect(() => {
    fetchImages(apiUrl(0))
    onSearch(query)

    if (isFirstRun.current) {
      isFirstRun.current = false
      setFirstRun(false)
    }
  }, [debouncedQuery])

  return (
    <div
      className={`reactGiphySearchbox-componentWrapper${
        wrapperClassName ? ` ${wrapperClassName}` : ''
      }`}
      style={{ width: getComponentWrapperWidth(masonryConfigMatchMedia) }}
    >
      <SearchForm
        value={query}
        externalCss={externalCss}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
        loadingData={loading}
        searchFormClassName={searchFormClassName}
        placeholder={searchPlaceholder}
        autoFocus={autoFocus}
      />

      <div
        className={`reactGiphySearchbox-listWrapper${
          listWrapperClassName ? ` ${listWrapperClassName}` : ''
        }`}
        style={{ height: gifListHeight }}
        ref={ref}
      >
        <Alert
          show={data.length === 0 && !loading && !error && !firstRun}
          message={messageNoMatches}
          externalCss={externalCss}
        />

        <Alert
          show={error}
          message={messageError}
          externalCss={externalCss}
        />

        <Spinner
          show={loading}
          externalCss={externalCss}
          message={messageLoading}
          image={loadingImage}
        />

        <InfiniteScroll
          pageStart={0}
          loadMore={page => fetchImages(apiUrl(page * gifPerPage), true)}
          hasMore={!loading && !lastPage}
          useWindow={false}
          initialLoad={false}
          loader={
            !firstRun && (
              <div key="loading">
                <Spinner
                  externalCss={externalCss}
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
              {data.map((item, index) => (
                <ImageItem
                  externalCss={externalCss}
                  item={item}
                  size={masonryConfigMatchMedia.imageWidth}
                  key={`${item.id}_${index}`}
                  listItemClassName={listItemClassName}
                  onSelect={onSelect}
                  backgroundColor={imageBackgroundColor}
                  imageRenditionName={imageRenditionName}
                  imageRenditionFileType={imageRenditionFileType}
                />
              ))}
            </MasonryLayout>
          )}
        </InfiniteScroll>
      </div>
      {poweredByGiphy && <PoweredByGiphy externalCss={externalCss} image={poweredByGiphyImage} />}
    </div>
  )
});

ReactGiphySearchBox.defaultProps = {
  autoFocus: false,
  gifListHeight: '300px',
  gifPerPage: 20,
  imageBackgroundColor: '#eee',
  imageRenditionFileType: 'gif',
  imageRenditionName: 'fixed_width_downsampled',
  library: 'gifs',
  listItemClassName: '',
  listWrapperClassName: '',
  loadingImage: undefined,
  masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  messageError: 'Oops! Something went wrong. Please, try again.',
  messageLoading: 'Loading...',
  messageNoMatches: 'No matches found.',
  onSearch: () => {},
  poweredByGiphy: true,
  poweredByGiphyImage: undefined,
  rating: 'g',
  searchFormClassName: '',
  searchPlaceholder: 'Search for GIFs',
  wrapperClassName: '',
  externalCss: false,
}

export default ReactGiphySearchBox
