// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { render } from 'react-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactGiphySearchBox from '../../src'
import styles from './index.module.css'
import logo from './img/logo.png'

const demoCode = `import ReactGiphySearchbox from 'react-giphy-searchbox'

const App = () => (
  <ReactGiphySearchBox
    apiKey="your-api-key"
    onSelect={item => console.log(item)}
    masonryConfig={[
      { columns: 2, imageWidth: 110, gutter: 5 },
      { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
    ]}
  />
)
`

const demoCodeStickers = `import ReactGiphySearchbox from 'react-giphy-searchbox'

const App = () => (
  <ReactGiphySearchBox
    apiKey="your-api-key"
    onSelect={item => console.log(item)}
    library="stickers"
    searchPlaceholder="Search for Stickers"
    masonryConfig={[
      { columns: 2, imageWidth: 110, gutter: 5 },
      { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
    ]}
  />
)
`

const Demo = () => (
  <div>
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="React Giphy Searchbox" />
        </div>
        <div className={styles.header}>
          <h1>React Giphy Searchbox</h1>
          <p>
            Responsive and customizable search and select for Giphy GIFs and
            Stickers.
          </p>
        </div>
      </div>
    </header>

    <div className={styles.container}>
      <section>
        <h2>Get Started</h2>
        <p>
          React Giphy Searchbox is a powerful react component that returns Giphy
          GIF in a Masonry grid layout.
        </p>
        <ul>
          <li>
            <a href="https://github.com/sergiop/react-giphy-searchbox/blob/master/README.md">
              Documentation
            </a>
          </li>
          <li>
            <a href="https://github.com/sergiop/react-giphy-searchbox">
              Github
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Basic Responsive Demo</h2>

        <div className={styles.demo}>
          <div className={styles.demoSearchBox}>
            <div className={styles.searchBox}>
              <ReactGiphySearchBox
                apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
                // eslint-disable-next-line no-console
                onSelect={item => console.log(item)}
                searchFormClassName={styles.searchSearchForm}
                masonryConfig={[
                  { columns: 2, imageWidth: 110, gutter: 5 },
                  { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
                ]}
              />
            </div>
          </div>

          <div className={styles.demoCode}>
            <div className={styles.code}>
              <SyntaxHighlighter
                language="jsx"
                style={base16AteliersulphurpoolLight}
              >
                {demoCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Stickers Demo</h2>

        <div className={styles.demo}>
          <div className={styles.demoSearchBox}>
            <div className={styles.searchBox}>
              <ReactGiphySearchBox
                apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
                // eslint-disable-next-line no-console
                onSelect={item => console.log(item)}
                searchFormClassName={styles.searchSearchForm}
                library="stickers"
                searchPlaceholder="Search for Stickers"
                masonryConfig={[
                  { columns: 2, imageWidth: 110, gutter: 5 },
                  { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
                ]}
              />
            </div>
          </div>

          <div className={styles.demoCode}>
            <div className={styles.code}>
              <SyntaxHighlighter
                language="jsx"
                style={base16AteliersulphurpoolLight}
              >
                {demoCodeStickers}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      <footer>© 2020 Sergio Pedercini - Released using MIT license</footer>
    </div>
  </div>
)

const demo = document.querySelector('#demo')

if (demo !== null) {
  render(<Demo />, demo)
}
