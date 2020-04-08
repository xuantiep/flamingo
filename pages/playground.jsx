import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
/** @jsx jsx */ 
import { css, jsx } from "@emotion/core";
import * as globals from "../components/globals";

export default class Poll extends Component {
  static async getInitialProps(context) {
    const pollRes = await fetch(
      `http://64.225.32.71/wp-json/wp/v2/poll?id=292`
    );
    const poll = await pollRes.json();
    return { poll };
  }

  render() {
    return (
      <div
        css={css`
          position: fixed;
          width: 21%;
          height: 38%;
          box-shadow: ${globals.cardShadow};
          font-family: Source Sans Pro;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 10%;
            background: #000000;
          `}
        >
          <div
            css={css`
              position: relative;
              color: #ffffff;
              font-family: Source Sans Pro;
              font-weight: bold;
              font-size: 18px;
              padding-left: 3%;
              padding-top: 1%;
            `}
          >
            POLL
          </div>
        </div>
        <div
          css={css`
            position: relative;
            width: 90%;
            height: 90%;
            margin: 5% 0 0 5%;
            font-family: PT Serif;
            font-size: 14px;
          `}
        >
          {this.props.poll.poll.question}
        </div>
      </div>
    );
  }
}
