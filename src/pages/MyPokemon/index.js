/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { gql, useLazyQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect, useRef } from 'react';

import Background from "assets/main_bg.jpg";
import BackgroundMobile from "assets/main_bg_mobile.jpg";

import { useUser } from "contexts/UserContext";

import Header from "components/Header";
import PokemonItem from "components/PokemonItem";
import ListSkeleton from "components/Skeleton/ListSkeleton";

import {
  container_style,
  content_style,
  content_margin_large,
  mq
} from "styles/global";

const PokemonList = ({
  width
}) => {
  const user = useUser();
  const currentBackground = width > 576 ? Background : BackgroundMobile;

  const PokemonListStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-gap: 40px;
    justify-content: space-around;
    margin-top: 24px;

    ${mq("xl")} {
      grid-template-columns: repeat(auto-fit, 175px);
      grid-gap: 24px;
    }

    ${mq("lg")} {
      grid-template-columns: repeat(auto-fit, 150px);
      grid-gap: 20px;
    }

    ${mq("md")} {
      grid-template-columns: repeat(auto-fit, 125px);
      grid-gap: 16px;
    }

    ${mq("sm")} {
      grid-template-columns: repeat(auto-fit, 100px);
      margin-top: 16px;
    }
  `;

  return (
    <main
      css={css`
        ${container_style};
        background-image: url(${currentBackground});
        background-size: 100% 100%;
        background-color: #d1d1d1;
        background-repeat: no-repeat;
        background-attachment: fixed;
        min-height: 100vh;
      `}
    >
      <Header width={width} bg={currentBackground} />

      <section css={container_style}>
        <div css={css`
          ${content_style}
          ${content_margin_large}
        `}
        >
          <div
            css={css`
              color: white;
              font-size: 48px;
              font-weight: 700;
              text-align: center;
              width: 100%;
            `}
          >
            MY POKEMON
          </div>

          <div
            css={css`
              color: white;
              font-size: 24px;
              font-weigt: 500;
              text-align: center;
              width: 100%;
            `}
          >
            TOTAL POKEMON OWNED: {user?.owned?.length}
          </div>

          <div css={PokemonListStyle}>
            {user?.owned?.map((item, index) => (
              <PokemonItem key={`pokemon-${index}`} pokemon={item} />
            ))}
          </div>
        </div>
      </section>
    </main >
  )
}

export default PokemonList;