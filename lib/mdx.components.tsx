import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { highlight } from "sugar-high";

import CodeBlock from "./code-block";
import MDXImage from "./mdx-image";

/**
 * MDX custom components
 */
export const components = {
  // Prevent duplicate title rendering
  h1: (() => null) as FC,

  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold" {...props} />
  ),

  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />
  ),

  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-[#ffcc00]" {...props} />
  ),

  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="leading-7 my-4" {...props} />
  ),

  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-6 border-l-2 border-[#3c93ff] pl-4 text-[#3c93ff] tracking-wide italic">
      {children}
    </blockquote>
  ),

  /**
   * Links with external icon
   */
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { href?: string }) => {
    const baseClass =
      "text-[#3c93ff] hover:opacity-80 transition inline-flex items-center gap-1 group";

    const externalIcon = (
      <Image
        src="/icons/Vector.svg"
        alt=""
        width={12}
        height={12}
        aria-hidden
        className="inline-block translate-y-[1px] group-hover:translate-x-0.5 transition-transform"
      />
    );

    // Internal links → no icon
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      );
    }

    // External links → icon added
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...props}
      >
        {children}
        {externalIcon}
      </a>
    );
  },

  /**
   * Inline & block code
   */
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const isBlock = className?.startsWith("language-");

    // Inline code
    if (!isBlock) {
      const codeHTML = typeof children === "string" ? highlight(children) : "";
      return (
        <code
          className="bg-[#0b1c2d] text-[#F24405] px-1 rounded text-sm"
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
        />
      );
    }

    // Block code
    if (typeof children !== "string")
      return null;
    return <CodeBlock>{children}</CodeBlock>;
  },

  /**
   * Images (MDX compatible)
   */
  img: (props: ComponentPropsWithoutRef<"img">) => {
    if (!props.src)
      return null;

    return (
      <MDXImage
        src={String(props.src)}
        alt={props.alt}
        title={props.title}
        width={props.width ? Number(props.width) : undefined}
        height={props.height ? Number(props.height) : undefined}
      />
    );
  },
};

export type MDXProvidedComponents = typeof components;

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
