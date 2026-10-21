# Coffee Archive Copilot: Claude Code Context

This file introduces the product and codebase to Claude Code. The transition from Codex to Claude is a change in the development assistant; it is not a migration of an AI feature inside the app. Read the repository's current code before making implementation assumptions.

## 1. What v1.0 Does

### Core Purpose

Coffee Archive Copilot is a private archive for capturing, organizing, and revisiting coffee experiences. Each coffee is recorded as a structured archive card with bean and roaster details, opening notes, what lingered, place and occasion context, collections, and optional interpretation fields. The archive preserves experiences so patterns and meaning can be noticed later.

The product workflow is:

```text
Capture -> Archive -> Revisit -> Interpret
```

The product principle is: **Archive is infrastructure. Interpretation is the product. Learning is the outcome.**

### Current Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma 7 with the PrismaPg adapter
- Vercel deployment
- Basic Auth middleware for private access

### Implemented v1.0 Features

- Create, view, and edit coffee entries
- Record bean, roaster, tasting, origin, process, date, and place details
- Record opening notes and what lingered
- Add optional retrospective interpretation fields
- Browse archive cards with keyword search, origin/process/collection filters, sorting, and total card count
- Organize entries in collections and show collection chips on cards
- Select multiple cards and delete them after explicit confirmation
- Protect the deployed app with Basic Auth

### Codex Integration

OpenAI Codex was used as a coding assistant to build and maintain the app. The v1.0 application does not use Codex as a runtime agent, chat system, query generator, or text-processing feature. Do not assume that Codex SDK code or legacy OpenAI completion endpoints exist. The README lists an LLM or vision provider as a possible future dependency for photo tagging and perspective generation; no provider choice is fixed by this context.

## 2. Codebase Orientation

- `src/app/page.tsx`: archive homepage, search/filter query, total count, and delete server action
- `src/components/ArchiveGridClient.tsx`: interactive archive cards, Select Mode, and delete confirmation UI
- `src/app/entries/new/page.tsx`: entry creation form and action
- `src/app/entries/[id]/page.tsx`: entry detail page
- `src/app/entries/[id]/edit/page.tsx`: entry edit form, collection assignment, and interpretation save action
- `src/lib/prisma.ts`: shared Prisma Client configured with PrismaPg
- `prisma/schema.prisma`: current database models and relations
- `prisma/migrations/`: database migration history
- `middleware.ts`: Basic Auth gate

Inspect the actual repository before relying on this map; files and behavior can change as the project evolves.

## 3. Legacy Code Patterns (Codex)

There are no known Codex-specific runtime patterns to phase out. Do not create migrations away from hypothetical completion APIs or SDKs. If adding an AI capability, first identify the specific workflow, provider, data boundaries, and user review requirements, then follow the current project conventions.

## 4. Goals for v2.0: Photo Upload + Tagging

**Status: Planned.** v2.0 should add a media layer and a user-reviewed visual tagging workflow on top of the v1.0 archive. Preserve the existing entry capture and archive workflow while making photos useful for revisiting and connecting experiences.

### Planned Scope

- Upload cup photos
- Upload place or room photos
- Choose a hero image for each archive card
- Display thumbnails in the archive grid and larger images on entry detail pages
- Replace or remove uploaded photos
- Add and edit manual visual/activity labels
- Suggest labels from photos
- Let the user review, edit, accept, or reject suggested labels

Example labels:

- cup with book
- cup with notebook
- travel cup
- paper cup walk
- window seat
- home brew
- coffee before art
- solo table
- memory anchor

### Product Boundaries

- Keep AI-generated labels as suggestions until the user reviews them.
- Keep the user in control of replacing/removing photos and editing labels.
- Keep interpretation optional and retrospective; do not make interpretation notes required for saving an entry.
- Treat photo storage and AI/vision provider choices as decisions to make during v2 design. The README mentions Vercel Blob or equivalent storage and OpenAI or an equivalent model provider; neither is a locked decision here.
- Do not mix the later Perspective Engine into v2.0 by default. The README describes that as Build v3.0: generating perspective fragments across entries, showing supporting entries, and allowing fragments to be saved, edited, copied, or rejected.

## 5. Working Guidelines

- Prefer small changes that fit the existing Next.js and Prisma patterns.
- Preserve current archive, search/filter, collection, entry save, and interpretation behavior unless a task explicitly changes it.
- Do not change Prisma models or create/run migrations unless explicitly requested.
- Do not access or modify production data for development tasks.
- Preserve Basic Auth unless explicitly asked to change it.
- Never commit or push unless explicitly requested.
- Run `npm run build` after implementation changes when practical.
- Keep the private archive focused on capturing experiences first and interpreting them later.
