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
    <div className="bg-background mt-40">
      <Hero />

      <main
        className="
          max-w-2xl mx-auto
          px-4
          pt-1 pb-3
          sm:pt-4 sm:pb-6 mt-25
        "
      >
        <ul className="space-y-[2px] sm:space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="flex items-center justify-between py-[2px] sm:py-1">
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
