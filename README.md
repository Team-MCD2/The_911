# THE 911 — Documentation technique

Site vitrine d'un restaurant burger (thème **crime scene / football américain**). Stack **Next.js 16 App Router + React 19 + TypeScript**, CSS global custom (pas de Tailwind).

---

## 1. Prérequis

- **Node.js ≥ 20**
- **npm** (ou pnpm/yarn)

## 2. Démarrage rapide

```powershell
npm install
npm run dev        # http://localhost:3000  (exposé en LAN sur 0.0.0.0)
npm run build      # build de production (Turbopack)
npm run start      # serveur de prod local
npm run lint       # ESLint (eslint-config-next)
```

## 3. Stack & dépendances

| Rôle | Choix |
|---|---|
| Framework | Next.js `16.2.4` (App Router, Turbopack) |
| UI | React `19.2.3` |
| Langage | TypeScript strict |
| Styling | CSS global (`src/app/globals.css`) |
| Polices | `next/font/google` → Inter + Russo One |
| Images brand | `next/image` (logos Uber Eats / Deliveroo) |
| Déploiement | Vercel (auto-deploy sur push GitHub) |

Aucune lib externe front : animations = CSS pur, observers = API navigateur.

---

## 4. Arborescence

```
.
├── public/
│   ├── images/
│   │   ├── ambiance/               # photos scènes
│   │   ├── brands/                 # logos ubereats.png / deliveroo.png
│   │   ├── burger_*.png            # visuels best-sellers
│   │   └── menu_*.png, logo_*.png
│   └── videos/
│       ├── hero-epithete.mp4       # fond vidéo hero
│       └── video.mp4               # touchdown reel
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # <html>, fonts, metadata, viewport, JSON-LD
│   │   ├── page.tsx                # home : assemble sections + IntersectionObserver global
│   │   ├── globals.css             # ~3100 lignes, TOUT le style
│   │   ├── icon.svg                # favicon (auto-détecté par Next.js)
│   │   ├── apple-icon.tsx          # PNG 180×180 généré via next/og
│   │   └── mentions-legales/
│   │       └── page.tsx            # page /mentions-legales
│   └── components/
│       ├── Navbar.tsx              # nav + burger mobile (client)
│       ├── HeroSection.tsx         # hero vidéo + logo 911 (client)
│       ├── BestSellersSection.tsx  # carrousel horizontal (server)
│       ├── PourquoiNousSection.tsx # benefits + Touchdown reel (client)
│       ├── MenuSection.tsx         # menu complet + filtres (client)
│       ├── DeliverySection.tsx     # ballons US + stats + CTA (client)
│       ├── ReviewsSection.tsx      # slider d'avis (server)
│       ├── AmbianceSection.tsx     # galerie bento-grid (server)
│       └── Footer.tsx              # footer 4 colonnes
│
├── next.config.ts                  # config Next (vide)
├── tsconfig.json                   # paths : @/* → src/*
└── package.json
```

---

## 5. Routes

| URL | Fichier | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing, assemble toutes les sections |
| `/mentions-legales` | `src/app/mentions-legales/page.tsx` | Éditeur, SIREN/SIRET/TVA/NAF, hébergement, RGPD, cookies |

## 6. Composants — rôle & logique clé

### `Navbar.tsx` *(client)*
- Logo *THE 911* + liens ancre + CTA *COMMANDER*.
- **Burger menu mobile** (≤ 900 px) : overlay animé, lock body scroll, fermeture Escape / backdrop / clic item.
- État `scrolled` → réduit le padding après 50 px de scroll.

### `HeroSection.tsx` *(client)*
- Vidéo de fond `/videos/hero-epithete.mp4` en autoplay/loop/muted/playsInline.
- **Force-play via ref** dans `useEffect` : `setAttribute('muted'/'playsinline'/'webkit-playsinline')`, `.play()` sur `loadeddata`/`canplay`, fallback sur 1er `touchstart`/`click`/`scroll` si bloqué.
- Pause uniquement sur `visibilitychange` (jamais au scroll).
- 2 bandes de rubalise animées en CSS.

### `BestSellersSection.tsx` *(server)*
- Données inline `bestSellers[]` (id, name, desc, price, img).
- Carrousel horizontal `scroll-snap-type: x mandatory`.

### `PourquoiNousSection.tsx` *(client)*
- 3 benefit-cards (viande, frites, sauces).
- **Touchdown block** : vidéo verticale `/videos/video.mp4` avec même stratégie autoplay que Hero + toggle mute + fallback bouton LIRE + fallback lien Instagram sur erreur.

### `MenuSection.tsx` *(client)*
- State `filter` : `tout` / `burgers` / `sides` / `boissons`.
- `IntersectionObserver` local sur `.menu-card` pour re-animer à chaque changement de filtre.

### `DeliverySection.tsx` *(client)*
- 2 cartes plateforme configurées dans `PLATFORMS[]`.
- **Ballon foot US en CSS pur** : tilt 3D au curseur via CSS variables (`--rx`/`--ry`/`--mx`/`--my`, aucun re-render React), gloss, press spring, idle breathing, sparks.
- Logo `next/image` + glow brand, stats (note · temps · popularité), CTA avec shine au hover.
- Ambiance stade : spotlights oscillants, scoreboard `LIVE · DELIVERY` clignotant, lignes de yard.

