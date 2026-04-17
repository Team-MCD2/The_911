export default function ReviewsSection() {
  const reviews = [
    { id: 1, author: "Agent J.", text: "Le meilleur smash de la capitale. Un vrai scandale.", stars: "★★★★★" },
    { id: 2, author: "Témoin Anonyme", text: "J'y vais tous les vendredis soirs. Les sauces sont illégales tellement c'est bon.", stars: "★★★★★" },
    { id: 3, author: "Inspecteur Harry", text: "Je suis venu pour enquêter, je suis reparti avec deux Supplément Cheddar.", stars: "★★★★★" },
    { id: 4, author: "Suspect #094", text: "Ils m'ont eu avec leurs frites maison. Coupable.", stars: "★★★★★" },
  ];

  return (
    <section id="reviews" className="reviews-section">
      <h2 className="section-title">RAPPORT DE POLICE (AVIS)</h2>
      
      <div className="reviews-slider">
        {reviews.map((r) => (
          <div key={r.id} className="review-card reveal-on-scroll">
            <div className="stars">{r.stars}</div>
            <p className="review-text">"{r.text}"</p>
            <p className="review-author">— {r.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
