/** @jsx jsx */
import { jsx } from "theme-ui";
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import dracula from "prism-react-renderer/themes/dracula";
import github from "prism-react-renderer/themes/github";
import vsDark from "prism-react-renderer/themes/vsDark";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import scope from "../../scope";
import styled from "styled-components";

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
  
  if (codeString !== undefined && codeString.language === "editable")
    return (
      <LiveProvider code={parsedCode} theme={dracula} scope={scope}>
        <LiveEditor />
        <LiveError />
        <LivePreview
          sx={{
            border: (theme) => `1px solid ${theme.colors.muted}`,
            p: 4,
            "div :first-child": {
              mt: 0,
            },
            variant: "react-live",
          }}
        />
      </LiveProvider>
    );

  return (
    <Highlight
      {...defaultProps}
      code={parsedCode}
      language={language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <div className="gatsby-highlight" data-language={language}>
          <pre
          className={className}
          style={style}
          sx={{ p: 2, overflowX: "scroll", variant: "prism-highlight" }}
        >
          {tokens.map((line, i) => (
            <Line {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
            </Line>
          ))}
        </pre>
      </div>
      )}
    </Highlight>
  );
};

export default SyntaxHighlighter;
