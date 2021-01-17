import React from 'react';
import ReactMarkdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import RemarkMathPlugin from 'remark-math';
import 'katex/dist/katex.min.css';

import Highlighter from '../SyntaxHighlighter/SyntaxHighlighter';

const _mapProps = (props) => ({
    ...props,
    escapeHtml: false,
    plugins: [RemarkMathPlugin],
    renderers: {
        ...props.renderers,
        code: (code) => <Highlighter codeString={code} language={code.language} />,
        math: (opts) => <BlockMath math={opts.value} />,
        inlineMath: (opts) => <InlineMath math={opts.value} />,
    },
});

const Markdown = (props) => (
    <>
        <ReactMarkdown {..._mapProps(props)} />
    </>
);

export default Markdown;
