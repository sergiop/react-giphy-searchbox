// @flow
import React from 'react'
import { useStyle } from '../../style'
import { styles } from './spinnerStyles'

type Props = {
  show: boolean,
  message: string,
  image: string,
}

const Spinner = ({ show, message, image }: Props) => {
  useStyle('Spinner', styles)

  return (
    show && (
      <div role="status" className="reactGiphySearchbox-spinnerWrapper">
        <div
          className="reactGiphySearchbox-spinner"
          style={{ backgroundImage: `url(${image})` }}
          data-testid="Spinner"
        />
        <div
          className="reactGiphySearchbox-spinnerText"
          data-testid="SpinnerText"
        >
          {message}
        </div>
      </div>
    )
  )
}

export default Spinner
