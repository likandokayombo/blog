import Link from "next/link";

import Hero from "@components/hero";
import { getAllPosts } from "@lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
      new Date(date),
    );

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Blog Posts */}
      <main className="max-w-2xl mx-auto mt-[10px] pt-3 pb-4 px-4">
        <ul className="space-y-1">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-[#8c92a4] hover:text-white transition"
                >
                  {post.frontmatter.title}
                </Link>

                <h4 className="text-sm font-mono text-[#8c92a4] ml-4">
                  {formatDate(post.frontmatter.date)}
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
