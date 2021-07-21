/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { gql, useQuery } from '@apollo/client';
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import PokeballLogo from "assets/pokeball.svg";

import { useUser } from "contexts/UserContext";

import Header from "components/Header";

import {
  container_style,
  content_style,
  content_margin_large,
  mq,
  typeColor,
} from "styles/global";

import { padLeadingZeroes } from "utils";

const PokemonDetail = ({
  width
}) => {
  const toast = useToast();
  const toastId = "catchToast";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const degree = width > 576 ? 45 : 0;
  const type = useRef("normal")
  const backgroundColor = useRef(
    css`background: linear-gradient(${degree}deg, rgba(168,167,122,1) 15%, rgba(222,221,166,1) 100%);`
  );
  const nickname = useRef(null);
  const user = useUser();
  const { name } = useParams();

  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        status
        results {
          artwork
        }
      }
    }
  `;

  const GET_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        sprites {
          front_default
        }
        moves {
          move {
            name
          }
        }
        types {
          type {
            name
          }
        }
      }
    }
  `;

  // const GET_ABILITY_DETAIL = gql`
  //   query ability($ability: String!) {
  //     ability(ability: $ability) {
  //       status
  //       response
  //     }
  //   }
  // `;

  const { data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name
    }
  });

  const pokemonOverview = useQuery(GET_POKEMONS, {
    variables: {
      limit: 1,
      offset: data?.pokemon?.id - 1
    }
  })

  // const [getAbilityDetail, { abilityLoading, abilityData }] = useLazyQuery(GET_ABILITY_DETAIL);

  const handleCatchPokemon = () => {
    if (!toast.isActive(toastId)) {
      const num = Math.floor(Math.random() * 10);
      if (num < 5) {
        toast({
          id: toastId,
          duration: 1000,
          title: `Congrats! You caught ${data?.pokemon?.name}`,
          status: "success",
          isClosable: true
        })
        onOpen();
      } else {
        toast({
          id: toastId,
          duration: 1000,
          title: `You failed to catch ${data?.pokemon?.name}`,
          status: "error",
          isClosable: true
        })
      }
    }
  }

  const savePokemon = () => {
    let pokemon = Object.assign({}, data?.pokemon);
    const name = nickname.current?.toLowerCase();
    const found = user?.owned.some(el => el.nickname === name);
    if (!found) {
      pokemon.nickname = name?.toLowerCase();
      pokemon.artwork = pokemonOverview?.data?.pokemons?.results[0]?.artwork;
      delete pokemon.moves;
      delete pokemon.sprites;
      user.catchPokemon(pokemon);
      toast({
        id: toastId,
        duration: 1500,
        title: `Your "${name}" has been added to inventory`,
        status: "success",
        isClosable: true
      });
      onClose();
    } else {
      toast({
        id: toastId,
        duration: 1000,
        title: `Name "${name}" already exist. Use a different name`,
        status: "error",
        isClosable: true
      });
    }
  }

  if (data) {
    type.current = data?.pokemon?.types[0]?.type?.name;

    let bgColor = css`background: linear-gradient(${degree}deg, rgba(168,167,122,1) 50%, rgba(222,221,166,1) 100%);`;

    switch (data?.pokemon?.types[0]?.type?.name) {
      case "fire":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(238,129,48,1) 50%, rgba(240,158,97,1) 100%);
        `;
        break;
      case "water":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(77,114,194,1) 50%, rgba(99,144,240,1) 100%);
        `;
        break;
      case "electric":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(208,167,64,1) 50%, rgba(253,205,75,1) 100%);
        `;
        break;
      case "grass":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(97,158,60,1) 50%, rgba(122,199,76,1) 100%);
        `;
        break;
      case "ice":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(121,175,172,1) 50%, rgba(150,217,214,1) 100%);
        `;
        break;
      case "fighting":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(130,33,29,1) 50%, rgba(194,46,40,1) 100%);
        `;
        break;
      case "poison":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(121,45,120,1) 50%, rgba(163,62,161,1) 100%);
        `;
        break;
      case "ground":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(177,149,77,1) 50%, rgba(226,191,101,1) 100%);
        `;
        break;
      case "flying":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(121,92,201,1) 50%, rgba(169,143,243,1) 100%);
        `;
        break;
      case "psychic":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(177,53,91,1) 50%, rgba(249,85,135,1) 100%);
        `;
        break;
      case "bug":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(146,163,23,1) 50%, rgba(166,185,26,1) 100%);
        `;
        break;
      case "rock":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(149,132,47,1) 50%, rgba(182,161,54,1) 100%);
        `;
        break;
      case "ghost":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(115,87,151,1) 50%, rgba(159,120,210,1) 100%);
        `;
        break;
      case "dragon":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(82,30,208,1) 50%, rgba(111,53,252,1) 100%);
        `;
        break;
      case "dark":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(112,87,70,1) 50%, rgba(154,121,98,1) 100%);
        `;
        break;
      case "steel":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(150,150,163,1) 50%, rgba(183,183,206,1) 100%);
        `;
        break;
      case "fairy":
        bgColor = css`
          background: linear-gradient(${degree}deg, rgba(185,111,148,1) 50%, rgba(214,133,173,1) 100%);
        `;
        break;
      default:
        break;
    }

    backgroundColor.current = bgColor;
  }

  const PokemonDetailContainer = css`
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 40px;
    margin-top: 40px;

    ${mq("md")} {
      grid-template-columns: 1fr;
    }

    ${mq("sm")} {
      grid-gap: 24px;
    }
  `;

  const PokemonImageContainer = css`
    position: relative;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;

    ${mq("md")} {
      max-width: 320px;
      width: 75%;
      justify-self: center;
    }
  `;

  const PokeballImageStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(152deg) brightness(103%) contrast(103%);
    opacity: 0.5;
    width: 100%;
    z-index: 1;
  `;

  const PokemonImageStyle = css`
    position: relative;
    z-index: 2;
    object-fit: contain;
    max-height: 432px;
  `;

  const PokemonInfoContainer = css`
    display: flex;
    flex-direction: column;
  `;

  return (
    <main
      css={css`
        ${container_style};
        ${backgroundColor.current};
        min-height: 100vh;
      `}
    >
      <Header width={width} />

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
            POKEMON DETAIL
          </div>

          <SkeletonTheme color="#cfcfcf">
            <div css={PokemonDetailContainer}>
              <div css={PokemonImageContainer}>
                <img
                  css={PokeballImageStyle}
                  src={PokeballLogo}
                  alt="pokeball-logo"
                />
                {pokemonOverview?.data?.pokemons?.results[0]?.artwork ? (
                  <img
                    css={PokemonImageStyle}
                    src={pokemonOverview?.data?.pokemons?.results[0]?.artwork}
                    alt={`${data?.pokemon?.name}-img`}
                  />
                ) : <Skeleton circle css={css`width: 100%`} />}
              </div>

              <div css={PokemonInfoContainer}>
                <div css={css`
                  color: white;
                  font-size: 36px;
                  font-weight: 700;
                  
                  ${mq("md")} {
                    text-align: center;
                    font-size: 24px;
                  }
                `}>
                  {data ? '#' + padLeadingZeroes(data?.pokemon?.id, 4) : <Skeleton width={108} />}
                </div>

                <div css={css`
                  color: white;
                  font-size: 50px;
                  font-weight: 700;
                  text-transform: capitalize;

                  ${mq("md")} {
                    text-align: center;
                    font-size: 36px;
                  }
                `}>
                  {data ? data.pokemon.name : <Skeleton width={216} />}
                </div>

                <div css={css`
                  display: grid;
                  grid-template-columns: repeat(auto-fit, 75px);
                  grid-gap: 16px;
                  margin-top: 12px;

                  ${mq("md")} {
                    justify-content: center;
                  }
                `}>
                  {data ? (
                    data.pokemon.types.map((item) => (
                      <div
                        key={`${data.pokemon.name}-type-${item.type.name}`}
                        css={css`
                          background-color: ${typeColor(item.type.name)};
                          border-radius: 16px;
                          color: white;
                          font-size: 16px;
                          text-align: center;
                          padding: 4px;
                        `}
                      >
                        {item.type.name}
                      </div>
                    ))
                  ) : (
                    <>
                      <Skeleton
                        css={css`
                          height: 32px;
                          width: 75px;
                        `}
                        style={{ borderRadius: 16 }}
                      />
                      <Skeleton
                        css={css`
                          height: 32px;
                          width: 75px;
                        `}
                        style={{ borderRadius: 16 }}
                      />
                    </>
                  )}
                </div>

                <div css={css`
                  display: flex;
                  margin-top: 24px;
                  width: 100%;

                  ${mq("md")} {
                    justify-content: center;
                  }
                `}>
                  <Button colorScheme="whiteAlpha" size="lg" onClick={handleCatchPokemon}>
                    CATCH
                  </Button>
                </div>

                <div css={css`
                  display: flex;
                  flex-direction: column;
                  margin-top: 24px;
                  width: 100%;
                `}>
                  <div css={css`
                    color: white;
                    font-size: 36px;
                    font-weight: 700;

                    ${mq("md")} {
                      text-align: center;
                      font-size: 24px;
                    }
                  `}>
                    Move List
                  </div>
                  <div
                    css={css`
                      display: grid;
                      grid-template-columns: repeat(auto-fit, 125px);
                      grid-gap: 16px;
                      margin-top: 16px;
                      width: 100%;

                      ${mq("md")} {
                        justify-content: space-around;
                      }
                    `}
                  >
                    {data?.pokemon?.moves.map((item, index) => (
                      <div
                        key={`moves-${index}`}
                        css={css`
                          background-color: rgba(112, 110, 109, 0.5);
                          border-radius: 8px;
                          color: white;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          padding: 8px;
                          font-weight: 500;
                          text-align: center;
                          text-transform: capitalize;
                        `}
                      >
                        {item.move.name.replace(/-/g, " ")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SkeletonTheme>

          <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>You Caught {data?.pokemon?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Give your new pokemon a name:
                <Input mt={2} onChange={(event) => nickname.current = event.target.value} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="blue" onClick={savePokemon}>Save</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </div>
      </section>
    </main>
  )
}

export default PokemonDetail;