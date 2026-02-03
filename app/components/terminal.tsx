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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setOutput((prev) => prev.concat(`> ${trimmed}`));

    if (trimmed === "clear") return setOutput([]);

    if (trimmed === "exit" || trimmed === "q") return onClose();

    if (trimmed === "help") {
      return setOutput((prev) =>
        prev.concat(
          "Available commands:",
          "posts <keyword>",
          "changelog <keyword>",
          "clear",
          "exit / q",
        ),
      );
    }

    if (trimmed.startsWith("posts")) {
      const k = trimmed.replace("posts", "").trim().toLowerCase();
      const m = posts.filter((p) => p.title.toLowerCase().includes(k));
      return setOutput((prev) =>
        prev.concat(
          m.length ? m.map((p) => `POST  ${p.title}`) : "No posts found",
        ),
      );
    }

    if (trimmed.startsWith("changelog")) {
      const k = trimmed.replace("changelog", "").trim().toLowerCase();
      const m = changelog.filter((c) => c.toLowerCase().includes(k));
      return setOutput((prev) =>
        prev.concat(
          m.length ? m.map((c) => `LOG   ${c}`) : "No changelog entries found",
        ),
      );
    }

    setOutput((prev) => prev.concat(`Command not found: ${trimmed}`));
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute bottom-6 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 rounded-lg bg-[#0d0d0d] text-white shadow-xl font-mono">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="text-sm opacity-80">Terminal</span>
          <button
            type="button"
            onClick={onClose}
            className="text-sm opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* Output */}
        <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-1 text-sm">
          {output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-2 border-t border-white/10">
          <span className="text-orange-400">$</span>
          <input
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                runCommand(command);
                setCommand("");
              }
              if (e.key === "Escape") onClose();
            }}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
}
