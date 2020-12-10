/** @jsx jsx */
import { jsx } from "theme-ui";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import scope from "../../scope";

const SyntaxHighlighter = ({ codeString, language }) => {
  const parsedCode = `${codeString.value}`;
  
  if (codeString !== undefined && codeString.language === "editable")
    return (
      <LiveProvider code={parsedCode} theme={theme} scope={scope}>
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
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={style}
          sx={{ p: 2, overflowX: "scroll", variant: "prism-highlight" }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default SyntaxHighlighter;
