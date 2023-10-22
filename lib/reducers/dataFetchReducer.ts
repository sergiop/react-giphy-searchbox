export const dataFetchReducer = (state, action) => {
  const { payload, pagination } = action

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
        data: payload,
        lastPage:
          pagination.total_count - pagination.offset <= pagination.count,
      }
    case 'FETCH_MORE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, ...payload],
        lastPage:
          pagination.total_count - pagination.offset <= pagination.count,
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
