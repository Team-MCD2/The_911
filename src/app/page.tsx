'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BestSellersSection from '@/components/BestSellersSection';
import MenuSection from '@/components/MenuSection';
import DeliverySection from '@/components/DeliverySection';
import ReviewsSection from '@/components/ReviewsSection';
import AmbianceSection from '@/components/AmbianceSection';
import Footer from '@/components/Footer';

export default function Home() {

  useEffect(() => {
    // Global Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <div className="section-separator with-emblem"></div>
      <BestSellersSection />
      <div className="section-separator with-emblem"></div>
      <MenuSection />
      <div className="section-separator"></div>
      <DeliverySection />
      <div className="section-separator with-emblem"></div>
      <ReviewsSection />
      <div className="section-separator"></div>
      <AmbianceSection />
      <Footer />
    </main>
  );
}
