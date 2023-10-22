import { PoweredByGiphyLogo } from './PoweredByGiphyLogo'
import styles from "./styles.module.css";

type PoweredByGiphyProps = {
  image?: string,
}

export const PoweredByGiphy = ({ image }: PoweredByGiphyProps) => {
  return (
    <div className={styles.poweredByGiphy}>
      {image ? (
        <img src={image} alt="Powered by Giphy" data-testid="PoweredByGiphy" />
      ) : (
        <PoweredByGiphyLogo />
      )}
    </div>
  )
}
