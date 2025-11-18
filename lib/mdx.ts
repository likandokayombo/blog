// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDir = path.join(process.cwd(), "content/posts");

// export function getPostSlugs() {
//   return fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
// }

// export function getPostBySlug(slug: string) {
//   const fullPath = path.join(postsDir, slug + ".mdx");
//   const file = fs.readFileSync(fullPath, "utf8");

//   const { data: frontmatter, content } = matter(file);

//   return { slug, frontmatter, content };
// }

// export function getAllPosts() {
//   return getPostSlugs()
//     .map((filename) => {
//       const slug = filename.replace(".mdx", "");
//       return getPostBySlug(slug);
//     })
//     .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
// }













































import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, slug + ".mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter } = matter(fileContents);
  return { slug, frontmatter };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((filename) => getPostBySlug(filename.replace(".mdx", "")))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}
