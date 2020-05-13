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
        `}
      >
        {this.props.voted ? (
          <>
            <p
              css={css`
                font-size: 18px;
                font-weight: bold;
                margin: 0 5px 0 0;
                width: 40px;
                font-family: ${globals.menuFont};
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
