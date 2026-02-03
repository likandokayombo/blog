"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Terminal from "@components/terminal";

type NavbarProps = {
  posts: { title: string; slug: string }[];
  changelog: string[];
};

export default function Navbar({ posts, changelog }: NavbarProps) {
  const [terminalVisible, setTerminalVisible] = useState(false);
  return (
    <>
      <nav className="fixed top-3 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="
              flex h-12 items-center justify-between
              rounded-xl
              bg-[#F24405]/60
              backdrop-blur-lg
              border border-white/30
              shadow-lg
              px-3
            "
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/images/ball.png"
                alt="Logo"
                width={20}
                height={20}
                className="object-contain"
              />
            </Link>

            {/* Terminal icon (custom image) */}
            <div
              className="cursor-pointer"
              onClick={() => setTerminalVisible(true)}
            >
              <Image
                src="/icons/terminal.svg"
                alt="Open Terminal"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </nav>
      {/* Terminal Panel */}
      <Terminal
        posts={posts}
        changelog={changelog}
        onClose={() => setTerminalVisible(false)}
        visible={terminalVisible}
      />
    </>
  );
}
