---
name: mdx
description: Work with MDX files, MDX components, syntax, formatting, and content rendering in this blog.
---

# MDX Skill

Use this skill when modifying MDX files or the MDX rendering system.

## Content Location

Blog content is stored under:

`content/posts/`

## Before Making Changes

Inspect:

- Existing MDX posts
- MDX component definitions
- MDX configuration
- Markdown/MDX utilities
- Styling applied to rendered content

## Rules

- Follow existing frontmatter conventions: posts use `title`, `date` (ISO string), and `description` fields
- Reuse existing MDX components from `lib/mdx.components.tsx` (h1-renders-null, h2/h3/h4 with color tag support, a, img, code, blockquote)
- Do not introduce a new component for something already supported (e.g., use existing h2/h3/h4 with color tags instead of creating new heading components)
- Preserve Markdown semantics and valid MDX syntax
- Images should use the `img` component from `lib/mdx.components.tsx` which wraps `MDXImage` with proper alt, width, and height

## Headings

Maintain a logical heading hierarchy.

Avoid skipping heading levels without a reason.

Note: h1 component renders null to prevent duplicate title rendering; use h2-h6 for section headings.

## Code Blocks

Follow the existing syntax-highlighting implementation using `CodeBlock` component from `lib/code-block.tsx` with Prism.js dark theme.

Do not introduce another syntax-highlighting library unless explicitly requested.

## Images

Follow the existing image component and image configuration.

The project uses `MDXImage` from `lib/mdx-image.tsx` for optimized image rendering; wrap with the `img` component from MDX components.

Do not bypass the project's image handling without a reason.

## Debugging

If MDX fails to compile:

1. Check the syntax and frontmatter (title, date, description).
2. Check imported components and their props.
3. Check JSX nesting and MDX component usage.
4. Compare against working MDX posts in `content/posts/`.
5. Only then modify the MDX infrastructure.
