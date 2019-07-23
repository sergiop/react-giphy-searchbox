import React, { useRef, useEffect } from 'react'
import Bricks from 'bricks.js'

type Props = {
  children: React.node,
  sizes: Array<Object>,
}

const MasonryLayout = ({ children, sizes }: Props) => {
  const container = useRef(null)

  useEffect(() => {
    const bricks = Bricks({
      container: container.current,
      packed: 'data-packed',
      sizes,
      position: true,
    })

    bricks.resize(true)

    if (children.length > 0) {
      bricks.pack()
    }
  }, [children])

  return <div ref={container}>{children}</div>
}

export default MasonryLayout
