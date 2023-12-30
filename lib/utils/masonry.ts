import { MasonryConfig } from "../types/masonry"

const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const getMasonryConfig = (masonryConfig: MasonryConfig) =>
  masonryConfig
    .map(c => ({
      columns: c.columns,
      imageWidth: c.imageWidth,
      gutter: c.gutter,
    }))
    .reverse()

export const getMasonryConfigExceptLast = (masonryConfig: MasonryConfig) => {
  const returnedMasonryConfig = getMasonryConfig(masonryConfig)

  return returnedMasonryConfig.slice(0, returnedMasonryConfig.length - 1)
}

export const getDefaultMasonryConfig = (masonryConfig: MasonryConfig) => {
  const returnedMasonryConfig = getMasonryConfig(masonryConfig)

  return returnedMasonryConfig[returnedMasonryConfig.length - 1]
}

export const getMediaBreakpoints = (masonryConfig: MasonryConfig) =>
  // Export in a reverse order `mp` property in an array and filter out undefined items (the `mq` param
  // for first array item is undefined since you don't have to specify it).
  masonryConfig
    .map(c => c.mq && `(min-width: ${c.mq})`)
    .filter(nonNullable)
    .reverse()

export const getComponentWrapperWidth = (masonryConfigItem: MasonryConfig[0]) =>
  masonryConfigItem.imageWidth * masonryConfigItem.columns +
  masonryConfigItem.gutter * (masonryConfigItem.columns - 1)
