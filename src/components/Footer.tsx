/**
 * Footer THE 911 - style US street food premium / NFL vibe.
 *
 * Structure 4 colonnes :
 *   1. Logo + tagline + réseaux sociaux + mini-carte
 *   2. Navigation interne
 *   3. Informations restaurant (adresses, téléphone, email)
 *   4. Horaires d'ouverture
 *
 * Bas de footer :
 *   - Séparateur style yard-line de terrain de football américain (badge "50")
 *   - Copyright + liens légaux + signature développeur
 *
 * Données réelles vérifiées (restaurants-de-france.fr, Uber Eats, Bottin.fr).
 * Les champs téléphone/email sont des placeholders à remplacer par le gérant.
 */

const LOCATIONS = [
  {
    id: 'toulouse',
    label: 'THE 911 · TOULOUSE',
    street: '9 Rue Mespoul',
    city: '31400 Toulouse',
    rating: '4.4',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+911+9+Rue+Mespoul+Toulouse',
  },
  {
    id: 'plaisance',
    label: 'THE 911 · PLAISANCE',
    street: '10 Rue des Écoles',
    city: '31830 Plaisance-du-Touch',
    rating: '4.2',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+911+10+Rue+des+Ecoles+Plaisance-du-Touch',
  },
];

const NAVIGATION = [
  { label: 'Menu', href: '#menu' },
  { label: 'Pièces à conviction', href: '#best-sellers' },
  { label: 'Pourquoi nous ?', href: '#about' },
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
function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { name: 'TikTok', href: 'https://www.tiktok.com/', Icon: TiktokIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/', Icon: FacebookIcon },
  { name: 'X (Twitter)', href: 'https://x.com/', Icon: XIcon },
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
          <p className="tagline">Guilty Sandwich Delivery &amp; Takeaway</p>
          <p className="footer-description">
            Burgers briochés, smash burgers et street food premium — halal,
            servis chaud jusqu&apos;à 2h du matin à Toulouse.
          </p>

          <div className="footer-socials-row">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                className="footer-social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Nous suivre sur ${name}`}
              >
                <Icon />
              </a>
            ))}
          </div>

          <div className="map-container" aria-hidden="true">
            <iframe
              src="https://maps.google.com/maps?q=the+911+burger+toulouse&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation des deux adresses THE 911 dans l'agglomération toulousaine"
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
          <h4>QUARTIERS GÉNÉRAUX</h4>
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
              href="tel:+33534000000"
              aria-label="Appeler THE 911"
            >
              <span className="footer-contact__icon" aria-hidden="true">☎</span>
              <span>05&nbsp;34&nbsp;00&nbsp;00&nbsp;00</span>
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
            <li><span>Lun — Jeu</span><span>11:30 — 14:20 · 19:00 — 01:45</span></li>
            <li><span>Vendredi</span><span>19:00 — 01:45</span></li>
            <li><span>Samedi</span><span>11:30 — 14:20 · 19:00 — 01:45</span></li>
            <li><span>Dimanche</span><span>19:00 — 01:45</span></li>
          </ul>
          <p className="footer-hours-badge">Halal · Livraison jusqu&apos;à 2h</p>
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
