# coffee-archive-copilot

AI-assisted archive and perspective engine for coffee experiences.

`coffee-archive-copilot` helps capture coffee experiences as structured archive cards — beans, roaster notes, opening notes, what lingered, cup photos, café context, rituals, and memories — then read across them over time.

The project is based on a simple idea:

> Archive is infrastructure.
> Interpretation is the product.
> Learning is the outcome.

The goal is to preserve enough detail around each coffee experience so patterns and perspectives can emerge later.

---

## What This App Does

* captures coffee experiences in a structured archive
* records opening notes, lingering notes, roaster notes, and personal impressions
* preserves context around cups, places, rituals, and memories
* organizes entries through collections, flags, and search/filter tools
* supports photo-based context through future image upload and tagging
* helps surface perspective fragments from repeated archive patterns
* supports future Notes on Bean ideas, Archive Notes, Field Notes, and Memory Trips

---

## Product Philosophy

A coffee entry is not only a tasting record.

It can also capture:

* where the coffee was experienced
* what kind of moment it belonged to
* what was visually present
* what activity surrounded it
* what stayed after the sip
* how it connects to other cups over time
* whether it may become part of a larger story or collection

The archive exists so interpretation can happen later.

The AI layer is designed as a **Perspective Engine**: a way to read across entries, detect repeated signals, and turn them into grounded perspective fragments.

Example:

> Some coffees are not the subject of attention. They are what makes attention possible.

---

## Core Workflow

```text
Capture → Archive → Tag → Pattern → Perspective → Learn
```

**Capture**
Record the coffee experience while it is still fresh.

**Archive**
Store it as a structured card with notes, metadata, collections, and eventually photos.

**Tag**
Add or generate labels around process, place, activity, visual context, and memory cues.

**Pattern**
Read across entries to find repeated signals.

**Perspective**
Turn patterns into short, evidence-backed reflections.

**Learn**
Use saved perspectives as Archive Notes, content ideas, hypotheses, or future writing prompts.

---

## Current Build Status

### Milestone 1 — Archive Foundation

* Set up Next.js project
* Set up PostgreSQL
* Set up Prisma schema
* Create new entry form
* Save entry to database
* View individual entry
* Edit existing entry
* Browse archive home
* Deploy private app on Vercel
* Add Basic Auth protection

### Milestone 2 — Archive Workflow

* Opening notes / what lingered workflow
* Roaster notes and personal impressions
* Search / filter / sort
* Archive card count
* Collection assignment
* Collection chips
* Select mode
* Delete selected entries
* Pending / saving state for forms

### Milestone 3 — Media Layer

Planned:

* Upload cup photos
* Upload place / room photos
* Select hero image for archive cards
* Display thumbnails on archive grid
* Display larger images on entry detail pages
* Replace or remove photos

### Milestone 4 — Visual / Activity Tagging

Planned:

* Add manual activity labels
* Suggest labels from photos
* Review and edit suggested labels
* Use labels to group visually recurring coffee moments

Example labels:

* cup with book
* cup with notebook
* travel cup
* paper cup walk
* window seat
* home brew
* coffee before art
* solo table
* memory anchor

### Milestone 5 — Perspective Engine

Planned:

* Generate perspective fragments from selected entries, collections, or the full archive
* Use tasting notes, lingering notes, roaster notes, process, origin, collections, and photo labels
* Show supporting entries for each generated perspective
* Save, edit, copy, or reject generated fragments
* Promote useful fragments into Archive Notes or hypotheses

---

## Example Collections

* Coffee Before Art
* Tokyo Cups
* Hong Kong Cups
* Taipei Cups
* Taichung Cups
* Quiet Favorites
* Rainy Afternoon Coffees
* Sunny Afternoon Coffees
* Processing × Mood
* Coffee & Place

---

## Tech Stack

Current:

* Next.js
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma 7
* PrismaPg adapter
* Vercel
* Basic Auth

Planned:

* Vercel Blob or equivalent object storage
* OpenAI API or equivalent LLM / vision model provider
* structured AI outputs for tags and perspective fragments
* future data models for media, photo labels, saved insights, and archive hypotheses

---

## MVP Scope

Current MVP:

* responsive private web app
* archive CRUD
* entry detail pages
* archive card grid
* opening notes
* what lingered
* roaster notes
* process / origin metadata
* collections
* search / filter / sort
* archive card count
* safe delete workflow
* mobile-friendly editing
* deployed private access

Next MVP expansion:

* photo upload
* photo display on archive cards and detail pages
* manual visual / activity labels
* AI-assisted photo tagging
* Perspective Engine prototype
* save / edit / reject perspective fragments

---

## Long-Term Direction

The long-term goal is to turn scattered coffee experiences into a creative archive that can answer questions such as:

* What cups do I remember most?
* Which coffees stay as flavor, and which stay as place?
* What roles does coffee keep playing in my life?
* Which coffees belong to reading, writing, walking, travel, or art?
* Which entries are Bean Notes, Field Notes, Memory Trips, or Archive Note seeds?
* What visual rituals recur across the archive?
* What perspectives keep emerging from the way I drink and remember coffee?
* How has my taste changed over time?
* What archive fragments could become Notes on Bean posts?

The ultimate output is not a coffee database.

It is a richer understanding of coffee as taste, memory, place, ritual, attention, and creative practice.
