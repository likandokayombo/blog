import type { Metadata } from "next";

import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { components } from "@lib/mdx.components";

// ---------------------------------------------
// 1. Cached MDX loader
// ---------------------------------------------
const getMdxContent = cache(async (slug: string) => {
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  return compileMDX({
    source,
    components,
    options: { parseFrontmatter: true },
  });
});

// ---------------------------------------------
// 2. Generate static params (SSG)
// ---------------------------------------------
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = await fs.readdir(postsDir);

  return files
    .filter((file: string) => file.endsWith(".mdx"))
    .map((file: string) => ({
      slug: file.replace(".mdx", ""),
    }));
}

// ---------------------------------------------
// 3. Metadata (TypeScript-safe)
// ---------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getMdxContent(slug);

  const description =
    typeof frontmatter?.description === "string" ? frontmatter.description : "";

  return {
    title: typeof frontmatter?.title === "string" ? frontmatter.title : slug,
    description,
  };
}

// ---------------------------------------------
// 4. Page Component
// ---------------------------------------------
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content } = await getMdxContent(slug);

  return (
    <div className="max-w-2xl mx-auto py-10 mb-5 text-black px-4">
      {content}
    </div>
  );
}
