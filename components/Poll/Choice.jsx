import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class Choice extends Component {
  render() {
    return (
      <div
        css={css`
          position: relative;
          width: 250px;
          height: 50px;
          background: green;
        `}
      >
        Yo
      </div>
    );
  }
}
