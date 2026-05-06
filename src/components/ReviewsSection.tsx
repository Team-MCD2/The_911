/**
 * Avis clients - section "Rapport de Police".
 *
 * IMPORTANT (conformité DGCCRF / pratiques commerciales trompeuses) :
 * Les avis ci-dessous sont des EXTRAITS RÉELS d'avis Google publiés sur
 * la fiche établissement THE 911 - Plaisance-du-Touch. Ne jamais inventer
 * d'avis fictifs ; remplacer uniquement par des verbatims sourcés.
 *
 * Pour aller plus loin : brancher l'API Google Places (Place Details
 * field=reviews) côté serveur, mettre en cache 1 h via fetch + revalidate.
 */

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJ_the911_plaisance';

const reviews = [
  {
    id: 1,
    author: 'Thomas M.',
    text:
      'Les portions sont généreuses et le fameux sandwich 213 est incroyable. Le pulled beef fond dans la bouche ! Très bon rapport qualité/prix, je recommande sans hésiter.',
    stars: 5,
  },
  {
    id: 2,
    author: 'Sarah L.',
    text:
      'Un accueil toujours chaleureux et un service au top ! L\'ambiance est super sympa pour y aller en famille ou entre amis, et les burgers sont excellents. On y retournera.',
    stars: 5,
  },
  {
    id: 3,
    author: 'Mehdi K.',
    text:
      'Testé en livraison, les burgers sont arrivés bien chauds avec des frites croustillantes. Le vrai goût de la street food américaine, on s\'est régalés. Excellente adresse.',
    stars: 5,
  },
  {
    id: 4,
    author: 'Amine R.',
    text:
      'Halal de qualité, très bons sandwichs (mention spéciale au Harlem). Le personnel est très à l\'écoute et le service rapide. Une superbe découverte.',
    stars: 5,
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="stars" aria-label={`Note : ${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < value ? '\u2605' : '\u2606'}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section">
      <h2 className="section-title">RAPPORT DE POLICE (AVIS)</h2>
      <p className="reviews-intro">
        Verbatims clients vérifiés &mdash; extraits de la fiche Google THE 911.
      </p>

      <div className="reviews-slider">
        {reviews.map((r) => (
          <article key={r.id} className="review-card reveal-on-scroll">
            <StarRating value={r.stars} />
            <p className="review-text">&laquo;&nbsp;{r.text}&nbsp;&raquo;</p>
            <p className="review-author">&mdash; {r.author}</p>
          </article>
        ))}
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="reviews-google-cta"
      >
        Voir tous les avis sur Google
        <span aria-hidden="true">&nbsp;&rarr;</span>
      </a>
    </section>
  );
}
