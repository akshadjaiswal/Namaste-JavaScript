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
│   ├── layout.tsx              # Root layout: ThemeProvider + sidebar + header + children + blocking script
│   ├── page.tsx                # Home: hero + season grids + ChapterCompletionBadge
│   ├── globals.css             # Tailwind base + dark mode + .shiki styling + .author-link
│   ├── error.tsx               # Error boundary (client component)
│   ├── robots.ts               # robots.txt metadata
│   ├── sitemap.ts              # Dynamic sitemap from getAllChapters()
│   ├── opengraph-image.tsx     # OG image (site-level, amber bar + title)
│   └── chapters/[slug]/
│       ├── page.tsx            # Episode/concept page with TOC + nav + ReadingProgress + CompleteButton + ChapterShortcuts
│       ├── loading.tsx         # Skeleton loading state
│       ├── not-found.tsx       # 404 for bad slugs
│       └── opengraph-image.tsx # Per-chapter OG image (1200×630, JS amber)
├── components/
│   ├── sidebar.tsx             # Server wrapper — calls getSeasons()
│   ├── sidebar-client.tsx      # Client: collapsible nav, mobile overlay, completion checkmarks, progress bar
│   ├── header.tsx              # Sticky header with GitHub stars + ShortcutsTrigger + ThemeToggle + SearchTrigger
│   ├── markdown-renderer.tsx   # Async RSC: Shiki dual-theme highlighted react-markdown + HeadingAnchor
│   ├── table-of-contents.tsx   # Client: sticky TOC with intersection observer
│   ├── chapter-nav.tsx         # Prev/Next episode links
│   ├── copy-button.tsx         # 'use client' — copy-to-clipboard for code blocks
│   ├── reading-progress.tsx    # 'use client' — amber scroll progress bar (chapter pages only)
│   ├── search-modal.tsx        # 'use client' — Fuse.js search modal (fetch + fuzzy search)
│   ├── search-trigger.tsx      # 'use client' — search icon button + `/` global shortcut
│   ├── bookmark-button.tsx     # 'use client' — bookmark toggle; also records last visited
│   ├── continue-reading.tsx    # 'use client' — sidebar continue reading / bookmark link
│   ├── theme-provider.tsx      # 'use client' — ThemeContext, localStorage sync, html.dark toggle
│   ├── theme-toggle.tsx        # 'use client' — Sun/Moon icon button in header
│   ├── heading-anchor.tsx      # 'use client' — copy-link-to-section icon on headings
│   ├── complete-button.tsx     # 'use client' — "Mark Complete" toggle; shows season-complete celebration banner
│   ├── chapter-completion-badge.tsx  # 'use client' — amber checkmark on home page cards
│   ├── shortcuts-modal.tsx     # 'use client' — keyboard shortcuts reference modal
│   ├── shortcuts-trigger.tsx   # 'use client' — '?' key listener + Keyboard icon button
│   ├── chapter-shortcuts.tsx   # 'use client' — chapter-page-scoped 'b' key → bookmark
│   ├── print-button.tsx        # 'use client' — Printer icon button; calls window.print()
│   └── scroll-to-top.tsx       # 'use client' — floating ArrowUp button, appears after 300px scroll
├── hooks/
│   └── use-bookmark.ts         # useLastVisited, useBookmark, useContinueReading, useCompletedChapters hooks
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

`MarkdownRenderer` is an **async** React Server Component. Before rendering, it pre-processes the markdown string with `codeToHtml()` from Shiki, rendering **both** `github-light` and `github-dark` themes, wrapping each in `.shiki-light` / `.shiki-dark` divs inside a `<div data-shiki>`. The `rehype-raw` plugin allows this HTML to pass through the react-markdown pipeline. The `div` renderer detects `data-shiki` and wraps the output with the amber left border + `CopyButton`.

The `pre` renderer checks `className?.includes('shiki')` — if true, passes through as a plain `<pre>`. This prevents double-wrapping.

The `.shiki` CSS class in `globals.css` overrides Shiki's default background. CSS toggles which theme is shown based on `html.dark`.

Code block wrapper classes: `overflow-x-auto bg-[#fafafa] dark:bg-[#1e1e1e] border border-border-light dark:border-[#2A2A2A] border-l-[3px] border-l-accent px-5 pb-5 pt-10 shiki-wrapper`

