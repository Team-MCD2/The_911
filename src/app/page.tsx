'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LeGangSection from '@/components/LeGangSection';
import BestSellersSection from '@/components/BestSellersSection';
import PourquoiNousSection from '@/components/PourquoiNousSection';
import MenuSection from '@/components/MenuSection';
import DeliverySection from '@/components/DeliverySection';
import ReviewsSection from '@/components/ReviewsSection';
import AmbianceSection from '@/components/AmbianceSection';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import DispatcherWidget from '@/components/DispatcherWidget';

/* Stamp dynamique entre sections : classifie / evidence / dossier.
 * Garde des props simples pour rester flexible sans prop-drilling. */
function SectionStamp({
  label,
  evidence,
}: {
  label: string;
  evidence: string;
}) {
  return (
    <div
      className="section-stamp reveal-on-scroll"
      role="presentation"
      aria-hidden="true"
    >
      <span className="section-stamp__line" />
      <span className="section-stamp__badge">
        <span className="section-stamp__badge-label">{label}</span>
        <span className="section-stamp__badge-evidence">{evidence}</span>
      </span>
      <span className="section-stamp__line" />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    // Global Scroll Reveal Logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* Narratif : l'utilisateur entre dans le dossier d'investigation.
       * Chaque stamp annonce un chapitre. */}
      <SectionStamp label="DOSSIER N°01" evidence="LES SUSPECTS" />
      <LeGangSection />

      <SectionStamp label="DOSSIER N°02" evidence="MOST WANTED" />
      <BestSellersSection />

      <SectionStamp label="DOSSIER N°03" evidence="MODUS OPERANDI" />
      <PourquoiNousSection />

      <SectionStamp label="DOSSIER N°04" evidence="LA CARTE COMPLÈTE" />
      <MenuSection />

      <SectionStamp label="DOSSIER N°05" evidence="TRANSPORT DU DÉLIT" />
      <DeliverySection />

      <SectionStamp label="DOSSIER N°06" evidence="DÉPOSITIONS" />
      <ReviewsSection />

      <SectionStamp label="DOSSIER N°07" evidence="SCÈNE DE CRIME" />
      <AmbianceSection />

      <Footer />
      <CookieBanner />
      <DispatcherWidget />
    </main>
  );
}
