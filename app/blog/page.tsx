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
              {/* Centered Year heading */}
              <h2 className="text-lg font-bold mb-3  text-[#8c92a4] text-center">
                {year}
              </h2>

              {/* Posts list */}
              <ul className="space-y-[2px] sm:space-y-3 flex flex-col items-center w-full">
                {postsByYear[year].map((post) => (
                  <li key={post.slug} className="w-full">
                    <div className="pb-5 w-full">
                      <div className="flex justify-center items-center w-full md:w-auto md:mx-auto gap-4">
                        {/* Post title */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-[#8c92a4] hover:text-white transition text-center"
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
