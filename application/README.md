# Namaste JavaScript — Documentation App

An interactive documentation web app for the [Namaste JavaScript](https://github.com/akshadjaiswal/Namaste-JavaScript) learning repository. Built with Next.js, it turns the raw markdown notes into a clean, navigable documentation site — same idea as reading docs, but actually enjoyable.

## What it is

The parent repo contains JavaScript notes from the [Namaste JavaScript YouTube series](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP) by Akshay Saini. This app reads that content and presents it as a structured documentation site with:

- A collapsible sidebar navigation organized by season
- Full markdown rendering with syntax-highlighted code blocks
- Table of contents for each episode (auto-generated from headings)
- Previous / Next episode navigation
- Responsive layout with mobile hamburger menu

## Content Structure

Content is sourced directly from the parent repository (no duplication):

| Season | Episodes | Source |
|--------|----------|--------|
| Season 1 — Fundamentals | 19 episodes | `../README.md` (parsed by `## Episode` headings) |
| Season 2 — Async JavaScript | 5 episodes | `../README.md` (parsed by `# Episode` headings) |
| Concepts | Debouncing, Throttling | `../Concepts/*/README.md` |

The `lib/chapters.ts` file handles all content parsing at build time — no database, no CMS.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static site generation)
- **UI**: React 19, Tailwind CSS 3
- **Language**: TypeScript
- **Markdown**: react-markdown + remark-gfm + rehype-slug
- **Icons**: lucide-react
- **Fonts**: Playfair Display, Source Serif 4, JetBrains Mono

## Getting Started

```bash
# From the application/ directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Build

```bash
npm run build
npm start
```

The build pre-generates all 26 episode pages as static HTML at build time.

## Project Structure

```
application/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page (episode grid)
│   ├── layout.tsx          # Root layout with sidebar + header
│   └── chapters/[slug]/    # Dynamic episode pages
├── components/             # Reusable UI components
│   ├── sidebar-client.tsx  # Collapsible sidebar navigation
│   ├── header.tsx          # Sticky header with GitHub link
│   ├── markdown-renderer.tsx
│   ├── table-of-contents.tsx
│   └── chapter-nav.tsx     # Prev/Next navigation
├── lib/
│   ├── chapters.ts         # Content parsing (reads parent repo)
│   └── github.ts           # GitHub stars fetcher
├── types/
│   └── chapter.ts          # TypeScript interfaces
└── public/
    └── icon.svg
```

## Related

- [Namaste JavaScript repo](https://github.com/akshadjaiswal/Namaste-JavaScript) — the content source
- [Namaste Node.js app](https://github.com/akshadjaiswal/Namaste-Nodejs) — the sister documentation app this was modelled after
- [Namaste JavaScript series](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP) by Akshay Saini
