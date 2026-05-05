/**
 * "La Scène du Délit" - Galerie immersive des preuves visuelles
 * recueillies directement chez THE 911 (photos internes fournies).
 *
 * Les 4 visuels authentiques :
 *   1. Le suspect — portrait "mug shot" devant le mur GUILTY SANDWICH #911
 *   2. Le QG — comptoir avec le logo lumineux THE 911 et écrans de menu
 *   3. Les écrans — menus WANTED BY POLICE au-dessus du comptoir
 *   4. Le dossier — flyer officiel "Wanted by Police" (burgers, menus, milkshakes)
 *
 * Mise en page bento-grid 3 colonnes (featured + tall + wide + std).
 */
import Image from 'next/image';

type Scene = {
  src: string;
  alt: string;
  evidence: string;
  title: string;
  tag: string;
  size: 'featured' | 'tall' | 'wide' | 'std';
};

/** Tailles `srcset` indicatives pour next/image en mode `fill`.
 * Mobile : 1 col plein écran. Tablette : 2 col. Desktop : 3 col (featured/wide = 2/3, tall/std = 1/3). */
const AMBIANCE_SIZES =
  '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw';
const AMBIANCE_SIZES_LARGE =
  '(max-width: 600px) 100vw, (max-width: 900px) 100vw, 66vw';

const scenes: Scene[] = [
  {
    src: '/images/ambiance/mug-shot-wall.jpeg',
    alt: 'Mur officiel "police lineup" avec graduations, logo 911 GUILTY SANDWICH gravé sur la brique noire',
    evidence: 'PIÈCE N°01',
    title: 'LE MUR DES SUSPECTS',
    tag: 'MUG SHOT · 911 GUILTY SANDWICH',
    size: 'featured',
  },
  {
    src: '/images/ambiance/studio-crime.jpeg',
    alt: 'Setup studio THE 911 : projecteur Nanlite éclairant un décor scène de crime, voiture 911 EMERGENCY et bandeau Police Line',
    evidence: 'PIÈCE N°02',
    title: 'LA SALLE D\u2019INTERROGATOIRE',
    tag: 'BACKSTAGE · CRIME SCENE',
    size: 'tall',
  },
  {
    src: '/images/ambiance/police-line-car.jpeg',
    alt: 'Voiture GPD POLICE n°911 derrière un bandeau jaune POLICE LINE DO NOT CROSS, skyline urbaine en arrière-plan',
    evidence: 'PIÈCE N°03',
    title: 'LA SCÈNE DU DÉLIT',
    tag: 'POLICE LINE · DO NOT CROSS',
    size: 'wide',
  },
  {
    src: '/images/officiel/vitrine.jpeg',
    alt: 'Sélection de sandwichs et burgers THE 911 disposés sur des planches devant la vitrine du restaurant à Plaisance-du-Touch',
    evidence: 'PIÈCE N°04',
    title: 'LE BUTIN',
    tag: 'CARTE OFFICIELLE · SUR PLACE',
    size: 'std',
  },
];

export default function AmbianceSection() {
  return (
    <section id="ambiance" className="ambiance-section">
      <h2 className="section-title">LA SCÈNE DU DÉLIT</h2>
      <p className="ambiance-intro">
        Plongez dans l&apos;univers sombre et authentique de THE 911.
        Un lieu où les suspects se retrouvent pour savourer l&apos;interdit.
      </p>

      <div className="ambiance-grid">
        {scenes.map((scene, i) => {
          const isLarge = scene.size === 'featured' || scene.size === 'wide';
          return (
            <figure
              key={scene.evidence}
              className={`ambiance-item ambiance-item--${scene.size} reveal-on-scroll`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Image
                src={scene.src}
                alt={scene.alt}
                fill
                sizes={isLarge ? AMBIANCE_SIZES_LARGE : AMBIANCE_SIZES}
                className="ambiance-item__img"
                /* la 1ʳᵉ image (featured) est dans le viewport au scroll vers la galerie :
                 * priority=false suffit, l'IntersectionObserver de page.tsx gère le reveal */
                priority={false}
              />
              <div className="ambiance-item__shade" aria-hidden="true" />
              <figcaption className="ambiance-item__caption">
                <span className="ambiance-item__evidence">{scene.evidence}</span>
                <span className="ambiance-item__title">{scene.title}</span>
                <span className="ambiance-item__tag">{scene.tag}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
