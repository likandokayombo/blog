"use client";

import type { ComponentPropsWithoutRef } from "react";

import Image from "next/image";

type ResponsiveImageProps = ComponentPropsWithoutRef<"img"> & {
  width?: number;
  height?: number;
  title?: string; // optional caption
};

/**
 * Responsive image component with optional caption
 * @param props - Component props
 * @param props.src - Image source URL
 * @param props.alt - Alternative text for accessibility
 * @param props.width - Image width for aspect ratio calculation
 * @param props.height - Image height for aspect ratio calculation
 * @param props.title - Optional caption text
 * @param props.className - Additional CSS classes
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  title,
  className,
  ...props
}: ResponsiveImageProps) {
  if (!src)
    return null;

  return (
    <figure className={`my-6 ${className ?? ""}`}>
      <div
        className="relative w-full"
        style={{ aspectRatio: width && height ? `${width}/${height}` : "16/9" }}
      >
        <Image
          src={String(src)}
          alt={alt ?? ""}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 800px"
          {...props}
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
