"use client";

import { useEffect, useRef, useState } from "react";

type TerminalProps = {
  posts: { title: string; slug: string }[];
  changelog: string[];
  onClose: () => void;
  visible: boolean;
};

export default function Terminal({
  posts,
  changelog,
  onClose,
  visible,
}: TerminalProps) {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // ----------------------------
  // Command runner (DEFINE FIRST)
  // ----------------------------
  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();

    setOutput((prev) => [...prev, `:${trimmed}`]);

    if (trimmed === "q" || trimmed === "quit") {
      onClose();
      return;
    }

    if (trimmed === "help") {
      setOutput((prev) => [
        ...prev,
        "Commands:",
        ":posts <keyword>      search blog posts",
        ":changelog <keyword>  search changelog",
        ":q                    quit",
      ]);
      return;
    }

    if (trimmed.startsWith("posts")) {
      const keyword = trimmed.replace("posts", "").trim().toLowerCase();
      const matches = posts.filter((p) =>
        p.title.toLowerCase().includes(keyword),
      );

      setOutput((prev) =>
        matches.length
          ? [...prev, ...matches.map((p) => `POST  ${p.title}`)]
          : [...prev, "No posts found"],
      );
      return;
    }

    if (trimmed.startsWith("changelog")) {
      const keyword = trimmed.replace("changelog", "").trim().toLowerCase();
      const matches = changelog.filter((c) =>
        c.toLowerCase().includes(keyword),
      );

      setOutput((prev) =>
        matches.length
          ? [...prev, ...matches.map((c) => `LOG   ${c}`)]
          : [...prev, "No changelog entries found"],
      );
      return;
    }

    setOutput((prev) => [...prev, `Unknown command: ${trimmed}`]);
  };

  // Auto-focus terminal
  useEffect(() => {
    if (visible) containerRef.current?.focus();
  }, [visible]);

  // Key handling (vim-like)
  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Enter") {
        runCommand(command);
        setCommand("");
        e.preventDefault();
        return;
      }

      if (e.key === "Backspace") {
        setCommand((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setCommand((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [command, visible, runCommand, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div
        ref={containerRef}
        tabIndex={0}
        className="
          h-full w-full
          bg-[#0d0d0d]
          text-white
          font-mono
          p-6
          outline-none
          overflow-y-auto
        "
      >
        <div className="space-y-1 mb-4">
          {output.map((line, i) => (
            <div key={i} className="text-sm">
              {line}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <span className="text-orange-500 mr-2">:</span>
          <span>{command}</span>
          <span className="ml-1 animate-pulse">▌</span>
        </div>
      </div>
    </div>
  );
}
