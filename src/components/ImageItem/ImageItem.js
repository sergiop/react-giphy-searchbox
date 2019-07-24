// @flow
import React from 'react'
import styles from './ImageItem.css'

type Props = {
  item: Object,
  listItemClassName: string,
  onSelect: Function,
  size: number,
}

const ImageItem = ({ item, size, listItemClassName, onSelect }: Props) => {
  return (
    <button
      type="button"
      className={`${styles.imageButton} ${listItemClassName}`}
      style={{
        width: `${size}px`,
        height: `${(item.images.fixed_width_downsampled.height * size) /
          item.images.fixed_width_downsampled.width}px`,
      }}
      onClick={() => onSelect(item)}
    >
      <img
        width={item.images.fixed_width_downsampled.width}
        height={item.images.fixed_width_downsampled.height}
        alt={item.title}
        src={item.images.fixed_width_downsampled.url}
        className={styles.image}
      />
    </button>
  )
}

export default ImageItem
