'use client';

import { useEffect, useRef, useState } from 'react';

const GRADIENT_OVERLAY =
  'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)';

type MenuItem = {
  id: number;
  category: 'burgers' | 'sandwichs' | 'croq' | 'enfant';
  name: string;
  desc: string;
  priceSeul: string;
  priceMenu: string;
  img: string;
};

// Données issues de la carte officielle THE 911 (recto + verso fournis par le restaurant).
// Premier prix = produit seul, second prix = formule menu (avec boisson).
// Toute correction des prix doit se faire en regardant la carte officielle uniquement.
const menuData: MenuItem[] = [
  // ============== BURGERS ==============
  {
    id: 1,
    category: 'burgers',
    name: 'SMASH 1',
    desc: '1 steak smashé, cheddar, oignons.',
    priceSeul: '6,00€',
    priceMenu: '8,50€',
    img: '/images/menu/smash-1.jpeg',
  },
  {
    id: 2,
    category: 'burgers',
    name: 'SMASH 2',
    desc: '2 steaks smashés, cheddar, oignons.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/smash-2.jpeg',
  },
  {
    id: 3,
    category: 'burgers',
    name: 'LITTLE BEEF',
    desc: 'Bœuf effiloché, crudités, fromage.',
    priceSeul: '6,50€',
    priceMenu: '9,00€',
    img: '/images/menu/little-beef.jpeg',
  },
  {
    id: 4,
    category: 'burgers',
    name: 'CHICKEN',
    desc: 'Chicken, emmental, bacon, crudités.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/chicken.jpeg',
  },

  // ============== SANDWICHS ==============
  {
    id: 5,
    category: 'sandwichs',
    name: 'PHILLY',
    desc: 'Steak, cheddar, crudités.',
    priceSeul: '7,50€',
    priceMenu: '10,00€',
    img: '/images/menu/philly.jpeg',
  },
  {
    id: 6,
    category: 'sandwichs',
    name: 'HARLEM',
    desc: 'Steak, cordon-bleu, cheddar, crudités.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/harlem.jpeg',
  },
  {
    id: 7,
    category: 'sandwichs',
    name: 'PULLED BEEF',
    desc: 'Bœuf effiloché, crudités, fromage fondu.',
    priceSeul: '11,00€',
    priceMenu: '13,50€',
    img: '/images/menu/pulled-beef.jpeg',
  },
  {
    id: 8,
    category: 'sandwichs',
    name: '213',
    desc: 'Steak, cheddar, kiri, frite, omelette, râpé.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/213.jpeg',
  },
  {
    id: 9,
    category: 'sandwichs',
    name: 'BROOKLYN',
    desc: 'Steak, cheddar, œuf, bacon, crudités.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/brooklyn.jpeg',
  },
  {
    id: 10,
    category: 'sandwichs',
    name: 'MOUNTAIN',
    desc: 'Steak, cheddar, raclette, rösti, bacon, crudités.',
    priceSeul: '11,00€',
    priceMenu: '13,50€',
    img: '/images/menu/mountain.jpeg',
  },
  {
    id: 11,
    category: 'sandwichs',
    name: 'BBF',
    desc: 'Steak, bacon, crème, oignons, fromage gratiné — pain en tranche.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/bbf.jpeg',
  },
  {
    id: 12,
    category: 'sandwichs',
    name: 'BOSTON',
    desc: 'Chicken, steak, bacon, emmental, crudités.',
    priceSeul: '11,00€',
    priceMenu: '13,50€',
    img: '/images/menu/boston.jpeg',
  },
  {
    id: 13,
    category: 'sandwichs',
    name: 'CHICANOS',
    desc: 'Escalope, sauce spicy, cheddar, oignons.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/chicanos.jpeg',
  },
  {
    id: 14,
    category: 'sandwichs',
    name: 'FOREST',
    desc: 'Escalope, sauce forestière, fromage râpé, crudités.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/forest.jpeg',
  },

  // ============== LES CROQ'S ==============
  {
    id: 15,
    category: 'croq',
    name: 'CROQ',
    desc: 'Jambon de dinde, crème fraîche.',
    priceSeul: '3,50€',
    priceMenu: '6,00€',
    img: '/images/menu/croq.jpeg',
  },
  {
    id: 16,
    category: 'croq',
    name: 'CROQ N BEEF',
    desc: 'Jambon de dinde, steak, cheddar, crudités, crème.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/croq-n-beef.jpeg',
  },
  {
    id: 17,
    category: 'croq',
    name: 'CROQ N GOAT',
    desc: 'Jambon de dinde, chèvre, miel, crème fraîche.',
    priceSeul: '4,00€',
    priceMenu: '6,50€',
    img: '/images/menu/croq-n-goat.jpeg',
  },

  // ============== MENU ENFANT & DESSERTS ==============
  {
    id: 18,
    category: 'enfant',
    name: 'MENU ENFANT',
    desc: 'Cheeseburger ou nuggets, frites, compote, Capri-Sun.',
    priceSeul: '6,00€',
    priceMenu: '6,00€',
    img: '/images/menu/menu-enfant.jpeg',
  },
  {
    id: 19,
    category: 'enfant',
    name: 'TIRAMISU',
    desc: 'Tiramisu maison servi en pot.',
    priceSeul: '3,50€',
    priceMenu: '3,50€',
    img: '/images/menu/tiramisu.jpeg',
  },
  {
    id: 20,
    category: 'enfant',
    name: 'MILKSHAKE',
    desc: 'Chocolat, vanille ou fraise. Suppléments 1€ (banane, bueno, oreo, country) · chantilly 0,50€.',
    priceSeul: '4,50€',
    priceMenu: '4,50€',
    img: '/images/menu/milkshake.jpeg',
  },
];

