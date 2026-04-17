'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.9)',
        padding: scrolled ? '0.5rem 5%' : '0.8rem 5%',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none'
    }}>
      <div className="logo">
        <span className="logo-text">THE</span>
        <span className="logo-911 outline">911</span>
      </div>
      <ul className="nav-links">
        <li><Link href="#best-sellers">Best Sellers</Link></li>
        <li><Link href="#menu">Menu</Link></li>
        <li><Link href="#about">L&apos;Interrogatoire</Link></li>
      </ul>
      <Link href="#delivery" className="btn btn-warning">COMMANDER</Link>
    </nav>
  );
}
