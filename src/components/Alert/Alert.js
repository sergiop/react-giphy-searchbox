// @flow
import React from 'react'
import styles from './Alert.css'

type Props = {
  show: boolean,
  message: string,
}

const Alert = ({ show, message }: Props) =>
  show && (
    <p role="alert" className={styles.message}>
      {message}
    </p>
  )

export default Alert
