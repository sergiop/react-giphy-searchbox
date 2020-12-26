// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './imageItemStyles'
import type { ImageRenditionFileType } from '../../index'

type Props = {
  backgroundColor: string,
  item: Object,
  imageRenditionName: string,
  imageRenditionFileType: ImageRenditionFileType,
  listItemClassName: string,
  onSelect: Function,
  size: number,
}

const getUrl = (fileType: ImageRenditionFileType): string => {
  if (fileType === 'gif') {
    return 'url'
  }

  return fileType
}

const ImageItem = ({
  backgroundColor,
  item,
  imageRenditionName,
  imageRenditionFileType,
  size,
  listItemClassName,
  onSelect,
}: Props) => {
  useStyle('ImageItem', styles)

  return (
    <button
      data-testid="ImageItemButton"
      type="button"
      className={`reactGiphySearchbox-imageButton${
        listItemClassName ? ` ${listItemClassName}` : ''
      }`}
      style={{
        backgroundColor,
        width: `${size}px`,
        height: `${(item.images[imageRenditionName].height * size) /
          item.images[imageRenditionName].width}px`,
      }}
      onClick={() => onSelect(item)}
    >
      <img
        data-testid="ImageItemImage"
        width={item.images[imageRenditionName].width}
        height={item.images[imageRenditionName].height}
        alt={item.title}
        src={item.images[imageRenditionName][getUrl(imageRenditionFileType)]}
        className="reactGiphySearchbox-image"
      />
    </button>
  )
}

export default ImageItem
