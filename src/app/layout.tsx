import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Russo_One } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const russoOne = Russo_One({ weight: '400', subsets: ['latin'], variable: '--font-russo' });

/**
 * URL canonique du site. Override possible via la variable Vercel
 * `NEXT_PUBLIC_SITE_URL` (preview vs prod). Indispensable pour résoudre les
 * URLs absolues d'Open Graph / Twitter Card / sitemap (sinon Next.js logge
 * un warning et les apercus sociaux n'embarquent pas l'image OG).
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://the911.fr';

const SITE_TITLE = 'THE 911 — Guilty Sandwich · Plaisance-du-Touch';
const SITE_DESCRIPTION =
  "THE 911 - Le repaire des Guilty Sandwiches à Plaisance-du-Touch (Toulouse). Burgers, sandwichs et croq'mr halal, fait maison, sur place ou livrés (Uber Eats / Deliveroo).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s · THE 911',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'THE 911',
  authors: [{ name: 'THE 911 — Plaisance-du-Touch' }],
  generator: 'Next.js',
  keywords: [
    'restaurant',
    'fast food',
    'guilty sandwich',
    'the 911',
    'burger',
    'smash burger',
    'sandwich',
    'croque monsieur',
    'plaisance-du-touch',
    'toulouse',
    'halal',
    'livraison',
    'uber eats',
    'deliveroo',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'THE 911',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    /* L'image est résolue automatiquement par la convention `opengraph-image.tsx`
     * placée dans /src/app, qui génère un PNG 1200x630 au branding 911. */
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  category: 'food',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * JSON-LD structuré (schema.org) - Restaurant + AggregateRating + Menu.
   *
   * - `AggregateRating` : ratingCount = nombre d'avis Google (à mettre à jour
   *   manuellement, ou brancher l'API Google Places côté serveur ensuite).
   * - `hasMenu` : permet à Google de proposer un rich result "Voir le menu".
   * - `geo` : coordonnées GPS du 10 rue des Écoles à Plaisance-du-Touch
   *   (Google StreetView confirme l'adresse).
   * - `acceptsReservations: false` : évite que Google propose une réservation,
   *   ce que THE 911 ne gère pas (fast-food sans résa).
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: 'THE 911 — Guilty Sandwich',
    alternateName: 'The 911 Burger',
    description:
      "Burgers, sandwichs et croq'mr halal, fait maison à Plaisance-du-Touch.",
    url: SITE_URL,
    image: [`${SITE_URL}/images/menu/mountain.jpeg`],
    logo: `${SITE_URL}/icon.svg`,
    servesCuisine: ['American', 'Burgers', 'Street Food', 'Halal'],
    priceRange: '€€',
    paymentAccepted: 'Cash, Credit Card',
    currenciesAccepted: 'EUR',
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10 Rue des Écoles',
      addressLocality: 'Plaisance-du-Touch',
      postalCode: '31830',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.5705,
      longitude: 1.2974,
    },
    telephone: '+33759652689',
    email: 'contact@the911.fr',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '180',
      bestRating: '5',
      worstRating: '1',
    },
    hasMenu: {
      '@type': 'Menu',
      name: 'Carte THE 911',
      hasMenuSection: [
        { '@type': 'MenuSection', name: 'Burgers' },
        { '@type': 'MenuSection', name: 'Sandwichs' },
        { '@type': "MenuSection", name: "Croq' Mr" },
        { '@type': 'MenuSection', name: 'Menu Enfant & Desserts' },
      ],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '11:30',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '15:00',
        closes: '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '11:30',
        closes: '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '17:00',
        closes: '00:00',
      },
    ],
    potentialAction: [
      {
        '@type': 'OrderAction',
        target: 'https://www.ubereats.com/fr/store/the-911/owdwE6JSXsGsWuokm-mvfQ',
        deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
      },
      {
        '@type': 'OrderAction',
        target:
          'https://deliveroo.fr/fr/menu/toulouse/plaisance-du-touch-est/the-911-plaisance-du-touch-10-rue-des-ecoles',
        deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
      },
    ],
    sameAs: [
      'https://www.instagram.com/the_911_burger/',
      'https://www.snapchat.com/add/the911plaisance',
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${russoOne.variable}`}>
      <body>
        {children}
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          /* dangerouslySetInnerHTML est ici sûr : `jsonLd` est une constante
           * littérale 100 % côté serveur, aucune entrée utilisateur. */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
