// @flow
import React from 'react'
import styles from './PoweredByGiphy.css'
import poweredByGiphy from '../../assets/poweredByGiphy.png'

const PoweredByGiphy = () => (
  <div className={styles.poweredByGiphy}>
    <img src={poweredByGiphy} alt="Powered by Giphy" />
  </div>
)

export default PoweredByGiphy
