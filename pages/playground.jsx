import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import { Config } from "../config.js";

import Poll from "../components/Poll";

class Playground extends Component {
  static async getInitialProps(context) {
    const pollRes = await fetch(`http://64.225.32.71/wp-json/wp/v2/poll?id=4`);
    const poll = await pollRes.json();
    return { poll };
  }
  render() {
    return <Poll poll={this.props.poll} />;
  }
}

export default Playground;
