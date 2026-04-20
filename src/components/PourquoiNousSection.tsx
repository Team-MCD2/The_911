'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/videos/video.mp4';
const VIDEO_POSTER = '/images/menu/philly-cheese.jpeg';
const INSTAGRAM_URL = 'https://www.instagram.com/the_911_burger/';

function TouchdownBlock() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay immédiat au montage : la vidéo démarre dès l'arrivée sur la page,
  // qu'elle soit visible ou non. On force les attributs DOM (muted/playsinline)
  // pour satisfaire les policies mobiles, et on prévoit un fallback au premier
  // geste utilisateur si l'autoplay est bloqué (Low Power Mode, Data Saver…).
  // La vidéo ne se met en pause que si l'onglet passe en arrière-plan — pour
  // économiser la batterie sans dépendre du scroll.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    let cancelled = false;

    const attachGestureFallback = () => {
      const onGesture = () => {
        video.muted = true;
        video.play().catch(() => {});
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
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          setNeedsManualPlay(true);
          attachGestureFallback();
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    // Filet de sécurité : si au bout de 2 s aucun événement "play" n'a eu lieu
    // (autoplay bloqué silencieusement par le navigateur), on bascule en mode
    // manuel pour afficher le bouton "Lire la vidéo".
    const fallbackTimer = window.setTimeout(() => {
      if (cancelled) return;
      if (video.paused) {
        setNeedsManualPlay(true);
        attachGestureFallback();
      }
    }, 2000);

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video.play()
      .then(() => setNeedsManualPlay(false))
      .catch(() => setNeedsManualPlay(true));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
    // Profite du geste utilisateur pour démarrer la vidéo si l'autoplay
    // avait été bloqué (sans ça, le bouton son resterait inactif).
    if (video.paused) {
      video.play()
        .then(() => setNeedsManualPlay(false))
        .catch(() => {});
    }
  };

  return (
    <div className="touchdown-section reveal-on-scroll" ref={wrapperRef}>
      <div className="touchdown-text">
        <span className="touchdown-eyebrow">LE CONCEPT</span>
        <h3>
          LE <span className="hl">TOUCHDOWN</span>
          <br />
          DU GOÛT
        </h3>
        <p>
          Chaque bouchée est une victoire. Ingrédients triés sur le volet,
          gestes précis, sauces signatures — on joue pour marquer à chaque
          assiette servie.
        </p>
        <a
          className="touchdown-insta-link"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir sur Instagram
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
            />
          </svg>
        </a>
      </div>

      <div className="touchdown-video">
        {!loadError && (
          <video
            ref={videoRef}
            className="touchdown-media"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onPlay={() => {
              setIsPlaying(true);
              setNeedsManualPlay(false);
            }}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={() => {
              const v = videoRef.current;
              if (v) setIsMuted(v.muted);
            }}
            onError={() => setLoadError(true)}
          />
        )}

        {!loadError && (
          <button
            type="button"
            className="touchdown-sound"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            aria-pressed={!isMuted}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45A4.3 4.3 0 0 0 16.5 12zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a9 9 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06A7 7 0 0 1 19 12a7 7 0 0 1-5 6.71v2.06A9 9 0 0 0 21 12a9 9 0 0 0-7-8.77z"
                />
              </svg>
            )}
          </button>
        )}

        {!loadError && needsManualPlay && !isPlaying && (
          <button
            type="button"
            className="touchdown-play"
            onClick={handleManualPlay}
            aria-label="Lire la vidéo"
          >
            <span className="touchdown-play-ring" aria-hidden="true"></span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
            <span className="touchdown-play-label">LIRE LA VIDÉO</span>
          </button>
        )}

        {loadError && (
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="touchdown-play touchdown-play--link"
            aria-label="Voir la vidéo originale"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${VIDEO_POSTER}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span className="touchdown-play-ring" aria-hidden="true"></span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
            <span className="touchdown-play-label">VOIR LA VIDÉO</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function PourquoiNousSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <TouchdownBlock />
      </div>
    </section>
  );
}
