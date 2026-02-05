"use client";

import type { ComponentPropsWithoutRef } from "react";

import Image from "next/image";

type MDXImageProps = ComponentPropsWithoutRef<"img"> & {
  width?: number;
  height?: number;
  title?: string; // caption
};

export default function MDXImage({ src, alt, width, height, title }: MDXImageProps) {
  if (!src)
    return null;

  return (
    <figure className="my-6">
      <div
        className="relative w-full"
        style={{
          aspectRatio: width && height ? `${width}/${height}` : "16/9",
        }}
      >
        <Image
          src={String(src)}
          alt={alt ?? ""}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {title && (
        <figcaption className="text-center text-sm text-gray-400 mt-1">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
