import type { Metadata } from "next";

import Link from "next/link";

import Hero from "@features/hero";
import { getAllPosts } from "@lib/mdx";

export const metadata: Metadata = {
  title: "Likando Kayombo Personal Blog",
  description: "I explore posts and stories about web development, UI design, and other topics I find interesting.",
};

export default function HomePage() {
  const posts = getAllPosts();

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
      new Date(date),
    );

  const postsByYear = posts.reduce(
    (acc: Record<string, typeof posts>, post) => {
      const year = new Date(post.frontmatter.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {},
  );

  return (
    <div className="bg-background mt-40">
      <Hero />

      <main className="max-w-2xl mx-auto px-4 pt-1 pb-3 sm:pt-4 sm:pb-6 mt-25">
        {Object.keys(postsByYear)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <div key={year} className="mb-7 mt-7 w-full">
              <h2 className="text-lg font-bold mb-3 text-[#8c92a4] md:text-center text-left">
                {year}
              </h2>

              <ul className="space-y-[2px] sm:space-y-3 flex flex-col items-start md:items-center w-full">
                {postsByYear[year].map((post) => (
                  <li key={post.slug} className="w-full">
                    <div className="pb-5 w-full">
                      <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-1 md:gap-4 w-full">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-[#8c92a4] hover:text-white transition md:text-center text-left"
                        >
                          {post.frontmatter.title}
                        </Link>

                        <h4 className="hidden md:block text-sm font-mono text-[#8c92a4]">
                          {formatDate(post.frontmatter.date)}
                        </h4>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </main>
    </div>
  );
}