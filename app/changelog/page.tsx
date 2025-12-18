import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";

const CHANGELOG_PATH = path.join(process.cwd(), "content/site/changelog.mdx");

export default async function ChangelogPage() {
  const source = await fs.readFile(CHANGELOG_PATH, "utf8");

  const { content } = await compileMDX({ source });

  return (
    <article className="prose prose-invert mx-auto text-black py-12 mt-15">
      {content}
    </article>
  );
}
