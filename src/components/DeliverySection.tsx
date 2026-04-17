export default function DeliverySection() {
  return (
    <section id="delivery" className="delivery-section">
      <h2 className="section-title">COMMANDE & LIVRAISON</h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Faites expédier les pièces à conviction directement à votre planque.
      </p>

      <div className="delivery-options reveal-on-scroll">
        <a href="#" className="btn-brand btn-uber">
          <span>Uber Eats</span>
        </a>
        
        <div className="qrcode-box">
          {/* Simple illustration of a QR Code for Click & Collect */}
          <div style={{ width: '120px', height: '120px', background: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #fff 10px, #fff 20px)' }}></div>
          <p style={{ color: '#000', fontWeight: 'bold', marginTop: '0.5rem', fontSize: '0.9rem' }}>CLICK & COLLECT</p>
        </div>

        <a href="#" className="btn-brand btn-deliveroo">
          <span>Deliveroo</span>
        </a>
      </div>
    </section>
  );
}
