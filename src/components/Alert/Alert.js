// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './alertStyles'

type Props = {
  show: boolean,
  message: string,
}

const Alert = ({ show, message }: Props) => {
  useStyle('Alert', styles)

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
