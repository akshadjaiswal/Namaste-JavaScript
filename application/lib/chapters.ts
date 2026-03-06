import fs from 'fs'
import path from 'path'
import type { Chapter, ChapterMeta, TocHeading, Season } from '@/types/chapter'

const CONTENT_ROOT = path.join(process.cwd(), '..')

// Concept folder name to normalized display title
const CONCEPT_TITLE_MAP: Record<string, string> = {
  Debouncing: 'Debouncing',
  Throtling: 'Throttling',
}

// Regex to parse chapter directory names
// Matches: "Chapter 01 - Title" or "Chapter S2 01 - Title"
const CHAPTER_DIR_RE = /^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$/

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseDirName(dirName: string): { season: 1 | 2; number: string; title: string } | null {
  const match = dirName.match(CHAPTER_DIR_RE)
  if (!match) return null

  const seasonNum = match[2] ? parseInt(match[2]) : 1
  const epNum = match[3]
  const title = match[4].trim()

  return {
    season: seasonNum as 1 | 2,
    number: epNum,
    title,
  }
}

function dirNameToSlug(dirName: string): string {
  const parsed = parseDirName(dirName)
  if (!parsed) return slugify(dirName)

  const num = parsed.number.padStart(2, '0')
  const prefix = parsed.season === 1 ? `s1-ep${num}` : `s2-ep${num}`
  const titleSlug = slugify(parsed.title)
  return `${prefix}-${titleSlug}`
}

function dirNameToNumber(dirName: string): string {
  const parsed = parseDirName(dirName)
  if (!parsed) return ''

  const num = parsed.number.padStart(2, '0')
  return parsed.season === 1 ? `EP ${num}` : `S2 EP ${num}`
}

function getAllChapterDirs(): string[] {
  const entries = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory() && CHAPTER_DIR_RE.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => {
      const pa = parseDirName(a)
      const pb = parseDirName(b)
      if (!pa || !pb) return a.localeCompare(b)
      // Sort by season first, then by episode number
      if (pa.season !== pb.season) return pa.season - pb.season
      return parseInt(pa.number) - parseInt(pb.number)
    })
}

function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  const lines = markdown.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+?)\s*$/)
    if (!match) continue

    const level = match[1].length
    const text = match[2]
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)?/g, '$1')
      .trim()

    headings.push({
      text,
      slug: slugify(text),
      level,
    })
  }

  return headings
}

function getConceptChapterMetas(): ChapterMeta[] {
  const conceptsDir = path.join(CONTENT_ROOT, 'Concepts')
  if (!fs.existsSync(conceptsDir)) return []

  const entries = fs.readdirSync(conceptsDir, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const folderName = e.name
      const displayTitle = CONCEPT_TITLE_MAP[folderName] ?? folderName
      const slug = `concepts-${folderName.toLowerCase()}`
      return {
        slug,
        dirName: folderName,
        title: displayTitle,
        number: 'Concept',
        season: 3 as const,
        seasonLabel: 'Concepts',
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getAllChapters(): ChapterMeta[] {
  const chapterDirs = getAllChapterDirs()

  const episodeMetas: ChapterMeta[] = chapterDirs.map((dirName) => {
    const parsed = parseDirName(dirName)!
    return {
      slug: dirNameToSlug(dirName),
      dirName,
      title: parsed.title,
      number: dirNameToNumber(dirName),
      season: parsed.season,
      seasonLabel: parsed.season === 1 ? 'Season 1' : 'Season 2',
    }
  })

  const conceptMetas = getConceptChapterMetas()
  return [...episodeMetas, ...conceptMetas]
}

export function getChapterBySlug(slug: string): Chapter | null {
  // Check if it's a concept slug
  if (slug.startsWith('concepts-')) {
    const conceptsDir = path.join(CONTENT_ROOT, 'Concepts')
    if (!fs.existsSync(conceptsDir)) return null

    const entries = fs.readdirSync(conceptsDir, { withFileTypes: true })
    const match = entries.find(
      (e) => e.isDirectory() && `concepts-${e.name.toLowerCase()}` === slug
    )
    if (!match) return null

    const readmePath = path.join(conceptsDir, match.name, 'README.md')
    if (!fs.existsSync(readmePath)) return null

    const content = fs.readFileSync(readmePath, 'utf-8')
    const displayTitle = CONCEPT_TITLE_MAP[match.name] ?? match.name

    return {
      slug,
      dirName: match.name,
      title: displayTitle,
      number: 'Concept',
      season: 3,
      seasonLabel: 'Concepts',
      content,
      headings: extractHeadings(content),
    }
  }

  // Find matching chapter directory by slug
  const chapterDirs = getAllChapterDirs()
  const dirName = chapterDirs.find((d) => dirNameToSlug(d) === slug)
  if (!dirName) return null

  const readmePath = path.join(CONTENT_ROOT, dirName, 'README.md')
  if (!fs.existsSync(readmePath)) return null

  const content = fs.readFileSync(readmePath, 'utf-8')
  const parsed = parseDirName(dirName)!

  return {
    slug,
    dirName,
    title: parsed.title,
    number: dirNameToNumber(dirName),
    season: parsed.season,
    seasonLabel: parsed.season === 1 ? 'Season 1' : 'Season 2',
    content,
    headings: extractHeadings(content),
  }
}

export function getSeasons(): Season[] {
  const allChapters = getAllChapters()

  const seasonDescriptions: Record<number, string> = {
    1: 'Core JavaScript — Execution Context, Hoisting, Closures, Scope & the Event Loop',
    2: 'Async JavaScript — Callbacks, Promises, async/await & the Promise API',
    3: 'Design Patterns & Performance — Debouncing, Throttling & more',
  }

  const grouped = new Map<number, ChapterMeta[]>()
  for (const ch of allChapters) {
    const existing = grouped.get(ch.season) || []
    existing.push(ch)
    grouped.set(ch.season, existing)
  }

  return ([1, 2, 3] as const).map((num) => ({
    number: num,
    label: num === 3 ? 'Concepts' : `Season ${num}`,
    description: seasonDescriptions[num],
    chapters: grouped.get(num) || [],
  }))
}
