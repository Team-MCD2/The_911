export default function PourquoiNousSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">POURQUOI NOUS ?</h2>
        
        <div className="benefits-grid">
          <div className="benefit-card reveal-on-scroll">
            <span className="benefit-icon">🥩</span>
            <h4>VIANDE PREMIUM</h4>
            <p>100% Boeuf Angus origine France, haché frais chaque matin sur place.</p>
          </div>
          
          <div className="benefit-card reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            <span className="benefit-icon">🍟</span>
            <h4>FRITES MAISON</h4>
            <p>Pommes de terre locales, double cuisson parfaite pour un croustillant criminel.</p>
          </div>
          
          <div className="benefit-card reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
            <span className="benefit-icon">🧪</span>
            <h4>SAUCES SECRÈTES</h4>
            <p>Des recettes classées top sécret, préparées dans l'ombre de notre cuisine.</p>
          </div>
          
          <div className="benefit-card reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
            <span className="benefit-icon">🍞</span>
            <h4>BUNS BOULANGERS</h4>
            <p>Briochés, moelleux et livrés chaque jour par notre artisan partenaire.</p>
          </div>
        </div>

        {/* Concept créatif : Cuiseur = Ballon de football américain */}
        <div className="creative-concept-container reveal-on-scroll">
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Représentation stylisée d'un burger en forme de ballon de football américain */}
                <ellipse cx="50" cy="50" rx="40" ry="25" fill="#FFC904" stroke="#ffffff" strokeWidth="2" transform="rotate(-30 50 50)"/>
                <path d="M 30 50 Q 50 20 70 50 Q 50 80 30 50" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="5,5" transform="rotate(-30 50 50)" />
                <line x1="45" y1="35" x2="55" y2="65" stroke="#ffffff" strokeWidth="3" transform="rotate(-30 50 50)"/>
                <line x1="40" y1="45" x2="60" y2="45" stroke="#ffffff" strokeWidth="2" transform="rotate(-30 50 50)"/>
                <line x1="42" y1="50" x2="58" y2="50" stroke="#ffffff" strokeWidth="2" transform="rotate(-30 50 50)"/>
                <line x1="44" y1="55" x2="56" y2="55" stroke="#ffffff" strokeWidth="2" transform="rotate(-30 50 50)"/>
            </svg>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginTop: '1rem', color: 'var(--color-text)' }}>LE TOUCHDOWN DU GOÛT</h3>
        </div>
      </div>
    </section>
  );
}
