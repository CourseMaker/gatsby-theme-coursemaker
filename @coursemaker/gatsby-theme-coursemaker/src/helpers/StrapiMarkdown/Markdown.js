import React from "react";
import ReactMarkdown from "react-markdown";
import { InlineMath, BlockMath } from "react-katex";
import RemarkMathPlugin from "remark-math";
import "katex/dist/katex.min.css";

import Highlighter from "../../helpers/SyntaxHighlighter/SyntaxHighlighter";
import RemarkGraph from "../../helpers/RemarkGraph/RemarkGraph";

const _mapProps = (props, editable) => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin],
  renderers: {
    ...props.renderers,
    code: (code) => {
      if (code.language === "mermaid") {
        return <RemarkGraph graphData={code} />;
      } else {
        return <Highlighter codeString={code} language="jsx" />;
      }
    },
    math: (opts) => <BlockMath math={opts.value} />,
    inlineMath: (opts) => <InlineMath math={opts.value} />,
  },
});

const Markdown = (props) => {
  return (
    <>
      <ReactMarkdown {..._mapProps(props)} />
    </>
  );
};

export default Markdown;
