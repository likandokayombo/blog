"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SVG_SIZE = 42;
const CENTER = 21;
const RADIUS = 15;
const STROKE_WIDTH = 4;

export default function Navbar() {
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/blog/");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBlogPost) {
      return;
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(Math.min(scrollY / docHeight, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBlogPost]);

  const angle = progress * 2 * Math.PI;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + angle;

  const x1 = CENTER + RADIUS * Math.cos(startAngle);
  const y1 = CENTER + RADIUS * Math.sin(startAngle);
  const x2 = CENTER + RADIUS * Math.cos(endAngle);
  const y2 = CENTER + RADIUS * Math.sin(endAngle);

  const largeArcFlag = angle > Math.PI ? 1 : 0;

  const d = progress
    ? `M ${CENTER} ${CENTER}
     L ${x1} ${y1}
     A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2}
     Z`
    : null;

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
          <Link href="/" className="flex items-center">
            <Image
              src="/images/ball.png"
              alt="Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </Link>

          {isBlogPost && (
            <svg
              width={SVG_SIZE}
              height={SVG_SIZE}
              className="rotate-[-90deg] drop-shadow-lg"
            >
              {d && <path d={d} fill="yellow" />}

              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
}
