'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * LE GANG - Section signature du site : 5 "membres du gang" presentes sous
 * forme de fiches de suspects du FBI. Chaque carte embarque une micro-video
 * Grok en loop qui se declenche au hover (desktop) ou automatiquement en
 * viewport (mobile - pas de hover). C'est *le* moment premium du site.
 *
 * Strategie performance :
 *  - Les videos ne sont pas prechargees (`preload="none"`) : on economise
 *    ~15 Mo au 1er load.
 *  - Elles demarrent uniquement quand le composant est en viewport ET
 *    que l'utilisateur hover (ou IntersectionObserver sur mobile).
 *  - Pause automatique quand hors-viewport pour economiser batterie/CPU.
 *  - `poster` = photo officielle du burger : le visuel reste joli meme si
 *    la video met du temps a charger ou echoue.
 *
 * A11y :
 *  - Les videos sont `aria-hidden` (purement decoratives)
 *  - Les vraies infos sont dans le texte structure (rank, codename, etc.)
 *  - `prefers-reduced-motion` -> on n'auto-play pas les videos mobile.
 */

type GangMember = {
  id: string;
  rank: number;
  codename: string;
  realName: string;
  modusOperandi: string;
  signature: string; // "Coup de signature" = specialite
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  videoSrc: string;
  posterSrc: string;
  isBoss?: boolean;
};

const gangMembers: GangMember[] = [
  {
    id: 'smash',
    rank: 1,
    codename: 'SMASH',
    realName: 'Le Double Smashé',
    modusOperandi: "Frappe deux fois, disparaît avant l'arrivée des renforts.",
    signature: '2 steaks smashés · cheddar · oignons',
    dangerLevel: 4,
    videoSrc: '/videos/clip-01.mp4',
    posterSrc: '/images/menu/smash-2.jpeg',
  },
  {
    id: 'mountain',
    rank: 2,
    codename: 'MOUNTAIN',
    realName: 'Le Parrain',
    modusOperandi: 'Orchestre le crime parfait. Aucun témoin ne repart à pied.',
    signature: 'Steak · raclette · rösti · bacon',
    dangerLevel: 5,
    videoSrc: '/videos/clip-02.mp4',
    posterSrc: '/images/menu/mountain.jpeg',
    isBoss: true,
  },
  {
    id: 'chicken',
    rank: 3,
    codename: 'HARLEM',
    realName: 'La Double Peine',
    modusOperandi: 'Cordon-bleu dissimulé sous un steak. Double délit.',
    signature: 'Steak · cordon-bleu · cheddar',
    dangerLevel: 4,
    videoSrc: '/videos/clip-03.mp4',
    posterSrc: '/images/menu/harlem.jpeg',
  },
  {
    id: 'pulled',
    rank: 4,
    codename: 'PULLED',
    realName: "L'Infiltré",
    modusOperandi: 'Fond dans la masse. Disparaît en une bouchée.',
    signature: 'Bœuf effiloché · fromage gratiné',
    dangerLevel: 5,
    videoSrc: '/videos/clip-04.mp4',
    posterSrc: '/images/menu/pulled-beef.jpeg',
  },
  {
    id: 'chicanos',
    rank: 5,
    codename: 'CHICANOS',
    realName: 'Le Pyromane',
    modusOperandi: 'Met le feu aux papilles. Sauce spicy maison.',
    signature: 'Escalope · sauce spicy · cheddar',
    dangerLevel: 3,
    videoSrc: '/videos/clip-05.mp4',
    posterSrc: '/images/menu/chicanos.jpeg',
  },
];

const GANG_CARD_SIZES =
  '(max-width: 600px) 85vw, (max-width: 900px) 45vw, (max-width: 1200px) 32vw, 340px';

function DangerDots({ level }: { level: GangMember['dangerLevel'] }) {
  return (
    <span
      className="gang-danger"
      aria-label={`Niveau de dangerosité : ${level} sur 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`gang-danger__dot ${i < level ? 'is-on' : ''}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function GangCard({ member }: { member: GangMember }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  /* Intersection : on charge la video seulement quand la carte est visible.
   * Margin negative = on declenche LEGEREMENT avant l'entree complete, comme
   * ca au moment ou l'utilisateur arrive sur la carte, la 1re frame est
   * deja prete. */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        setInView(visible);
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Sur mobile (pointer: coarse), on respecte prefers-reduced-motion.
   * Si OK, on joue la video en auto quand en viewport. Sur desktop on
   * ne joue qu'au hover (plus elegant, moins distrayant). */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch && inView && !prefersReduce) {
      v.play().catch(() => {});
    } else if (isTouch && !inView) {
      v.pause();
    }
  }, [inView]);

  const handleMouseEnter = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(hover: hover)').matches) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(hover: hover)').matches) {
      v.pause();
    }
  }, []);

  return (
    <article
      ref={cardRef}
      className={`gang-card ${member.isBoss ? 'gang-card--boss' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-rank={member.rank}
    >
      {/* === Carte video + poster === */}
      <div className="gang-card__media">
        <Image
          src={member.posterSrc}
          alt=""
          fill
          sizes={GANG_CARD_SIZES}
          className="gang-card__poster"
          aria-hidden="true"
        />
        {inView && (
          <video
            ref={videoRef}
            className="gang-card__video"
            src={member.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            disablePictureInPicture
          />
        )}

        {/* Overlay scanlines + vignette */}
        <span className="gang-card__scanlines" aria-hidden="true" />
        <span className="gang-card__vignette" aria-hidden="true" />

        {/* Badge rank */}
        <span className="gang-card__rank" aria-hidden="true">
          SUSPECT
          <strong>#{String(member.rank).padStart(2, '0')}</strong>
        </span>

        {/* Badge BOSS pour le parrain */}
        {member.isBoss && (
          <span className="gang-card__boss-badge" aria-label="Chef de gang">
            THE BOSS
          </span>
        )}

        {/* Codename grand format */}
        <h3 className="gang-card__codename">{member.codename}</h3>
      </div>

      {/* === Fiche de suspect === */}
      <div className="gang-card__file">
        <p className="gang-card__real-name">
          <span className="gang-card__label">Alias&nbsp;:</span> {member.realName}
        </p>
        <p className="gang-card__modus">
          <span className="gang-card__label">Mode op.&nbsp;:</span> {member.modusOperandi}
        </p>
        <p className="gang-card__signature">
          <span className="gang-card__label">Signature&nbsp;:</span> {member.signature}
        </p>
        <div className="gang-card__danger-row">
          <span className="gang-card__label">Dangerosité&nbsp;:</span>
          <DangerDots level={member.dangerLevel} />
        </div>
      </div>
    </article>
  );
}

export default function LeGangSection() {
  return (
    <section id="le-gang" className="gang-section reveal-on-scroll">
      {/* Bandeau en-tete : comme une couverture de dossier classe */}
      <div className="gang-header">
        <span className="gang-header__classified" aria-hidden="true">
          CLASSIFIED · N° 911 · FBI MOST WANTED
        </span>
        <h2 className="gang-header__title">
          <span className="gang-header__title-small">DOSSIER</span>
          LE <span className="gang-header__accent">GANG</span>
        </h2>
        <p className="gang-header__subtitle">
          Cinq suspects identifiés. Cinq façons de passer aux aveux.
          <br />
          <em>Pris en flagrant délit par notre équipe d&apos;enquêteurs.</em>
        </p>
      </div>

      <div className="gang-grid">
        {gangMembers.map((m) => (
          <GangCard key={m.id} member={m} />
        ))}
      </div>


    </section>
  );
}
