/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import {
  Button,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import LazyLoad from 'react-lazyload';

import { useUser } from "contexts/UserContext";

import { mq, typeColor } from "styles/global";

import { padLeadingZeroes } from "utils";

const PokemonItem = ({
  width,
  pokemon,
  releasable,
  index,
}) => {
  const user = useUser();
  const toast = useToast();
  const toastId = "releaseToast";

  const ItemStyle = css`
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

  const TypeStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, 70px);
    grid-gap: 8px;
    justify-content: space-around;
    margin-top: 8px;
    font-size: 12px;

    ${mq("xl")} {
      grid-template-columns: repeat(auto-fit, 55px);
      font-size: 10px;
    }

    ${mq("lg")} {
      grid-template-columns: repeat(auto-fit, 45px);
      font-size: 10px;
    }

    ${mq("md")} {
      grid-template-columns: 1fr;
      grid-gap: 4px;
    }
  `;

  const handleReleasePokemon = () => {
    if (!toast.isActive(toastId)) {
      user.releasePokemon(index);
      toast({
        id: toastId,
        duration: 1000,
        title: `You released "${pokemon.nickname}"!`,
        status: "success",
        isClosable: true
      })
    }
  }

  return (
    <div
      css={ItemStyle}
      href={`/detail/${pokemon.name}`}
    >
      <div css={NumberStyle}>
        {padLeadingZeroes(pokemon.id, 4)}
      </div>
      <a
        css={css`
          position: relative;
          z-index: 2;
        `}
        href={`/detail/${pokemon.name}`}
      >
        <LazyLoad once>
          <img css={PokemonImgStyle} src={pokemon.artwork} alt={`pokemon-${pokemon.id}-img`} />
        </LazyLoad>

        {pokemon?.nickname ? (
          <div css={PokemonNameStyle}>
            {pokemon.nickname}
            <br />
            ({pokemon.name})
          </div>
        ) : (
          <div css={PokemonNameStyle}>
            {pokemon.name}
          </div>
        )}
      </a>

      {releasable && (
        <Button
          colorScheme="whiteAlpha"
          size={width > 768 ? "md" : "xs"}
          mt={2}
          mb={2}
          onClick={handleReleasePokemon}
        >
          Release
        </Button>
      )}

      {pokemon?.types && (
        <div css={TypeStyle}>
          {pokemon?.types?.map((item) => (
            <div
              key={`${pokemon.name}-type-${item.type.name}`}
              css={css`
                background-color: ${typeColor(item.type.name)};
                border-radius: 8px;
                color: white;
                text-align: center;
                padding: 2px;
              `}
            >
              {item?.type?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonItem;