// @flow
import React from 'react'
import styles from './Alert.module.css'

type Props = {
  show: boolean,
  message: string,
}

const Alert = ({ show, message }: Props) =>
  show && (
    <p role="alert" data-testid="Alert" className={styles.message}>
      {message}
    </p>
  )

export default Alert
