/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { gql, useLazyQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from "@chakra-ui/react";

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
  const limit = 18;
  const offset = useRef(0);
  const hasMore = useRef(true);
  const list = useRef([]);

  const currentBackground = width > 576 ? Background : BackgroundMobile;

  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        nextOffset
        prevOffset
        status
        results {
          id
          name
          artwork
        }
      }
    }
  `;

  const [getPokemons, { loading, data }] = useLazyQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset: offset.current
    },
  });

  useEffect(() => {
    getPokemons();
  }, []);

  if (data) {
    list.current = list.current.concat(data?.pokemons?.results)
    offset.current = data?.pokemons?.nextOffset;
    hasMore.current = data?.next !== null;
  }

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

              ${mq("lg")} {
                font-size: 32px;
              }

              ${mq("sm")} {
                font-size: 24px;
              }
            `}
          >
            POKEMON LIST
          </div>

          <div
            css={css`
              color: white;
              font-size: 24px;
              font-weigt: 500;
              text-align: center;
              width: 100%;

              ${mq("lg")} {
                font-size: 20px;
              }

              ${mq("sm")} {
                font-size: 18px;
              }
            `}
          >
            TOTAL POKEMON OWNED: {user?.owned?.length}
          </div>

          <div css={css`
            display: flex;
            justify-content: center;
            margin-top: 16px;
            width: 100%;
          `}>
            <a href="/my-pokemon">
              <Button colorScheme="whiteAlpha" size="lg">
                Go To Inventory
              </Button>
            </a>
          </div>

          <InfiniteScroll
            dataLength={list.current.length}
            next={getPokemons}
            hasMore={hasMore.current}
            loader={<ListSkeleton width={width} />}
          >
            <div css={PokemonListStyle}>
              {list?.current?.map((item, index) => (
                <PokemonItem key={`pokemon-${index}`} pokemon={item} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </main >
  )
}

export default PokemonList;