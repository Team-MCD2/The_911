'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force la lecture immédiate sur mobile : Safari iOS / Chrome Android peuvent
  // ignorer `autoplay` tant qu'on ne garantit pas muted + playsInline via JS,
  // et/ou tant que la vidéo n'est pas suffisamment préchargée. On retente aussi
  // au premier geste utilisateur si l'autoplay est bloqué par la policy.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    let cancelled = false;

    const attachGestureFallback = () => {
      const onGesture = () => {
        v.muted = true;
        v.play().catch(() => {});
        document.removeEventListener('touchstart', onGesture);
        document.removeEventListener('click', onGesture);
        document.removeEventListener('scroll', onGesture);
      };
      document.addEventListener('touchstart', onGesture, { once: true, passive: true });
      document.addEventListener('click', onGesture, { once: true });
      document.addEventListener('scroll', onGesture, { once: true, passive: true });
    };

    const tryPlay = () => {
      if (cancelled) return;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {
          attachGestureFallback();
        });
      }
    };

    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener('loadeddata', tryPlay, { once: true });
      v.addEventListener('canplay', tryPlay, { once: true });
    }

    return () => {
      cancelled = true;
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
    };
  }, []);

  return (
    <header className="hero" id="home">
      <video
        ref={videoRef}
        className="video-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src="/videos/hero-epithete.mp4" type="video/mp4" />
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
    </header>
  );
}
