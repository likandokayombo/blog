"use client";

import type { Language, PrismTheme, Token } from "prism-react-renderer";

import { Highlight } from "prism-react-renderer";
import { useState } from "react";

// Minimal VSCode-like theme (typed correctly)
const darkTheme: PrismTheme = {
  plain: {
    color: "#d4d4d4",
    backgroundColor: "#1e1e1e",
  },
  styles: [
    { types: ["keyword", "selector"], style: { color: "#569CD6" } },
    { types: ["string", "char"], style: { color: "#CE9178" } },
    { types: ["function", "class-name"], style: { color: "#DCDCAA" } },
    { types: ["comment"], style: { color: "#6A9955", fontStyle: "italic" } },
    { types: ["number"], style: { color: "#B5CEA8" } },
  ],
};

type CodeBlockProps = {
  children: string;
  language?: Language;
};

type HighlightRenderProps = {
  className: string;
  style: React.CSSProperties;
  tokens: Token[][];
  getLineProps: (input: { line: Token[]; key: number }) => React.HTMLAttributes<HTMLDivElement>;
  getTokenProps: (input: { token: Token; key: number }) => React.HTMLAttributes<HTMLSpanElement>;
};

export default function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg border border-gray-700 overflow-hidden">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 hover:bg-gray-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <Highlight code={children.trim()} language={language} theme={darkTheme}>
        {(props: HighlightRenderProps) => {
          const { className, style, tokens, getLineProps, getTokenProps } = props;

          return (
            <pre
              className={`overflow-x-auto bg-[#1e1e1e] p-4 text-sm font-mono ${className}`}
              style={style}
            >
              {tokens.map((line, index) => {
                const lineProps = getLineProps({ line, key: index });

                return (
                  <div key={index} {...lineProps} className="flex">
                    {/* Line numbers */}
                    <span className="mr-4 w-8 select-none text-right text-gray-500">
                      {index + 1}
                    </span>

                    {/* Code */}
                    <span className="flex-1">
                      {line.map((token, tokenIndex) => (
                        <span
                          key={tokenIndex}
                          {...getTokenProps({ token, key: tokenIndex })}
                        />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          );
        }}
      </Highlight>
    </div>
  );
}
