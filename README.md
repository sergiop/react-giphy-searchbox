<div align="center">
  <img width="180" src="https://user-images.githubusercontent.com/2235134/62211432-b7b7ee00-b39e-11e9-84be-c0f2d1be87d6.png" alt="React Giphy Searchbox Logo">

  ### Responsive and customizable search and select for Giphy's GIFs.

  [https://sergiop.github.io/react-giphy-searchbox/](https://sergiop.github.io/react-giphy-searchbox/)
</div>

<br>

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Codecov][codecov-badge]][Codecov]


---

 **React Giphy Searchbox is a powerful react component that returns Giphy's GIF in a Masonry grid layout.** Initially the component displays trending GIFs from Giphy's feed, when the the user starts typing something in the search field it switches to searched results. When an image is selected, a [GIF object](https://developers.giphy.com/docs/api/schema/#gif-object) is returned.

<p align="center">
<img width="442" alt="React Giphy Searchbox preview" src="https://user-images.githubusercontent.com/2235134/80811888-2bee1f00-8bc7-11ea-83b2-cde8060ab7ad.png">
</p>

## Demo

Play with a simple responsive demo on [CodeSandbox](https://codesandbox.io/s/react-giphy-searchbox-l8dxc?fontsize=14)

[![Edit react-giphy-searchbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-giphy-searchbox-l8dxc?fontsize=14)

## Getting started

### Installation

```
yarn add react-giphy-searchbox
```

```
npm install react-giphy-searchbox --save
```

### Basic example

```javascript
import React from 'react'
import { render } from 'react-dom'
import ReactGiphySearchbox from 'react-giphy-searchbox'

const App = () => (
  <ReactGiphySearchbox
    apiKey="YOUR_API_KEY" // Required: get your on https://developers.giphy.com
    onSelect={item => console.log(item)}
  />
)

render(<App />, document.getElementById("root"))
```

### Props

| Prop                   | Type     | Desc                                                                                                                                                                                                            |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`               | string   | **REQUIRED:** Giphy's API key. Get your on https://developers.giphy.com.                                                                                                                                        |
| `onSelect`             | function | **REQUIRED** A callback which is triggered whenever a GIF is selected. It returns a Gif object in the format specified for an image from Giphy's API.                                                           |
| `libray`               | string   | Giphy's library: choose between `gifs` or `stickers`. <br />*Default:* `gifs`                                                                                                                                   |
| `rating`               | string   | Filters results by [specified rating](https://developers.giphy.com/docs/optional-settings/#rating). <br />*Default:* `g`                                                                                        |
| `gifPerPage`           | number   | The maximum number of images to return per page. <br />*Default:* `20`                                                                                                                                          |
| `masonryConfig`        | array    | An array of objects describing the masonry's properties at different breakpoints. [See specific chapter for further info.](#responsive-options) <br />*Default:* `[{ columns: 2, imageWidth: 120, gutter: 5 }]` |
| `gifListHeight`        | string   | The height of the returned GIF list. <br />*Default:* `300px`                                                                                                                                                   |
| `messageError`         | string   | Generic error message when APIs call fails. <br />*Default:* `Oops! Something went wrong. Please, try again.`                                                                                                   |
| `messageLoading`       | string   | Loading message only for accessibility purposes. <br />*Default:* `Loading...`                                                                                                                                  |
| `messageNoMatches`     | string   | Message to tell users searched string returned empty array. <br />*Default:* `No matches found.`                                                                                                                |
| `loadingImage`         | string   | If you want to customize the loading spinner, use this prop to set an alternative `src` for the image.                                                                                                          |
| `poweredByGiphy`       | boolean  | You can choose to display or not display the **Powered by Giphy** badge at the bottom. Note that you need to show it if you want a production Api key from Giphy. <br />*Default:* `true`                       |
| `poweredByGiphyImage`  | string   | If you want to customize the **Powered by Giphy** badge, use this prop to set an alternative `src` for the image.                                                                                               |
| `searchPlaceholder`    | string   | Search input placeholder. <br />*Default:* `Search for GIFs`                                                                                                                                                    |
| `wrapperClassName`     | string   | Additional CSS class for the `<div>` that wrap the whole component.                                                                                                                                             |
| `searchFormClassName`  | string   | Additional CSS class for the `<form>` element.                                                                                                                                                                  |
| `listWrapperClassName` | string   | Additional CSS class for the `<div>` that wrap the GIFs list.                                                                                                                                                   |
| `listItemClassName`    | string   | Additional CSS class for the `<button>` that wrap the single image.                                                                                                                                             |
| `imageBackgroundColor` | string   | Set the Giphy's image item background color, useful when `libray` prop is set to `stickers`, since stickers have transparent background. <br />*Default:* `#eee`                                                |

### Responsive options
`masonryConfig` prop allow you to define responsiveness of the component. This prop accept an array of objects describing the masonry's properties at different breakpoints.

Each `object` in the array has the following properties:

| Prop         | Type   | Description                                                       |
| ------------ | ------ | ----------------------------------------------------------------- |
| `mq`         | string | The minimum viewport width                                        |
| `columns`    | number | The number of vertical columns                                    |
| `imageWidth` | number | The width (in px) of the image, and consequentially of the column |
| `gutter`     | number | The space (in px) between the columns                             |


```javascript
[
  { columns: 2, imageWidth: 140, gutter: 10 },
  { mq: '700px', columns: 3, imageWidth: 200, gutter: 10 },
  { mq: '1000px', columns: 4, imageWidth: 220, gutter: 10 },
]
```

When defining your properties, note the following:
- properties must be listed **smallest to largest breakpoints** in a mobile first approach;
- The size without the `mq` property is assumed to be your **smallest breakpoint, and must appear first.**

## License
MIT. © 2020 Sergio Pedercini

[build-badge]: https://img.shields.io/travis/sergiop/react-giphy-searchbox?style=flat-square
[build]: https://travis-ci.org/sergiop/react-giphy-searchbox

[npm-badge]: https://img.shields.io/npm/v/react-giphy-searchbox?style=flat-square
[npm]: https://www.npmjs.org/package/react-giphy-searchbox

[codecov-badge]: https://img.shields.io/codecov/c/github/sergiop/react-giphy-searchbox?style=flat-square&token=c22b785c904542cfa751e2ff255e1180
[Codecov]: https://codecov.io/gh/sergiop/react-giphy-searchbox
