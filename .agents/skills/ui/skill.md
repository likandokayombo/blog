---
name: ui
description: Build and modify responsive UI components using React and Tailwind CSS while preserving the blog's visual system.
---

# UI Skill

Use this skill when creating or modifying visual components.

## Before Creating UI

Inspect:

- Existing components in the codebase (no separate `components/` directory; UI is built inline in `app/core/components/`)
- Existing layout components (navbar, footer, terminal, hero)
- Existing typography and color usage (Tailwind classes, color tags `-#[...]` in MDX)
- Existing spacing patterns (Tailwind margin/padding values like `mt-7`, `mb-7`, `px-6`)
- Existing responsive behavior (md: prefixes, sm: prefixes, overflow handling)

Reuse existing patterns whenever possible.

## Design Principles

The UI should be:

- Minimal — follow the blog's clean, developer-focused aesthetic
- Clean — minimal visual noise, prioritize content readability
- Responsive — mobile-first approach with `md:` breakpoints for desktop enhancements
- Accessible — keyboard navigation, focus states, meaningful alt text
- Consistent — reuse established patterns and conventions
- Content-focused — UI should enhance, not distract from, the technical content

Avoid unnecessary visual complexity or animations.

## Tailwind

Use Tailwind utilities following the project's existing conventions:

- Color palette: `#3c93ff`, `#8c92a4`, `#F24405` (orange), `#0b1c2d` (dark blue), `#ffcc00` (yellow)
- Custom color tags: MDX supports `-#[a-f0-9]{3,6}` pattern for heading colors (e.g., `-#[ffffff]`)
- Utility patterns: `mt-10`, `mb-4`, `text-2xl`, `font-semibold`, `max-w-2xl`, `mx-auto`
- Composition: prefer utility composition over large custom CSS blocks

## Responsive Design

Design for:

- Mobile — default stack layout, full-width elements
- Tablet — `md:` breakpoint (typically 768px) for side-by-side or refined layouts
- Desktop — `lg:`/`xl:` breakpoints for further refinements

Do not assume desktop-only layouts — test mobile behavior.

Avoid horizontal overflow — use `max-w-2xl`, `mx-auto`, or `w-full` with appropriate constraints.

## Components

Keep components focused on one responsibility.

The project's UI is built from these core components (all in `app/core/components/`):

- `navbar.tsx` — navigation with dark mode awareness
- `footer.tsx` — footer links and info
- `terminal.tsx` — terminal-style output component
- `hero.tsx` — homepage hero section

Prefer composition over large components containing unrelated functionality.

For MDX content rendering, use the custom components from `lib/mdx.components.tsx` (h1-h4 with color tags, a, code, blockquote, img).

## Accessibility

Interactive elements must:

Have meaningful accessible names (visible text or aria-label).
Be keyboard accessible (focusable, logical tab order).
Have appropriate focus states (Tailwind `outline`, `ring` utilities).

Images should use appropriate alt text when the image conveys information.

Do not use color as the only way to communicate information.

## Animations

Do not introduce animation libraries unless explicitly requested.

Prefer simple CSS transitions when animation is necessary (use Tailwind `transition` and `duration-*` classes).

Visual changes should not introduce motion that could cause vestibular issues.

## Visual Changes

When modifying existing UI:

Preserve existing visual identity (color palette, typography, spacing).

Avoid changing unrelated components — modify only the target component.

Check mobile layouts at the narrowest width, then at `md:` breakpoint.

Check typography and spacing — ensure line heights, font sizes, and margins remain consistent with the established scale.

Review Tailwind class patterns to ensure they follow project conventions (e.g., `mt-[70px]` vs `mt-7`, `text-[<size>]` vs `text-<size>`).
