'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type MenuItem = {
  id: number;
  category: 'burgers' | 'sandwichs' | 'croq' | 'enfant';
  name: string;
  desc: string;
  priceSeul: string;
  priceMenu: string;
  img: string;
  /** Tags d'identification rapide pour le client (halal, spicy, végé, kids, dessert). */
  tags?: ReadonlyArray<'halal' | 'spicy' | 'veggie' | 'kids' | 'dessert'>;
};

/* Largeur typique d'une carte menu : ~280-340 px sur mobile, 1/2 ou 1/3 sur desktop. */
const MENU_CARD_SIZES =
  '(max-width: 600px) 90vw, (max-width: 900px) 45vw, 320px';

const TAG_LABELS: Record<NonNullable<MenuItem['tags']>[number], { label: string; emoji: string }> = {
  halal: { label: 'Halal', emoji: '☪' },
  spicy: { label: 'Épicé', emoji: '🌶' },
  veggie: { label: 'Végé', emoji: '🥬' },
  kids: { label: 'Enfant', emoji: '🧒' },
  dessert: { label: 'Dessert', emoji: '🍰' },
};

// Données issues de la carte officielle THE 911 (recto + verso fournis par le restaurant).
// Premier prix = produit seul, second prix = formule menu (avec boisson).
// Toute correction des prix doit se faire en regardant la carte officielle uniquement.
//
// Tous les produits viande sont halal (étoile Conformité confirmée par le restaurant).
// `spicy` ajouté sur les recettes piquantes (sauce spicy, etc.).
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
    tags: ['halal'],
  },
  {
    id: 2,
    category: 'burgers',
    name: 'SMASH 2',
    desc: '2 steaks smashés, cheddar, oignons.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/smash-2.jpeg',
    tags: ['halal'],
  },
  {
    id: 3,
    category: 'burgers',
    name: 'LITTLE BEEF',
    desc: 'Bœuf effiloché, crudités, fromage.',
    priceSeul: '6,50€',
    priceMenu: '9,00€',
    img: '/images/menu/little-beef.jpeg',
    tags: ['halal'],
  },
  {
    id: 4,
    category: 'burgers',
    name: 'CHICKEN',
    desc: 'Chicken, emmental, bacon, crudités.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/chicken.jpeg',
    tags: ['halal'],
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
    tags: ['halal'],
  },
  {
    id: 6,
    category: 'sandwichs',
    name: 'HARLEM',
    desc: 'Steak, cordon-bleu, cheddar, crudités.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/harlem.jpeg',
    tags: ['halal'],
  },
  {
    id: 7,
    category: 'sandwichs',
    name: 'PULLED BEEF',
    desc: 'Bœuf effiloché, crudités, fromage fondu.',
    priceSeul: '11,00€',
    priceMenu: '13,50€',
    img: '/images/menu/pulled-beef.jpeg',
    tags: ['halal'],
  },
  {
    id: 8,
    category: 'sandwichs',
    name: '213',
    desc: 'Steak, cheddar, kiri, frite, omelette, râpé.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/213.jpeg',
    tags: ['halal'],
  },
  {
    id: 9,
    category: 'sandwichs',
    name: 'BROOKLYN',
    desc: 'Steak, cheddar, œuf, bacon, crudités.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/brooklyn.jpeg',
    tags: ['halal'],
  },
  {
    id: 10,
    category: 'sandwichs',
    name: 'MOUNTAIN',
    desc: 'Steak, cheddar, raclette, rösti, bacon, crudités.',
    priceSeul: '11,00€',
    priceMenu: '13,50€',
    img: '/images/menu/mountain.jpeg',
    tags: ['halal'],
  },
  {
    id: 11,
    category: 'sandwichs',
    name: 'BBF',
    desc: 'Steak, bacon, crème, oignons, fromage gratiné — pain en tranche.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/bbf.jpeg',
    tags: ['halal'],
  },
  {
    id: 12,
    category: 'sandwichs',
    name: 'BOSTON',
    desc: 'Chicken, steak, bacon, emmental, crudités.',
    priceSeul: '11,00€',
    priceMenu: '13,50€',
    img: '/images/menu/boston.jpeg',
    tags: ['halal'],
  },
  {
    id: 13,
    category: 'sandwichs',
    name: 'CHICANOS',
    desc: 'Escalope, sauce spicy, cheddar, oignons.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/chicanos.jpeg',
    tags: ['halal', 'spicy'],
  },
  {
    id: 14,
    category: 'sandwichs',
    name: 'FOREST',
    desc: 'Escalope, sauce forestière, fromage râpé, crudités.',
    priceSeul: '9,50€',
    priceMenu: '12,00€',
    img: '/images/menu/forest.jpeg',
    tags: ['halal'],
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
    tags: ['halal'],
  },
  {
    id: 16,
    category: 'croq',
    name: 'CROQ N BEEF',
    desc: 'Jambon de dinde, steak, cheddar, crudités, crème.',
    priceSeul: '7,00€',
    priceMenu: '9,50€',
    img: '/images/menu/croq-n-beef.jpeg',
    tags: ['halal'],
  },
  {
    id: 17,
    category: 'croq',
    name: 'CROQ N GOAT',
    desc: 'Jambon de dinde, chèvre, miel, crème fraîche.',
    priceSeul: '4,00€',
    priceMenu: '6,50€',
    img: '/images/menu/croq-n-goat.jpeg',
    tags: ['halal'],
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
    tags: ['halal', 'kids'],
  },
  {
    id: 19,
    category: 'enfant',
    name: 'TIRAMISU',
    desc: 'Tiramisu maison servi en pot.',
    priceSeul: '3,50€',
    priceMenu: '3,50€',
    img: '/images/menu/tiramisu.jpeg',
    tags: ['veggie', 'dessert'],
  },
  {
    id: 20,
    category: 'enfant',
    name: 'MILKSHAKE',
    desc: 'Chocolat, vanille ou fraise. Suppléments 1€ (banane, bueno, oreo, country) · chantilly 0,50€.',
    priceSeul: '4,50€',
    priceMenu: '4,50€',
    img: '/images/menu/milkshake.jpeg',
    tags: ['veggie', 'dessert'],
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
  const [isOpen, setIsOpen] = useState(true);
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
                <div className="card-img">
                  <Image
                    src={item.img}
                    alt={`${item.name} — ${item.desc}`}
                    fill
                    sizes={MENU_CARD_SIZES}
                    className="card-img__media"
                    /* L'overlay sombre est désormais une couche CSS séparée (.card-img__overlay)
                     * pour que next/image puisse pré-générer un blur placeholder propre. */
                  />
                  <span className="card-img__overlay" aria-hidden="true" />
                  {item.tags && item.tags.length > 0 && (
                    <ul className="card-tags" aria-label="Caractéristiques">
                      {item.tags.map((tag) => (
                        <li key={tag} className={`card-tag card-tag--${tag}`}>
                          <span aria-hidden="true">{TAG_LABELS[tag].emoji}</span>
                          {TAG_LABELS[tag].label}
                        </li>
                      ))}
                    </ul>
                  )}
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
