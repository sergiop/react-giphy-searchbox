/* eslint-disable import/prefer-default-export */
import { css } from './style'

export const styles = css`
  .reactGiphySearchbox-componentWrapper {
    box-sizing: border-box;
  }

  .reactGiphySearchbox-componentWrapper *,
  .reactGiphySearchbox-componentWrapper *:before,
  .reactGiphySearchbox-componentWrapper *:after {
    box-sizing: inherit;
  }

  .reactGiphySearchbox-listWrapper {
    overflow-y: auto;
  }
`
