import { ImageResponse } from 'next/og'

export const alt = 'Namaste JavaScript'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
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
        <div
          style={{
            color: '#ffffff',
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: '-3px',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          NAMASTE JAVASCRIPT
        </div>
        <div
          style={{
            color: '#a3a3a3',
            fontSize: 28,
            fontWeight: 400,
          }}
        >
          26 episodes across 2 seasons — Complete JavaScript documentation
        </div>
      </div>
    ),
    { ...size }
  )
}
