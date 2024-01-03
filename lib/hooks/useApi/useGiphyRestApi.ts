import { useEffect, useReducer, useRef } from 'react';
import {
  dataFetchReducer,
  initialState,
} from '../../reducers/dataFetchReducer';
import { GiphyResponse } from './types';
import { Library } from '../../types';
import { Rating } from '../../types/api';
import { useDebounce } from '../useDebounce';

interface UseGiphyRestApi {
  library: Library;
  apiKey: string;
  gifPerPage: number;
  rating: Rating;
  offset: number;
  query: string | undefined;
  onSearch?: (query?: string) => void;
}

export const useGiphyRestApi = ({
  library,
  apiKey,
  gifPerPage,
  rating,
  offset,
  query,
  onSearch,
}: UseGiphyRestApi) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const debouncedQuery = useDebounce(query, 500);
  const prevDebouncedQuery = useRef<string>();

  const { data, loading, error, lastPage } = state;

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }

    if (debouncedQuery !== prevDebouncedQuery.current) {
      dispatch({ type: 'INIT' });
    } else {
      dispatch({ type: 'LOADING' });
    }

    prevDebouncedQuery.current = debouncedQuery;

    const endpoint = debouncedQuery ? 'search' : 'trending';

    fetch(
      `https://api.giphy.com/v1/${library}/${endpoint}?api_key=${apiKey}&limit=${gifPerPage}&offset=${offset}&rating=${rating}&q=${debouncedQuery}`,
    )
      .then<GiphyResponse>((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        if (!response.pagination) {
          return dispatch({ type: 'ERROR' });
        }

        return dispatch({
          type: 'SUCCESS',
          payload: response.data,
          pagination: response.pagination,
        });
      })
      .catch(() => {
        dispatch({ type: 'ERROR' });
      });
  }, [apiKey, debouncedQuery, gifPerPage, library, offset, onSearch, rating]);

  return { data, loading, error, lastPage };
};