const FILTERS: { id: 'tout' | MenuItem['category']; label: string }[] = [
  { id: 'tout', label: 'TOUT' },
  { id: 'burgers', label: 'BURGERS' },
  { id: 'sandwichs', label: 'SANDWICHS' },
  { id: 'croq', label: "CROQ' MR" },
  { id: 'enfant', label: 'ENFANT & EXTRAS' },
];

export default function MenuSection() {
  const [filter, setFilter] = useState<'tout' | MenuItem['category']>('tout');
  const [isOpen, setIsOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredMenu =
    filter === 'tout' ? menuData : menuData.filter((item) => item.category === filter);

  // Re-observe cards on every filter change (or open toggle) so re-mounted nodes fade in correctly.
  useEffect(() => {
    if (!isOpen) return;
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
  }, [filter, isOpen]);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (!next && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="menu" className="menu-section" ref={sectionRef}>
      <h2 className="section-title">LE MENU COMPLET</h2>
      <p className="menu-section-intro">
        Produits frais, fait maison, halal — disponibles sur place, à emporter ou en livraison.
      </p>

      <div className="menu-toggle-wrapper">
        <button
          type="button"
          className={`btn btn-warning menu-toggle-btn ${isOpen ? 'is-open' : ''}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="menu-content"
        >
          {isOpen ? 'RÉDUIRE LE DOSSIER' : 'OUVRIR LE DOSSIER'}
        </button>
        {!isOpen && (
          <p className="menu-toggle-hint">
            Cliquez pour consulter l&apos;intégralité des pièces à conviction.
          </p>
        )}
      </div>

      {isOpen && (
        <div id="menu-content" className="menu-content">
          <div className="menu-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
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
                  role="img"
                  aria-label={`${item.name} — ${item.desc}`}
                >
                  <div className="confidential-stamp">EVIDENCE #{item.id}</div>
                </div>
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="card-footer">
                    <span className="price">
                      {item.priceSeul}
                      {item.priceSeul !== item.priceMenu && (
                        <small className="price-menu"> · {item.priceMenu} menu</small>
                      )}
                    </span>
                    <button className="btn-add" aria-label={`Ajouter ${item.name}`}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="menu-disclaimer">
            <strong>1ᵉʳ prix</strong> = produit seul · <strong>2ᵈ prix</strong> = formule menu (avec boisson).
            <br />
            <strong>Suppléments à 1€</strong> : rösti, œuf, bacon, kiri, chèvre, cheddar, raclette.
            <br />
            <strong>À grignoter (5€)</strong> : mozza sticks ×5, nuggets ×6, bouchées camembert ×5.
          </p>
        </div>
      )}
    </section>
  );
}