## Search — how it works

- At `prebuild`, `scripts/generate-search-index.mjs` writes `public/search-index.json` (26 entries).
- Each entry includes `content` — stripped plain text of the episode/concept body — alongside `slug`, `title`, `number`, and `seasonLabel`.
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

`markdown-renderer.tsx` detects blockquotes whose first paragraph starts with `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]`, or `[!CAUTION]` and renders them as styled callout boxes with a coloured left border, an icon, and a label.

## Bookmarks — how they work

`hooks/use-bookmark.ts` provides hooks:
- `useLastVisited()` — reads/writes `nj_last_visited` in localStorage
- `useBookmark()` — reads/writes `nj_bookmark` in localStorage
- `useContinueReading()` — derived hook combining both; used by `ContinueReading`

`BookmarkButton` (`components/bookmark-button.tsx`) is a `'use client'` component placed on each chapter page.

`ContinueReading` (`components/continue-reading.tsx`) is a `'use client'` component rendered in the sidebar.

localStorage key names for this app: `nj_last_visited`, `nj_bookmark`, `nj_completed`, `nj_theme`.

## Dark mode — how it works

`tailwind.config.js` uses `darkMode: 'class'`. A blocking inline `<script>` in `<head>` (in `app/layout.tsx`) reads `nj_theme` from localStorage before any paint, adding `class="dark"` to `<html>` to prevent flash-of-incorrect-theme. `ThemeProvider` (`components/theme-provider.tsx`) manages state and exposes `useTheme()`. `ThemeToggle` (`components/theme-toggle.tsx`) is a Sun/Moon icon button in the header.

Shiki dual-render: Because `MarkdownRenderer` is an async RSC and cannot read client theme state, each code block is rendered twice — once with `github-light`, once with `github-dark` — wrapped in `.shiki-light` / `.shiki-dark` divs. CSS in `globals.css` shows only the correct one: `html.dark .shiki-light { display: none }` / `html.dark .shiki-dark { display: block }`.

Dark color mappings used throughout components:
- bg: `dark:bg-[#0A0A0A]`, text: `dark:text-[#FAFAFA]`
- inverted bg: `dark:bg-[#FAFAFA]`, inverted text: `dark:text-[#0A0A0A]`
- border: `dark:border-[#FAFAFA]`, subtle border: `dark:border-[#2A2A2A]`
- muted bg: `dark:bg-[#1A1A1A]`, muted text: `dark:text-[#A3A3A3]`
- code bg: `dark:bg-[#1e1e1e]`, inline code bg: `dark:bg-[#1A2A1A]`, inline code text: `dark:text-[#A8D8A8]`
- copy button bg: `dark:bg-[#2D2D2D]` (distinct from code block bg)

## Heading anchor links — how they work

`HeadingAnchor` (`components/heading-anchor.tsx`) is a `'use client'` component rendered inside h2/h3/h4 elements in `MarkdownRenderer`. `rehype-slug` adds `id` attributes to headings; these are forwarded as props. The anchor icon (`<Link2>`) is hidden by default and revealed on heading hover via Tailwind `group` + `group-hover:opacity-60`. Clicking it copies the full URL (origin + path + `#id`) to clipboard and pushes the hash into browser history.

## Chapter completion tracking — how it works

`hooks/use-bookmark.ts` exports `useCompletedChapters()`:
- Reads/writes `nj_completed` in localStorage — a JSON array of completed slugs.
- Returns `{ completed, isCompleted(slug), toggle(slug), reset() }`.
- `toggle` uses direct setState (not functional updater) to avoid setState-during-render error when `dispatch()` fires synchronously.
- `reset()` removes `nj_completed` from localStorage and clears state.

`CompleteButton` (`components/complete-button.tsx`) — `'use client'` button on each chapter page. Receives `slug`, `seasonLabel`, and `allSlugsInSeason: string[]` props. After marking complete, checks if all slugs in the season are now done → shows a 4s auto-dismiss celebration banner (`"Season X complete!"`) using a `fixed bottom-20 right-6` toast.

`ChapterCompletionBadge` (`components/chapter-completion-badge.tsx`) — `'use client'` component on home page chapter cards. Renders an amber `bg-accent` checkmark overlay (`absolute top-2 right-2`) when the chapter is completed.

