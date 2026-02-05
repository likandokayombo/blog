import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import Link from "next/link";
import { highlight } from "sugar-high";

import CodeBlock from "./code-block";
import MDXImage from "./mdx-image"; // client wrapper

export const components = {
  h1: (() => null) as FC,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 {...props} className="text-[#ffcc00]" />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-6 border-l-2 border-[#3c93ff] pl-4 text-[#3c93ff] tracking-wide">
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { href?: string }) => {
    const baseClass =
      "text-[#3c93ff] hover:opacity-80 transition inline-flex items-center gap-1";
    if (href?.startsWith("/"))
      return <Link href={href} className={baseClass}>{children}</Link>;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...props}
      >
        {children}
      </a>
    );
  },
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

  // ✅ All MDX images rendered via client wrapper with proper type handling
  img: (props: ComponentPropsWithoutRef<"img">) => {
    if (!props.src)
      return null;

    return (
      <MDXImage
        src={String(props.src)} // convert string | Blob | undefined to string
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
