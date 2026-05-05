'use client';

import { useSyncExternalStore } from 'react';

/**
 * Badge "Ouvert maintenant / Ferme dans X / Ferme" calcule cote client
 * en fuseau horaire Europe/Paris a partir des horaires officiels THE 911.
 *
 * Strategie :
 *  - Source de verite = SCHEDULE (cle = jour de semaine 0..6, dim = 0).
 *  - Recalcul toutes les 60 s pour rester synchro autour des transitions.
 *  - SSR-safe : on attend le 1er render client (pas de hydration mismatch).
 *
 * Pour mettre a jour les horaires : modifier SCHEDULE + le JSON-LD du layout
 * + le footer. (Impossible a deduire l'un de l'autre sans coupler les fichiers.)
 */

type TimeRange = { open: number; close: number }; // minutes depuis 00:00 (close peut depasser 24*60 pour les fermetures apres minuit)

const SCHEDULE: Record<number, TimeRange[]> = {
  // 0 = Dimanche
  0: [{ open: 17 * 60, close: 24 * 60 }],
  // 1..4 = Lundi..Jeudi
  1: [{ open: 11 * 60 + 30, close: 24 * 60 }],
  2: [{ open: 11 * 60 + 30, close: 24 * 60 }],
  3: [{ open: 11 * 60 + 30, close: 24 * 60 }],
  4: [{ open: 11 * 60 + 30, close: 24 * 60 }],
  // 5 = Vendredi
  5: [{ open: 15 * 60, close: 26 * 60 }], // ferme a 02:00 le samedi
  // 6 = Samedi
  6: [{ open: 11 * 60 + 30, close: 26 * 60 }], // ferme a 02:00 le dimanche
};

type Status =
  | { state: 'open'; closesIn: number; closesAt: string }
  | { state: 'closing-soon'; closesIn: number; closesAt: string }
  | { state: 'closed'; opensIn: number | null; opensAt: string | null };

function getNowInParis(): { day: number; minutes: number } {
  // Astuce : Intl + en-CA donne YYYY-MM-DD HH:mm:ss en 24h, donc parseable
  // sans dependance externe et fiable cote fuseau Europe/Paris.
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const weekdayShort = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: map[weekdayShort] ?? new Date().getDay(), minutes: hour * 60 + minute };
}

function formatHM(minutes: number): string {
  const m = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

function computeStatus(): Status {
  const { day, minutes } = getNowInParis();

  // 1) Verifier le creneau de la veille (utile apres minuit pour Vendredi/Samedi)
  const prevDay = (day + 6) % 7;
  for (const r of SCHEDULE[prevDay] ?? []) {
    if (r.close > 24 * 60 && minutes < r.close - 24 * 60) {
      const closesIn = r.close - 24 * 60 - minutes;
      return closesIn <= 30
        ? { state: 'closing-soon', closesIn, closesAt: formatHM(r.close - 24 * 60) }
        : { state: 'open', closesIn, closesAt: formatHM(r.close - 24 * 60) };
    }
  }

  // 2) Verifier les creneaux du jour
  for (const r of SCHEDULE[day] ?? []) {
    if (minutes >= r.open && minutes < r.close) {
      const closesIn = r.close - minutes;
      return closesIn <= 30
        ? { state: 'closing-soon', closesIn, closesAt: formatHM(r.close) }
        : { state: 'open', closesIn, closesAt: formatHM(r.close) };
    }
  }

  // 3) Sinon ferme : on cherche la prochaine ouverture dans les 7 jours
  for (let i = 0; i < 8; i++) {
    const checkDay = (day + i) % 7;
    for (const r of SCHEDULE[checkDay] ?? []) {
      if (i === 0 && minutes >= r.open) continue;
      const opensIn =
        i === 0 ? r.open - minutes : i * 24 * 60 - minutes + r.open;
      return { state: 'closed', opensIn, opensAt: formatHM(r.open) };
    }
  }

  return { state: 'closed', opensIn: null, opensAt: null };
}

/* === useSyncExternalStore plumbing ============================
 * React 19 / Next 16 interdit `setState` direct dans `useEffect`
 * (regle `react-hooks/set-state-in-effect`). Le pattern canonique
 * pour synchroniser un composant avec une source externe (ici,
 * l'horloge) est `useSyncExternalStore` :
 *   - `subscribe` enregistre un callback rappele toutes les minutes
 *   - `getSnapshot` retourne l'etat courant cote client
 *   - `getServerSnapshot` retourne `null` pour eviter tout mismatch
 *     d'hydratation (le serveur ne connait pas le fuseau client).
 *
 * On stringifie le status pour avoir une egalite stricte entre
 * deux snapshots identiques (sinon useSyncExternalStore reboucle).
 */
let cachedStatusKey = '';
let cachedStatus: Status | null = null;

function getClientStatusSnapshot(): Status {
  const next = computeStatus();
  const key = JSON.stringify(next);
  if (key !== cachedStatusKey) {
    cachedStatusKey = key;
    cachedStatus = next;
  }
  return cachedStatus as Status;
}

function getServerStatusSnapshot(): null {
  return null;
}

function subscribeStatus(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const id = window.setInterval(callback, 60_000);
  return () => window.clearInterval(id);
}

export default function OpenStatusBadge() {
  const status = useSyncExternalStore<Status | null>(
    subscribeStatus,
    getClientStatusSnapshot,
    getServerStatusSnapshot
  );

  // SSR/Hydration : on rend un placeholder neutre tant qu'on n'a pas
  // calcule cote client (sinon mismatch HTML serveur vs client).
  if (!status) {
    return (
      <span className="open-badge open-badge--idle" aria-hidden="true">
        <span className="open-badge__dot" />
        <span className="open-badge__text">...</span>
      </span>
    );
  }

  if (status.state === 'open') {
    return (
      <span className="open-badge open-badge--open" role="status">
        <span className="open-badge__dot" />
        <span className="open-badge__text">
          Ouvert &middot; ferme à {status.closesAt}
        </span>
      </span>
    );
  }

  if (status.state === 'closing-soon') {
    return (
      <span className="open-badge open-badge--soon" role="status">
        <span className="open-badge__dot" />
        <span className="open-badge__text">
          Ferme dans {status.closesIn}&nbsp;min
        </span>
      </span>
    );
  }

  return (
    <span className="open-badge open-badge--closed" role="status">
      <span className="open-badge__dot" />
      <span className="open-badge__text">
        {status.opensAt
          ? `Fermé · ouvre à ${status.opensAt}`
          : 'Fermé'}
      </span>
    </span>
  );
}