### `AmbianceSection.tsx` *(server)*
- Grille bento 3 col (featured + tall + wide + std).

### `Footer.tsx`
- 4 colonnes : brand, nav, adresses, horaires. Safe-area iOS intégrée.

---

## 7. Mécanismes transverses

### Scroll reveal global
`src/app/page.tsx` instancie **un seul `IntersectionObserver`** qui ajoute `.is-visible` à tout élément `.reveal-on-scroll` dès 10 % visible. Le CSS gère l'animation (opacity + translateY).

```tsx
<div className="reveal-on-scroll">...</div>
```

### Autoplay vidéos mobile (pattern Hero + Touchdown)

1. Forcer `muted` + `playsinline` + `webkit-playsinline` **en attributs DOM** (React ne set parfois que la propriété JS).
2. Appeler `.play()` dans `useEffect` dès `readyState ≥ 2`, sinon sur `loadeddata`/`canplay`.
3. **Fallback gesture** : si `.play()` rejette, on attend le 1er `touchstart`/`click`/`scroll` pour relancer.
4. Pause seulement quand l'onglet passe en arrière-plan (`visibilitychange`).

### Menu burger
Scroll lock body, fermeture Escape, `aria-expanded`/`aria-controls`. Panel slide via `translateX(105%) → 0` avec cubic-bezier spring.

---

## 8. Styles — conventions

**Tout le CSS est dans `src/app/globals.css`** (~3100 lignes), organisé par section dans l'ordre : reset & tokens → navbar → hero → best-sellers → menu → pourquoi/touchdown → delivery → reviews → ambiance → footer → **media queries** → legal.

### Variables CSS (`:root`)

```css
--color-bg: #0a0a0a;
--color-primary: #FFC904;     /* jaune rubalise / brand */
--color-text: #ffffff;
--color-text-muted: #888888;
--font-heading: 'Russo One', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Breakpoints

| Largeur max | Cible | Effets principaux |
|---|---|---|
| 992 px | tablette | footer 2 col, touchdown compact |
| **900 px** | tablette/mobile | **burger ON, nav-links OFF**, menu-grid 1 col |
| 768 px | mobile large | paddings sections réduits |
| 600 px | mobile | hero `100svh`, boutons full-width |
| 380 px | petits phones | scale logo hero, filtres compactés |

Tailles fluides via `clamp()` sur `.section-title`, `.the-text`, `.nine-text`, `.caution-tape`, `.express-badge`.

---

## 9. Comment ajouter / modifier

| Action | Où | Comment |
|---|---|---|
| Ajouter un best-seller | `BestSellersSection.tsx` | Ajouter entrée dans `bestSellers[]` + image dans `public/images/` |
| Ajouter un plat au menu | `MenuSection.tsx` | Ajouter entrée dans `menuData[]`, category `burgers` / `sides` / `boissons` |
| Ajouter une plateforme livraison | `DeliverySection.tsx` | Ajouter objet dans `PLATFORMS[]`, logo dans `public/images/brands/` |
| Remplacer une vidéo | `public/videos/` | Garder le nom (`hero-epithete.mp4` ou `video.mp4`), encoder H.264 faststart |
| Changer le favicon | `src/app/icon.svg` + `src/app/apple-icon.tsx` | Next.js les injecte automatiquement |

Optimiser une vidéo pour démarrage instantané :

```powershell
ffmpeg -i input.mp4 -movflags +faststart -vcodec libx264 -acodec aac output.mp4
```

---

## 10. SEO & métadonnées

- `metadata` + `viewport` exportés depuis `src/app/layout.tsx`.
- **JSON-LD `Schema.org/Restaurant`** injecté via `<Script>` (nom, adresse, cuisine, priceRange).
- `<html lang="fr">`, `theme-color: #0a0a0a`, `viewportFit: cover`.
- Balises sémantiques `<time dateTime>` sur les dates légales.

---

## 11. Déploiement

Repo connecté à **Vercel**, auto-deploy sur `main` :

```powershell
git add .
git commit -m "..."
git push origin main     # → Vercel build + deploy (~2 min)
```

Aucune variable d'environnement requise. `next.config.ts` vide (pas de `remotePatterns` : les images externes passent par `background-image`, pas `next/image`).

---

## 12. Points d'attention

- **Vidéos** : `hero-epithete.mp4` (~2,9 Mo) + `video.mp4` (~5,2 Mo). Plus lourd → encoder `+faststart` obligatoire pour le mobile.
- **Images Unsplash** utilisées dans `MenuSection` et `PourquoiNousSection` (posters) : à remplacer par des assets locaux si pérennité.
- **`overflow-x: hidden`** sur `body` pour éviter le scroll horizontal causé par les bandes et effets 3D.
- **`prefers-reduced-motion`** respecté sur les ballons delivery et l'icône dev du footer.

---

## 13. Identité éditeur (aussi dans `/mentions-legales`)

- **Raison sociale** : THE 911 (SAS)
- **Siège** : 10 Rue des Écoles, 31830 Plaisance-du-Touch
- **SIREN** `942 612 565` · **SIRET** `942 612 565 00013` · **TVA** `FR05942612565`
- **NAF** `56.10C` (Restauration de type rapide)
- **Dirigeant** : Johnson-Laurent LOSBAR
