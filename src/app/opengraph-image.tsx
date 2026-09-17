import { ImageResponse } from 'next/og';

export const alt = "HackSpark '26 — 24 Hours National Level Hackathon on Sustainable AI";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #050914 0%, #0B0F19 50%, #070D22 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow BG */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at top, rgba(0,240,255,0.18) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(139,92,246,0.18) 0%, transparent 60%)',
          }}
        />

        {/* Event Badge */}
        <div
          style={{
            background: 'rgba(0,240,255,0.1)',
            border: '1px solid rgba(0,240,255,0.3)',
            borderRadius: '100px',
            padding: '8px 24px',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          <span style={{ color: '#00F0FF', fontSize: '16px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            09–10 October 2026 · Coimbatore
          </span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '96px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-2px' }}>
            HACK
          </span>
          <span
            style={{
              fontSize: '96px',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #2563EB, #00F0FF)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            SPARK
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #8B5CF6, #D946EF)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            '26
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '12px 32px',
            marginBottom: '28px',
            display: 'flex',
          }}
        >
          <span style={{ color: '#CBD5E1', fontSize: '22px', fontWeight: 600, textAlign: 'center' }}>
            24 HRS NATIONAL LEVEL HACKATHON ON{' '}
            <span style={{ color: '#4ADE80', fontWeight: 900 }}>SUSTAINABLE AI</span>
          </span>
        </div>

        {/* Info row */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <span style={{ color: '#94A3B8', fontSize: '18px', fontWeight: 600 }}>₹20,000+ Prize Pool</span>
          <span style={{ color: '#475569', fontSize: '18px' }}>·</span>
          <span style={{ color: '#94A3B8', fontSize: '18px', fontWeight: 600 }}>Open to All College Students</span>
          <span style={{ color: '#475569', fontSize: '18px' }}>·</span>
          <span style={{ color: '#94A3B8', fontSize: '18px', fontWeight: 600 }}>NIITM, Coimbatore</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
