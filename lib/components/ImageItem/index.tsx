import type { ImageRenditionFileType } from '../../ReactGiphySearchBox';
import { GIFItem, Images } from '../../types/api';
import styles from './styles.module.css';

interface ImageItemProps {
  backgroundColor: string;
  item: GIFItem;
  imageRenditionName: keyof Images;
  imageRenditionFileType: ImageRenditionFileType;
  listItemClassName: string | undefined;
  onSelect: (item: GIFItem) => void;
  size: number;
}

const getUrl = (
  image: Images[keyof Images],
  fileType: ImageRenditionFileType,
): string => {
  if (fileType === 'webp' && 'webp' in image) {
    return image.webp;
  }

  return image.url;
};

export function ImageItem({
  backgroundColor,
  item,
  imageRenditionName,
  imageRenditionFileType,
  size,
  listItemClassName,
  onSelect,
}: ImageItemProps) {
  const image = item.images[imageRenditionName];

  return (
    <button
      data-testid="ImageItemButton"
      type="button"
      className={`${styles.imageItem}${
        listItemClassName ? ` ${listItemClassName}` : ''
      }`}
      style={{
        backgroundColor,
        width: `${size}px`,
        height: `${
          (parseInt(image.height, 10) * size) / parseInt(image.width, 10)
        }px`,
      }}
      onClick={() => onSelect(item)}
    >
      <img
        data-testid="ImageItemImage"
        width={image.width}
        height={image.height}
        alt={item.title}
        src={getUrl(image, imageRenditionFileType)}
        className={styles.image}
      />
    </button>
  );
}
