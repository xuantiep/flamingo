/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as globals from "../globals";
import Head from "next/head";
import React from "react";

export default function TwitterFeed(props) {
  return (
    <>
      <Head>
        <script async src="https://platform.twitter.com/widgets.js" />
      </Head>
      <div
        css={css`
          ${globals.cardStyles}
          padding: 10px 10px 0;
          min-height: 514px;
        `}
      >
        <a
          className="twitter-timeline"
          data-height="500"
          href="https://twitter.com/dailybruin?ref_src=twsrc%5Etfw"
        >
          Tweets by dailybruin
        </a>
      </div>
    </>
  );
}