`SidebarClient` reads `isCompleted()` per chapter to show `<Check>` icons. When `completedCount > 0`, shows a progress bar with `X / 26` counter and a `"Reset progress"` button above `ContinueReading`.

## Read time on chapter nav — how it works

`ChapterMeta` now includes `readTime` (previously omitted). `getAllChapters()` in `lib/chapters.ts` reads each chapter's README.md and calls `computeReadTime()` to populate `readTime` in the meta. `ChapterNav` renders `Previous · X min` / `Next · X min` labels.

## TOC scroll percentage — how it works

`TableOfContents` has a `scrollPct` state updated by a passive `scroll` listener: `Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)`. Displayed as `{scrollPct}%` in muted mono to the right of "On this page". The border below the heading acts as a mini progress bar — a `.bg-accent` div slides to `width: scrollPct%`.

## Print / Save as PDF — how it works

`PrintButton` (`components/print-button.tsx`) — `'use client'` button that calls `window.print()`. Rendered on chapter pages alongside BookmarkButton and CompleteButton. Only shown on `md:` and above (`hidden md:flex`). Has `no-print` class so it hides itself during printing.

`@media print` CSS in `globals.css` hides `aside`, `header`, `nav`, `[role="progressbar"]`, and `.no-print` elements. Forces `background: white; color: black` on body, expands `article` to full width, forces `shiki-light` theme, and adds `page-break-*` rules.

## Scroll-to-top button — how it works

`ScrollToTop` (`components/scroll-to-top.tsx`) — `'use client'` component rendered on chapter pages. A passive `scroll` listener shows the button when `window.scrollY > 300`. Positioned `fixed bottom-6 right-6 z-40`. Clicking calls `window.scrollTo({ top: 0, behavior: 'smooth' })`. Has `no-print` class. Uses `ArrowUp` lucide icon, sharp-cornered matching the design system.

## Keyboard shortcuts — how they work

`ShortcutsTrigger` (`components/shortcuts-trigger.tsx`) — `'use client'`. Global `keydown` listener for `e.key === '?'` (toggling the modal). Renders a `<Keyboard>` icon button in the header.

`ShortcutsModal` (`components/shortcuts-modal.tsx`) — `'use client'`. Full-screen overlay listing all keyboard shortcuts. Closes on `Esc` or backdrop click.

`ChapterShortcuts` (`components/chapter-shortcuts.tsx`) — `'use client'`, renders `null`. Placed only on chapter pages. Listens for `e.key === 'b'` to toggle bookmark. Unmounts on navigation so it never fires on non-chapter pages.

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

This app is modelled after `Namaste-Nodejs/application/`. When making structural changes, check how the Node.js app handles the same problem. Key differences: JS app uses `nj_` localStorage prefix (Node.js uses `nn_`), slug format differs (`s1-ep01-` vs `01-`), and Season 3 is called "Concepts" here.

## Do not

- Do NOT move content into `application/` — it must stay sourced from the parent repo
- Do NOT add a database or CMS — all content is static and parsed at build time
- Do NOT add rounded corners or box shadows — the design is intentionally sharp
- Do NOT change the slug format — slugs are stable URLs; changing them breaks bookmarks
- Do NOT add `Co-Authored-By: Claude` to commits in this repo
- Do NOT use `@shikijs/rehype` as a rehype plugin in the `react-markdown` pipeline — it is async and will crash with `` `runSync` finished async ``. Use Shiki's `codeToHtml()` directly to pre-process the markdown string before rendering
- Do NOT edit `public/search-index.json` manually — it is auto-generated by `scripts/generate-search-index.mjs` on every build; it includes a `content` field alongside metadata
- Do NOT delete `public/fonts/PlayfairDisplay.ttf` — it is required for per-chapter OG image generation at runtime
- Do NOT put `text-foreground` on the block `<code>` element inside Shiki wrappers — `foreground` is `#000000` with no dark variant, which makes code invisible on dark backgrounds
- Do NOT omit `readTime` from `ChapterMeta` — it is now included (type changed from `Omit<Chapter, 'content'|'headings'|'readTime'>` to `Omit<Chapter, 'content'|'headings'>`) and populated in `getAllChapters()`
- Do NOT pass `<CompleteButton>` without `seasonLabel` and `allSlugsInSeason` props — they are required for the season-complete celebration banner
