---
name: nextjs
description: Develop and maintain the Next.js application using the repository's existing App Router architecture and conventions.
---

# Next.js Skill

Use this skill when modifying the Next.js application.

## Architecture

Inspect the existing application structure before making changes.

Follow the existing App Router architecture.

Do not introduce Pages Router patterns into the application.

## Server Components

Prefer Server Components by default.

Use Client Components only when necessary for:

- React state
- Event handlers
- Browser APIs
- Client-side hooks
- Interactive UI

Avoid adding `"use client"` unnecessarily.

## Data Fetching

Follow the existing data-fetching strategy.

Do not introduce a new data-fetching library for a small feature.

## Routing

Follow the existing route structure.

Do not restructure routes unless the task requires it.

## Metadata

Use the existing metadata patterns.

Do not duplicate metadata configuration across unrelated files.

## Performance

Prefer:

- Server Components
- Static rendering where appropriate
- Existing Next.js optimizations
- Optimized images
- Minimal client-side JavaScript

Avoid premature optimization.

## Dependencies

Before installing a package:

1. Check whether the functionality already exists.
2. Check whether the browser or Next.js provides the required functionality.
3. Check existing dependencies.

Only add a dependency when it provides meaningful value.
