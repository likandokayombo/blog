"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-[#121212] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo on the left */}
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
        </div>
      </div>
    </nav>
  );
}
