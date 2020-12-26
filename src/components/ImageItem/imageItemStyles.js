/* eslint-disable import/prefer-default-export */
import { css } from '../../style'

export const styles = css`
  .reactGiphySearchbox-imageButton {
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    animation: fadeIn 300ms ease-in;
  }

  .reactGiphySearchbox-imageButton:focus {
    opacity: 0.6;
  }

  .reactGiphySearchbox-image {
    display: block;
    width: 100%;
    height: auto;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
