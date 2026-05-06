'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* === Timecode "CAM 911" qui tourne dans le coin du hero ============
 * On simule un enregistrement camera de surveillance avec timestamp live.
 *
 * Pattern : useState + setInterval. Le setState n'est PAS dans le corps
 * synchrone de l'effect (la regle react-hooks/set-state-in-effect ne
 * l'interdit que dans ce cas-la), il est dans la callback de setInterval,
 * ce qui est explicitement autorise.
 *
 * Initial state = '--:--:--' pour eviter tout hydration mismatch :
 * le serveur rend '--:--:--', le client aussi, puis l'interval prend la main.
 */

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

    // Pause uniquement quand l'onglet passe en arrière-plan (économie batterie),
    // jamais en fonction du scroll : la vidéo tourne en boucle dès l'arrivée.
    const handleVisibility = () => {
      if (document.hidden) {
        v.pause();
      } else {
        v.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', handleVisibility);
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

      {/* VHS scanlines : effet CRT subtil, pur CSS, aucune perf impact */}
      <div className="hero-scanlines" aria-hidden="true"></div>

      {/* Noise grain : texture film 35mm, rend le tout cinematique */}
      <div className="hero-noise" aria-hidden="true"></div>


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
            <span className="nine-text outline hero-911">
              {/* Chaque chiffre anime individuellement : le 9, 1, 1 tombent
                  en cascade comme un lineup de suspects. CSS fait le boulot. */}
              <span className="hero-911__digit" style={{ animationDelay: '0.15s' }}>9</span>
              <span className="hero-911__digit" style={{ animationDelay: '0.35s' }}>1</span>
              <span className="hero-911__digit" style={{ animationDelay: '0.55s' }}>1</span>
            </span>
          </h1>

        </div>
        <div className="hero-buttons">
          <Link href="#delivery" className="btn btn-warning btn-glow">COMMANDER MAINTENANT</Link>
          <Link href="#menu" className="btn btn-primary">VOIR LE MENU</Link>
        </div>
      </div>

      {/* Indicateur de scroll : aide l'utilisateur a comprendre qu'il y a
          une enquete a poursuivre plus bas */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-hint__text">ENQUÊTER</span>
        <span className="hero-scroll-hint__arrow"></span>
      </div>
    </header>
  );
}
