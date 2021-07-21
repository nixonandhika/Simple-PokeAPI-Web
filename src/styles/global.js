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

export const typeColor = (type) => {
  switch (type) {
    case "fire":
      return "#ffa15c";
    case "water":
      return "#6390F0";
    case "electric":
      return "#F7D02C";
    case "grass":
      return "#7AC74C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#8e6cba";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#9e785d";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
    default:
      return "#c9c883";
  }
}