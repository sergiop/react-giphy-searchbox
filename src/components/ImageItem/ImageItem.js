// @flow
import React from 'react'
import styles from './ImageItem.module.css'

type Props = {
  backgroundColor: string,
  item: Object,
  listItemClassName: string,
  onSelect: Function,
  size: number,
}

const ImageItem = ({
  backgroundColor,
  item,
  size,
  listItemClassName,
  onSelect,
}: Props) => (
  <button
    data-testid="ImageItemButton"
    type="button"
    className={`${styles.imageButton}${
      listItemClassName ? ` ${listItemClassName}` : ''
    }`}
    style={{
      backgroundColor,
      width: `${size}px`,
      height: `${(item.images.fixed_width_downsampled.height * size) /
        item.images.fixed_width_downsampled.width}px`,
    }}
    onClick={() => onSelect(item)}
  >
    <img
      data-testid="ImageItemImage"
      width={item.images.fixed_width_downsampled.width}
      height={item.images.fixed_width_downsampled.height}
      alt={item.title}
      src={item.images.fixed_width_downsampled.url}
      className={styles.image}
    />
  </button>
)

export default ImageItem
