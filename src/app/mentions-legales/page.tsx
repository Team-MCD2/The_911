import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales · THE 911',
  description:
    'Mentions légales, politique de confidentialité et gestion des cookies du site THE 911 - Restaurant gourmet burger à Toulouse et Plaisance-du-Touch.',
};

export default function MentionsLegalesPage() {
  return (
    <main className="legal-page">
      <header className="legal-hero">
        <Link href="/" className="legal-back" aria-label="Retour à l'accueil">
          ← Retour
        </Link>
        <span className="legal-eyebrow">DOSSIER OFFICIEL</span>
        <h1 className="legal-title">
          MENTIONS <span className="outline">LÉGALES</span>
        </h1>
        <p className="legal-subtitle">
          Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004
          pour la Confiance dans l&apos;économie numérique (LCEN).
        </p>
      </header>

      <nav className="legal-toc" aria-label="Sommaire du document">
        <a href="#mentions">§1 · Éditeur</a>
        <a href="#hebergement">§2 · Hébergement</a>
        <a href="#confidentialite">§3 · Confidentialité</a>
        <a href="#cookies">§4 · Cookies</a>
      </nav>

      <article className="legal-body">
        {/* ========== ÉDITEUR ========== */}
        <section id="mentions" className="legal-section">
          <h2>§1 — Éditeur du site</h2>
          <dl className="legal-dl">
            <dt>Raison sociale</dt>
            <dd>THE 911 — Restaurant</dd>

            <dt>Forme juridique</dt>
            <dd>Société par actions simplifiée (SAS)</dd>

            <dt>Siège social</dt>
            <dd>10 Rue des Écoles, 31830 Plaisance-du-Touch</dd>

            <dt>Adresses d&apos;exploitation</dt>
            <dd>
              9 Rue Mespoul, 31400 Toulouse
              <br />
              10 Rue des Écoles, 31830 Plaisance-du-Touch
            </dd>

            <dt>Dirigeant</dt>
            <dd>Johnson-Laurent LOSBAR</dd>

            <dt>Directeur de la publication</dt>
            <dd>Johnson-Laurent LOSBAR</dd>

            <dt>SIREN</dt>
            <dd>
              <code className="legal-code">942 612 565</code>
            </dd>

            <dt>SIRET du siège social</dt>
            <dd>
              <code className="legal-code">942 612 565 00013</code>
            </dd>

            <dt>Numéro de TVA intracommunautaire</dt>
            <dd>
              <code className="legal-code">FR05942612565</code>
            </dd>

            <dt>Activité (code NAF / APE)</dt>
            <dd>Restauration de type rapide — <code className="legal-code">56.10C</code></dd>

            <dt>Date de création</dt>
            <dd>
              <time dateTime="2025-07-11">11 juillet 2025</time>
            </dd>

            <dt>Contact</dt>
            <dd>
              <a href="mailto:contact@the911.fr">contact@the911.fr</a>
              <br />
              <a href="tel:+33534000000">05 34 00 00 00</a>
            </dd>
          </dl>

          <p className="legal-sources">
            <span className="legal-sources__label">Sources &amp; mise à jour le 16/04/2026 —</span>
            <a
              href="https://www.insee.fr/fr/statistiques"
              target="_blank"
              rel="noopener noreferrer"
            >
              Insee
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href="https://data.inpi.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              RNE
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href="https://annuaire-entreprises.data.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shal
            </a>
          </p>
        </section>

        {/* ========== HÉBERGEMENT ========== */}
        <section id="hebergement" className="legal-section">
          <h2>§2 — Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca
            Ave #4133, Covina, CA 91723, États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
          </p>
          <p>
            Les contenus (textes, photos, code) sont la propriété exclusive de THE 911
            ou de leurs auteurs respectifs. Toute reproduction, même partielle, est
            interdite sans autorisation écrite préalable.
          </p>
        </section>

        {/* ========== CONFIDENTIALITÉ ========== */}
        <section id="confidentialite" className="legal-section">
          <h2>§3 — Politique de confidentialité</h2>
          <p>
            Nous respectons votre vie privée. Les données personnelles collectées via
            ce site (formulaires de contact, commandes) sont traitées conformément au
            Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à
            la loi Informatique et Libertés du 6 janvier 1978 modifiée.
          </p>

          <h3>Données collectées</h3>
          <ul className="legal-list">
            <li>Identité : nom, prénom (lors d&apos;une commande)</li>
            <li>Coordonnées : email, numéro de téléphone, adresse de livraison</li>
            <li>Données techniques : adresse IP, type de navigateur (logs serveur)</li>
          </ul>

          <h3>Finalités du traitement</h3>
          <ul className="legal-list">
            <li>Traitement et livraison de vos commandes</li>
            <li>Réponse à vos demandes via les formulaires</li>
            <li>Amélioration du service et statistiques anonymisées</li>
            <li>Respect de nos obligations légales (comptabilité, fiscalité)</li>
          </ul>

          <h3>Durée de conservation</h3>
          <p>
            Les données sont conservées pendant la durée strictement nécessaire aux
            finalités précitées, et au maximum <strong>3 ans</strong> après le dernier
            contact actif (hors obligations comptables légales de 10 ans).
          </p>

          <h3>Vos droits</h3>
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
            de limitation, de portabilité et d&apos;opposition au traitement de vos données.
            Pour exercer ces droits, contactez-nous à{' '}
            <a href="mailto:contact@the911.fr">contact@the911.fr</a>. Vous pouvez
            également introduire une réclamation auprès de la CNIL ({' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
          </p>
        </section>

        {/* ========== COOKIES ========== */}
        <section id="cookies" className="legal-section">
          <h2>§4 — Politique de cookies</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal lors de
            votre visite. Nous utilisons uniquement des cookies nécessaires au bon
            fonctionnement du site ainsi qu&apos;à la mesure d&apos;audience anonyme.
          </p>

          <h3>Types de cookies utilisés</h3>
          <table className="legal-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Finalité</th>
                <th>Durée</th>
                <th>Consentement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fonctionnels</td>
                <td>Préférences d&apos;affichage, langue</td>
                <td>Session</td>
                <td>Non requis</td>
              </tr>
              <tr>
                <td>Statistiques</td>
                <td>Mesure d&apos;audience anonymisée</td>
                <td>13 mois</td>
                <td>Requis</td>
              </tr>
              <tr>
                <td>Tiers (Google Maps)</td>
                <td>Affichage de l&apos;itinéraire</td>
                <td>Variable</td>
                <td>Requis</td>
              </tr>
            </tbody>
          </table>

          <h3>Gestion de votre consentement</h3>
          <p>
            Vous pouvez à tout moment modifier vos préférences en effaçant les cookies
            depuis les paramètres de votre navigateur (Chrome, Firefox, Safari, Edge),
            ou en refusant leur dépôt lors de votre prochaine visite.
          </p>
        </section>
      </article>

      <footer className="legal-footer">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}.</p>
        <Link href="/" className="legal-back-link">← Retour à l&apos;accueil</Link>
      </footer>
    </main>
  );
}
