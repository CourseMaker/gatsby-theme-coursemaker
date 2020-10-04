import "./src/css/tailwind.css";
import "./src/css/style.styl";

// ./gatsby-browser.js
import React from "react";
import { silentAuth } from "./auth/auth";
import { Provider } from "react-redux";

import store from "./src/store";
class SessionCheck extends React.Component {
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
    return (
      this.state.loading === false && (
        <Provider store={store}>
          {" "}
          <React.Fragment>{this.props.children}</React.Fragment>
        </Provider>
      )
    );
  }
}

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>;
};
