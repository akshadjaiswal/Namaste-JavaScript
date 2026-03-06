import fs from 'fs'
import path from 'path'
import type { Chapter, ChapterMeta, TocHeading, Season } from '@/types/chapter'

const CONTENT_ROOT = path.join(process.cwd(), '..')

// Concept folder name to normalized display title
const CONCEPT_TITLE_MAP: Record<string, string> = {
  Debouncing: 'Debouncing',
  Throtling: 'Throttling',
}

interface ParsedEpisode {
  season: 1 | 2
  episodeNumber: number
  title: string
  content: string
  slug: string
  number: string
}

// Module-level cache — safe because Node.js modules are initialized once per process
let _cachedEpisodes: ParsedEpisode[] | null = null

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

function extractTitleFromHeading(heading: string): string {
  // Strip markdown link syntax: [Title](url) or [Title](incomplete-url
  let title = heading.replace(/\[([^\]]+)\](?:\([^)]*\)?)?/g, '$1')
  // Strip heading markers (##, #)
  title = title.replace(/^#+\s*/, '')
  // Strip leading "Episode N :", "Episode N -", "Episdoe N -" etc.
  title = title.replace(/^Epis\w*\s+\d+\s*[:\-–]?\s*/i, '')
  // Strip trailing punctuation
  title = title.replace(/[.\s]+$/, '').trim()
  return title
}

function episodeSlug(season: 1 | 2, num: number, title: string): string {
  const prefix = season === 1 ? `s1-ep${String(num).padStart(2, '0')}` : `s2-ep${String(num).padStart(2, '0')}`
  const titleSlug = slugify(title)
  return `${prefix}-${titleSlug}`
}

function parseSeason1Block(block: string): ParsedEpisode[] {
  const episodes: ParsedEpisode[] = []
  // Split on ## Episode N lines (H2)
  const lines = block.split('\n')
  let currentEpNum = 0
  let currentTitle = ''
  let currentLines: string[] = []

  function flush() {
    if (currentEpNum > 0 && currentTitle) {
      const content = currentLines.join('\n').trim()
      episodes.push({
        season: 1,
        episodeNumber: currentEpNum,
        title: currentTitle,
        content,
        slug: episodeSlug(1, currentEpNum, currentTitle),
        number: `EP ${String(currentEpNum).padStart(2, '0')}`,
      })
    }
  }

  for (const line of lines) {
    // Match H2 episode headings: ## Episode N: or ## Episode N -
    const epMatch = line.match(/^##\s+Episode\s+(\d+)\s*[:\-–]?\s*(.*)$/i)
    if (epMatch) {
      flush()
      currentEpNum = parseInt(epMatch[1])
      currentTitle = extractTitleFromHeading(epMatch[2] || `Episode ${currentEpNum}`)
      if (!currentTitle) currentTitle = `Episode ${currentEpNum}`
      currentLines = []
    } else if (currentEpNum > 0) {
      currentLines.push(line)
    }
  }
  flush()

  return episodes
}

function parseSeason2Block(block: string): ParsedEpisode[] {
  const episodeMap = new Map<number, ParsedEpisode>()
  const lines = block.split('\n')
  let currentEpNum = 0
  let currentTitle = ''
  let currentLines: string[] = []

  function flush() {
    if (currentEpNum > 0 && currentTitle) {
      const content = currentLines.join('\n').trim()
      if (episodeMap.has(currentEpNum)) {
        // Merge duplicate episode numbers by concatenating content
        const existing = episodeMap.get(currentEpNum)!
        existing.content = existing.content + '\n\n' + content
      } else {
        episodeMap.set(currentEpNum, {
          season: 2,
          episodeNumber: currentEpNum,
          title: currentTitle,
          content,
          slug: episodeSlug(2, currentEpNum, currentTitle),
          number: `S2 EP ${String(currentEpNum).padStart(2, '0')}`,
        })
      }
    }
  }

  for (const line of lines) {
    // Stop before "More Learning Resources" section
    if (/^##\s+More Learning Resources/i.test(line)) {
      break
    }
    // Match H1 episode headings (Season 2 uses # not ##)
    // Handles typo "Episdoe" as well via loose regex
    const epMatch = line.match(/^#\s+Epis\w*\s+(\d+)\s*[:\-–]?\s*(.*)$/i)
    if (epMatch) {
      flush()
      currentEpNum = parseInt(epMatch[1])
      currentTitle = extractTitleFromHeading(epMatch[2] || `Episode ${currentEpNum}`)
      if (!currentTitle) currentTitle = `Episode ${currentEpNum}`
      currentLines = []
    } else if (currentEpNum > 0) {
      currentLines.push(line)
    }
  }
  flush()

  // Return in order by episode number
  return Array.from(episodeMap.values()).sort((a, b) => a.episodeNumber - b.episodeNumber)
}

function getParsedEpisodes(): ParsedEpisode[] {
  if (_cachedEpisodes) return _cachedEpisodes

  const readmePath = path.join(CONTENT_ROOT, 'README.md')
  const raw = fs.readFileSync(readmePath, 'utf-8')

  // Split into season blocks by finding # Season 01 and # Season 02 markers
  const season1Match = raw.match(/^#\s+Season\s+01/im)
  const season2Match = raw.match(/^#\s+Season\s+02/im)

  let season1Block = ''
  let season2Block = ''

  if (season1Match && season1Match.index !== undefined) {
    const start = season1Match.index
    const end = season2Match?.index ?? raw.length
    season1Block = raw.slice(start, end)
  }

  if (season2Match && season2Match.index !== undefined) {
    season2Block = raw.slice(season2Match.index)
  }

  const season1Episodes = parseSeason1Block(season1Block)
  const season2Episodes = parseSeason2Block(season2Block)

  _cachedEpisodes = [...season1Episodes, ...season2Episodes]
  return _cachedEpisodes
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

export function getAllChapters(): ChapterMeta[] {
  const episodes = getParsedEpisodes()
  const episodeMetas: ChapterMeta[] = episodes.map((ep) => ({
    slug: ep.slug,
    dirName: ep.season === 1 ? 's1-readme' : 's2-readme',
    title: ep.title,
    number: ep.number,
    season: ep.season,
    seasonLabel: ep.season === 1 ? 'Season 1' : 'Season 2',
  }))

  const conceptMetas = getConceptChapterMetas()
  return [...episodeMetas, ...conceptMetas]
}

export function getChapterBySlug(slug: string): Chapter | null {
  // Check if it's a concept slug
  if (slug.startsWith('concepts-')) {
    const folderName = slug.replace('concepts-', '')
    // Find exact folder match (case-insensitive lookup by slug)
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

  // Find in parsed episodes
  const episodes = getParsedEpisodes()
  const episode = episodes.find((ep) => ep.slug === slug)
  if (!episode) return null

  return {
    slug: episode.slug,
    dirName: episode.season === 1 ? 's1-readme' : 's2-readme',
    title: episode.title,
    number: episode.number,
    season: episode.season,
    seasonLabel: episode.season === 1 ? 'Season 1' : 'Season 2',
    content: episode.content,
    headings: extractHeadings(episode.content),
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
