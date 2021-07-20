/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const DummyHeader = ({ width }) => {
  return (
    <div
      css={css`
      height: ${width > 576 ? 68 : 108}px;
      width: 100vw;
    `}
    ></div>
  )
}

export default DummyHeader;