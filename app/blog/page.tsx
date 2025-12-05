import Link from "next/link";

import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="font-r max-w-2xl mx-auto py-10">
      <h1 className="text-blue">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
            <p className="text-red text-sm">{post.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
