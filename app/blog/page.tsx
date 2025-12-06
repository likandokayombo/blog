import Link from "next/link";

import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl py-10 mt-16 mx-auto px-4">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border-b border-gray-200 dark:border-white pb-4 text-white"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold  dark:text-gray-100 hover:text-blue-500 transition-colors"
            >
              {post.frontmatter.title}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {post.frontmatter.date}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
