'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * DELIVERY - "TRANSFERT DE L'OBJET DU DÉLIT"
 *
 * Refonte 2026-05 : abandon du visuel "football américain" (ballons + stade +
 * scoreboard) qui ne correspondait plus à la nouvelle DA police/investigation.
 * Remplacé par des "paquets de preuves scellés" - chaque plateforme est
 * presentee comme une enveloppe d'inculpation kraft, scellee par une bande
 * caution-tape, avec un tampon "EVIDENCE" rouge en diagonale et un numero
 * de dossier monospace. Coherent avec les Wanted Posters et le Gang.
 */

type Brand = 'uber' | 'deliveroo';

type BrandStat = {
  icon: string;
  value: string;
  label: string;
};

type PlatformConfig = {
  brand: Brand;
  caseCode: string; // "UE" pour Uber, "DR" pour Deliveroo (numero de dossier)
  caseNumber: string; // "911-001"
  href: string;
  ariaLabel: string;
  ctaLabel: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  stats: [BrandStat, BrandStat, BrandStat];
};

const UBER_EATS_PLAISANCE =
  'https://www.ubereats.com/fr/store/the-911/owdwE6JSXsGsWuokm-mvfQ';
const DELIVEROO_PLAISANCE =
  'https://deliveroo.fr/fr/menu/toulouse/plaisance-du-touch-est/the-911-plaisance-du-touch-10-rue-des-ecoles';

const UBER_EATS_TOULOUSE =
  'https://www.ubereats.com/fr/store/the-911/bautR9ZpU42jsq7riPrBMw?srsltid=AfmBOoqN2J3JGwXzQ6ypGhEjFPBH36YCm6EKuVaFU1VHDhZfIIb6A3DS';
const DELIVEROO_TOULOUSE = '#'; // TODO: Update when Deliveroo link is available

const PLATFORMS_PLAISANCE: PlatformConfig[] = [
  {
    brand: 'uber',
    caseCode: 'UE',
    caseNumber: '911-001',
    href: UBER_EATS_PLAISANCE,
    ariaLabel: 'Commander sur Uber Eats - The 911 Plaisance',
    ctaLabel: 'Réquisitionner Uber Eats',
    logoSrc: '/images/brands/ubereats.png',
    logoAlt: 'Uber Eats',
    logoWidth: 220,
    logoHeight: 80,
    stats: [
      { icon: '★', value: '4.9', label: 'Témoignages' },
      { icon: '⏱', value: '25 min', label: 'Transfert' },
      { icon: '⚑', value: '+500', label: 'Dossiers' },
    ],
  },
  {
    brand: 'deliveroo',
    caseCode: 'DR',
    caseNumber: '911-002',
    href: DELIVEROO_PLAISANCE,
    ariaLabel: 'Commander sur Deliveroo - The 911 Plaisance',
    ctaLabel: 'Réquisitionner Deliveroo',
    logoSrc: '/images/brands/deliveroo.png',
    logoAlt: 'Deliveroo',
    logoWidth: 220,
    logoHeight: 80,
    stats: [
      { icon: '★', value: '4.8', label: 'Témoignages' },
      { icon: '⏱', value: '20 min', label: 'Transfert' },
      { icon: '⚑', value: '+300', label: 'Dossiers' },
    ],
  },
];

const PLATFORMS_TOULOUSE: PlatformConfig[] = [
  {
    brand: 'uber',
    caseCode: 'UE',
    caseNumber: '911-003',
    href: UBER_EATS_TOULOUSE,
    ariaLabel: 'Commander sur Uber Eats - The 911 Toulouse',
    ctaLabel: 'Réquisitionner Uber Eats',
    logoSrc: '/images/brands/ubereats.png',
    logoAlt: 'Uber Eats',
    logoWidth: 220,
    logoHeight: 80,
    stats: [
      { icon: '★', value: '4.5', label: 'Témoignages' },
      { icon: '⏱', value: '25 min', label: 'Transfert' },
      { icon: '⚑', value: '+100', label: 'Dossiers' },
    ],
  },
  {
    brand: 'deliveroo',
    caseCode: 'DR',
    caseNumber: '911-004',
    href: DELIVEROO_TOULOUSE,
    ariaLabel: 'Commander sur Deliveroo - The 911 Toulouse',
    ctaLabel: 'Deliveroo (Bientôt)',
    logoSrc: '/images/brands/deliveroo.png',
    logoAlt: 'Deliveroo',
    logoWidth: 220,
    logoHeight: 80,
    stats: [
      { icon: '★', value: '-', label: 'Témoignages' },
      { icon: '⏱', value: '-', label: 'Transfert' },
      { icon: '⚑', value: '0', label: 'Dossiers' },
    ],
  },
];

const LOGO_SIZES = '(max-width: 600px) 65vw, 220px';

/**
 * Paquet de preuves scelle - une enveloppe kraft par plateforme.
 * Toute la zone est cliquable (link wrapper), mais on a aussi un CTA explicite
 * en bas pour les utilisateurs qui se reperent au bouton.
 */
