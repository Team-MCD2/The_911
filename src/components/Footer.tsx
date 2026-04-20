/**
 * Footer THE 911 - style US street food premium / NFL vibe.
 *
 * Structure 4 colonnes :
 *   1. Logo + tagline + réseaux sociaux + mini-carte
 *   2. Navigation interne
 *   3. Informations restaurant (adresse, téléphone, email)
 *   4. Horaires d'ouverture
 *
 * Données issues du menu officiel fourni par le restaurant.
 */

const LOCATIONS = [
  {
    id: 'plaisance',
    label: 'THE 911 · PLAISANCE-DU-TOUCH',
    street: '10 Rue des Écoles',
    city: '31830 Plaisance-du-Touch',
    rating: '4.6',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+911+10+Rue+des+Ecoles+31830+Plaisance-du-Touch',
  },
];

const NAVIGATION = [
  { label: 'Menu', href: '#menu' },
  { label: 'Pièces à conviction', href: '#best-sellers' },
  { label: 'Le Concept', href: '#about' },
  { label: 'Commande & Livraison', href: '#delivery' },
  { label: 'Scène du délit', href: '#ambiance' },
  { label: 'Témoignages', href: '#reviews' },
];

/* Icônes sociales inline - SVG minimalistes pour performance et contrôle total */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.001 2.06c3.21-.04 5.95 1.92 6.97 4.85.34.99.43 2.05.32 3.09-.05.51-.05 1.02.05 1.53.32.16.71.21 1.03.05.27-.13.59-.13.86 0 .43.16.7.59.59 1.05-.16.65-.97.86-1.51.97-.32.05-.7.16-.86.43-.11.27 0 .59.16.81.7 1.13 1.83 1.94 3.13 2.27.32.05.59.32.59.65 0 .16-.05.32-.16.43-.59.65-1.62.92-2.43 1.13-.21.05-.27.27-.32.43-.05.21-.05.43-.27.59-.27.21-.7.05-1.03-.05-.86-.21-1.78-.27-2.59.16-.43.21-.81.59-1.18.92-.92.81-1.94 1.51-3.18 1.51s-2.27-.7-3.18-1.51c-.38-.32-.76-.7-1.18-.92-.81-.43-1.73-.38-2.59-.16-.32.11-.76.27-1.03.05-.21-.16-.21-.38-.27-.59-.05-.16-.11-.38-.32-.43-.81-.21-1.83-.49-2.43-1.13-.11-.11-.16-.27-.16-.43 0-.32.27-.59.59-.65 1.3-.32 2.43-1.13 3.13-2.27.16-.21.27-.54.16-.81-.16-.27-.54-.38-.86-.43-.54-.11-1.35-.32-1.51-.97-.11-.46.16-.89.59-1.05.27-.13.59-.13.86 0 .32.16.7.11 1.03-.05.11-.51.11-1.03.05-1.53-.11-1.05-.03-2.11.32-3.09 1.02-2.93 3.76-4.89 6.97-4.85z" />
    </svg>
  );
}

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/the_911_burger/',
    handle: '@the_911_burger',
    Icon: InstagramIcon,
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/the911plaisance',
    handle: 'the911plaisance',
    Icon: SnapchatIcon,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="caution-tape-container bottom-tape">
        <div className="caution-tape tape-3">
          <span>SCÈNE DE CRIME 🚔 SCÈNE DE CRIME 🚔 SCÈNE DE CRIME 🚔 SCÈNE DE CRIME 🚔</span>
        </div>
      </div>

      <div className="footer-grid reveal-on-scroll">
        {/* ===== COL 1 : BRAND + SOCIALS + MAP ===== */}
        <div className="footer-col footer-brand">
          <div className="logo">
            <span className="logo-text">THE</span>
            <span className="logo-911 outline">911</span>
          </div>
          <p className="tagline">Guilty Sandwich · Sandwichs · Burgers · Croq&apos;Mr</p>
          <p className="footer-description">
            Produits frais, fait maison, halal — servis sur place, à emporter
            ou livrés à Plaisance-du-Touch jusqu&apos;à 2h du matin.
          </p>

          <div className="footer-socials-row">
            {SOCIALS.map(({ name, href, handle, Icon }) => (
              <a
                key={name}
                className="footer-social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Nous suivre sur ${name} (${handle})`}
                title={handle}
              >
                <Icon />
              </a>
            ))}
          </div>

          <div className="map-container" aria-hidden="true">
            <iframe
              src="https://maps.google.com/maps?q=10+Rue+des+Ecoles+31830+Plaisance-du-Touch&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation THE 911 - 10 Rue des Écoles, 31830 Plaisance-du-Touch"
            />
          </div>
        </div>

        {/* ===== COL 2 : NAVIGATION ===== */}
        <div className="footer-col footer-nav">
          <h4>NAVIGATION</h4>
          <ul className="footer-nav-list">
            {NAVIGATION.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="footer-link"
                  aria-label={`Aller à la section ${item.label}`}
                >
                  <span className="footer-link__chevron" aria-hidden="true">›</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== COL 3 : INFOS RESTAURANT ===== */}
        <div className="footer-col footer-info">
          <h4>QUARTIER GÉNÉRAL</h4>
          <ul className="footer-locations">
            {LOCATIONS.map((loc) => (
              <li key={loc.id} className="footer-location">
                <span className="footer-location__label">{loc.label}</span>
                <a
                  className="footer-location__address"
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Itinéraire vers ${loc.label} sur Google Maps`}
                >
                  {loc.street}
                  <br />
                  {loc.city}
                </a>
                <span
                  className="footer-location__rating"
                  aria-label={`Note Google ${loc.rating} sur 5`}
                >
                  <span aria-hidden="true">★</span> {loc.rating}/5
                </span>
              </li>
            ))}
          </ul>

          <div className="footer-contact">
            <a
              className="footer-contact__item"
              href="tel:+33759652689"
              aria-label="Appeler THE 911 au 07 59 65 26 89"
            >
              <span className="footer-contact__icon" aria-hidden="true">☎</span>
              <span>07&nbsp;59&nbsp;65&nbsp;26&nbsp;89</span>
            </a>
            <a
              className="footer-contact__item"
              href="mailto:contact@the911.fr"
              aria-label="Écrire à THE 911 par email"
            >
              <span className="footer-contact__icon" aria-hidden="true">✉</span>
              <span>contact@the911.fr</span>
            </a>
          </div>
        </div>

        {/* ===== COL 4 : HORAIRES ===== */}
        <div className="footer-col footer-hours">
          <h4>HEURES DE COUVRE-FEU</h4>
          <ul className="footer-hours-list">
            <li><span>Lun — Jeu</span><span>11:30 — 00:00</span></li>
            <li><span>Vendredi</span><span>15:00 — 02:00</span></li>
            <li><span>Samedi</span><span>11:30 — 02:00</span></li>
            <li><span>Dimanche</span><span>17:00 — 00:00</span></li>
          </ul>
          <p className="footer-hours-badge">
            Halal · Sur place · À emporter · Livraison Uber Eats &amp; Deliveroo
          </p>
        </div>
      </div>

      {/* ===== SÉPARATEUR YARD-LINE (style terrain NFL) ===== */}
      <div className="footer-yard" aria-hidden="true">
        <span className="footer-yard__line footer-yard__line--left" />
        <span className="footer-yard__marker">
          <span className="footer-yard__hash footer-yard__hash--left" />
          50
          <span className="footer-yard__hash footer-yard__hash--right" />
        </span>
        <span className="footer-yard__line footer-yard__line--right" />
      </div>

      {/* ===== BAS DE FOOTER : COPYRIGHT + LÉGAL + SIGNATURE DEV ===== */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {year} THE 911 — Tous droits réservés.
        </p>

        <nav className="footer-legal" aria-label="Mentions légales et confidentialité">
          <a
            href="/mentions-legales"
            className="footer-legal__link"
            aria-label="Consulter les mentions légales"
          >
            Mentions légales
          </a>
          <span className="footer-legal__sep" aria-hidden="true">·</span>
          <a
            href="/mentions-legales#confidentialite"
            className="footer-legal__link"
            aria-label="Consulter la politique de confidentialité"
          >
            Confidentialité
          </a>
          <span className="footer-legal__sep" aria-hidden="true">·</span>
          <a
            href="/mentions-legales#cookies"
            className="footer-legal__link"
            aria-label="Consulter la politique cookies"
          >
            Cookies
          </a>
        </nav>

        <p className="dev-signature">
          <span className="dev-signature__label">Développé par</span>{' '}
          <a
            href="https://microdidact.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-signature__link"
            aria-label="Microdidact - studio de développement (ouvre un nouvel onglet)"
          >
            Microdidact
            <span className="dev-signature__arrow" aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
