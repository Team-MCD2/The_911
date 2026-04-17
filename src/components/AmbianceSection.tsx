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

type Scene = {
  src: string;
  alt: string;
  evidence: string;
  title: string;
  tag: string;
  size: 'featured' | 'tall' | 'wide' | 'std';
};

const scenes: Scene[] = [
  {
    src: '/images/ambiance/scene_3.jpg',
    alt: 'Suspect posant devant le mur GUILTY SANDWICH #911 avec un sandwich à la main',
    evidence: 'PIÈCE N°01',
    title: 'LE SUSPECT',
    tag: 'MUG SHOT · GUILTY SANDWICH',
    size: 'featured',
  },
  {
    src: '/images/ambiance/scene_4.jpg',
    alt: 'Comptoir du restaurant avec le logo lumineux THE 911 et menus digitaux au-dessus',
    evidence: 'PIÈCE N°02',
    title: 'LE QG',
    tag: 'COMPTOIR · LOGO #911',
    size: 'tall',
  },
  {
    src: '/images/ambiance/scene_2.jpg',
    alt: 'Trois écrans de menu WANTED BY POLICE alignés au-dessus du comptoir du restaurant',
    evidence: 'PIÈCE N°03',
    title: 'LE TABLEAU DE CHASSE',
    tag: 'WANTED BY POLICE · MENU LUMINEUX',
    size: 'wide',
  },
  {
    src: '/images/ambiance/scene_1.jpg',
    alt: 'Flyer officiel THE 911 : Smash 1, Smash 2, Little Beef, suppléments, menu enfant et milkshake',
    evidence: 'PIÈCE N°04',
    title: 'LE DOSSIER',
    tag: 'CARTE OFFICIELLE · BURGERS & MILKSHAKES',
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
        {scenes.map((scene, i) => (
          <figure
            key={scene.evidence}
            className={`ambiance-item ambiance-item--${scene.size} reveal-on-scroll`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img
              src={scene.src}
              alt={scene.alt}
              loading="lazy"
              className="ambiance-item__img"
            />
            <div className="ambiance-item__shade" aria-hidden="true" />
            <figcaption className="ambiance-item__caption">
              <span className="ambiance-item__evidence">{scene.evidence}</span>
              <span className="ambiance-item__title">{scene.title}</span>
              <span className="ambiance-item__tag">{scene.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
