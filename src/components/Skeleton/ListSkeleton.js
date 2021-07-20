/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { mq } from "styles/global";

const ListSkeleton = ({ width }) => {
  const list = Array.from({ length: 18 });
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
    <SkeletonTheme color="#cfcfcf">
      <div css={PokemonListStyle}>
        {list.map((item, index) => (
          <Skeleton
            key={`skeleton-${index}`}
            height={
              width > 576 ?
                width > 768 ?
                  width > 992 ?
                    width > 1200 ? 236
                      : 205
                    : 174
                  : 146
                : 118
            }
            width={
              width > 576 ?
                width > 768 ?
                  width > 992 ?
                    width > 1200 ? 200
                      : 175
                    : 150
                  : 125
                : 100
            }
            style={{ borderRadius: 16 }}
          />
        ))}
      </div>
    </SkeletonTheme>
  )
}

export default ListSkeleton;