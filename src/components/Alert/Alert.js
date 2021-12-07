// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './alertStyles'

type Props = {
  show: boolean,
  externalCss: boolean,
  message: string,
}

const Alert = ({ show, message, externalCss }: Props) => {
  useStyle(!externalCss ? 'Alert' : null, styles)

  return (
    show && (
      <p
        role="alert"
        data-testid="Alert"
        className="reactGiphySearchbox-message"
      >
        {message}
      </p>
    )
  )
}

export default Alert
