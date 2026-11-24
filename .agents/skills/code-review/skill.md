---
name: code-review
description: Review code for correctness, maintainability, TypeScript safety, Next.js patterns, accessibility, and regressions.
---

# Code Review Skill

Use this skill when reviewing code, pull requests, or proposed changes.

## Review Priority

Prioritize issues in this order:

1. Bugs
2. Security problems
3. Data loss or destructive behavior
4. Incorrect application behavior
5. TypeScript/type safety problems
6. Performance problems
7. Accessibility problems
8. Maintainability
9. Style

Do not focus on formatting when a functional issue exists.

## Next.js Review

Check for:

- Incorrect Server/Client Component usage
- Unnecessary client-side JavaScript
- Incorrect data fetching
- Broken routing
- Metadata problems
- Image optimization issues

## React Review

Check for:

- Incorrect state management
- Unnecessary re-renders
- Missing keys
- Incorrect effect dependencies
- Component responsibilities

## TypeScript Review

Check for:

- `any` — avoid unless there is a strong reason; prefer explicit types
- Unsafe casts — prefer proper type assertions or overloads
- Incorrect nullable handling — check optional types are handled correctly
- Missing types — ensure public APIs and reusable utilities have explicit types
- Suppressed errors — do not silence TypeScript errors with `@ts-ignore` unless absolutely necessary; fix the underlying type problem

## UI Review

Check for:

- Mobile responsiveness
- Accessibility
- Keyboard navigation
- Overflow
- Broken layouts
- Inconsistent styling

## MDX Review

Check for:

- Invalid MDX
- Broken links
- Incorrect components
- Broken code examples
- Heading hierarchy

## Review Output

For each important issue provide:

- Severity
- Location
- Problem
- Why it matters
- Recommended fix

Do not report hypothetical problems without evidence.
