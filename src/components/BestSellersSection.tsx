/**
 * BEST SELLERS - Section "MOST WANTED" : les stars du menu presentees comme
 * des avis de recherche du FBI. Photos officielles + badges WANTED + prix
 * format "RECOMPENSE". Chaque carte a un effet tilt 3D discret au survol.
 *
 * Les best sellers sont affiches en grid (pas en carrousel) pour mieux
 * s'integrer avec la nouvelle section "LE GANG" qui la precede. Le CTA
 * final renvoie vers la carte complete.
 */
import Image from 'next/image';

type BestSeller = {
  id: number;
  name: string;
  desc: string;
  price: string;
  img: string;
  reward: string; // Format "RECOMPENSE" affiche en gros sur l'affiche WANTED
  featured?: boolean;
};

const bestSellers: BestSeller[] = [
  {
    id: 1,
    name: 'MOUNTAIN',
    desc: 'Steak, cheddar, raclette, rösti, bacon, crudités. Le mastodonte.',
    price: '11,00€',
    reward: '€11',
    img: '/images/menu/mountain.jpeg',
    featured: true,
  },
  {
    id: 2,
    name: 'PULLED BEEF',
    desc: 'Bœuf effiloché fondant, fromage gratiné, crudités fraîches.',
    price: '11,00€',
    reward: '€11',
    img: '/images/menu/pulled-beef.jpeg',
  },
  {
    id: 3,
    name: 'SMASH 2',
    desc: 'Deux steaks smashés, cheddar, oignons. Pure tradition.',
    price: '7,00€',
    reward: '€7',
    img: '/images/menu/smash-2.jpeg',
  },
  {
    id: 4,
    name: 'HARLEM',
    desc: 'Steak, cordon-bleu maison, cheddar, crudités. Le double délit.',
    price: '9,50€',
    reward: '€9.5',
    img: '/images/menu/harlem.jpeg',
  },
];

const BESTSELLER_SIZES = '(max-width: 600px) 80vw, (max-width: 900px) 45vw, 360px';

export default function BestSellersSection() {
  return (
    <section id="best-sellers" className="wanted-section menu-section">
      {/* Bandeau "AVIS DE RECHERCHE" - en-tete d'affiche WANTED */}
      <div className="wanted-header">
        <span className="wanted-header__stars" aria-hidden="true">★ ★ ★ ★ ★</span>
        <h2 className="wanted-header__title">
          <span className="wanted-header__line">AVIS DE</span>
          <span className="wanted-header__main">RECHERCHE</span>
          <span className="wanted-header__line">NOS BEST SELLERS</span>
        </h2>
        <span className="wanted-header__stars" aria-hidden="true">★ ★ ★ ★ ★</span>
      </div>

      <div className="wanted-grid">
        {bestSellers.map((item, idx) => (
          <article
            key={item.id}
            className={`wanted-poster ${item.featured ? 'is-featured' : ''}`}
          >
            {/* Label WANTED qui clignote en rouge */}
            <div className="wanted-poster__banner" aria-hidden="true">
              WANTED
            </div>

            {/* Image du "criminel" = photo du burger en mugshot */}
            <div className="wanted-poster__mugshot">
              <Image
                src={item.img}
                alt={`${item.name} — ${item.desc}`}
                fill
                sizes={BESTSELLER_SIZES}
                className="card-img__media"
                /* La 1re carte (Mountain, featured) est au-dessus de la ligne
                 * de flottaison -> priority pour optimiser le LCP. */
                priority={idx === 0}
              />
              <span className="card-img__overlay" aria-hidden="true" />

              {/* Graduations comme sur un mugshot de commissariat */}
              <span className="wanted-poster__ruler" aria-hidden="true">
                <span>6&apos;</span>
                <span>5&apos;</span>
                <span>4&apos;</span>
                <span>3&apos;</span>
              </span>

              {/* Numero d'inculpation */}
              <span className="wanted-poster__case" aria-hidden="true">
                CASE N°{String(item.id).padStart(3, '0')}
              </span>
            </div>

            {/* Fiche signaletique */}
            <div className="wanted-poster__info">
              <h3 className="wanted-poster__name">{item.name}</h3>
              <p className="wanted-poster__desc">{item.desc}</p>

              <div className="wanted-poster__reward">
                <span className="wanted-poster__reward-label">RÉCOMPENSE</span>
                <span className="wanted-poster__reward-amount">{item.reward}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
