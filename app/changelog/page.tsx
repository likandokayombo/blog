import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";

const CHANGELOG_PATH = path.join(process.cwd(), "content/site/changelog.mdx");

export default async function ChangelogPage() {
  const source = await fs.readFile(CHANGELOG_PATH, "utf8");

  const { content } = await compileMDX({ source });

  return (
    <article className="mx-auto py-12 px-4 bg-background text-[#8c92a4] text-sm font-mono">
      <div className="prose prose-invert max-w-none">
        {/* Override h2 (MDX ##) to white */}
        <style>
          {`
            .prose h2 {
              color: #ffffff;
            }
          `}
        </style>

        {content}
      </div>
    </article>
  );
}
