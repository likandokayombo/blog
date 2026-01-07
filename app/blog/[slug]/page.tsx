import type { Metadata } from "next";
import type { ReactNode } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { components } from "@lib/mdx.components";

// --------------------
// 1. MDX loader with typed frontmatter
// --------------------
type PostFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
};
const getMdxContent = cache(async (slug: string) => {
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const compiled = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: true },
  });

  // Type frontmatter properly
  return {
    content: compiled.content,
    frontmatter: compiled.frontmatter as PostFrontmatter,
  };
});

// --------------------
// 2. Generate static params
// --------------------
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = await fs.readdir(postsDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(".mdx", "") }));
}

// --------------------
// 3. Metadata
// --------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getMdxContent(slug);

  return {
    title: frontmatter?.title ?? slug,
    description: frontmatter?.description ?? "",
  };
}

// --------------------
// 4. Page Component
// --------------------
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, frontmatter } = await getMdxContent(slug);

  return (
    <div className="max-w-2xl mx-auto py-10 text-[#8c92a4] px-4">
      {/* Title */}
      {frontmatter?.title && (
        <h1 className="serif text-white text-3xl md:text-4xl">
          {frontmatter.title}
        </h1>
      )}

      {/* Date */}
      {frontmatter?.date && (
        <h4 className="mono text-sm text-[#8c92a4] mt-[25px]">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h4>
      )}

      {/* MDX content */}
      <div className="mt-10">{content as ReactNode}</div>
    </div>
  );
}
