/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactGiphySearchAndSelect from '../../src/index'

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-giphy-searchbox Demo</h1>
        <ReactGiphySearchAndSelect />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
