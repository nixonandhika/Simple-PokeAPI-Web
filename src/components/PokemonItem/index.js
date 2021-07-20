/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import LazyLoad from 'react-lazyload';

import { mq } from "styles/global";

import { padLeadingZeroes } from "utils";

const PokemonItem = ({
  pokemon
}) => {
  const ItemStyle = css`
    // background-color: black;
    cursor: pointer;
    position: relative;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    overflow: hidden;
    width: 100%;

    ${mq("md")} {
      padding: 16px;
    }
  `;

  const NumberStyle = css`
    position: absolute;
    right: 10px;
    top: -5px;
    color: white;
    font-size: 50px;
    font-weight: 700;
    z-index: 1;

    ${mq("lg")} {
      font-size: 36px;
    }

    ${mq("sm")} {
      font-size: 24px;
    }
  `;

  const PokemonImgStyle = css`
    object-fit: contain;
    width: 100%
  `;

  const PokemonNameStyle = css`
    color: white;
    font-size: 24px;
    font-weight: 500;    
    text-align: center;
    text-transform: capitalize;

    ${mq("xl")} {
      font-size: 20px;
    }

    ${mq("lg")} {
      font-size: 16px;
    }

    ${mq("md")} {
      font-size: 14px;
    }

    ${mq("sm")} {
      font-size: 12px;
    }
  `;

  return (
    <a
      css={ItemStyle}
      href={`/detail/${pokemon.name}`}
    >
      <div css={NumberStyle}>
        {padLeadingZeroes(pokemon.id, 3)}
      </div>
      <LazyLoad once css={css`width: 100%; z-index: 2;`}>
        <img css={PokemonImgStyle} src={pokemon.artwork} alt={`pokemon-${pokemon.id}-img`} />
      </LazyLoad>

      <div css={PokemonNameStyle}>
        {pokemon.name}
      </div>
    </a>
  )
}

export default PokemonItem;