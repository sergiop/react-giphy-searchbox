import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { SearchForm } from './components/SearchForm';
import { ImageItem } from './components/ImageItem';
import { PoweredByGiphy } from './components/PoweredByGiphy';
import { MasonryLayout } from './components/MasonryLayout';
import { Alert } from './components/Alert';
import { Spinner } from './components/Spinner';
import { useSearchForm } from './hooks/useSearchForm';
import { useMedia } from './hooks/useMedia';
import { useGiphyRestApi } from './hooks/useApi/useGiphyRestApi';
import {
  getComponentWrapperWidth,
  getDefaultMasonryConfig,
  getMasonryConfigExceptLast,
  getMediaBreakpoints,
} from './utils/masonry';
import styles from './styles.module.css';
import { GIFItem, Images, Rating } from './types/api';
import { MasonryConfig } from './types/masonry';
import { Library } from './types';

export type ImageRenditionFileType = 'gif' | 'webp';

export interface ReactGiphySearchBoxProps {
  apiKey: string;
  autoFocus?: boolean;
  gifListHeight?: string;
  gifPerPage?: number;
  imageBackgroundColor?: string;
  imageRenditionFileType?: ImageRenditionFileType;
  imageRenditionName?: keyof Images;
  library?: Library;
  listItemClassName?: string;
  listWrapperClassName?: string;
  loadingImage?: string;
  masonryConfig?: MasonryConfig;
  messageError?: string;
  messageLoading?: string;
  messageNoMatches?: string;
  onSearch?: (query?: string) => void;
  onSelect: (item: GIFItem) => void;
  poweredByGiphy?: boolean;
  poweredByGiphyImage?: string;
  rating?: Rating;
  searchFormClassName?: string;
  searchPlaceholder?: string;
  wrapperClassName?: string;
}

export function ReactGiphySearchBox({
  apiKey,
  autoFocus = false,
  gifListHeight = '300px',
  gifPerPage = 20,
  imageBackgroundColor = '#eee',
  imageRenditionFileType = 'gif',
  imageRenditionName = 'fixed_width_downsampled',
  library = 'gifs',
  listItemClassName,
  listWrapperClassName,
  loadingImage,
  masonryConfig = [{ columns: 2, imageWidth: 120, gutter: 5 }],
  messageError = 'Oops! Something went wrong. Please, try again.',
  messageLoading = 'Loading...',
  messageNoMatches = 'No matches found.',
  onSearch,
  onSelect,
  poweredByGiphy = true,
  poweredByGiphyImage,
  rating = 'g',
  searchFormClassName,
  searchPlaceholder = 'Search for GIFs',
  wrapperClassName,
}: ReactGiphySearchBoxProps) {
  const [offset, setOffset] = useState(0);

  const { query, handleInputChange, handleSubmit } = useSearchForm();

  const { data, loading, error, lastPage } = useGiphyRestApi({
    library,
    apiKey,
    gifPerPage,
    rating,
    offset,
    query,
    onSearch,
  });

  const masonryConfigMatchMedia = useMedia(
    getMediaBreakpoints(masonryConfig),
    getMasonryConfigExceptLast(masonryConfig),
    getDefaultMasonryConfig(masonryConfig),
  );

  return (
    <div
      className={`${styles.component}${
        wrapperClassName ? ` ${wrapperClassName}` : ''
      }`}
      style={{ width: getComponentWrapperWidth(masonryConfigMatchMedia) }}
    >
      <SearchForm
        value={query}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
        searchFormClassName={searchFormClassName}
        placeholder={searchPlaceholder}
        autoFocus={autoFocus}
      />

      <div
        className={`${styles.list}${
          listWrapperClassName ? ` ${listWrapperClassName}` : ''
        }`}
        style={{ height: gifListHeight }}
      >
        <Alert
          show={data.length === 0 && !loading && !error}
          message={messageNoMatches}
        />

        <Alert show={error} message={messageError} />

        <Spinner show={loading} message={messageLoading} image={loadingImage} />

        <InfiniteScroll
          pageStart={0}
          loadMore={(page) => setOffset(page * gifPerPage)}
          hasMore={!loading && !lastPage}
          useWindow={false}
          initialLoad={false}
          loader={
            <div key="loading">
              <Spinner
                show={loading}
                message={messageLoading}
                image={loadingImage}
              />
            </div>
          }
        >
          {data.length > 0 && (
            <MasonryLayout sizes={masonryConfig}>
              {data.map((item) => (
                <ImageItem
                  item={item}
                  size={masonryConfigMatchMedia.imageWidth}
                  key={item.id}
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

      {poweredByGiphy && <PoweredByGiphy image={poweredByGiphyImage} />}
    </div>
  );
}
