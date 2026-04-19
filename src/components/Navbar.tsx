'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '#best-sellers', label: 'Best Sellers' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'Le Concept' },
  { href: '#delivery', label: 'Livraison' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open, and restore on unmount / close
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const { body } = document;
    if (menuOpen) {
      const prev = body.style.overflow;
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}
        aria-label="Navigation principale"
      >
        <Link href="/" className="logo" aria-label="Accueil THE 911" onClick={closeMenu}>
          <span className="logo-text">THE</span>
          <span className="logo-911 outline">911</span>
        </Link>

        <ul className="nav-links">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="#delivery" className="btn btn-warning navbar-cta">
          COMMANDER
        </Link>

        <button
          type="button"
          className={`navbar-burger ${menuOpen ? 'is-active' : ''}`}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div
          className="mobile-menu__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
        <div className="mobile-menu__panel">
          <ul className="mobile-menu__list">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.href}
                className="mobile-menu__item"
                style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
              >
                <Link href={item.href} onClick={closeMenu}>
                  <span className="mobile-menu__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mobile-menu__label">{item.label}</span>
                  <span className="mobile-menu__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#delivery"
            className="btn btn-warning mobile-menu__cta"
            onClick={closeMenu}
          >
            COMMANDER MAINTENANT
          </Link>
          <p className="mobile-menu__tagline">GUILTY SANDWICH · THE 911</p>
        </div>
      </div>
    </>
  );
}
