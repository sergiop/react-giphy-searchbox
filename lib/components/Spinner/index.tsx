import { SpinnerIcon } from './SpinnerIcon';
import styles from './styles.module.css';

interface SpinnerProps {
  show: boolean;
  message: string;
  image?: string;
}

export function Spinner({ show, message, image }: SpinnerProps) {
  return (
    show && (
      <div role="status" className={styles.wrapper}>
        <div className={styles.spinner} data-testid="Spinner">
          {image ? <img src={image} alt="Loading icon" /> : <SpinnerIcon />}
        </div>
        <div className={styles.text} data-testid="SpinnerText">
          {message}
        </div>
      </div>
    )
  );
}
