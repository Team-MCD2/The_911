'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

/**
 * Bandeau cookies minimaliste, conforme RGPD / CNIL :
 * - Refus aussi facile que l'acceptation (2 boutons + lien politique cookies)
 * - Pas de dépot de cookie tant que l'utilisateur n'a pas tranché
 * - Persiste le choix dans localStorage (clé `the911:cookie-consent`)
 * - Aucun script tiers chargé pour l'instant : ce bandeau prépare le terrain
 *   au cas où vous brancheriez plus tard Google Analytics, Meta Pixel, etc.
 *
 * Pour ajouter un tracker plus tard : lire `the911:cookie-consent === 'accepted'`
 * dans un composant `<Analytics />` injecté dans layout.tsx (avec le même
 * useSyncExternalStore pour rester ESLint-clean en React 19).
 */

const STORAGE_KEY = 'the911:cookie-consent';

type Consent = 'pending' | 'accepted' | 'refused';

/* === useSyncExternalStore : lecture SSR-safe du localStorage =====
 * React 19 interdit setState synchrone dans useEffect. On expose donc
 * le localStorage comme "store externe" à React :
 *   - `subscribe` écoute l'évènement `storage` (changement multi-onglet)
 *     + un évènement custom `the911:consent-change` pour les updates locaux
 *   - `getSnapshot` lit synchrone la clé courante
 *   - `getServerSnapshot` retourne 'pending' (le serveur ne connaît pas
 *     l'état du localStorage du visiteur).
 */

const CONSENT_EVENT = 'the911:consent-change';

function readConsent(): Consent {
  if (typeof window === 'undefined') return 'pending';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'accepted' || v === 'refused') return v;
  } catch {
    /* mode privé old Safari, etc. -> on traite comme pending */
  }
  return 'pending';
}

function subscribeConsent(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getServerConsent(): Consent {
  return 'pending';
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerConsent);
  /* `dismissed` = état local pour permettre un reject "session" si jamais
   * le localStorage a écrit mais que la lecture suivante reste pending
   * (cas edge mode privé). Évite le re-rendu en boucle. */
  const [dismissed, setDismissed] = useState(false);

  const persist = (choice: 'accepted' | 'refused') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* no-op */
    }
    /* Notifie tous les abonnés (multi-onglets + ce composant) */
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setDismissed(true);
  };

  if (consent !== 'pending' || dismissed) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      <div className="cookie-banner__inner">
        <div className="cookie-banner__copy">
          <p id="cookie-banner-title" className="cookie-banner__title">
            🍪 Vous reprendrez bien un cookie ?
          </p>
          <p className="cookie-banner__text">
            Ce site utilise uniquement des cookies de mesure d&apos;audience anonymes
            pour améliorer votre expérience. Vous pouvez accepter, refuser, ou
            consulter notre{' '}
            <Link
              href="/mentions-legales#cookies"
              className="cookie-banner__link"
            >
              politique cookies
            </Link>
            .
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--ghost"
            onClick={() => persist('refused')}
          >
            Refuser
          </button>
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--primary"
            onClick={() => persist('accepted')}
            autoFocus
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
