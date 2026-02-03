"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/blog/");

  const [progress, setProgress] = useState(0);

  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isBlogPost) {
      return;
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress = Math.min(scrollY / docHeight, 1);
      setProgress(scrollProgress);

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBlogPost]);

  const radius = 15;

  const angle = progress * 2 * Math.PI;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + angle;
  const x1 = 21 + radius * Math.cos(startAngle);
  const y1 = 21 + radius * Math.sin(startAngle);
  const x2 = 21 + radius * Math.cos(endAngle);
  const y2 = 21 + radius * Math.sin(endAngle);
  const largeArcFlag = angle > Math.PI ? 1 : 0;
  const d =
    progress > 0
      ? // eslint-disable-next-line style/operator-linebreak, operator-linebreak
        `M 21 21 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
      : // eslint-disable-next-line style/operator-linebreak, operator-linebreak
        "";

  return (
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
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/ball.png"
              alt="Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </Link>

          {/* Scroll Progress Indicator (blog only) */}
          {isBlogPost && (
            <div className="relative flex items-center justify-center">
              <svg
                width="42"
                height="42"
                className="rotate-[-90deg] drop-shadow-lg"
              >
                {/* Yellow Progress Fill */}
                <path d={d} fill="yellow" />

                {/* Track */}
                <circle
                  cx="21"
                  cy="21"
                  r={radius}
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
