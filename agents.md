# Blog — Agent Instructions

## Project Overview

This repository contains Likando Kayombo's personal developer blog.

The project is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- MDX
- pnpm

The blog focuses primarily on software development, web development,
programming, and technical writing.

## General Rules

- Use TypeScript for application code.
- Follow the existing project architecture before introducing new patterns.
- Prefer existing components and utilities over creating duplicates.
- Keep implementations simple and maintainable.
- Do not introduce a dependency unless it is necessary.
- Do not rewrite working code without a clear reason.
- Preserve existing functionality when making changes.
- Avoid unnecessary abstractions.
- Keep changes focused on the requested task.

## Package Manager

Use `pnpm`.

Do not use npm or yarn unless explicitly requested.

Common commands:

```bash
pnpm dev
pnpm build
pnpm lint
```

## Next.js

Follow the existing App Router architecture.
Prefer Server Components by default.
Use "use client" only when client-side functionality is required.
Do not turn an entire component tree into Client Components unnecessarily.
Follow the project's existing conventions for layouts, metadata, routing,
and data fetching.

## React

Use functional components.
Use TypeScript.
Prefer composition over unnecessarily complex component hierarchies.
Keep components focused on one responsibility.
Reuse existing components whenever possible.

## TypeScript

Avoid `any` unless there is a strong reason.
Prefer explicit types for public APIs and reusable utilities.
Do not silence TypeScript errors with `@ts-ignore` unless absolutely necessary.
Fix the underlying type problem whenever practical.

## Tailwind CSS

Follow the existing Tailwind conventions in the repository.
Reuse existing utility patterns.
Avoid introducing custom CSS when Tailwind utilities are sufficient.
Do not add a UI library just to solve a small styling problem.

## MDX

Blog posts live under:

`content/posts/`

Before creating or modifying an MDX post:

Inspect existing posts.
Follow the existing frontmatter structure.
Follow the existing naming conventions.
Reuse existing MDX components.
Preserve the established typography and formatting.
Keep technical explanations accurate and practical.

## Components

Before creating a new component:

Search the existing `components/` directory.
Check whether an existing component can be reused.
Only create a new component if the existing components do not satisfy
the requirement.

## Styling

The visual style should remain:

- Clean
- Minimal
- Developer-focused
- Responsive
- Accessible
- Easy to read

Do not add unnecessary animations or visual effects.

## Accessibility

Interactive elements must be keyboard accessible.
Images should have meaningful alt text when appropriate.
Do not use color as the only way to communicate information.

## Code Changes

Before modifying code:

Inspect the relevant files.
Understand the existing implementation.
Make the smallest reasonable change.
Check related components and utilities.
Run relevant checks.

After modifying code:

Run lint when available.
Run TypeScript/build checks when appropriate.
Check for broken imports.
Check responsive behavior when changing UI.

## Git

Keep commits focused.
Do not modify unrelated files.
Do not remove existing functionality unless explicitly requested.

Never commit:

- `.env`
- secrets
- API keys
- credentials
- private tokens

## Agent Behavior

When a task is ambiguous:

Inspect the repository first.
Prefer existing patterns over inventing new ones.
Ask for clarification only when the ambiguity materially affects the implementation.

When proposing a solution:

Explain the approach briefly.
Make the required changes.
Verify the changes.
Report what changed and any remaining issues.
