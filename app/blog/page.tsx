import Link from "next/link";

import Hero from "@components/hero";
import { getAllPosts } from "@lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
      new Date(date),
    );

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc: Record<string, typeof posts>, post) => {
      const year = new Date(post.frontmatter.date).getFullYear().toString();
      // eslint-disable-next-line antfu/if-newline
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
          .sort((a, b) => Number(b) - Number(a)) // latest year first
          .map((year) => (
            <div key={year} className="mb-7 mt-7 w-full">
              {/* Year heading - left on mobile, center on desktop */}
              <h2 className="text-lg font-bold mb-3 text-[#8c92a4] md:text-center text-left">
                {year}
              </h2>

              {/* Posts list - left aligned on mobile, centered on desktop */}
              <ul className="space-y-[2px] sm:space-y-3 flex flex-col items-start md:items-center w-full">
                {postsByYear[year].map((post) => (
                  <li key={post.slug} className="w-full">
                    <div className="pb-5 w-full">
                      <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-1 md:gap-4 w-full">
                        {/* Post title - left on mobile, center on desktop */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-[#8c92a4] hover:text-white transition md:text-center text-left"
                        >
                          {post.frontmatter.title}
                        </Link>

                        {/* FormatDate: only shows on desktop */}
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
