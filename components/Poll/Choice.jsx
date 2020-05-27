import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import button from "./pollbutton.svg";

export default class Choice extends Component {
  render() {
    return (
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          padding-left: 5px;
          z-index: 1;
        `}
      >
        {this.props.voted ? (
          <>
            <div
              css={css`
                position: absolute;
                top: 0%;
                left: 0%;
                width: ${(this.props.percent/this.props.maxpercent)*100}%;
                height: 100%;
                background: ${globals.gray};
                z-index: 2;
              `}
            />
            <p
              css={css`
                font-size: 18px;
                font-weight: bold;
                margin: 0 5px 0 0;
                width: 40px;
                font-family: ${globals.menuFont};
                z-index: 3;
              `}
            >
              {this.props.percent}%
            </p>
            <p
              css={css`
                position: relative;
                font-size: 14px;
                font-weight: bold;
                font-family: ${globals.menuFont};
                width: 85%;
                z-index: 3;
              `}
            >
              ({this.props.numvotes} votes) {this.props.answer}
            </p>
          </>
        ) : (
          <>
            <input
              css={css`
                width: 20px;
                margin: 0 10px 0 0;
                z-index: 3;
              `}
              type="image"
              src={button}
              onClick={this.props.vote}
            />
            <p
              css={css`
                position: relative;
                font-size: 14px;
                font-weight: bold;
                font-family: ${globals.menuFont};
                width: 85%;
                z-index: 3;
              `}
            >
              {this.props.answer}
            </p>
          </>
        )}
      </div>
    );
  }
}
