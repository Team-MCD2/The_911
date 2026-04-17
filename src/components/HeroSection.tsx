import Link from 'next/link';

export default function HeroSection() {
  return (
    <header className="hero" id="home">
      <video className="video-bg" autoPlay loop muted playsInline>
        {/* Placeholder video that looks like a fast food / burger reel */}
        <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>

      <div className="caution-tape-container" id="parallax-tapes">
        <div className="caution-tape tape-1">
          <span>GUILTY SANDWICH 🍔 GUILTY SANDWICH 🍔 GUILTY SANDWICH 🍔 GUILTY SANDWICH 🍔</span>
        </div>
        <div className="caution-tape tape-2">
          <span>DO NOT CROSS 🚫 DO NOT CROSS 🚫 DO NOT CROSS 🚫 DO NOT CROSS 🚫 DO NOT CROSS 🚫</span>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-title">
          <span className="express-badge">LIVRAISON RAPIDE ⚡</span>
          <h1 className="logo-display">
            <span className="the-text">THE</span>
            <span className="nine-text outline">911</span>
          </h1>
        </div>
        <div className="hero-buttons">
          <Link href="#delivery" className="btn btn-warning btn-glow">COMMANDER MAINTENANT</Link>
          <Link href="#menu" className="btn btn-primary">VOIR LE MENU</Link>
        </div>
      </div>
      
      {/* Separator US Fast Food style */}
      <div className="us-fast-food-separator" style={{ position: 'absolute', bottom: 0 }}></div>
    </header>
  );
}
