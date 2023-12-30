import { useEffect, useState } from 'react'
import { MasonryConfig } from '../types/masonry'

export const useMedia = (queries: string[], values: MasonryConfig, defaultValue: MasonryConfig[0]) => {
  const mediaQueryLists = queries.map(q => window.matchMedia(q))

  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches)
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }

  // State and setter for matched value
  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const handler = () => setValue(getValue)

    // Set a listener for each media query with above handler as callback.
    mediaQueryLists.forEach(mql => mql.addListener(handler))

    // Remove listeners on cleanup
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler))
  }, [])

  return value
}
