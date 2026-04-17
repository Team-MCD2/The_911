'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';

type Brand = 'uber' | 'deliveroo';

type BrandStat = {
  icon: string;
  value: string;
  label: string;
};

type PlatformConfig = {
  brand: Brand;
  href: string;
  ariaLabel: string;
  ctaLabel: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  stats: [BrandStat, BrandStat, BrandStat];
};

const UBER_EATS_URL =
  'https://www.ubereats.com/fr/store/the-911/owdwE6JSXsGsWuokm-mvfQ';
const DELIVEROO_URL =
  'https://deliveroo.fr/fr/menu/toulouse/plaisance-du-touch-est/the-911-plaisance-du-touch-10-rue-des-ecoles';

const PLATFORMS: PlatformConfig[] = [
  {
    brand: 'uber',
    href: UBER_EATS_URL,
    ariaLabel: 'Commander sur Uber Eats - The 911',
    ctaLabel: 'Commander sur Uber Eats',
    logoSrc: '/images/brands/ubereats.png',
    logoAlt: 'Uber Eats',
    logoWidth: 96,
    logoHeight: 96,
    stats: [
      { icon: '⭐', value: '4.9', label: 'Note client' },
      { icon: '⚡', value: '25 min', label: 'Livraison' },
      { icon: '🔥', value: '+500', label: 'Commandes' },
    ],
  },
  {
    brand: 'deliveroo',
    href: DELIVEROO_URL,
    ariaLabel: 'Commander sur Deliveroo - The 911',
    ctaLabel: 'Commander sur Deliveroo',
    logoSrc: '/images/brands/deliveroo.png',
    logoAlt: 'Deliveroo',
    logoWidth: 148,
    logoHeight: 74,
    stats: [
      { icon: '⭐', value: '4.8', label: 'Note client' },
      { icon: '⚡', value: '20 min', label: 'Livraison' },
      { icon: '🔥', value: '+300', label: 'Commandes' },
    ],
  },
];

/**
 * Ballon "football américain" premium :
 *  - tilt 3D dynamique suivant la souris (via variables CSS, pas de re-render)
 *  - gloss qui suit le curseur
 *  - press réaliste (scale down + rebond spring au relâchement)
 *  - animation idle (breathing) sur un wrapper interne
 */
function FootballBall({ platform }: { platform: PlatformConfig }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number | null>(null);

  const applyTransform = useCallback((x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const ry = (x - 0.5) * 20;
      const rx = (0.5 - y) * 14;
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (e.pointerType === 'touch') return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      applyTransform(x, y);
    },
    [applyTransform]
  );

  const resetTransform = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '35%');
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      e.currentTarget.classList.add('is-pressed');
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      e.currentTarget.classList.remove('is-pressed');
    },
    []
  );

  return (
    <a
      ref={ref}
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ball-btn ball-btn--${platform.brand}`}
      aria-label={platform.ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTransform}
      onPointerCancel={(e) => {
        resetTransform();
        e.currentTarget.classList.remove('is-pressed');
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <span className="ball-btn__enter">
        <span className="ball-btn__idle">
          <span className="ball-btn__body">
            <span className="ball-btn__tip ball-btn__tip--left" aria-hidden="true" />
            <span className="ball-btn__tip ball-btn__tip--right" aria-hidden="true" />

            <span className="ball-btn__stripe" aria-hidden="true" />

            <span className="ball-btn__laces" aria-hidden="true">
              <span className="ball-btn__laces-spine" />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>

            <span className={`ball-btn__brand ball-btn__brand--${platform.brand}`}>
              <Image
                src={platform.logoSrc}
                alt={platform.logoAlt}
                width={platform.logoWidth}
                height={platform.logoHeight}
                className="ball-btn__logo-img"
                priority={false}
                sizes="(max-width: 600px) 80px, 110px"
              />
            </span>

            <span className="ball-btn__shine" aria-hidden="true" />
            <span className="ball-btn__gloss" aria-hidden="true" />
          </span>
        </span>
      </span>
    </a>
  );
}

/**
 * Carte complète par plateforme : ballon (scène immersive) + stats + CTA.
 * La hiérarchie visuelle est : ballon → stats chiffrées → bouton de conversion.
 */
function PlatformCard({ platform }: { platform: PlatformConfig }) {
  return (
    <article
      className={`delivery-card delivery-card--${platform.brand}`}
      aria-label={platform.ariaLabel}
    >
      <div className={`ball-slot ball-slot--${platform.brand}`}>
        <span className="ball-slot__aura" aria-hidden="true" />
        <span className="ball-slot__sparks" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <FootballBall platform={platform} />
        <span className="ball-slot__glow" aria-hidden="true" />
      </div>

      <ul className={`ball-stats ball-stats--${platform.brand}`} aria-label="Statistiques">
        {platform.stats.map((stat) => (
          <li key={stat.label} className="ball-stat">
            <span className="ball-stat__icon" aria-hidden="true">{stat.icon}</span>
            <span className="ball-stat__value">{stat.value}</span>
            <span className="ball-stat__label">{stat.label}</span>
          </li>
        ))}
      </ul>

      <a
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`ball-cta ball-cta--${platform.brand}`}
      >
        <span className="ball-cta__label">{platform.ctaLabel}</span>
        <span className="ball-cta__arrow" aria-hidden="true">→</span>
      </a>
    </article>
  );
}

export default function DeliverySection() {
  return (
    <section id="delivery" className="delivery-section">
      <h2 className="section-title">COMMANDE & LIVRAISON</h2>
      <p className="delivery-intro">
        Faites expédier les pièces à conviction directement à votre planque.
      </p>

      <div className="delivery-options reveal-on-scroll">
        <div className="delivery-stage__field" aria-hidden="true" />
        <div className="delivery-stage__ambient" aria-hidden="true" />
        <div className="delivery-stage__spotlights" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="delivery-stage__scoreboard" aria-hidden="true">
          <span className="delivery-stage__scoreboard-dot" />
          <span className="delivery-stage__scoreboard-text">LIVE · DELIVERY</span>
        </div>

        {PLATFORMS.map((platform) => (
          <PlatformCard key={platform.brand} platform={platform} />
        ))}
      </div>
    </section>
  );
}
