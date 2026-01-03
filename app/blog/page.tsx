import Link from "next/link";

import { getAllPosts } from "@lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto py-10 mb-5">
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
    </div>
  );
}
