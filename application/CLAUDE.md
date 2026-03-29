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
│   ├── globals.css             # Tailwind base + .shiki styling + .author-link
│   ├── error.tsx               # Error boundary (client component)
│   ├── robots.ts               # robots.txt metadata
│   ├── sitemap.ts              # Dynamic sitemap from getAllChapters()
│   ├── opengraph-image.tsx     # OG image (site-level, amber bar + title)
│   └── chapters/[slug]/
│       ├── page.tsx            # Episode/concept page with TOC + nav + ReadingProgress
│       ├── loading.tsx         # Skeleton loading state
│       ├── not-found.tsx       # 404 for bad slugs
│       └── opengraph-image.tsx # Per-chapter OG image (1200×630, JS amber)
├── components/
│   ├── sidebar.tsx             # Server wrapper — calls getSeasons()
│   ├── sidebar-client.tsx      # Client: collapsible nav, mobile overlay
│   ├── header.tsx              # Sticky header with GitHub star count + SearchTrigger
│   ├── markdown-renderer.tsx   # Async RSC: Shiki-highlighted react-markdown
│   ├── table-of-contents.tsx   # Client: sticky TOC with intersection observer
│   ├── chapter-nav.tsx         # Prev/Next episode links
│   ├── copy-button.tsx         # 'use client' — copy-to-clipboard for code blocks
│   ├── reading-progress.tsx    # 'use client' — amber scroll progress bar (chapter pages only)
│   ├── search-modal.tsx        # 'use client' — Fuse.js search modal (fetch + fuzzy search)
│   ├── search-trigger.tsx      # 'use client' — search icon button + `/` global shortcut
│   ├── bookmark-button.tsx     # 'use client' — bookmark toggle; also records last visited
│   └── continue-reading.tsx    # 'use client' — sidebar continue reading / bookmark link
├── hooks/
│   └── use-bookmark.ts         # useLastVisited, useBookmark, useContinueReading hooks
├── lib/
│   ├── chapters.ts             # ALL content parsing — the core of the app
│   ├── github.ts               # Fetches GitHub star count (cached 1h)
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── types/
│   └── chapter.ts              # Chapter, ChapterMeta, Season, TocHeading interfaces
├── scripts/
│   └── generate-search-index.mjs  # Node script: writes public/search-index.json
└── public/
    ├── icon.svg                # Favicon (JS amber + black)
    ├── fonts/
    │   └── PlayfairDisplay.ttf # Font for OG image generation — do NOT delete
    └── search-index.json       # 26-entry search index (auto-generated at prebuild — do not edit)
```

### Key exported functions from `lib/chapters.ts`

- `getAllChapters(): ChapterMeta[]` — flat list of all 26 chapters in order
- `getChapterBySlug(slug: string): Chapter | null` — full chapter with content + headings + readTime
- `getSeasons(): Season[]` — 3 seasons with nested chapter lists
- `getSearchIndex()` — flat list of `{ slug, title, number, seasonLabel }` for all 26 chapters (used by the search index script)

### Slug format

- Season 1: `s1-ep01-execution-context`, `s1-ep02-execution-call-stack`, …
- Season 2: `s2-ep01-callback-hell`, …
- Concepts: `concepts-debouncing`, `concepts-throtling`

## Data types

### `Chapter` interface (`types/chapter.ts`)
```ts
{
  slug: string
  dirName: string
  title: string
  number: string        // "EP 01", "S2 EP 01", or "Concept"
  season: 1 | 2 | 3
  seasonLabel: string   // "Season 1", "Season 2", "Concepts"
  content: string       // Full markdown content
  headings: TocHeading[]
  readTime: number      // Minutes to read, computed at build time (ceil(words/200))
}
```

### `ChapterMeta` type
`Omit<Chapter, 'content' | 'headings' | 'readTime'>` — used in sidebar and home page; does NOT include content, headings, or readTime.

## Design system

- **Framework**: Tailwind CSS 3 with custom config in `tailwind.config.js`
- **Accent color**: `#E8A000` (JavaScript amber) — used for sidebar active states, code block left borders, focus outlines, reading progress bar
- **Background**: `#FFFFFF`, **Foreground**: `#000000`
- **Fonts** (via `next/font/google`):
  - Heading: Playfair Display (`--font-heading`)
  - Body: Source Serif 4 (`--font-body`)
  - Mono: JetBrains Mono (`--font-mono`)
