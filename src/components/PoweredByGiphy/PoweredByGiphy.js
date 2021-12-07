// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './poweredByGiphyStyles'
import PoweredByGiphyLogo from '../../assets/PoweredByGiphyLogo'

type Props = {
  image: ?string,
  externalCss: boolean,
}

const PoweredByGiphy = ({ image, externalCss }: Props) => {
  useStyle(!externalCss ? 'PoweredByGiphy' : null, styles)

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
