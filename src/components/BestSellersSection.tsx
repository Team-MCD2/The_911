export default function BestSellersSection() {
  const bestSellers = [
    { id: 1, name: "LE RÉCIDIVISTE", desc: "Double smash burger, cheddar affiné, bacon, sauce 911 secrète.", price: "13.50€", img: "url('/images/burger_recidiviste.png') center/cover" },
    { id: 2, name: "LE COMPLICE", desc: "Poulet croustillant épicé, coleslaw, mayo piment fumé.", price: "12.00€", img: "url('/images/burger_complice.png') center/cover", featured: true },
    { id: 3, name: "LE CARTEL", desc: "Smash burger, jalapenos, sauce cheddar fondu, oignons crispy.", price: "14.50€", img: "url('/images/burger_cartel.png') center/cover" },
    { id: 4, name: "L'ALIBI", desc: "Buns briochés, effiloché de porc BBQ 12h, double cheddar.", price: "14.00€", img: "url('/images/burger_alibi.png') center/cover" }
  ];

  return (
    <section id="best-sellers" className="menu-section">
      <h2 className="section-title">NOS BEST SELLERS</h2>
      
      <div className="best-sellers-scroll">
        {bestSellers.map((item) => (
          <article key={item.id} className={`menu-card ${item.featured ? 'featured' : ''}`}>
            <div className="card-img" style={{ background: item.img }}>
              <div className="confidential-stamp">TOP #0{item.id}</div>
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
