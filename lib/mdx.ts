import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const postsDir = path.join(process.cwd(), "content/posts");

/**
 * Get all post slugs from the content/posts directory
 * @returns Array of filenames ending in .mdx
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));
}

/**
 * Get a single post by its slug
 * @param slug - The post slug (without .mdx extension)
 * @returns Object containing slug, frontmatter, and content
 */
export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return { slug, frontmatter, content };
}

/**
 * Get all posts sorted by date (newest first)
 * @returns Array of posts with slug, frontmatter, and content
 */
export function getAllPosts() {
  return getPostSlugs()
    .map(filename => getPostBySlug(filename.replace(".mdx", "")))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

/**
 * Get all posts with their content for API consumption
 * @returns Array of posts with slug, title, content, description, and date
 */
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
