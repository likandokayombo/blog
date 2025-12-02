import type { ComponentProps } from "react";

declare module "*.mdx" {
  // Extend div props with a custom `title` prop
  type MDXProps = ComponentProps<"div"> & { title?: string };

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
}
