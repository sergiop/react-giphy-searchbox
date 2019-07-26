// @flow
import React from 'react'
import styles from './Spinner.module.css'

type Props = {
  show: boolean,
  message: string,
  image: string,
}

const Spinner = ({ show, message, image }: Props) =>
  show && (
    <div role="status" className={styles.spinnerWrapper}>
      <div
        className={styles.spinner}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.spinnerText}>{message}</div>
    </div>
  )

export default Spinner
