import { PropsWithChildren, useRef, useEffect, Children } from 'react';
import Bricks from 'bricks.js';
import { MasonryConfig } from '../../types/masonry';

interface MasonryLayoutProps {
  sizes: MasonryConfig;
}

export function MasonryLayout({
  children,
  sizes,
}: PropsWithChildren<MasonryLayoutProps>) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const bricks = Bricks({
      container: container.current,
      packed: 'data-packed',
      sizes,
      position: true,
    });

    bricks.resize(true);

    if (Children.count(children) > 0) {
      bricks.pack();
    }
  }, [children, sizes]);

  return (
    <div ref={container} data-cy="gif-list">
      {children}
    </div>
  );
}
