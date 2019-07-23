// @flow
import React from 'react'
import styles from './Spinner.css'
import spinner from '../../assets/spinner.svg'

type Props = {
  show: boolean,
  message?: string,
  spinnerImg?: string,
}

const Spinner = ({ show, message, spinnerImg }: Props) =>
  show && (
    <div role="status" className={styles.spinnerWrapper}>
      <div
        className={styles.spinner}
        style={{ backgroundImage: `url(${spinnerImg})` }}
      />
      <div className={styles.spinnerText}>{message}</div>
    </div>
  )

Spinner.defaultProps = {
  spinnerImg: spinner,
  message: 'Content is loading...',
}

export default Spinner
