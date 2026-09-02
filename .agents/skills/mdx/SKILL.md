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

- Follow existing frontmatter conventions.
- Reuse existing MDX components.
- Do not introduce a new component for something already supported.
- Preserve Markdown semantics.
- Use valid MDX syntax.

## Headings

Maintain a logical heading hierarchy.

Avoid skipping heading levels without a reason.

## Code Blocks

Follow the existing syntax-highlighting implementation.

Do not introduce another syntax-highlighting library unless explicitly requested.

## Images

Follow the existing image component and image configuration.

Do not bypass the project's image handling without a reason.

## Debugging

If MDX fails to compile:

1. Check the syntax.
2. Check imported components.
3. Check JSX nesting.
4. Check frontmatter.
5. Compare against working MDX posts.
6. Only then modify the MDX infrastructure.