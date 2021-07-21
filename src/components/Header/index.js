/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from "assets/logo192.png";
import PokeAPILogo from "assets/pokeapi.svg";

import DummyHeader from "./DummyHeader";

import { mq } from "styles/global";

const Header = ({ width }) => {
  const history = useHistory();

  const HeaderStyle = css`
    backdrop-filter: blur(10px);
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 10;
  `;

  const HeaderContentStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 80px;
    max-width: 1440px;
    width: 100%;

    ${mq("sm")} {
      flex-direction: column;
      margin: 16px;
    }
  `;

  const NavStyle = css`
    display: flex;

    ${mq("sm")} {
      justify-content: space-around;
      margin-top: 12px;
      width: 100%;
    }

    a {
      padding-left: 12px;
      padding-right: 12px;
      color: white;
      text-align: center;
      text-shadow: 0px 0px 1px #336666;
      font-weight: 500;
    }

    a + a {
      border-left: solid white 1px;
      
      ${mq("sm")} {
        border: 0;
      }
    }

    a:nth-last-of-type(1) {
      padding-right: 0;
    }
  `;

  return (
    <>
      <header css={HeaderStyle}>
        <div css={HeaderContentStyle}>
          <div
            css={css`
              display: flex;
              align-items: center;
              width: 50%;

              ${mq("sm")} {
                justify-content: center;
                width: 100%;
              }
            `}
            onClick={() => history.push("/")}
          >
            <img
              css={css`
                width: 36px;
                height: 36px
              `}
              src={Logo}
              alt="pokeweb-logo"
            />

            <img
              css={css`
                height: 36px;
                margin-left: 16px;
              `}
              src={PokeAPILogo}
              alt="pokeapi-logo"
            />
          </div>
          <nav css={NavStyle}>
            <a
              href="/"
            >
              Pokemon List
            </a>
            <a
              href="/my-pokemon"
            >
              My Pokemon
            </a>
          </nav>
        </div>
      </header>
      <DummyHeader width={width} />
    </>
  )
}

export default Header;