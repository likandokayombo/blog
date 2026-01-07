// import Link from "next/link";

// import { getAllPosts } from "@lib/mdx";

// export default function BlogPage() {
//   const posts = getAllPosts();

//   return (
//     <div className="max-w-2xl mx-auto py-10 mb-5">
//       <ul className="space-y-6">
//         {posts.map((post) => (
//           <li key={post.slug} className="  ">
//             <Link
//               href={`/blog/${post.slug}`}
//               className="text-xl font-semibold text-[#8c92a4]"
//             >
//               {post.frontmatter.title}
//             </Link>
//             <p className="text-sm text-[#8c92a4]  mt-1">
//               {post.frontmatter.date}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import Link from "next/link";

import { getAllPosts } from "@lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", // Jan
      day: "numeric", // 5
    }).format(new Date(date));
  };
  return (
    <div className="max-w-2xl mx-auto py-10 mb-5">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <div className="flex items-center justify-between">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-semibold text-[#8c92a4]"
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
    </div>
  );
}
