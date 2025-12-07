// types/goba.d.ts
import type { ComponentType } from "react";

declare module "*.mdx" {
  const MDXComponent: ComponentType<any>;
  export default MDXComponent;
}
