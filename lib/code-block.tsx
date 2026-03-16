"use client";

import type { Language, PrismTheme } from "prism-react-renderer";

import { Highlight } from "prism-react-renderer";
import { useState } from "react";

// Dark theme
const darkTheme: PrismTheme = {
  plain: {
    color: "#F24405", // orange text
    backgroundColor: "#0b1c2d", // dark blue background
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
  className?: string;
};

export default function CodeBlock({ children, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative group my-4 rounded-lg border border-gray-700 ${className ?? ""}`}
    >
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 rounded bg-gray-800 px-2 py-1 text-xs text-yellow-400 hover:bg-gray-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <Highlight code={children.trim()} language={language} theme={darkTheme}>
        {({ className: codeClass, style, tokens, getLineProps, getTokenProps }) => (
          <div className="flex overflow-x-auto">
            {/* Line numbers - fixed */}
            <div className="flex-shrink-0 p-2 sm:p-4 text-xs sm:text-sm font-mono text-right select-none bg-[#0b1c2d]">
              {tokens.map((_, lineIndex) => (
                <div key={lineIndex} className="w-6 sm:w-8 text-gray-500">
                  {lineIndex + 1}
                </div>
              ))}
            </div>

            {/* Code content - scrollable */}
            <pre className="flex-1 overflow-x-auto p-2 sm:p-4 text-xs sm:text-sm font-mono whitespace-nowrap" style={style}>
              {tokens.map((line, lineIndex) => {
                const lineProps = getLineProps({ line });
                return (
                  <div key={lineIndex} {...lineProps}>
                    {line.map((token, tokenIndex) => {
                      const tokenProps = getTokenProps({ token });
                      return <span key={tokenIndex} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
}
