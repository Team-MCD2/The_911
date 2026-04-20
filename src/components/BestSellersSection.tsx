/**
 * Best Sellers - Sélection mise en avant des stars du menu THE 911.
 * Photos officielles fournies par le restaurant (dossier IMAGE_911).
 * Prix "produit seul" issus de la carte officielle (le prix menu inclut la boisson).
 */
export default function BestSellersSection() {
  const bestSellers = [
    {
      id: 1,
      name: 'MOUNTAIN',
      desc: 'Steak, cheddar, raclette, rösti, bacon, crudités. Le mastodonte.',
      price: '11,00€',
      img: "url('/images/menu/mountain.jpeg') center/cover",
      featured: true,
    },
    {
      id: 2,
      name: 'PULLED BEEF',
      desc: 'Bœuf effiloché fondant, fromage gratiné, crudités fraîches.',
      price: '11,00€',
      img: "url('/images/menu/pulled-beef.jpeg') center/cover",
    },
    {
      id: 3,
      name: 'SMASH 2',
      desc: 'Deux steaks smashés, cheddar, oignons. Pure tradition.',
      price: '7,00€',
      img: "url('/images/menu/smash-2.jpeg') center/cover",
    },
    {
      id: 4,
      name: 'HARLEM',
      desc: 'Steak, cordon-bleu maison, cheddar, crudités. Le double délit.',
      price: '9,50€',
      img: "url('/images/menu/harlem.jpeg') center/cover",
    },
  ];

  return (
    <section id="best-sellers" className="menu-section">
      <h2 className="section-title">NOS BEST SELLERS</h2>

      <div className="best-sellers-scroll">
        {bestSellers.map((item) => (
          <article
            key={item.id}
            className={`menu-card ${item.featured ? 'featured' : ''}`}
          >
            <div
              className="card-img"
              style={{ background: item.img }}
              role="img"
              aria-label={`${item.name} — ${item.desc}`}
            >
              <div className="confidential-stamp">TOP #0{item.id}</div>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="card-footer">
                <span className="price">{item.price}</span>
                <button className="btn-add" aria-label={`Ajouter ${item.name}`}>+</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
