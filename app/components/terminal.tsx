"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Post = {
  title: string;
  slug: string;
};

type TerminalProps = {
  posts: Post[];
  changelog: string[];
  visible: boolean;
  onClose: () => void;
};

const COMMANDS = ["posts", "changelog", "open", "help", "clear", "exit", "q"];
const HISTORY_KEY = "terminal-history";

export default function Terminal({
  posts,
  changelog,
  visible,
  onClose,
}: TerminalProps) {
  const router = useRouter();

  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  /* ----------------------------- restore history ----------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored)
      setHistory(JSON.parse(stored));
  }, []);

  /* ----------------------------- persist history ----------------------------- */
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-50)));
  }, [history]);

  /* ---------------------------------- focus ---------------------------------- */
  useEffect(() => {
    if (visible)
      inputRef.current?.focus();
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
    if (!keyword)
      return text;

    const re = new RegExp(`(${keyword})`, "gi");
    return text.replace(re, "▌$1▐");
  };

  /* ------------------------------ run command -------------------------------- */
  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed)
        return;

      setOutput(prev => prev.concat(`$ ${trimmed}`));
      setHistory(prev => prev.concat(trimmed));
      setHistoryIndex(null);

      if (trimmed === "clear") {
        setOutput([]);
        return;
      }

      if (trimmed === "exit" || trimmed === "q") {
        onClose();
        return;
      }

      if (trimmed === "help") {
        setOutput(prev =>
          prev.concat(
            "Available commands:",
            "posts <keyword>      search blog posts",
            "open <slug|title>   open a post",
            "changelog <keyword> search changelog",
            "clear",
            "exit / q",
          ),
        );
        return;
      }

      if (trimmed.startsWith("posts")) {
        const keyword = trimmed.replace("posts", "").trim().toLowerCase();
        const matches = posts.filter(p =>
          p.title.toLowerCase().includes(keyword),
        );

        setOutput(prev =>
          prev.concat(
            matches.length ?
                matches.map(p =>
                  `POST::${highlight(p.title, keyword)}::${p.slug}`,
                ) :
              "No posts found",
          ),
        );
        return;
      }

      if (trimmed.startsWith("open")) {
        const query = trimmed.replace("open", "").trim().toLowerCase();

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

      if (trimmed.startsWith("changelog")) {
        const keyword = trimmed.replace("changelog", "").trim().toLowerCase();
        const matches = changelog.filter(c =>
          c.toLowerCase().includes(keyword),
        );

        setOutput(prev =>
          prev.concat(
            matches.length ?
                matches.map(c => highlight(c, keyword)) :
              "No changelog entries found",
          ),
        );
        return;
      }

      setOutput(prev => prev.concat(`Command not found: ${trimmed}`));
    },
    [posts, changelog, router, onClose],
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
      if (!history.length)
        return;

      const i =
        historyIndex === null ?
          history.length - 1 :
            Math.max(0, historyIndex - 1);

      setHistoryIndex(i);
      setCommand(history[i]);
      return;
    }

    if (e.key === "ArrowDown") {
      if (historyIndex === null)
        return;

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
  if (!visible)
    return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute bottom-6 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 rounded-lg bg-[#0d0d0d] text-white font-mono shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="text-sm opacity-80">Terminal</span>
          <button onClick={onClose} className="opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>

        {/* Output */}
        <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-1 text-sm">
          {output.map((line, i) => {
            if (line.startsWith("POST::")) {
              const [, title, slug] = line.split("::");

              return (
                <button
                  key={i}
                  onClick={() => router.push(`/blog/${slug}`)}
                  className="block text-left text-blue-400 hover:underline"
                >
                  POST {title.replace(/▌|▐/g, "")}
                </button>
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
