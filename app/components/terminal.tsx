"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Post = {
  title: string;
  slug: string;
  content: string;
};

type TerminalProps = {
  changelog: string[];
  visible: boolean;
  onClose: () => void;
};

const COMMANDS = ["posts", "changelog", "open", "help", "clear", "exit", "q"];
const HISTORY_KEY = "terminal-history";

export default function Terminal({
  changelog,
  visible,
  onClose,
}: TerminalProps) {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* ----------------------------- fetch posts when visible ----------------------------- */
  useEffect(() => {
    if (visible && !postsLoaded) {
      setLoading(true);
      fetch("/api/posts")
        .then(res => res.json())
        .then(data => {
          setPosts(data);
          setPostsLoaded(true);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [visible, postsLoaded]);

  /* ----------------------------- restore history ----------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  /* ----------------------------- persist history ----------------------------- */
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-50)));
  }, [history]);

  /* ---------------------------------- focus ---------------------------------- */
  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  /* ------------------------------- suggestions ------------------------------- */
  useEffect(() => {
    const value = command.trim().toLowerCase();
    if (!value) {
      setSuggestions([]);
      return;
    }

    setSuggestions(COMMANDS.filter(c => c.startsWith(value)));
  }, [command]);

  /* --------------------------- highlight utility ----------------------------- */
  const highlight = (text: string, keyword: string) => {
    if (!keyword) {
      return text;
    }

    const re = new RegExp(`(${keyword})`, "gi");
    return text.replace(re, "▌$1▐");
  };

  /* --------------------------- get snippet utility --------------------------- */
  const getSnippet = (content: string, keyword: string): string => {
    const contentLower = content.toLowerCase();
    const keywordLower = keyword.toLowerCase();
    const idx = contentLower.indexOf(keywordLower);

    if (idx === -1) {
      return "";
    }

    const snippetStart = Math.max(0, idx - 40);
    const snippetEnd = Math.min(content.length, idx + keyword.length + 40);
    let snippet = content.slice(snippetStart, snippetEnd);

    snippet = snippet
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\n/g, " ")
      .trim();

    const prefix = snippetStart > 0 ? "..." : "";
    const suffix = snippetEnd < content.length ? "..." : "";

    return `${prefix}${snippet}${suffix}`;
  };

  /* ------------------------------ run command -------------------------------- */
  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        return;
      }

      setOutput(prev => prev.concat(`$ ${trimmed}`));
      setHistory(prev => prev.concat(trimmed));
      setHistoryIndex(null);

      if (trimmed.toLowerCase() === "clear") {
        setOutput([]);
        return;
      }

      if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "q") {
        onClose();
        return;
      }

      if (trimmed.toLowerCase() === "help") {
        setOutput(prev =>
          prev.concat(
            "Available commands:",
            "posts <keyword>      search posts (titles + content)",
            "open <slug|title>   open a post",
            "changelog <keyword> search changelog",
            "clear               clear terminal",
            "exit / q            close terminal",
          ),
        );
        return;
      }

      if (trimmed.toLowerCase().startsWith("posts")) {
        if (!postsLoaded || posts.length === 0) {
          setOutput(prev =>
            prev.concat("Loading posts...", "Try again in a moment"),
          );
          return;
        }

        const keyword = trimmed.replace(/^posts\s*/i, "").trim().toLowerCase();

        if (!keyword) {
          setOutput(prev =>
            prev.concat("Usage: posts <keyword>", "Example: posts react"),
          );
          return;
        }

        const titleMatches = posts.filter(p =>
          p.title.toLowerCase().includes(keyword),
        );

        const contentMatches = posts.filter(p => {
          if (titleMatches.find(tm => tm.slug === p.slug)) {
            return false;
          }
          return p.content.toLowerCase().includes(keyword);
        });

        const allMatches = [...titleMatches, ...contentMatches];

        if (allMatches.length === 0) {
          setOutput(prev => prev.concat(`No posts found for "${keyword}"`));
          return;
        }

        setOutput(prev =>
          prev.concat(
            `Found ${allMatches.length} post${allMatches.length > 1 ? "s" : ""} for "${keyword}":`,
            "",
            ...allMatches.map(p => {
              const inTitle = p.title.toLowerCase().includes(keyword);
              const titleHighlighted = highlight(p.title, keyword);

              if (inTitle) {
                return `POST::${titleHighlighted}::${p.slug}::TITLE`;
              }
              else {
                const snippet = getSnippet(p.content, keyword);
                const snippetHighlighted = highlight(snippet, keyword);
                return `POST::${titleHighlighted}::${p.slug}::CONTENT::${snippetHighlighted}`;
              }
            }),
          ),
        );
        return;
      }

      if (trimmed.toLowerCase().startsWith("open")) {
        if (!postsLoaded || posts.length === 0) {
          setOutput(prev =>
            prev.concat("Loading posts...", "Try again in a moment"),
          );
          return;
        }

        const query = trimmed.replace(/^open\s*/i, "").trim().toLowerCase();

        if (!query) {
          setOutput(prev =>
            prev.concat(
              "Usage: open <slug|title>",
              "Example: open react-server-components",
            ),
          );
          return;
        }

        const match = posts.find(
          p =>
            p.slug.toLowerCase() === query ||
            p.title.toLowerCase() === query,
        );

        if (!match) {
          setOutput(prev => prev.concat("Post not found"));
          return;
        }

        router.push(`/blog/${match.slug}`);
        onClose();
        return;
      }

      if (trimmed.toLowerCase().startsWith("changelog")) {
        const keyword = trimmed.replace(/^changelog\s*/i, "").trim().toLowerCase();

        if (!keyword) {
          setOutput(prev =>
            prev.concat(
              "Usage: changelog <keyword>",
              "Example: changelog feature",
            ),
          );
          return;
        }

        const matches = changelog.filter(c =>
          c.toLowerCase().includes(keyword),
        );

        if (matches.length === 0) {
          setOutput(prev => prev.concat(`No changelog entries found for "${keyword}"`));
          return;
        }

        setOutput(prev =>
          prev.concat(
            `Found ${matches.length} entry${matches.length > 1 ? "s" : ""}:`,
            "",
            ...matches.map(c => highlight(c, keyword)),
          ),
        );
        return;
      }

      // Auto-search posts if no command matches
      if (!postsLoaded || posts.length === 0) {
        setOutput(prev =>
          prev.concat("Loading posts...", "Try again in a moment"),
        );
        return;
      }

      const keyword = trimmed.toLowerCase();

      const titleMatches = posts.filter(p =>
        p.title.toLowerCase().includes(keyword),
      );

      const contentMatches = posts.filter(p => {
        if (titleMatches.find(tm => tm.slug === p.slug)) {
          return false;
        }
        return p.content.toLowerCase().includes(keyword);
      });

      const allMatches = [...titleMatches, ...contentMatches];

      if (allMatches.length === 0) {
        setOutput(prev => prev.concat(`No posts found for "${keyword}"`));
        return;
      }

      setOutput(prev =>
        prev.concat(
          `Found ${allMatches.length} post${allMatches.length > 1 ? "s" : ""} for "${keyword}":`,
          "",
          ...allMatches.map(p => {
            const inTitle = p.title.toLowerCase().includes(keyword);
            const titleHighlighted = highlight(p.title, keyword);

            if (inTitle) {
              return `POST::${titleHighlighted}::${p.slug}::TITLE`;
            }
            else {
              const snippet = getSnippet(p.content, keyword);
              const snippetHighlighted = highlight(snippet, keyword);
              return `POST::${titleHighlighted}::${p.slug}::CONTENT::${snippetHighlighted}`;
            }
          }),
        ),
      );
    },
    [posts, postsLoaded, changelog, router, onClose],
  );

  /* ----------------------------- keyboard input ------------------------------ */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(command);
      setCommand("");
      return;
    }

    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (e.key === "ArrowUp") {
      if (!history.length) {
        return;
      }

      const i = historyIndex === null ?
        history.length - 1 :
          Math.max(0, historyIndex - 1);

      setHistoryIndex(i);
      setCommand(history[i]);
      return;
    }

    if (e.key === "ArrowDown") {
      if (historyIndex === null) {
        return;
      }

      const i = historyIndex + 1;
      if (i >= history.length) {
        setHistoryIndex(null);
        setCommand("");
        return;
      }

      setHistoryIndex(i);
      setCommand(history[i]);
    }
  };

  /* --------------------------------- render --------------------------------- */
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute bottom-6 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 rounded-sm bg-[#0d0d0d] text-white font-mono shadow-xl border border-[#c37d0d]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <Image src="/icons/terminal.svg" alt="Terminal" width={18} height={18} className="opacity-80" />
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-50">Q to close or Esc, clear</span>
            <button onClick={onClose} className="opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-2 text-sm">
          {loading && (
            <div className="text-yellow-400">Loading posts...</div>
          )}
          {output.map((line, i) => {
            if (line.startsWith("POST::")) {
              const parts = line.split("::");
              const title = parts[1];
              const slug = parts[2];
              const matchType = parts[3];
              const snippet = parts[4] || "";

              return (
                <div key={i} className="space-y-1">
                  <button
                    onClick={() => router.push(`/blog/${slug}`)}
                    className="block text-left text-blue-400 hover:underline"
                  >
                    {title.split(/(▌.*?▐)/g).map((part, j) =>
                      part.startsWith("▌") ?
                          (
                            <span
                              key={j}
                              className="bg-yellow-400/30 text-yellow-300"
                            >
                              {part.replace(/▌|▐/g, "")}
                            </span>
                          ) :
                          (
                            <span key={j}>{part}</span>
                          ),
                    )}
                    {matchType === "CONTENT" && (
                      <span className="text-xs text-gray-500 ml-2">[content match]</span>
                    )}
                  </button>
                  {matchType === "CONTENT" && snippet && (
                    <div className="text-gray-400 text-xs pl-4 border-l-2 border-gray-600">
                      {snippet.split(/(▌.*?▐)/g).map((part, j) =>
                        part.startsWith("▌") ?
                            (
                              <span
                                key={j}
                                className="bg-yellow-400/30 text-yellow-300"
                              >
                                {part.replace(/▌|▐/g, "")}
                              </span>
                            ) :
                            (
                              <span key={j}>{part}</span>
                            ),
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={i}>
                {line.split(/(▌.*?▐)/g).map((part, j) =>
                  part.startsWith("▌") ?
                      (
                        <span
                          key={j}
                          className="bg-yellow-400/30 text-yellow-300"
                        >
                          {part.replace(/▌|▐/g, "")}
                        </span>
                      ) :
                      (
                        <span key={j}>{part}</span>
                      ),
                )}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="relative border-t border-white/10 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-orange-400">$</span>
            <input
              ref={inputRef}
              value={command}
              onChange={e => setCommand(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Type a command..."
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute left-8 top-full mt-1 rounded bg-black border border-white/10 text-sm">
              {suggestions.map(s => (
                <div
                  key={s}
                  onClick={() => setCommand(`${s} `)}
                  className="px-2 py-1 cursor-pointer opacity-80 hover:opacity-100"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
