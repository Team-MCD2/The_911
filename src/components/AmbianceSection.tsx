export default function AmbianceSection() {
  return (
    <section id="ambiance" className="ambiance-section">
      <h2 className="section-title">LA SCÈNE DU DÉLIT</h2>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
        Plongez dans l'univers sombre et authentique de THE 911. 
        Un lieu où les suspects se retrouvent pour savourer l'interdit.
      </p>

      <div className="ambiance-grid">
        <div className="ambiance-item reveal-on-scroll" style={{ background: 'linear-gradient(45deg, #111, #333)' }}></div>
        <div className="ambiance-item reveal-on-scroll" style={{ background: 'linear-gradient(45deg, #222, #444)', transitionDelay: '100ms' }}></div>
        <div className="ambiance-item reveal-on-scroll" style={{ background: 'linear-gradient(45deg, #333, #555)', transitionDelay: '200ms' }}></div>
        <div className="ambiance-item reveal-on-scroll" style={{ background: 'linear-gradient(45deg, #111, #222)', transitionDelay: '300ms' }}></div>
      </div>
    </section>
  );
}
