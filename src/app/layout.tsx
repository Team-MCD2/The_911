import './globals.css';
import type { Metadata } from 'next';
import { Inter, Russo_One } from 'next/font/google';
import Script from 'next/script';

// Configure fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const russoOne = Russo_One({ weight: "400", subsets: ['latin'], variable: '--font-russo' });

export const metadata: Metadata = {
  title: 'THE 911 | Guilty Sandwich',
  description: 'THE 911 - Le repaire des Guilty Sandwiches. Tellement bons que ça devrait être illégal. Découvrez notre menu de braquage.',
  keywords: 'restaurant, fast food, guilty sandwich, the 911, burger, smash burger, paris, livraison',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    'name': 'THE 911',
    'image': 'https://example.com/logo.png', // Replace with real URL
    'description': 'Le repaire des Guilty Sandwiches.',
    'servesCuisine': ['American', 'Burgers', 'Street Food'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Boulevard du Crime',
      'addressLocality': 'Paris',
      'postalCode': '75011',
      'addressCountry': 'FR'
    },
    'priceRange': '€€',
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
