<p align="center">
  <img width="180" src="https://user-images.githubusercontent.com/2235134/62211432-b7b7ee00-b39e-11e9-84be-c0f2d1be87d6.png" alt="React Giphy Searchbox Logo">
</p>

<h3 align="center">
  Responsive and customizable search and select for Giphy's GIFs.
</h3>

<p align="center">
  <a href="https://sergiop.github.io/react-giphy-searchbox/">https://sergiop.github.io/react-giphy-searchbox/</a>
</p>
<br>


---

 **React Giphy Searchbox is a powerful react component that returns Giphy's GIF or Stickers in a Masonry grid layout.** Initially the component displays trending GIFs from Giphy's feed, when the the user starts typing something in the search field it switches to searched results. When an image is selected, a [GIF object](https://developers.giphy.com/docs/api/schema/#gif-object) is returned.

<p align="center">
<img width="442" alt="React Giphy Searchbox preview" src="https://user-images.githubusercontent.com/2235134/80811888-2bee1f00-8bc7-11ea-83b2-cde8060ab7ad.png">
</p>

## Demo

Play with a simple responsive demo on [CodeSandbox](https://codesandbox.io/s/react-giphy-searchbox-l8dxc?fontsize=14)

[![Edit react-giphy-searchbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-giphy-searchbox-l8dxc?fontsize=14)

## Installation

```
yarn add react-giphy-searchbox
```

```
npm install react-giphy-searchbox --save
```

## Basic example

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

## Props

### Required props

#### apiKey
Giphy's API key. Get your on https://developers.giphy.com.
```jsx
apiKey: string;
```

#### onSelect
A callback which is triggered whenever a GIF is selected. It returns a Gif object in the format specified for an image from Giphy's API.
```jsx
onSelect: (item: GIFItem) => void;
```

### Giphy options

#### library
Giphy's library: choose between `gifs` or `stickers`. <br />
*Default:* `gifs`
```jsx
library?: 'gifs' | 'stickers';
```

#### rating
Filters results by [specified rating](https://developers.giphy.com/docs/optional-settings/#rating).<br />
*Default:* `g`
```jsx
rating?: 'y' | 'g' | 'pg' | 'pg-13' | 'r';
```

#### imageRenditionFileType
The image type to be returned. <br />
*Default:* `gif`
```jsx
imageRenditionFileType?: 'gif' | 'webp';
```

#### imageRenditionName
The type of [rendition](https://developers.giphy.com/docs/optional-settings/#rendition-guide) to be used. <br />
*Default:* `fixed_width_downsampled`. <br />Please be careful with this setting, loading high quality gifs inside the masonry can reduce the performances.
```jsx
imageRenditionName?: keyof Images;
```

#### Other options

#### autoFocus
If true, the search form input field is focused by default on startup. <br />
*Default:* `false`
```jsx
autoFocus?: boolean;
```

#### gifListHeight
The height of the returned GIF list. <br />
*Default:* `300px`
```jsx
gifListHeight?: string;
```

#### gifPerPage
The maximum number of images to return per page. <br />
*Default:* `20`
```jsx
gifPerPage?: number;
```

#### imageBackgroundColor
Set the Giphy's image item background color, useful when `libray` prop is set to `stickers`, since stickers have transparent background. <br />
*Default:* `#eee`
```jsx
imageBackgroundColor?: string;
```

#### loadingImage
If you want to customize the loading spinner, use this prop to set an alternative `src` for the image.
```jsx
loadingImage?: string;
```

#### masonryConfig
An array of objects describing the masonry's properties at different breakpoints. [See specific chapter for further info.](#responsive-options) <br />
*Default:* `[{ columns: 2, imageWidth: 120, gutter: 5 }]`
```jsx
masonryConfig?: MasonryConfig;
```

#### onSearch
A callback which is triggered whenever a search is performed. It returns the searched text string.
```jsx
onSearch?: (query: string) => void;
```

#### poweredByGiphy
You can choose to display or not display the **Powered by Giphy** badge at the bottom. Note that you need to show it if you want a production Api key from Giphy. <br />
*Default:* `true`
```jsx
poweredByGiphy?: boolean;
```

#### poweredByGiphyImage
If you want to customize the **Powered by Giphy** badge, use this prop to set an alternative `src` for the image.
```jsx
poweredByGiphyImage?: string;
```

### Text strings

#### messageError
Generic error message when APIs call fails. <br />
*Default:* `Oops! Something went wrong. Please, try again.`
```jsx
messageError?: string;
```

#### messageLoading
Loading message only for accessibility purposes. <br />
*Default:* `Loading...`
```jsx
messageLoading?: string;
```

#### messageNoMatches
Message to tell users searched string returned empty array. <br />
*Default:* `No matches found.`
```jsx
messageNoMatches?: string;
```

#### searchPlaceholder
Search input placeholder. <br />
*Default:* `Search for GIFs`
```jsx
searchPlaceholder?: string;
```

### CSS custom class names

#### listItemClassName
Additional CSS class for the `<button>` that wrap the single image.
```jsx
listItemClassName?: string;
```

#### listWrapperClassName
Additional CSS class for the `<div>` that wrap the GIFs list.
```jsx
listWrapperClassName?: string;
```

#### searchFormClassName
Additional CSS class for the `<form>` element.
```jsx
searchFormClassName?: string;
```

#### wrapperClassName
Additional CSS class for the `<div>` that wrap the whole component.
```jsx
wrapperClassName?: string;
```

## Responsive options
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

## Note

React Giphy Searchbox uses [window.fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to fetch data. Please keep in mind that if you need to support old browsers you have to add a global polyfill like [github/fetch](https://github.com/github/fetch) or [developit/unfetch](https://github.com/developit/unfetch).

## License
MIT. © 2024 Sergio Pedercini
