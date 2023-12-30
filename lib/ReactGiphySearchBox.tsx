import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { SearchForm } from "./components/SearchForm";
import { ImageItem } from "./components/ImageItem";
import { PoweredByGiphy } from "./components/PoweredByGiphy";
import { MasonryLayout } from "./components/MasonryLayout";
import { Alert } from "./components/Alert";
import { Spinner } from "./components/Spinner";
import { useSearchForm } from "./hooks/useSearchForm";
import { useDebounce } from "./hooks/useDebounce";
import { useMedia } from "./hooks/useMedia";
import { useApi } from "./hooks/useApi/useApi";
import {
  getComponentWrapperWidth,
  getDefaultMasonryConfig,
  getMasonryConfigExceptLast,
  getMediaBreakpoints,
} from "./utils/masonry";
import styles from "./styles.module.css";
import { GIFItem, Images } from "./types/api";
import { MasonryConfig } from "./types/masonry";

export type ImageRenditionFileType = "gif" | "webp";

export interface ReactGiphySearchBoxProps {
  apiKey: string;
  autoFocus?: boolean;
  gifListHeight?: string;
  gifPerPage?: number;
  imageBackgroundColor?: string;
  imageRenditionFileType?: ImageRenditionFileType;
  imageRenditionName?: keyof Images;
  library?: "gifs" | "stickers";
  listItemClassName?: string;
  listWrapperClassName?: string;
  loadingImage?: string;
  masonryConfig?: MasonryConfig;
  messageError?: string;
  messageLoading?: string;
  messageNoMatches?: string;
  onSearch?: (query: string) => void;
  onSelect: (item: GIFItem) => void;
  poweredByGiphy?: boolean;
  poweredByGiphyImage?: string;
  rating?: string;
  searchFormClassName?: string;
  searchPlaceholder?: string;
  wrapperClassName?: string;
}

export const ReactGiphySearchBox = ({
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
}: ReactGiphySearchBoxProps) => {
  const { query, handleInputChange, handleSubmit } = useSearchForm();
  const debouncedQuery = useDebounce(query, 500);

  const apiEndpoint = query ? "search" : "trending";
  const apiUrl = (offset: number) =>
    `https://api.giphy.com/v1/${library}/${apiEndpoint}?api_key=${apiKey}&limit=${gifPerPage}&rating=${rating}&offset=${offset}&q=${query}`;

  const { state: { data, loading, error, lastPage }, fetchImages } = useApi();

  const masonryConfigMatchMedia = useMedia(
    getMediaBreakpoints(masonryConfig),
    getMasonryConfigExceptLast(masonryConfig),
    getDefaultMasonryConfig(masonryConfig)
  );

  // Fetch Giphy Api on component mount and on search query change
  const [firstRun, setFirstRun] = useState(true);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(apiUrl(0), false);

    if (onSearch) {
      onSearch(query);
    }
  }, [debouncedQuery]);

  return (
    <div
      className={`${styles.component}${
        wrapperClassName ? ` ${wrapperClassName}` : ""
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
          listWrapperClassName ? ` ${listWrapperClassName}` : ""
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
          loadMore={(page) => fetchImages(apiUrl(page * gifPerPage), true)}
          hasMore={!loading && !lastPage}
          useWindow={false}
          initialLoad={false}
          loader={
            !firstRun ? (
              <div key="loading">
                <Spinner
                  show={loading}
                  message={messageLoading}
                  image={loadingImage}
                />
              </div>
            ) : undefined
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
};
