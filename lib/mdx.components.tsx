import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";
import { highlight } from "sugar-high";

// ✅ We don’t need date here anymore since PostPage handles it
export const components = {
  // Remove MDX h1 to prevent duplicate titles
  h1: () => null,

  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,

  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,

  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/")) return <Link href={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

  code: ({ children }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} />;
  },
};

export type MDXProvidedComponents = typeof components;

export function useMDXComponents() {
  return components;
}
