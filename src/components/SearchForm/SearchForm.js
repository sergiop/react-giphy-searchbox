// @flow
import React from 'react'

type Props = {
  value: string,
  setValue: Function,
  onSubmit: Function,
}

const ReactGiphySearchAndSelect = ({ value, setValue, onSubmit }: Props) => (
  <form onSubmit={onSubmit} autoComplete="off">
    <input
      type="text"
      placeholder="Search for GIFs"
      onChange={setValue}
      value={value}
      name="search"
    />
  </form>
)

export default ReactGiphySearchAndSelect
