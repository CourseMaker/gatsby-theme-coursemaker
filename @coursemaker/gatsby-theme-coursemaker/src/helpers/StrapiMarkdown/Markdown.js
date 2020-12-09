import React from "react";
import ReactMarkdown from "react-markdown";
import { InlineMath, BlockMath } from "react-katex";
import RemarkMathPlugin from "remark-math";
import "katex/dist/katex.min.css";

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin],
  renderers: {
    ...props.renderers,
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
