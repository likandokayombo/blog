import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import Link from "next/link";
import { highlight } from "sugar-high";

// ✅ We don’t need date here anymore since PostPage handles it
export const components = {
  // Remove MDX h1 to prevent duplicate titles
  h1: (() => null) as FC, // typed as a functional component

  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,

  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,

  a: ({
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<"a"> & { href?: string }) => {
    if (href?.startsWith("/")) return <Link href={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

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
