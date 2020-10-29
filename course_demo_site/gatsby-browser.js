// ./gatsby-browser.js
import React, { Component } from "react";
import { silentAuth } from "@coursemaker/gatsby-theme-coursemaker/src/auth/auth";

class SessionCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleCheckSession = () => {
    this.setState({ loading: false });
  };

  componentDidMount() {
    silentAuth(this.handleCheckSession);
  }

  render() {
    return this.state.loading === false && <>{this.props.children}</>;
  }
}

export const wrapRootElement = ({ element }) => (
  <SessionCheck>{element}</SessionCheck>
);
