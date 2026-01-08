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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Main Content grows naturally */}
      <main className="flex-1 max-w-2xl mx-auto py-10 px-4 sm:px-6">
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-[#8c92a4] hover:text-white transition-colors duration-200"
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
