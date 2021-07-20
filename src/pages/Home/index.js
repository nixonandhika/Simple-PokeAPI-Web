/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { gql, useQuery } from '@apollo/client';

import Logo from "assets/logo192.png";
import MainBackground from "assets/main_bg.jpg";
import MainBackgroundMobile from "assets/main_bg_mobile.jpg";

import { mq, container_style } from "styles/global";

import Header from "components/Header";

const Home = () => {
  // const GET_POKEMONS = gql`
  //   query pokemons($limit: Int, $offset: Int) {
  //     pokemons(limit: $limit, offset: $offset) {
  //       count
  //       next
  //       previous
  //       nextOffset
  //       prevOffset
  //       status
  //       results {
  //         name
  //         image
  //       }
  //     }
  //   }
  // `;

  // const GET_POKEMON_DETAIL = gql`
  //   query pokemon($name: String!) {
  //     pokemon(name: $name) {
  //       id
  //       name
  //       sprites {
  //         front_default
  //       }
  //       moves {
  //         move {
  //           name
  //         }
  //       }
  //       types {
  //         type {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `;

  // const GET_ABILITY_DETAIL = gql`
  //   query ability($ability: String!) {
  //     ability(ability: $ability) {
  //       status
  //       response
  //     }
  //   }
  // `;

  // const variables = {
  //   "limit": 2,
  //   "offset": 0
  // };

  // const detail_variables = {
  //   "name": "pikachu"
  // };

  // const ability_variable = {
  //   "ability": "overgrow"
  // };

  // const { loading, error, data } = useQuery(GET_ABILITY_DETAIL, {
  //   variables: ability_variable
  // });
  // console.log(data);

  return (
    <main
      css={css`
        ${container_style};
        background-size: cover;
        height: 100vh;
      `}
    >
      <Header />
      {/* <img
        src={Logo}
        alt="logo"
        css={css`
          width: 200px;
          ${mq('small')} {
            width: 100px;
          }
        `}
      /> */}
    </main>
  )
}

export default Home;