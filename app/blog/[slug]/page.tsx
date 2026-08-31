import type { Metadata } from "next";
import type { ReactNode } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { components } from "@lib/mdx.components";
import { getPostBySlug } from "@lib/mdx";

// --------------------
// 1. MDX loader with typed frontmatter
// --------------------
type PostFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
};

/**
 * Load and compile MDX content for a post
 * @param slug - Post slug
 * @returns Compiled MDX content and frontmatter
 */
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
/**
 * Generate static params for all blog posts
 * @returns Array of slug parameters for static generation
 */
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
/**
 * Generate metadata for a blog post
 * @param props - Component props
 * @param props.params - Route parameters containing the slug
 * @returns Metadata object for the post
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post?.frontmatter?.title) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist",
      };
    }

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description ?? "",
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description ?? "",
        images: post.frontmatter.image ? [post.frontmatter.image] : [],
      },
    };
  }
  catch {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

// --------------------
// 4. Page Component
// --------------------
/**
 * Blog post page component
 * @param props - Component props
 * @param props.params - Route parameters containing the slug
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, frontmatter } = await getMdxContent(slug);

  return (
    <div className="max-w-2xl mx-auto py-10 text-[#8c92a4] px-4 mt-20">
      {/* Title */}
      {frontmatter?.title && (
        <h1 className="text-white text-[5rem] md:text-[5rem] lg:text-[6rem] leading-tight">
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
