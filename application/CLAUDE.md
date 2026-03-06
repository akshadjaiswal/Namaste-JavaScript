# CLAUDE.md — Namaste JavaScript Documentation App

This file gives Claude (and any AI assistant) the context needed to work effectively on this Next.js documentation app.

## What this app is

A statically generated documentation site built with Next.js 16. It reads JavaScript learning notes from the parent repository and presents them as a navigable, readable documentation site — similar to how library docs are structured. There are 26 pages total across 3 seasons.

The app lives at: `Namaste-JavaScript/application/`
The parent repo root (content source) is: `Namaste-JavaScript/` (one level up via `process.cwd() + '/...'`)

## Content source — read this carefully

Content is NOT stored inside `application/`. It is read at build time from the parent repository:

| Season | Source | How parsed |
|--------|--------|------------|
| Season 1 (19 episodes) | `../Chapter 01 - Title/README.md` … `../Chapter 19 - Title/README.md` | Directory scan — each directory is one episode page |
| Season 2 (5 episodes) | `../Chapter S2 01 - Title/README.md` … `../Chapter S2 05 - Title/README.md` | Same directory scan, `S2` prefix distinguishes season |
| Concepts (2 topics) | `../Concepts/*/README.md` | Each subdirectory is one concept page |

The entire parsing logic lives in `lib/chapters.ts`. Do NOT move content files into `application/`.

## Directory naming convention

Chapter directories follow this exact pattern (matched by regex `^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$`):

```
Season 1:  Chapter 01 - Execution Context/README.md
           Chapter 02 - Execution and Call Stack/README.md
           ...
           Chapter 19 - map filter and reduce/README.md
Season 2:  Chapter S2 01 - Callback Hell/README.md
           ...
           Chapter S2 05 - this Keyword in JavaScript/README.md
Concepts:  Concepts/Debouncing/README.md
           Concepts/Throtling/README.md   (folder typo — slug is concepts-throtling)
```

## Concepts folder note

The Concepts folder `Throtling` has a one-`t` typo. The slug is `concepts-throtling` (stable, don't rename). The display title is normalized to "Throttling" via `CONCEPT_TITLE_MAP` in `lib/chapters.ts`.

## Architecture

```
application/
├── app/
│   ├── layout.tsx              # Root layout: sidebar + header + children
│   ├── page.tsx                # Home: hero + season grids
│   ├── error.tsx               # Error boundary (client component)
│   ├── robots.ts               # robots.txt metadata
│   ├── sitemap.ts              # Dynamic sitemap from getAllChapters()
│   ├── opengraph-image.tsx     # OG image (amber bar + title)
│   └── chapters/[slug]/
│       ├── page.tsx            # Episode/concept page with TOC + nav
│       ├── loading.tsx         # Skeleton loading state
│       └── not-found.tsx       # 404 for bad slugs
├── components/
│   ├── sidebar.tsx             # Server wrapper — calls getSeasons()
│   ├── sidebar-client.tsx      # Client: collapsible nav, mobile overlay
│   ├── header.tsx              # Sticky header with GitHub star count
│   ├── markdown-renderer.tsx   # react-markdown with custom styled components
│   ├── table-of-contents.tsx   # Client: sticky TOC with intersection observer
│   └── chapter-nav.tsx         # Prev/Next episode links
├── lib/
│   ├── chapters.ts             # ALL content parsing — the core of the app
│   ├── github.ts               # Fetches GitHub star count (cached 1h)
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── types/
│   └── chapter.ts              # Chapter, ChapterMeta, Season, TocHeading interfaces
└── public/
    └── icon.svg                # Favicon (JS amber + black)
```

### Key exported functions from `lib/chapters.ts`

- `getAllChapters(): ChapterMeta[]` — flat list of all 26 chapters in order
- `getChapterBySlug(slug: string): Chapter | null` — full chapter with content + headings
- `getSeasons(): Season[]` — 3 seasons with nested chapter lists

### Slug format

- Season 1: `s1-ep01-execution-context`, `s1-ep02-execution-call-stack`, …
- Season 2: `s2-ep01-callback-hell`, …
- Concepts: `concepts-debouncing`, `concepts-throtling`

## Design system

- **Framework**: Tailwind CSS 3 with custom config in `tailwind.config.js`
- **Accent color**: `#E8A000` (JavaScript amber) — used for sidebar active states, code block left borders, focus outlines
- **Background**: `#FFFFFF`, **Foreground**: `#000000`
- **Fonts** (via `next/font/google`):
  - Heading: Playfair Display (`--font-heading`)
  - Body: Source Serif 4 (`--font-body`)
  - Mono: JetBrains Mono (`--font-mono`)
- **No border-radius, no box-shadow** — everything is sharp-cornered by design (set to `0` in Tailwind config)

## Commands

```bash
# From application/ directory
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build (generates all 26 static pages)
npm start         # Serve production build
npm run lint      # ESLint
```

## Sister app

This app is modelled after `Namaste-Nodejs/application/`. When making structural changes, it's worth checking how the NodeJS app handles the same problem. The main difference is the content parsing layer — Node.js uses separate chapter directories, JS uses a single README.

## Do not

- Do NOT move content into `application/` — it must stay sourced from the parent repo
- Do NOT add a database or CMS — all content is static and parsed at build time
- Do NOT add rounded corners or box shadows — the design is intentionally sharp
- Do NOT change the slug format — slugs are stable URLs; changing them breaks bookmarks
- Do NOT add `Co-Authored-By: Claude` to commits in this repo
