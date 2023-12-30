import { useReducer } from 'react';
import { dataFetchReducer } from '../../reducers/dataFetchReducer';
import { GiphyResponse } from './types';

const initialState = {
  loading: false,
  error: false,
  data: [],
  lastPage: false,
};

export const useApi = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const fetchImages = (url: string, isMore: boolean) => {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' });
    } else {
      dispatch({ type: 'FETCH_INIT' });
    }

    fetch(url)
      .then<GiphyResponse>((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        if (!response.pagination) {
          return dispatch({ type: 'FETCH_FAILURE' });
        }

        if (isMore) {
          return dispatch({
            type: 'FETCH_MORE_SUCCESS',
            payload: response.data,
            pagination: response.pagination,
          });
        }

        return dispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
          pagination: response.pagination,
        });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_FAILURE' });
      });
  };

  return { state, fetchImages };
};
