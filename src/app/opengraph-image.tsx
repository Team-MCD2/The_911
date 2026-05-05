import { ImageResponse } from 'next/og';

/**
 * Image Open Graph (1200×630) générée à la build via la convention Next.js.
 * Apparait quand un utilisateur partage le site sur WhatsApp / Messenger /
 * Insta DM / X / LinkedIn / Facebook : titre + tagline + branding 911.
 *
 * Volontairement zéro dépendance Image externe (font Russo One non chargée
 * pour rester rapide à régénérer) : on s'appuie sur les CSS web-safe sans
 * fonte custom dans next/og pour éviter le fetch + le timeout en build.
 */

export const alt = 'THE 911 — Guilty Sandwich · Plaisance-du-Touch';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at 50% 35%, #1c1c1c 0%, #0a0a0a 70%)',
          position: 'relative',
        }}
      >
        {/* Top caution tape */}
        <div
          style={{
            display: 'flex',
            height: 56,
            background:
              'repeating-linear-gradient(45deg, #FFC904 0, #FFC904 28px, #0a0a0a 28px, #0a0a0a 56px)',
          }}
        />

        {/* Center block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '0 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#FFC904',
              letterSpacing: 12,
              fontWeight: 800,
            }}
          >
            GUILTY SANDWICH
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 24,
            }}
          >
            <span
              style={{
                fontSize: 110,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: 6,
              }}
            >
              THE
            </span>
            <span
              style={{
                fontSize: 230,
                fontWeight: 900,
                color: '#FFC904',
                lineHeight: 1,
                letterSpacing: -8,
                fontStyle: 'italic',
                textShadow: '0 8px 30px rgba(0,0,0,0.7)',
              }}
            >
              911
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: 3,
              marginTop: 4,
            }}
          >
            BURGERS · SANDWICHS · CROQ&apos;MR · HALAL
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: 2,
              marginTop: 18,
            }}
          >
            10 Rue des Écoles · 31830 Plaisance-du-Touch
          </div>
        </div>

        {/* Bottom caution tape */}
        <div
          style={{
            display: 'flex',
            height: 56,
            background:
              'repeating-linear-gradient(45deg, #FFC904 0, #FFC904 28px, #0a0a0a 28px, #0a0a0a 56px)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
