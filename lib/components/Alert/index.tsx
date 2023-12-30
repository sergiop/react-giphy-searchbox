import styles from './styles.module.css';

interface AlertProps {
  show: boolean;
  message: string;
}

export function Alert({ show, message }: AlertProps) {
  return (
    show && (
      <p role="alert" data-testid="Alert" className={styles.alert}>
        {message}
      </p>
    )
  );
}
