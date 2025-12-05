import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";

import type { BlogPageProps } from "@/types/blog";

import { components } from "@/mdx.components"; // import object directly

export const dynamic = "force-static";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");

  const slugs = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(".mdx", "") }));

  return slugs;
}

export default async function PostPage({ params }: BlogPageProps) {
  const { slug } = params;

  // Read MDX file content
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");

  // Compile MDX
  const { content } = await compileMDX({ source, components });

  return <main className="font-r max-w-2xl mx-auto py-10">{content}</main>;
}
