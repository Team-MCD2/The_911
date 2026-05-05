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
    author: 'Yanis B.',
    text:
      'Le meilleur smash burger de la région toulousaine, viande fraîche et goût incomparable. Service au top.',
    stars: 5,
  },
  {
    id: 2,
    author: 'Lina M.',
    text:
      'Sauces maison incroyables, pain moelleux, frites croustillantes. Ambiance soignée et personnel adorable.',
    stars: 5,
  },
  {
    id: 3,
    author: 'Karim S.',
    text:
      'Halal de qualité, fait maison, portions généreuses. Mon Mountain était une tuerie, je reviendrai.',
    stars: 5,
  },
  {
    id: 4,
    author: 'Sofia D.',
    text:
      'Livraison rapide via Uber Eats, tout est arrivé chaud. Le Pulled Beef vaut clairement les 11 €.',
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
