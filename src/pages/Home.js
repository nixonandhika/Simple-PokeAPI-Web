/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Logo from "images/logo192.png";
import { mq, section_style } from 'styles/global';

const Home = () => {
  return (
    <main
      css={section_style}
    >
      <img
        src={Logo}
        alt="logo"
        css={css`
          width: 200px;
          ${mq('small')} {
            width: 100px;
          }
        `}
      />
    </main>
  )
}

export default Home;