- **No border-radius, no box-shadow** — everything is sharp-cornered by design (set to `0` in Tailwind config)
- **Sidebar active item**: `border-l-4 border-accent` (inactive hover: `border-l-2`)
- **Sidebar logo link**: `group-hover:opacity-70` hover state
- **Chapter page metadata**: stacked `flex-col` — season+number in `text-accent`, read time in `text-muted-foreground`
- **Chapter nav**: Next link has `bg-foreground text-background` by default (primary action); mobile uses `flex-col-reverse`
- **Home page**: `py-10 md:py-16` container, `mb-14` between season sections, `pl-4 border-l-4 border-accent` per season, chapter number watermark (`text-foreground/5`) inside cards

## Dependencies (notable)

| Package | Purpose |
|---------|---------|
| `react-markdown` | Markdown → React rendering pipeline |
| `remark-gfm` | GitHub-flavored markdown (tables, strikethrough, etc.) |
| `rehype-slug` | Auto anchor IDs on headings |
| `rehype-raw` | Allows raw HTML output from Shiki to pass through react-markdown |
| `shiki` | Build-time syntax highlighting via `codeToHtml()` |
| `fuse.js` | Client-side fuzzy search in `SearchModal` |
| `lucide-react` | Icons (Github, Star, Search, etc.) |

Note: `@shikijs/rehype` is installed but NOT used — see "Do not" below.

## Build scripts

```bash
# From application/ directory
npm run dev       # Start dev server at localhost:3000
npm run build     # Runs prebuild (search index) then Next.js build (32 static pages)
npm start         # Serve production build
npm run lint      # ESLint
```

The `prebuild` script runs `node scripts/generate-search-index.mjs`, which writes `public/search-index.json` from the chapter directories. This must run before the build so the search JSON is available to be served statically.

## Syntax highlighting — how it works

`MarkdownRenderer` is an **async** React Server Component. Before rendering, it pre-processes the markdown string with `codeToHtml()` from Shiki (theme: `github-light`), replacing fenced code blocks with highlighted HTML wrapped in `<div data-shiki>`. The `rehype-raw` plugin allows this HTML to pass through the react-markdown pipeline. The `div` renderer in `components` detects `data-shiki` and wraps the output with the amber left border + `CopyButton`.

The `.shiki` CSS class in `globals.css` overrides Shiki's default background to `#fafafa`.

## Search — how it works

- At `prebuild`, `scripts/generate-search-index.mjs` writes `public/search-index.json` (26 entries).
- Each entry now includes `content` — stripped plain text of the episode/concept body — in addition to `slug`, `title`, `number`, and `seasonLabel`.
- `SearchTrigger` (in header) listens for the `/` key globally and manages open state.
- `SearchModal` fetches `/search-index.json` once on open, initialises Fuse.js, and searches as the user types.
- Fuse.js config: `ignoreLocation: true`, `includeMatches: true`, `threshold: 0.3`, weighted keys: `title 0.6 / content 0.3 / seasonLabel 0.1`.
- Results show a context snippet around the matched term, highlighted in amber.
- Keyboard: `↑`/`↓` to move, `Enter` to navigate, `Esc` to close.

## Callout blocks — how they work

Markdown supports GitHub-style callout syntax inside `MarkdownRenderer`:

