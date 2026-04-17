export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="caution-tape-container bottom-tape">
        <div className="caution-tape tape-3">
          <span>SCÈNE DE CRIME 🚔 SCÈNE DE CRIME 🚔 SCÈNE DE CRIME 🚔 SCÈNE DE CRIME 🚔</span>
        </div>
      </div>
      
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-text">THE</span>
            <span className="logo-911 outline">911</span>
          </div>
          <p className="tagline">Guilty Sandwich Delivery & Takeaway</p>
          <div className="map-container">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926!3d48.8583701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1689235948384!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps THE 911"
            ></iframe>
          </div>
        </div>
        
        <div className="footer-info">
          <h4>QUARTIER GÉNÉRAL</h4>
          <p>123 Boulevard du Crime<br/>75011 Paris, France</p>
          <p style={{marginTop: '1rem'}}>☎ 01 23 45 67 89</p>
        </div>
        
        <div className="footer-hours">
          <h4>HEURES DE COUVRE-FEU</h4>
          <p>Mar - Jeu : 19h00 - 23h30<br/>Ven - Sam : 19h00 - 02h00</p>
          <p style={{marginTop: '1rem', color: 'var(--color-primary)'}}>Livraison Jusqu&apos;à 2h</p>
        </div>
        
        <div className="footer-socials">
          <h4>RÉSEAUX</h4>
          <div className="social-links">
            <a href="#">INSTAGRAM</a>
            <a href="#">TIKTOK</a>
            <a href="#">X (TWITTER)</a>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <p>&copy; 2026 THE 911. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
