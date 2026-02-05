// lib/mdx-image.tsx
"use client";

import type { ComponentPropsWithoutRef } from "react";

import Image from "next/image";

type MDXImageProps = ComponentPropsWithoutRef<"img">;

export default function MDXImage({ src, alt }: MDXImageProps) {
  if (!src)
    return null;

  return (
    <Image
      src={String(src)}
      alt={alt ?? ""}
      width={800}
      height={450}
      sizes="(max-width: 768px) 100vw, 800px"
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "inline-block", // 👈 critical
      }}
    />
  );
}
