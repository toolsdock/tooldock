import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#111426', color: '#f2f2ff', padding: 84, fontFamily: 'sans-serif' }}>
      <div style={{ color: '#bbaaff', fontSize: 30, letterSpacing: 5, fontWeight: 700, marginBottom: 40 }}>TOOLDOCK</div>
      <div style={{ fontSize: 94, letterSpacing: -4, fontWeight: 750, lineHeight: 1.06 }}>Small tools.<br/>Big relief.</div>
      <div style={{ color: '#bec2d7', marginTop: 36, fontSize: 32 }}>Image, audio and more. Made simple.</div>
      <div style={{ display: 'flex', gap: 16, marginTop: 62 }}>{['IMAGE', 'AUDIO', 'MORE SOON'].map((word) => <div key={word} style={{ fontSize: 20, borderRadius: 50, padding: '12px 22px', border: '2px solid #40445c' }}>{word}</div>)}</div>
    </div>, size
  );
}
