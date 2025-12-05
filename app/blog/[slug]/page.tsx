// import { compileMDX } from "next-mdx-remote/rsc";
// import fs from "node:fs";
// import path from "node:path";

// import type { BlogPageProps } from "@/types/blog";

// import { components } from "@/mdx.components"; // import object directly

// export const dynamic = "force-static";

// export async function generateStaticParams() {
//   const postsDir = path.join(process.cwd(), "content/posts");

//   const slugs = fs
//     .readdirSync(postsDir)
//     .filter((file) => file.endsWith(".mdx"))
//     .map((file) => ({ slug: file.replace(".mdx", "") }));

//   return slugs;
// }

// export default async function PostPage({ params }: BlogPageProps) {
//   const { slug } = params;

//   // Read MDX file content
//   const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
//   const source = fs.readFileSync(filePath, "utf8");

//   // Compile MDX
//   const { content } = await compileMDX({ source, components });

//   return <main className="font-r max-w-2xl mx-auto py-10">{content}</main>;
// }

// app/blog/[slug]/page.tsx

import type { Metadata } from "next";

import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { components } from "@/mdx.components";

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
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
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

  return {
    title: typeof frontmatter?.title === "string" ? frontmatter.title : slug,
    description:
      typeof frontmatter?.description === "string"
        ? frontmatter.description
        : "",
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

  return <main className="font-r max-w-2xl py-10">{content}</main>;
}
