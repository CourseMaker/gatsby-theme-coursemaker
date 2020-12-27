/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import Highlight, { defaultProps } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import dracula from 'prism-react-renderer/themes/dracula';
import github from 'prism-react-renderer/themes/github';
import vsDark from 'prism-react-renderer/themes/vsDark';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';
import scope from '../../scope';

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
    const tokensLength = tokens.length;

    if (tokensLength === 0) {
        return tokens;
    }
    const lastToken = tokens[tokensLength - 1];

    if (lastToken.length === 1 && lastToken[0].empty) {
        return tokens.slice(0, tokensLength - 1);
    }
    return tokens;
}

const SyntaxHighlighter = ({ codeString, language }) => {
    const parsedCode = `${codeString.value}`;
    const Line = styled.div`
        display: table-row;
    `;

    const LineNo = styled.span`
        display: table-cell;
        text-align: right;
        padding-right: 1em;
        user-select: none;
        opacity: 0.5;
    `;

    const LineContent = styled.span`
        display: table-cell;
    `;

    if (codeString !== undefined && codeString.language === 'editable')
        return (
            <LiveProvider code={parsedCode} theme={dracula} scope={scope}>
                <LiveEditor />
                <LiveError />
                <LivePreview
                    sx={{
                        border: (theme) => `1px solid ${theme.colors.muted}`,
                        p: 4,
                        'div :first-child': {
                            mt: 0,
                        },
                        variant: 'react-live',
                    }}
                />
            </LiveProvider>
        );

    return (
        <Highlight {...defaultProps} code={parsedCode} language={language} theme={vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <div className="gatsby-highlight" data-language={language}>
                    <pre
                        className={className}
                        style={style}
                        sx={{ p: 2, overflowX: 'scroll', variant: 'prism-highlight' }}
                    >
                        {cleanTokens(tokens).map((line, i) => {
                            let lineClass = {};
                            let isDiff = false;
                            if (line[0] && line[0].content.length && line[0].content[0] === '+') {
                                lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' };
                                isDiff = true;
                            } else if (line[0] && line[0].content.length && line[0].content[0] === '-') {
                                lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' };
                                isDiff = true;
                            } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '+') {
                                lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' };
                                isDiff = true;
                            } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '-') {
                                lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' };
                                isDiff = true;
                            }
                            const lineProps = getLineProps({ line, key: i });

                            lineProps.style = lineClass;
                            const diffStyle = {
                                userSelect: 'none',
                                MozUserSelect: '-moz-none',
                                WebkitUserSelect: 'none',
                            };

                            let splitToken;
                            return (
                                <Line {...lineProps} key={line + i}>
                                    <LineNo>{i + 1}</LineNo>
                                    <LineContent>
                                        {line.map((token, key) => {
                                            if (isDiff) {
                                                if (
                                                    (key === 0 || key === 1) &
                                                    (token.content.charAt(0) === '+' || token.content.charAt(0) === '-')
                                                ) {
                                                    if (token.content.length > 1) {
                                                        splitToken = {
                                                            types: ['template-string', 'string'],
                                                            content: token.content.slice(1),
                                                        };
                                                        const firstChar = {
                                                            types: ['operator'],
                                                            content: token.content.charAt(0),
                                                        };
                                                        return (
                                                            <React.Fragment key={token + key}>
                                                                <span
                                                                    {...getTokenProps({ token: firstChar, key })}
                                                                    style={diffStyle}
                                                                />
                                                                <span {...getTokenProps({ token: splitToken, key })} />
                                                            </React.Fragment>
                                                        );
                                                    }
                                                    return (
                                                        <span {...getTokenProps({ token, key })} style={diffStyle} />
                                                    );
                                                }
                                            }
                                            // Non-Diff standard return value
                                            return <span {...getTokenProps({ token, key })} />;
                                        })}
                                    </LineContent>
                                </Line>
                            );
                        })}
                    </pre>
                </div>
            )}
        </Highlight>
    );
};

export default SyntaxHighlighter;
