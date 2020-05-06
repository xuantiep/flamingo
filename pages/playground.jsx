import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import Link from "next/link";

import Poll from "../components/Poll";

export default class Playground extends Component {
  render() {
    return (
      <div style={{ margin: "auto", maxWidth: "1236px" }}>
        <Poll />
      </div>
    );
  }
}
