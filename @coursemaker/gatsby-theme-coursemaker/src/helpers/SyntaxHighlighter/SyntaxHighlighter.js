import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as Highlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

class SyntaxHighlighter extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    console.log("Props are", value);
    return (
      <Highlighter language={language} style={coy}>
        {value}
      </Highlighter>
    );
  }
}

export default SyntaxHighlighter;
