---
name: nextjs
description: Develop and maintain the Next.js application using the repository's existing App Router architecture and conventions.
---

# Next.js Skill

Use this skill when modifying the Next.js application.

## Architecture

Inspect the existing application structure before making changes.

Follow the existing App Router architecture (`app/` directory).

Do not introduce Pages Router patterns into the application.

## Server Components

Prefer Server Components by default.

The project uses Server Components for: data fetching, page rendering, and metadata.

Use Client Components only when necessary for:

- React state (useState, useReducer)
- Event handlers
- Browser APIs (localStorage, window)
- Client-side hooks (useRef, useImperativeHandle)
- Interactive UI (forms, modals, dropdowns)

Avoid adding `"use client"` unnecessarily — inspect `app/page.tsx`, `app/blog/[slug]/page.tsx`, and other files to confirm the pattern.

## Data Fetching

Follow the existing data-fetching strategy using `@lib/mdx` utilities:

- `getAllPosts()` — returns all posts sorted by date (newest first)
- `getPostBySlug(slug)` — returns a single post by slug
- `getAllPostsWithContent()` — returns posts with title, description, date for API consumption

Do not introduce a new data-fetching library for a small feature.

## Routing

Follow the existing route structure under `app/`:

- `/` — homepage with blog posts grouped by year
- `/blog/[slug]` — individual post pages
- `/changelog` — changelog page

Do not restructure routes unless the task requires it.

## Metadata

Use the existing metadata patterns from `app/page.tsx` and `app/blog/[slug]/page.tsx`:

- Title: "Likando Kayombo Personal Blog"
- Description: "I explore posts and stories about web development, UI design, and other topics I find interesting"
- Open Graph image: `app/opengraph-image.png`

Do not duplicate metadata configuration across unrelated files.

## Performance

Prefer:

- Server Components (default for `app/` directory)
- Static rendering (SSG) for blog posts
- Existing Next.js optimizations (image optimization, font optimization)
- Optimized images via `next/image` and `lib/responsive-image.tsx`
- Minimal client-side JavaScript

Avoid premature optimization.

## Dependencies

Before installing a package:

1. Check whether the functionality already exists in the project or can be provided by Next.js/browser APIs
2. Check whether `next/image`, Tailwind CSS, or existing utilities provide the required functionality
3. Check existing dependencies in `package.json`

Only add a dependency when it provides meaningful value and no suitable alternative exists.
