// @flow
import React from 'react'
import SearchForm from './components/SearchForm/SearchForm'
import useAxios from './hooks/useAxios'
import useSearchForm from './hooks/useSearchForm'
import useDebounce from './hooks/useDebounce'

type Props = {
  config: Object,
  tag?: string,
}

const ReactGiphySearchAndSelect = ({ tag, ...config }: Props) => {
  const { searchInput, handleInputChange, handleSubmit } = useSearchForm()
  const debouncedSearchInput = useDebounce(searchInput, 500)
  const apiEndpoint = searchInput ? 'search' : 'trending'
  const { title } = config
  const { response, loading, noResults, error } = useAxios({
    url: `https://api.giphy.com/v1/gifs/${apiEndpoint}`,
    method: 'GET',
    triggers: [debouncedSearchInput],
    options: {
      params: {
        api_key: '9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7',
        q: searchInput,
        limit: '5',
        tag,
      },
    },
  })
  const { data } = response || {}

  return (
    <div>
      <SearchForm
        value={searchInput}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
      />

      {loading && <p>Loading...</p>}
      {noResults && <p>No results</p>}
      {error && <p>Error!</p>}
      {data &&
        data.data.length > 0 &&
        data.data.map(i => (
          <div className="gif" key={i.id}>
            {console.log('data.data', data.data)}
            {title && <p>{i.title}</p>}
            <img alt="Gif" src={i.images.original.url} />
          </div>
        ))}
    </div>
  )
}

ReactGiphySearchAndSelect.defaultProps = {
  tag: '',
}

export default ReactGiphySearchAndSelect
