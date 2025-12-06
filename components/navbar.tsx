"use client";

import Image from "next/image";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 shadow-md bg-[#121212]/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Center: Navigation links */}
          <div className="flex space-x-4">
            <Link
              href="/about"
              className="text-gray-100 hover:text-blue-400 transition-colors ml-50"
            >
              About
            </Link>
          </div>

          {/* Right: GitHub icon */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-blue-400 transition-colors"
            >
              <FiGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
