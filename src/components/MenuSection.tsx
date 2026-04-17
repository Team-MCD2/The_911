'use client';

import { useEffect, useRef, useState } from 'react';

const GRADIENT_OVERLAY =
  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)";

const menuData = [
  {
    id: 1,
    category: 'burgers',
    name: "LE RÉCIDIVISTE",
    desc: "Double smash burger, cheddar, bacon.",
    price: "13.50€",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    category: 'burgers',
    name: "LE COMPLICE",
    desc: "Poulet frit épicé, coleslaw, mayo fumée.",
    price: "12.00€",
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    category: 'burgers',
    name: "LE BRAQUAGE",
    desc: "Effiloché de porc BBQ, oignons rings.",
    price: "14.50€",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    category: 'burgers',
    name: "LE CARTEL",
    desc: "Smash burger, jalapeños, cheddar fondu, oignons crispy.",
    price: "14.00€",
    img: "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    category: 'sides',
    name: "FRIES DÉLIT",
    desc: "Frites maison, chapelure épicée, sel truffé.",
    price: "4.50€",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    category: 'sides',
    name: "CHEDDAR CRIME",
    desc: "Frites noyées sous le cheddar fondu et bacon croustillant.",
    price: "6.50€",
    img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 7,
    category: 'sides',
    name: "ONION SQUAD",
    desc: "Rondelles d'oignons panées, sauce ranch maison.",
    price: "5.50€",
    img: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 8,
    category: 'boissons',
    name: "SÉRUM DE VÉRITÉ",
    desc: "Limonade maison piquante, citron vert, gingembre.",
    price: "3.50€",
    img: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 9,
    category: 'boissons',
    name: "MILK FELONY",
    desc: "Milkshake vanille Madagascar, caramel beurre salé.",
    price: "5.00€",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 10,
    category: 'boissons',
    name: "COCA CARTEL",
    desc: "Soda cola artisanal servi ultra frappé.",
    price: "3.00€",
    img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?q=80&w=900&auto=format&fit=crop",
  },
];

export default function MenuSection() {
  const [filter, setFilter] = useState('tout');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredMenu = filter === 'tout'
    ? menuData
    : menuData.filter(item => item.category === filter);

  // Re-observe cards on every filter change so re-mounted nodes fade in correctly.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.menu-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section id="menu" className="menu-section">
      <h2 className="section-title">LE MENU COMPLET</h2>

      <div className="menu-filters">
        <button className={`filter-btn ${filter === 'tout' ? 'active' : ''}`} onClick={() => setFilter('tout')}>TOUT</button>
        <button className={`filter-btn ${filter === 'burgers' ? 'active' : ''}`} onClick={() => setFilter('burgers')}>SUSPECTS (Burgers)</button>
        <button className={`filter-btn ${filter === 'sides' ? 'active' : ''}`} onClick={() => setFilter('sides')}>COMPLICES (Sides)</button>
        <button className={`filter-btn ${filter === 'boissons' ? 'active' : ''}`} onClick={() => setFilter('boissons')}>CONTREBANDE (Boissons)</button>
      </div>

      <div className="menu-grid" ref={gridRef}>
        {filteredMenu.map((item) => (
          <article key={`${filter}-${item.id}`} className="menu-card reveal-on-scroll">
            <div
              className="card-img"
              style={{
                backgroundImage: `${GRADIENT_OVERLAY}, url('${item.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="confidential-stamp">EVIDENCE #{item.id}</div>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="card-footer">
                <span className="price">{item.price}</span>
                <button className="btn-add">+</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
