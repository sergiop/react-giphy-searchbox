import { PropsWithChildren } from 'react'
import { useRef, useEffect, Children } from 'react'
import Bricks from 'bricks.js'

interface MasonryLayoutProps {
  sizes: Array<Object>,
}

export const MasonryLayout = ({ children, sizes }: PropsWithChildren<MasonryLayoutProps>) => {
  const container = useRef(null)

  useEffect(() => {
    const bricks = Bricks({
      container: container.current,
      packed: 'data-packed',
      sizes,
      position: true,
    })

    bricks.resize(true)

    if (Children.count(children) > 0) {
      bricks.pack()
    }
  }, [children])

  return (
    <div ref={container} data-testid="MasonryLayoutContainer">
      {children}
    </div>
  )
}
