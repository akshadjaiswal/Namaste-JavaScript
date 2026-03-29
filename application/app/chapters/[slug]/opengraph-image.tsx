import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import { getChapterBySlug } from '@/lib/chapters'

export const alt = 'Namaste JavaScript'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)

  const fontPath = path.join(process.cwd(), 'public/fonts/PlayfairDisplay.ttf')
  const fontData = fs.readFileSync(fontPath)

  if (!chapter) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#000000',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: 48,
            fontWeight: 900,
          }}
        >
          Namaste JavaScript
        </div>
      ),
      { ...size, fonts: [{ name: 'Playfair Display', data: fontData, weight: 900, style: 'normal' }] }
    )
  }

  const titleFontSize = chapter.title.length > 60 ? 52 : chapter.title.length > 40 ? 64 : 80
  // "EP 01" → "01", "S2 EP 01" → "01", "Concept" → "JS"
  const ghostNumber =
    chapter.number === 'Concept'
      ? 'JS'
      : chapter.number.replace(/^S\d+\s+/, '').replace(/^EP\s+/, '')

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left accent stripe — JavaScript amber */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            background: '#E8A000',
          }}
        />

        {/* Ghost number/letter watermark */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: -40,
            fontSize: 340,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.05)',
            lineHeight: 1,
            fontFamily: 'Playfair Display',
            letterSpacing: '-8px',
          }}
        >
          {ghostNumber}
        </div>

        {/* Season + episode label */}
        <div
          style={{
            color: '#E8A000',
            fontSize: 14,
            fontFamily: 'monospace',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          {chapter.seasonLabel} · {chapter.number}
        </div>

        {/* Episode/concept title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: titleFontSize,
            fontWeight: 900,
            fontFamily: 'Playfair Display',
            letterSpacing: '-2px',
            lineHeight: 1.05,
            marginBottom: 40,
            maxWidth: '900px',
          }}
        >
          {chapter.title}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 120, height: 3, background: '#E8A000' }} />
          <div
            style={{
              color: '#525252',
              fontSize: 13,
              fontFamily: 'monospace',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            Namaste JavaScript
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: fontData,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  )
}
