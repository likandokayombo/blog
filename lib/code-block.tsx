"use client";

import type { Language, PrismTheme } from "prism-react-renderer";

import { Highlight } from "prism-react-renderer";
import { useState } from "react";

const linearTheme: PrismTheme = {
  plain: {
    color: "#E5E7EB",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#6A9955",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "selector", "operator"],
      style: {
        color: "#569CD6",
      },
    },
    {
      types: ["string", "char", "attr-value"],
      style: {
        color: "#CE9178",
      },
    },
    {
      types: ["function", "class-name", "maybe-class-name"],
      style: {
        color: "#DCDCAA",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#60A5FA",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#93C5FD",
      },
    },
    {
      types: ["number", "boolean"],
      style: {
        color: "#B5CEA8",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#9CA3AF",
      },
    },
  ],
};

type CodeBlockProps = {
  children: string;
  language?: Language;
  filename?: string;
  highlightLines?: number[];
  zeroPadLines?: boolean;
  className?: string;
};

/**
 * Linear-inspired code block component with optional header bar,
 * line highlighting, and clipboard copy support.
 */
export default function CodeBlock({
  children,
  language = "tsx",
  filename,
  highlightLines = [],
  zeroPadLines = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const cleanCode = children.replace(/^\n+|\n+$/g, "");
  const highlightedSet = new Set(highlightLines);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatLineNumber = (index: number) => {
    const num = index + 1;
    if (!zeroPadLines) {
      return String(num);
    }
    return num < 10 ? `0${num}` : String(num);
  };

  return (
    <div
      className={`my-5 overflow-hidden rounded-xl border border-white/10 bg-[#121316] shadow-2xl ${
        className ?? ""
      }`}
    >
      {/* Top header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#17181C] px-3.5 py-2.5 text-xs text-neutral-400">
        <div className="flex min-w-0 items-center gap-2.5">
          <svg
            className="h-4 w-4 shrink-0 text-neutral-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="truncate font-mono text-[12px] text-neutral-400">
            {filename ?? language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="ml-3 shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-sans text-[11px] font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body */}
      <Highlight code={cleanCode} language={language} theme={linearTheme}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <div className="overflow-x-auto py-3 font-mono text-xs leading-6 sm:text-[13px]">
            <pre style={style} className="min-w-full">
              {tokens.map((line, lineIndex) => {
                const lineNumber = lineIndex + 1;
                const isHighlighted = highlightedSet.has(lineNumber);
                const { className: lineClassName, ...restLineProps } = getLineProps({
                  line,
                });

                return (
                  <div
                    key={lineIndex}
                    {...restLineProps}
                    className={`flex w-full pr-4 transition-colors ${
                      isHighlighted ?
                        "border-l-2 border-rose-500/80 bg-rose-500/[0.11]" :
                        "border-l-2 border-transparent hover:bg-white/[0.02]"
                    } ${lineClassName ?? ""}`}
                  >
                    <span
                      className={`w-11 shrink-0 select-none pr-3 text-right tabular-nums sm:w-12 ${
                        isHighlighted ?
                          "font-medium text-rose-400" :
                          "text-neutral-600"
                      }`}
                    >
                      {formatLineNumber(lineIndex)}
                    </span>

                    <span className="flex-1 whitespace-pre">
                      {line.map((token, tokenIndex) => {
                        const { className: tokenClassName, ...restTokenProps } =
                          getTokenProps({ token });
                        return (
                          <span
                            key={tokenIndex}
                            {...restTokenProps}
                            className={tokenClassName ?? ""}
                          />
                        );
                      })}
                    </span>
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
