// @ts-check
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_ROOT = path.join(__dirname, '..', '..')

const CHAPTER_DIR_RE = /^Chapter\s+(S(\d)\s+)?(\d+)\s*[-–]\s*(.+)$/
const CONCEPT_TITLE_MAP = { Debouncing: 'Debouncing', Throtling: 'Throttling' }

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseDirName(dirName) {
  const match = dirName.match(CHAPTER_DIR_RE)
  if (!match) return null
  return {
    season: match[2] ? parseInt(match[2]) : 1,
    number: match[3],
    title: match[4].trim(),
  }
}

const entries = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
const chapterDirs = entries
  .filter((e) => e.isDirectory() && CHAPTER_DIR_RE.test(e.name))
  .map((e) => e.name)
  .sort((a, b) => {
    const pa = parseDirName(a)
    const pb = parseDirName(b)
    if (!pa || !pb) return a.localeCompare(b)
    if (pa.season !== pb.season) return pa.season - pb.season
    return parseInt(pa.number) - parseInt(pb.number)
  })

const index = []

for (const dirName of chapterDirs) {
  const parsed = parseDirName(dirName)
  if (!parsed) continue
  const num = parsed.number.padStart(2, '0')
  const prefix = parsed.season === 1 ? `s1-ep${num}` : `s2-ep${num}`
  const slug = `${prefix}-${slugify(parsed.title)}`
  const number = parsed.season === 1 ? `EP ${num}` : `S2 EP ${num}`
  index.push({
    slug,
    title: parsed.title,
    number,
    seasonLabel: parsed.season === 1 ? 'Season 1' : 'Season 2',
  })
}

// Concepts
const conceptsDir = path.join(CONTENT_ROOT, 'Concepts')
if (fs.existsSync(conceptsDir)) {
  const conceptEntries = fs.readdirSync(conceptsDir, { withFileTypes: true })
  for (const e of conceptEntries) {
    if (!e.isDirectory()) continue
    const displayTitle = CONCEPT_TITLE_MAP[e.name] ?? e.name
    index.push({
      slug: `concepts-${e.name.toLowerCase()}`,
      title: displayTitle,
      number: 'Concept',
      seasonLabel: 'Concepts',
    })
  }
}

const outPath = path.join(__dirname, '..', 'public', 'search-index.json')
fs.writeFileSync(outPath, JSON.stringify(index, null, 2))
console.log(`✓ search-index.json written (${index.length} entries)`)
