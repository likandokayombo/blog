// import { ComponentType } from "react";

// declare module '*.mdx' {
//   const MDXComponent: ComponentType<Record<string, unknown>>;
//   export default MDXComponent;
// }

import type { ComponentProps } from "react";

declare module "*.mdx" {
  const MDXComponent: (props: ComponentProps<"div">) => JSX.Element;
  export default MDXComponent;
}
