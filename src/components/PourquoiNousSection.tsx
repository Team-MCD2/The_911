'use client';

import { useEffect, useRef, useState } from 'react';

// --- SOURCE VIDEO -----------------------------------------------------------
// Fichier local servi depuis public/videos/video.mp4
const VIDEO_SRC = '/videos/video.mp4';
const VIDEO_POSTER =
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop';
const INSTAGRAM_URL = 'https://www.instagram.com/reel/DBCmh8jMMpV/';

function TouchdownBlock() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Intersection Observer : play >= 40%, pause sinon. Pas d'autoplay au load.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          video.play().catch(() => setNeedsManualPlay(true));
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    // Clic utilisateur = on peut démarrer avec le son
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
            className={`touchdown-media ${isPlaying ? 'is-playing' : ''}`}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
            loop
            playsInline
            preload="metadata"
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

        {/* Toggle son : affiché dès que la vidéo joue, pour activer/couper l'audio. */}
        {!loadError && isPlaying && (
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

        {/* Fallback 1 : autoplay bloqué → bouton LIRE LA VIDÉO */}
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

        {/* Fallback 2 : vidéo échoue au chargement → lien externe original */}
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
        <h2 className="section-title">POURQUOI NOUS ?</h2>

        <div className="benefits-grid">
          <div className="benefit-card reveal-on-scroll">
            <div
              className="benefit-img"
              role="img"
              aria-label="Viande premium Angus"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop')",
              }}
            ></div>
            <h4>VIANDE PREMIUM</h4>
            <p>
              100% Boeuf Angus origine France, haché frais chaque matin sur
              place.
            </p>
          </div>

          <div
            className="benefit-card reveal-on-scroll"
            style={{ transitionDelay: '100ms' }}
          >
            <div
              className="benefit-img"
              role="img"
              aria-label="Frites maison"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop')",
              }}
            ></div>
            <h4>FRITES MAISON</h4>
            <p>
              Pommes de terre locales, double cuisson parfaite pour un
              croustillant criminel.
            </p>
          </div>

          <div
            className="benefit-card reveal-on-scroll"
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className="benefit-img"
              role="img"
              aria-label="Sauces signature"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=600&auto=format&fit=crop')",
              }}
            ></div>
            <h4>SAUCES SECRÈTES</h4>
            <p>
              Des recettes classées top sécret, préparées dans l&apos;ombre
              de notre cuisine.
            </p>
          </div>
        </div>

        <TouchdownBlock />
      </div>
    </section>
  );
}
