---
name: blog-post
description: Create, edit, improve, and review technical blog posts for the personal developer blog.
---

# Blog Post Skill

Use this skill whenever the task involves creating, editing, restructuring,
or reviewing a blog post.

## Before Writing

Inspect existing posts in:

`content/posts/`

Determine:

- Frontmatter format: each post has `title`, `date`, and `description` fields
- File naming convention: kebab-case slugs with `.mdx` extension (e.g., `how-to-pull-the-latest-commits-from-the-main-repository-into-your-fork.mdx`)
- Heading structure: posts use proper heading hierarchy (h1-h6), typically starting with an h1 or h2
- Writing style: technical posts should be clear, practical, conversational, and accurate
- Typical article length: medium-length technical posts (1-3 pages of content)
- Use of MDX components: project uses custom MDX components from `lib/mdx.components.tsx` (h1-h4 with color tags, a, img, code, blockquote)
- Code block conventions: fenced code blocks with language labels, syntax highlighting via Prism.js dark theme

## Writing Style

Technical posts should be:

- Clear
- Practical
- Conversational
- Technically accurate
- Easy to scan

Prefer explaining concepts with practical examples.

Avoid unnecessary jargon.

Do not make claims about a technology without verifying them when accuracy
depends on a specific version or current behavior.

## Structure

When appropriate, structure posts as:

1. Introduction
2. Problem
3. Explanation
4. Implementation
5. Example
6. Common mistakes
7. Conclusion

Do not force this structure when the topic does not require it.

## Code Examples

Code examples must:

- Be syntactically valid.
- Match the technologies discussed.
- Follow the repository's conventions.
- Avoid unnecessary complexity.

## Editing Existing Posts

Preserve the author's voice unless the user explicitly asks for a different
writing style.

When correcting a post:

- Fix grammar.
- Improve clarity.
- Preserve technical meaning.
- Avoid rewriting unnecessarily.

## Final Check

Before finishing:

- Verify frontmatter.
- Verify headings.
- Verify code blocks.
- Verify links.
- Verify MDX syntax.
- Check for accidental broken formatting.
