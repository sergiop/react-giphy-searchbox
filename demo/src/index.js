// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactGiphySearchBox from '../../src'
import styles from './index.css'

class Demo extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>react-giphy-searchbox Demo</h1>
        {/* <ReactGiphySearchBox
          masonryConfig={[
            { columns: 2, imageWidth: 140, gutter: 10 },
            { mq: '700px', columns: 3, imageWidth: 200, gutter: 10 },
            { mq: '1000px', columns: 4, imageWidth: 220, gutter: 10 },
          ]}
        /> */}
        <div className={styles.searchBox}>
          <ReactGiphySearchBox
            apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
            // wrapperClass="pippo"
            // wrapperStyle={{ backgroundColor: 'red' }}
          />
        </div>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