```
> [!NOTE]
> This is a note.

> [!TIP]
> Helpful tip here.

> [!WARNING]
> Caution advised.

> [!IMPORTANT]
> Key information.

> [!CAUTION]
> Dangerous action.
```

`markdown-renderer.tsx` detects blockquotes whose first paragraph starts with `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]`, or `[!CAUTION]` and renders them as styled callout boxes with a coloured left border, an icon, and a label. Each variant has its own color (e.g., blue for NOTE, green for TIP, amber for WARNING, purple for IMPORTANT, red for CAUTION).

## Bookmarks — how they work

`hooks/use-bookmark.ts` provides three hooks:
- `useLastVisited()` — reads/writes `nj_last_visited` in localStorage (slug of the last episode/concept page opened)
- `useBookmark()` — reads/writes `nj_bookmark` in localStorage (slug of the explicitly bookmarked episode)
- `useContinueReading()` — derived hook combining both; used by `ContinueReading`

`BookmarkButton` (`components/bookmark-button.tsx`) is a `'use client'` component placed on each chapter page. It toggles the `nj_bookmark` key and also updates `nj_last_visited` on mount.

`ContinueReading` (`components/continue-reading.tsx`) is a `'use client'` component rendered in the sidebar. It reads both localStorage keys and shows a "Continue reading" link to `nj_last_visited` and/or a "Bookmarked" link to `nj_bookmark`.

localStorage key names for this app: `nj_last_visited`, `nj_bookmark`.

## Per-chapter OG images — how they work

`app/chapters/[slug]/opengraph-image.tsx` generates a unique 1200×630 OG image for every episode/concept at build time using Next.js's `ImageResponse` API.

- It calls `generateStaticParams` (re-exported from `page.tsx`) so Next.js knows which slugs to pre-render.
- The design features the episode title in Playfair Display, a ghost chapter number watermark, and the JS amber accent color.
- The font is loaded from `public/fonts/PlayfairDisplay.ttf` at runtime — **do not delete this file** or OG image generation will fail.

## Mobile layout

- Hamburger: `fixed top-3 left-4 z-50 md:hidden` — aligned with header `py-3`
- Header main row: `pl-14 pr-6 md:px-12 py-3` — `pl-14` clears the hamburger
- Header attribution: `hidden sm:block` in main row (desktop); `sm:hidden` second row with `pl-14 pr-4` padding (mobile)
- GitHub star count: `hidden sm:block` — hidden on mobile
- Mobile drawer: `fixed inset-0 z-50`, panel `w-72`, backdrop closes on click

## TOC duplicate heading dedup

`extractHeadings()` in `lib/chapters.ts` uses a `slugCount: Map<string, number>` to deduplicate slugs. First occurrence keeps the base slug, subsequent ones get `-1`, `-2` suffix — matching `rehype-slug`'s behavior so TOC anchor links are always correct.

## Sister app

This app is modelled after `Namaste-Nodejs/application/`. When making structural changes, it's worth checking how the NodeJS app handles the same problem. The main difference is the content parsing layer — Node.js uses separate chapter directories, JS uses a single README.

## Do not

- Do NOT move content into `application/` — it must stay sourced from the parent repo
- Do NOT add a database or CMS — all content is static and parsed at build time
- Do NOT add rounded corners or box shadows — the design is intentionally sharp
- Do NOT change the slug format — slugs are stable URLs; changing them breaks bookmarks
- Do NOT add `Co-Authored-By: Claude` to commits in this repo
- Do NOT use `@shikijs/rehype` as a rehype plugin in the `react-markdown` pipeline — it is async and will crash with `` `runSync` finished async ``. Use Shiki's `codeToHtml()` directly to pre-process the markdown string before rendering
- Do NOT edit `public/search-index.json` manually — it is auto-generated by `scripts/generate-search-index.mjs` on every build; it now includes a `content` field alongside metadata
- Do NOT delete `public/fonts/PlayfairDisplay.ttf` — it is required for per-chapter OG image generation at runtime
