import { GIFItem, Pagination } from '../types/api';

interface State {
  loading: boolean;
  error: boolean;
  lastPage: boolean;
  data: GIFItem[];
}

export type Action =
  | {
      type: 'INIT' | 'LOADING' | 'ERROR';
    }
  | {
      type: 'SUCCESS';
      payload: GIFItem[];
      pagination: Pagination;
    };

export const initialState = {
  loading: true,
  error: false,
  lastPage: false,
  data: [],
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INIT':
      return initialState;

    case 'LOADING':
      return {
        loading: true,
        error: false,
        lastPage: false,
        data: state.data,
      };

    case 'SUCCESS': {
      const { pagination, payload } = action;
      const { total_count, offset, count } = pagination; // eslint-disable-line @typescript-eslint/naming-convention

      return {
        loading: false,
        error: false,
        lastPage: total_count - offset <= count,
        data: [...state.data, ...payload],
      };
    }

    case 'ERROR':
      return {
        loading: false,
        error: true,
        lastPage: false,
        data: state.data,
      };

    default:
      throw new Error('Unknown action type');
  }
};
