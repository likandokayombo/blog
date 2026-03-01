import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const postsDir = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return { slug, frontmatter, content };
}

export function getAllPosts() {
  return getPostSlugs()
    .map(filename => getPostBySlug(filename.replace(".mdx", "")))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export function getAllPostsWithContent() {
  return getPostSlugs()
    .map(filename => {
      const slug = filename.replace(".mdx", "");
      const fullPath = path.join(postsDir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: frontmatter, content } = matter(fileContents);
      return {
        slug,
        title: frontmatter.title || "",
        content: content || "",
        description: frontmatter.description || "",
        date: frontmatter.date || "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
