// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './poweredByGiphyStyles'

type Props = {
  image: string,
}

const PoweredByGiphy = ({ image }: Props) => {
  useStyle('PoweredByGiphy', styles)

  return (
    <div className="reactGiphySearchbox-poweredByGiphy">
      <img src={image} alt="Powered by Giphy" data-testid="PoweredByGiphy" />
    </div>
  )
}

export default PoweredByGiphy
