/* eslint-disable import/prefer-default-export */
import { css } from '../../style'

export const styles = css`
  .reactGiphySearchbox-spinnerWrapper {
    text-align: center;
    padding-bottom: 10px;
  }

  .reactGiphySearchbox-spinner {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background-size: contain;
    animation: spin 500ms linear infinite;
  }

  .reactGiphySearchbox-spinner img {
    display: block;
    width: 100%;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* https://hugogiraudel.com/2016/10/13/css-hide-and-seek/ */
  .reactGiphySearchbox-spinnerText {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
`
