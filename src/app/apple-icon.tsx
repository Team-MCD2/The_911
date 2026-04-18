import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 50% 30%, #1c1c1c 0%, #0a0a0a 70%)',
          position: 'relative',
        }}
      >
        {/* Top caution tape */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 28,
            background:
              'repeating-linear-gradient(45deg, #FFC904 0, #FFC904 14px, #0a0a0a 14px, #0a0a0a 28px)',
            display: 'flex',
          }}
        />
        {/* Bottom caution tape */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 28,
            background:
              'repeating-linear-gradient(45deg, #FFC904 0, #FFC904 14px, #0a0a0a 14px, #0a0a0a 28px)',
            display: 'flex',
          }}
        />
        {/* THE small label */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: 4,
            marginTop: 12,
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            display: 'flex',
          }}
        >
          THE
        </div>
        {/* 911 in outlined style */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#FFC904',
            lineHeight: 1,
            letterSpacing: -4,
            fontStyle: 'italic',
            textShadow: '0 6px 18px rgba(0,0,0,0.8)',
            display: 'flex',
          }}
        >
          911
        </div>
      </div>
    ),
    { ...size }
  );
}
