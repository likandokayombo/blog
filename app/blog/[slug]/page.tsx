// // app/blog/[slug]/page.tsx
// import { getPostBySlug } from "@/lib/mdx"

// export default function PostPage({ params }: { params: { slug: string } }) {
//   const { slug } = params
//   const { frontmatter, content } = getPostBySlug(slug)

//   // For static rendering convert content to MDX component here (tools vary)
//   // Example pseudo: const MDXContent = compileMDX(content)
//   // return <MDXContent components={{ /* custom components */ }} />

//   return (
//     <article>
//       <h1>{frontmatter.title}</h1>
//       <p>{frontmatter.date}</p>
//       {/* Render MDX content (see chosen runtime/compiler) */}
//     </article>
//   )
// }




// import { getPostSlugs } from "@/lib/mdx";
// import path from "path";

// export async function generateStaticParams() {
//   return getPostSlugs().map((slug) => ({ slug: slug }));
// }

// export default async function PostPage({ params }: { params: { slug: string } }) {
//   const { slug } = params;

//   // Dynamic import of MDX file
//   const Post = (await import(`@/content/posts/${slug}.mdx`)).default;

//   return (
//     <article className="prose max-w-2xl mx-auto py-10">
//       <Post />
//     </article>
//   );
// }








// app/blog/[slug]/page.tsx
import { getPostSlugs } from "@/lib/mdx";

interface PostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  if (!params) {
    throw new Error("Params not provided!");
  }

  const { slug } = params;

  // Dynamic import of MDX
  const Post = (await import(`@/content/posts/${slug}.mdx`)).default;

  // Render MDX directly
  return <Post />;
}
