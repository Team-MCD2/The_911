import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Russo_One } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const russoOne = Russo_One({ weight: "400", subsets: ['latin'], variable: '--font-russo' });

export const metadata: Metadata = {
  title: 'THE 911 | Guilty Sandwich · Plaisance-du-Touch',
  description: 'THE 911 - Le repaire des Guilty Sandwiches à Plaisance-du-Touch (Toulouse). Burgers, sandwichs et croq\'mr halal, fait maison, sur place ou livrés (Uber Eats / Deliveroo).',
  keywords: 'restaurant, fast food, guilty sandwich, the 911, burger, smash burger, sandwich, croque monsieur, plaisance-du-touch, toulouse, halal, livraison, uber eats, deliveroo',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    'name': 'THE 911 - Guilty Sandwich',
    'description': 'Burgers, sandwichs et croq\'mr halal, fait maison à Plaisance-du-Touch.',
    'servesCuisine': ['American', 'Burgers', 'Street Food', 'Halal'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '10 Rue des Écoles',
      'addressLocality': 'Plaisance-du-Touch',
      'postalCode': '31830',
      'addressCountry': 'FR',
    },
    'telephone': '+33759652689',
    'priceRange': '€€',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '11:30',
        'closes': '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Friday',
        'opens': '15:00',
        'closes': '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '11:30',
        'closes': '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '17:00',
        'closes': '00:00',
      },
    ],
    'sameAs': [
      'https://www.instagram.com/the_911_burger/',
      'https://www.snapchat.com/add/the911plaisance',
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${russoOne.variable}`}>
      <body>
        {children}
        <Script id="schema-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
