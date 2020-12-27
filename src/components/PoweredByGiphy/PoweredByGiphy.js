// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './poweredByGiphyStyles'
import PoweredByGiphyLogo from '../../assets/PoweredByGiphyLogo'

type Props = {
  image: ?string,
}

const PoweredByGiphy = ({ image }: Props) => {
  useStyle('PoweredByGiphy', styles)

  return (
    <div className="reactGiphySearchbox-poweredByGiphy">
      {image ? (
        <img src={image} alt="Powered by Giphy" data-testid="PoweredByGiphy" />
      ) : (
        <PoweredByGiphyLogo />
      )}
    </div>
  )
}

export default PoweredByGiphy
