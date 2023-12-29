import { GIFItem, Pagination } from "../types"

interface State {
  loading: boolean
  error: boolean
  lastPage: boolean
  data: GIFItem[]
}

type Action = {
  type: 'FETCH_INIT' | 'FETCH_MORE_INIT' | 'FETCH_FAILURE';
} | {
  type: 'FETCH_SUCCESS' | 'FETCH_MORE_SUCCESS';
  payload: GIFItem[];
  pagination: Pagination;
}

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: false,
        lastPage: false,
        data: [],
      }
    case 'FETCH_MORE_INIT':
      return {
        ...state,
        loading: true,
        error: false,
        lastPage: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        lastPage:
          action.pagination.total_count - action.pagination.offset <= action.pagination.count,
      }
    case 'FETCH_MORE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, ...action.payload],
        lastPage:
          action.pagination.total_count - action.pagination.offset <= action.pagination.count,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        lastPage: false,
      }
    default:
      throw new Error('Unknown action type')
  }
}
