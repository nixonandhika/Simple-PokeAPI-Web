/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export const mq = (size) => {
  return `@media (max-width: ${breakpoints[size]}px)`;
}

export const container_style = {
  margin: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  alignItems: 'center',
  overflow: 'hidden'
}

export const content_style = css`
  width: 100%;
  max-width: 1600px;
  padding-left: 80px;
  padding-right: 80px;

  ${mq("sm")} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const content_margin_large = css`
  padding-top: 80px;
  padding-bottom: 80px;

  ${mq("lg")} {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  ${mq("sm")} {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

export const content_margin_small = css`
  padding-top: 40px;
  padding-bottom: 40px;

  ${mq("lg")} {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  ${mq("sm")} {
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;