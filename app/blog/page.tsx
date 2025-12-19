import Link from "next/link";

import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl py-10 mt-16 mb-5 px-4">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="  text-black">
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold text-black"
            >
              {post.frontmatter.title}
            </Link>
            <p className="text-sm text-gray-800  mt-1">
              {post.frontmatter.date}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
