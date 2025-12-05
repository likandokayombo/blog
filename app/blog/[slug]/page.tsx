// // app/blog/[slug]/page.tsx
// import { getPostSlugs } from "@/lib/mdx";

// interface PostPageProps {
//   params: { slug: string };
// }

// export async function generateStaticParams() {
//   return getPostSlugs().map((slug) => ({ slug }));
// }

// export default async function PostPage({ params }: PostPageProps) {
//   if (!params) {
//     throw new Error("Params not provided!");
//   }

//   const { slug } = params;

//   // Dynamic import of MDX
//   const Post = (await import(`@/content/posts/${slug}.mdx`)).default;

//   // Render MDX directly
//   return <Post />;
// }

import fs from "node:fs";
import path from "node:path";

import type { BlogPageProps } from "@/types/blog";

import Prose from "@/components/prose";

// Make route static
export const dynamic = "force-static";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");

  const slugs = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(".mdx", ""),
    }));

  return slugs;
}

export default async function PostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  // Compile MDX on server only once (static)
  const Post = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    // <article className="prose dark:prose-invert mx-auto">
    //   <Post />
    // </article>

    <div className="px-4 py-10 bg-red">
      <Prose>
        <Post />
      </Prose>
    </div>
  );
}
