import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

import Choice from "./Choice";

export default class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voted: false
    };
  }

  handleClick = () => {
    this.setState({ voted: true });
  };

  render() {
    let poll = this.props.poll.poll;
    let results = this.props.poll.result;
    return (
      <div
        css={css`
          position: fixed;
          width: 300px;
          box-shadow: ${globals.cardShadow};
        `}
      >
        <div
          css={css`
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 30px;
            background: #000000;
          `}
        >
          <p
            css={css`
              color: #ffffff;
              font-family: ${globals.menuFont};
              font-weight: bold;
              font-size: 20px;
              padding-left: 2%;
            `}
          >
            POLL
          </p>
        </div>
        <p
          css={css`
            position: relative;
            width: 90%;
            margin: 5% 0 0 5%;
            font-family: PT Serif;
            font-size: 16px;
          `}
        >
          {poll.question}
        </p>
        <div
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            width: 90%;
            margin: 5% 0 0 5%;
          `}
        >
          {this.state.voted
            ? results.data.map(result => (
                <Choice
                  answer={result.polla_answers}
                  percent={result.pourcent}
                  voted={this.state.voted}
                />
              ))
            : poll.answers.map(answer => (
                <Choice
                  answer={answer.polla_answers}
                  vote={this.handleClick}
                  voted={this.state.voted}
                />
              ))}
          {}
        </div>
      </div>
    );
  }
}
