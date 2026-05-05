'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * DISPATCHER 911 - Widget flottant simulant un terminal radio de police.
 * En bas a droite (au-dessus du bouton "Appeler" sur mobile), il affiche
 * des messages "DISPATCHER" qui defilent, donnant une impression de vie
 * autour du restaurant : commandes livrees, nouveaux avis, etc.
 *
 * Philosophy :
 *  - C'est du fake volontaire et assume (c'est une mise en scene, pas un
 *    vrai dashboard) mais il est assez credible pour faire sourire.
 *  - Les messages sont pre-ecrits, tires au hasard en front pour eviter
 *    toute charge backend.
 *  - Cachable par l'utilisateur (croix), etat stocke en sessionStorage
 *    (se reaffiche a chaque session pour ne pas louper la surprise).
 *  - Zero son (pas de beep ni sirene) -> surprise controlee, pas agressive.
 *
 * Accessibilite :
 *  - `role="log"` + `aria-live="polite"` : les nouvelles transmissions
 *    sont annoncees discretement aux lecteurs d'ecran.
 *  - Bouton close clavier-focusable avec aria-label clair.
 */

type Transmission = {
  id: number;
  code: string; // "10-4", "10-20", etc. (codes radio police fictifs)
  message: string;
  variant?: 'info' | 'alert' | 'delivery';
};

const TRANSMISSIONS: Omit<Transmission, 'id'>[] = [
  { code: '10-4', message: 'Mountain livré secteur Plaisance. RAS.', variant: 'delivery' },
  { code: '10-20', message: 'Unité Uber Eats en approche. ETA 12 min.', variant: 'info' },
  { code: '10-8', message: 'Cuisine 911 opérationnelle. Tous agents postés.', variant: 'info' },
  { code: '10-76', message: 'Smash 2 en cours de préparation. Suspect identifié.', variant: 'info' },
  { code: 'CODE R', message: "Nouvelle déposition sur Google. Verdict : 5/5.", variant: 'alert' },
  { code: '10-4', message: 'Harlem interpellé secteur Tournefeuille. Coupable.', variant: 'delivery' },
  { code: '10-40', message: 'Flux Deliveroo stable. Trafic normal.', variant: 'info' },
  { code: 'CODE 911', message: 'Stock frites critique. Renforts en route.', variant: 'alert' },
  { code: '10-22', message: 'Pulled Beef épuisé. Reprise prévue 18h30.', variant: 'alert' },
  { code: '10-4', message: 'Chicanos livré Plaisance. Victime consentante.', variant: 'delivery' },
  { code: '10-33', message: 'File d\'attente comptoir : 3 civils. On gère.', variant: 'info' },
];

const SESSION_KEY = 'the911:dispatcher-closed';
const ROTATION_MS = 6500;

export default function DispatcherWidget() {
  const [closed, setClosed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState<Transmission>(() => ({
    id: 0,
    ...TRANSMISSIONS[0],
  }));
  const counterRef = useRef(1);

  /* Mount delay + session check : on n'affiche pas tout de suite pour ne
   * pas surcharger le premier load. Et si l'utilisateur a ferme pendant
   * sa session, on respecte ce choix (pas de harcelement).
   *
   * Note: on NE declenche PAS setState dans useEffect synchrone (regle
   * React 19 `react-hooks/set-state-in-effect`). On utilise setTimeout
   * qui est un callback async, ce qui est autorise. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let closedInSession = false;
    try {
      closedInSession = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* storage indispo : on affiche quand meme */
    }
    if (closedInSession) return;

    const mountTimer = window.setTimeout(() => {
      setMounted(true);
    }, 2500);

    return () => window.clearTimeout(mountTimer);
  }, []);

  /* Rotation des transmissions toutes les ROTATION_MS ms. */
  useEffect(() => {
    if (!mounted || closed) return;
    const rotate = window.setInterval(() => {
      const next = TRANSMISSIONS[counterRef.current % TRANSMISSIONS.length];
      setCurrent({ id: counterRef.current, ...next });
      counterRef.current += 1;
    }, ROTATION_MS);
    return () => window.clearInterval(rotate);
  }, [mounted, closed]);

  const handleClose = useCallback(() => {
    setClosed(true);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* no-op */
    }
  }, []);

  if (!mounted || closed) return null;

  return (
    <aside
      className={`dispatcher dispatcher--${current.variant ?? 'info'}`}
      role="log"
      aria-live="polite"
      aria-label="Dispatcher THE 911 - transmissions en direct"
    >
      <div className="dispatcher__header">
        <span className="dispatcher__led" aria-hidden="true" />
        <span className="dispatcher__title">DISPATCHER 911</span>
        <button
          type="button"
          className="dispatcher__close"
          onClick={handleClose}
          aria-label="Fermer le dispatcher"
        >
          ×
        </button>
      </div>

      {/* Le contenu change a chaque tick : la key force le remount et
          relance l'animation d'entree (le texte "tape" lettre par lettre). */}
      <div key={current.id} className="dispatcher__body">
        <span className="dispatcher__code" aria-hidden="true">
          {current.code}
        </span>
        <span className="dispatcher__message">{current.message}</span>
      </div>

      <div className="dispatcher__footer" aria-hidden="true">
        <span className="dispatcher__bars">
          <i /><i /><i /><i /><i />
        </span>
        <span className="dispatcher__freq">FREQ 91.1 MHz</span>
      </div>
    </aside>
  );
}
