// @flow
import React from 'react'
import styles from './ImageItem.css'

type Props = {
  item: Object,
  size: number,
}

const ImageItem = ({ item, size }: Props) => {
  return (
    <div
      className={styles.imageWrapper}
      style={{
        width: `${size}px`,
        height: `${(item.images.fixed_width_downsampled.height * size) /
          item.images.fixed_width_downsampled.width}px`,
      }}
    >
      <img
        width={item.images.fixed_width_downsampled.width}
        height={item.images.fixed_width_downsampled.height}
        alt={item.title}
        src={item.images.fixed_width_downsampled.url}
        className={styles.image}
      />
    </div>
  )
}

export default ImageItem
