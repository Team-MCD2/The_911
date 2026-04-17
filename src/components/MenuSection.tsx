'use client';

import { useState } from 'react';

const menuData = [
  { id: 1, category: 'burgers', name: "LE RÉCIDIVISTE", desc: "Double smash burger, cheddar, bacon.", price: "13.50€" },
  { id: 2, category: 'burgers', name: "LE COMPLICE", desc: "Poulet frit épicé, coleslaw.", price: "12.00€" },
  { id: 3, category: 'burgers', name: "LE BRAQUAGE", desc: "Effiloché de porc BBQ, oignons rings.", price: "14.50€" },
  { id: 4, category: 'sides', name: "FRIES DELIT", desc: "Frites maison, chapelure épicée.", price: "4.50€" },
  { id: 5, category: 'sides', name: "CHEDDAR CRIME", desc: "Frites maison noyées sous le cheddar fondu et bacon.", price: "6.50€" },
  { id: 6, category: 'boissons', name: "SÉRUM DE VÉRITÉ", desc: "Limonade maison piquante.", price: "3.50€" },
];

export default function MenuSection() {
  const [filter, setFilter] = useState('tout');

  const filteredMenu = filter === 'tout' 
    ? menuData 
    : menuData.filter(item => item.category === filter);

  return (
    <section id="menu" className="menu-section">
      <h2 className="section-title">LE MENU COMPLET</h2>
      
      <div className="menu-filters">
        <button className={`filter-btn ${filter === 'tout' ? 'active' : ''}`} onClick={() => setFilter('tout')}>TOUT</button>
        <button className={`filter-btn ${filter === 'burgers' ? 'active' : ''}`} onClick={() => setFilter('burgers')}>SUSPECTS (Burgers)</button>
        <button className={`filter-btn ${filter === 'sides' ? 'active' : ''}`} onClick={() => setFilter('sides')}>COMPLICES (Sides)</button>
        <button className={`filter-btn ${filter === 'boissons' ? 'active' : ''}`} onClick={() => setFilter('boissons')}>CONTREBANDE (Boissons)</button>
      </div>

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <article key={item.id} className="menu-card reveal-on-scroll">
            <div className="card-img" style={{ background: "linear-gradient(45deg, #1a1a1a, #222)" }}>
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