function EvidencePackage({ platform }: { platform: PlatformConfig }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (platform.href === '#') {
      e.preventDefault();
      alert('Livraison Deliveroo bientôt disponible pour ce restaurant !');
    }
  };

  return (
    <article
      className={`evidence-package evidence-package--${platform.brand} ${platform.href === '#' ? 'is-disabled' : ''}`}
      aria-label={platform.ariaLabel}
      style={{ opacity: platform.href === '#' ? 0.6 : 1, filter: platform.href === '#' ? 'grayscale(80%)' : 'none' }}
    >
      {/* Tampon "EVIDENCE" rouge en diagonale, coin sup. droit */}
      <span className="evidence-package__stamp" aria-hidden="true">
        EVIDENCE
      </span>

      {/* En-tete : numero de dossier + code-barres deco */}
      <header className="evidence-package__header">
        <span className="evidence-package__case">
          DOSSIER N°{platform.caseNumber}-{platform.caseCode}
        </span>
        <span className="evidence-package__barcode" aria-hidden="true">
          ▌▌ ▌▌▌ ▌ ▌▌ ▌▌▌▌ ▌▌
        </span>
      </header>

      {/* Section "destinataire" - logo de la plateforme */}
      <div className="evidence-package__recipient">
        <span className="evidence-package__recipient-label">
          Transporteur autorisé
        </span>
        <div className="evidence-package__logo-wrap">
          <Image
            src={platform.logoSrc}
            alt={platform.logoAlt}
            width={platform.logoWidth}
            height={platform.logoHeight}
            sizes={LOGO_SIZES}
            className="evidence-package__logo"
          />
        </div>
      </div>

      {/* Bande caution-tape : scelle le paquet visuellement */}
      <div className="evidence-package__seal" aria-hidden="true">
        <span>
          911 · DO NOT CROSS · 911 · DO NOT CROSS · 911 · DO NOT CROSS
        </span>
      </div>

      {/* Statistiques en monospace, formatees comme un releve d'archive */}
      <ul className="evidence-package__stats" aria-label="Indicateurs du dossier">
        {platform.stats.map((stat) => (
          <li key={stat.label} className="evidence-package__stat">
            <span className="evidence-package__stat-icon" aria-hidden="true">
              {stat.icon}
            </span>
            <span className="evidence-package__stat-value">{stat.value}</span>
            <span className="evidence-package__stat-label">{stat.label}</span>
          </li>
        ))}
      </ul>

      {/* Pied : Chain of custody simulee, avec empreinte digitale SVG */}
      <footer className="evidence-package__chain" aria-hidden="true">
        <span className="evidence-package__chain-label">CHAIN OF CUSTODY</span>
        <span className="evidence-package__chain-line"></span>
        <svg
          className="evidence-package__fingerprint"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* Petite empreinte digitale stylisee : 4 arcs concentriques */}
          <path d="M12 4c-3.3 0-6 2.7-6 6 0 2 .6 3.8 1.7 5.3" />
          <path d="M12 6c-2.2 0-4 1.8-4 4 0 1.5.4 2.9 1.1 4.1" />
          <path d="M12 8c-1.1 0-2 .9-2 2 0 1.2.4 2.3 1.1 3.2" />
          <path d="M12 10v2" />
          <path d="M14.5 16c-.9.6-1.7 1.3-2.5 2" />
          <path d="M16 13c-.4 1-.9 1.9-1.5 2.7" />
          <path d="M18 10c0 1.5-.3 3-.8 4.3" />
        </svg>
      </footer>

      {/* CTA principal - bouton "Réquisitionner" en bas */}
      <a
        href={platform.href}
        target={platform.href !== '#' ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="evidence-package__cta"
        onClick={handleClick}
      >
        <span className="evidence-package__cta-label">{platform.ctaLabel}</span>
        <span className="evidence-package__cta-arrow" aria-hidden="true">
          →
        </span>
      </a>
    </article>
  );
}

export default function DeliverySection() {
  const [jurisdiction, setJurisdiction] = useState<'plaisance' | 'toulouse'>('plaisance');

  const currentPlatforms = jurisdiction === 'plaisance' ? PLATFORMS_PLAISANCE : PLATFORMS_TOULOUSE;

  return (
    <section id="delivery" className="delivery-section delivery-section--evidence">
      <h2 className="section-title">TRANSFERT DE L&apos;OBJET DU DÉLIT</h2>
      <p className="delivery-intro">
        Sélectionnez votre juridiction pour expédier les pièces à conviction.
        <br />
        <em>Deux transporteurs assermentés. Aucun témoin.</em>
      </p>

      <div className="menu-filters" style={{ marginBottom: '3rem' }}>
        <button
          type="button"
          className={`filter-btn ${jurisdiction === 'plaisance' ? 'active' : ''}`}
          onClick={() => setJurisdiction('plaisance')}
        >
          PLAISANCE-DU-TOUCH
        </button>
        <button
          type="button"
          className={`filter-btn ${jurisdiction === 'toulouse' ? 'active' : ''}`}
          onClick={() => setJurisdiction('toulouse')}
        >
          TOULOUSE CENTRE
        </button>
      </div>

      <div className="evidence-grid reveal-on-scroll">
        {currentPlatforms.map((platform) => (
          <EvidencePackage key={platform.brand} platform={platform} />
        ))}
      </div>
    </section>
  );
}
