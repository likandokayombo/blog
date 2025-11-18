// // app/blog/page.tsx
// import Link from "next/link"
// import { getAllPosts } from "@/lib/mdx"

// export default function BlogPage() {
//   const posts = getAllPosts()
//   return (
//     <main>
//       <h1>Blog</h1>
//       <ul>
//         {posts.map((p) => (
//           <li key={p.slug}>
//             <Link href={`/blog/${p.slug}`}>{p.frontmatter.title}</Link>
//             <span> — {p.frontmatter.date}</span>
//           </li>
//         ))}
//       </ul>
//     </main>
//   )
// }















import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="prose max-w-2xl mx-auto py-10">
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.frontmatter.title}
            </Link>
            <p className="text-gray-500 text-sm">{post.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
