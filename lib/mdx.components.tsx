import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { highlight } from "sugar-high";

export const components = {
  // Remove MDX h1 to prevent duplicate titles
  h1: (() => null) as FC,

  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 {...props} className="text-[#ffcc00]" />
  ),

  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,

  /* ✅ QUOTED WORDS */
  blockquote: ({ children }: { children: ReactNode }) => (
    <h4 className="my-6 text-[#3c93ff] mon tracking-wide">
      “{children}”
    </h4>
  ),

  /* ✅ Links with icon */
  a: ({
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<"a"> & { href?: string }) => {
    const baseClass =
      "text-[#3c93ff]  hover:opacity-80 transition inline-flex items-center gap-1";

    // Internal link (relative)
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      );
    }

    // External link: add icon
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...props}
      >
        {children}
        <Image
          src="/icons/Vector.svg"
          alt="custom icon"
          width={10}
          height={10}
          className="inline-block white"
        />
      </a>
    );
  },

  /* ✅ Inline code */
  code: ({
    children,
    ...props
  }: ComponentPropsWithoutRef<"code"> & { children?: ReactNode }) => {
    const codeHTML = typeof children === "string" ? highlight(children) : "";
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
};

export type MDXProvidedComponents = typeof components;

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
