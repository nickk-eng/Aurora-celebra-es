import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const { img, SERVICES, SUPPLIER_CATEGORIES, SUPPLIERS, PORTFOLIO, TESTIMONIALS, POSTS } = window.AURORA_DATA;
const readList = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
};
const writeList = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const moneyDate = (value) => new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

function ServiceCards() {
  return SERVICES.map((service, index) => <div className={`col-md-6 col-lg-4 reveal delay-${index % 3 + 1}`} key={service.id}>
    <article className="card-soft">
      <a href={`servico.html?id=${service.id}`} className="d-block card-media" aria-label={service.title}><img src={img(service.photo, 800)} alt={service.title} loading="lazy" /></a>
      <div className="card-body-soft"><div className="d-flex align-items-center gap-3 mb-3"><span className="icon-circle"><i className={`bi ${service.icon}`} /></span><h3 className="m-0">{service.title}</h3></div>
        <p>{service.short}</p><a href={`servico.html?id=${service.id}`} className="link-arrow">Ver detalhes <i className="bi bi-arrow-right" /></a></div>
    </article>
  </div>);
}

function SupplierCard({ supplier, saved, onToggle }) {
  return <div className="col-sm-6 col-lg-4 col-xl-3" key={supplier.id}><article className="card-soft supplier-card">
    <div className="card-media"><span className="tag">{supplier.category}</span><button type="button" className={`fav-btn ${saved ? "active" : ""}`} aria-pressed={saved} aria-label={`${saved ? "Remover dos" : "Adicionar aos"} favoritos: ${supplier.name}`} onClick={() => onToggle(supplier.id)}><i className={`bi ${saved ? "bi-heart-fill" : "bi-heart"}`} /></button><img src={img(supplier.photo, 700)} alt={supplier.name} loading="lazy" /></div>
    <div className="card-body-soft"><div className="rating mb-1" aria-label={`${supplier.rating} de 5 estrelas`}>{Array.from({ length: 5 }, (_, i) => <i className={`bi ${i < Math.round(supplier.rating) ? "bi-star-fill" : "bi-star"}`} key={i} />)} <span>{supplier.rating.toFixed(1)} ({supplier.reviews})</span></div>
      <h4 className="mb-2" style={{ fontSize: "1.4rem" }}>{supplier.name}</h4><div className="supplier-meta mb-2"><span><i className="bi bi-geo-alt" /> {supplier.city}</span><span><i className="bi bi-cash-coin" /> {supplier.price}</span></div><p className="mb-3" style={{ fontSize: ".92rem" }}>{supplier.desc}</p><a href={`orcamento.html?fornecedor=${encodeURIComponent(supplier.name)}`} className="btn btn-outline-gold btn-sm w-100">Solicitar orçamento</a></div>
  </article></div>;
}

function SupplierDirectory() {
  const [category, setCategory] = useState(new URLSearchParams(location.search).get("categoria") || "");
  const [city, setCity] = useState(new URLSearchParams(location.search).get("cidade") || "");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [onlySaved, setOnlySaved] = useState(false);
  const [saved, setSaved] = useState(() => readList("aurora_favoritos"));
  const cities = [...new Set(SUPPLIERS.map((supplier) => supplier.city))].sort();
  const visible = useMemo(() => SUPPLIERS.filter((item) => (!category || item.category === category) && (!city || item.city === city) && (!onlySaved || saved.includes(item.id)) && (!query || `${item.name} ${item.desc} ${item.category}`.toLowerCase().includes(query.toLowerCase().trim()))).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "reviews" ? b.reviews - a.reviews : b.rating - a.rating), [category, city, query, sort, onlySaved, saved]);
  const toggleSaved = (id) => setSaved((current) => { const next = current.includes(id) ? current.filter((value) => value !== id) : [...current, id]; writeList("aurora_favoritos", next); return next; });
  const reset = () => { setCategory(""); setCity(""); setQuery(""); setSort("rating"); setOnlySaved(false); };
  return <>
    <div className="filter-bar mb-4 reveal" role="group" aria-label="Filtrar por categoria">{["", ...SUPPLIER_CATEGORIES].map((item) => <button type="button" key={item || "all"} className={`filter-btn ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item || "Todos"}</button>)}</div>
    <div className="sidebar-box mb-4 reveal"><div className="row g-3 align-items-center">
      <div className="col-md-5"><label htmlFor="supplier-search" className="visually-hidden">Buscar fornecedor</label><div className="search-field"><i className="bi bi-search" /><input type="search" id="supplier-search" className="form-control" placeholder="Buscar por nome ou especialidade" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      <div className="col-6 col-md-3"><label htmlFor="supplier-city" className="visually-hidden">Cidade</label><select id="supplier-city" className="form-select" value={city} onChange={(event) => setCity(event.target.value)}><option value="">Todas as cidades</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></div>
      <div className="col-6 col-md-2"><label htmlFor="supplier-sort" className="visually-hidden">Ordenar</label><select id="supplier-sort" className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}><option value="rating">Melhor avaliados</option><option value="reviews">Mais avaliações</option><option value="name">Nome (A–Z)</option></select></div>
      <div className="col-md-2"><div className="form-check form-switch m-0"><input className="form-check-input" type="checkbox" role="switch" id="supplier-fav" checked={onlySaved} onChange={(event) => setOnlySaved(event.target.checked)} /><label className="form-check-label" htmlFor="supplier-fav"><i className="bi bi-heart text-rose" /> Favoritos</label></div></div>
    </div></div>
    <p className="text-muted-soft mb-4" aria-live="polite">{visible.length} {visible.length === 1 ? "fornecedor encontrado" : "fornecedores encontrados"}</p>
    <div className="row g-4">{visible.length ? visible.map((supplier) => <SupplierCard supplier={supplier} saved={saved.includes(supplier.id)} onToggle={toggleSaved} key={supplier.id} />) : <div className="col-12"><div className="empty-state"><i className="bi bi-search-heart" />Nenhum fornecedor encontrado com esses filtros.<br /><button type="button" className="btn btn-outline-gold btn-sm mt-3" onClick={reset}>Limpar filtros</button></div></div>}</div>
  </>;
}

function PortfolioGallery() {
  const [type, setType] = useState("");
  const [active, setActive] = useState(null);
  const types = [...new Set(PORTFOLIO.map((item) => item.type))];
  const photos = PORTFOLIO.map((item, index) => ({ ...item, sourceIndex: index })).filter((item) => !type || item.type === type);
  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => { if (event.key === "Escape") setActive(null); if (event.key === "ArrowRight") setActive((value) => (value + 1) % photos.length); if (event.key === "ArrowLeft") setActive((value) => (value + photos.length - 1) % photos.length); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active, photos.length]);
  return <>
    <div className="filter-bar mb-5 reveal" role="group" aria-label="Filtrar por tipo de evento">{["", ...types].map((item) => <button type="button" key={item || "all"} className={`filter-btn ${type === item ? "active" : ""}`} aria-pressed={type === item} onClick={() => { setType(item); setActive(null); }}>{item || "Todos"}</button>)}</div>
    <div className="gallery-grid">{photos.map((photo, index) => <button type="button" className="gallery-item reveal reveal-zoom" key={photo.sourceIndex} onClick={() => setActive(index)}><img src={img(photo.photo, 900)} alt={`${photo.title} — ${photo.type}`} loading="lazy" style={{ aspectRatio: `900/${photo.h}` }} /><span className="cap"><small>{photo.type} · {photo.place}</small><h5>{photo.title}</h5></span></button>)}</div>
    {active !== null && <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Visualização de foto" onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}><button type="button" className="lb-btn lb-close" aria-label="Fechar" onClick={() => setActive(null)}><i className="bi bi-x-lg" /></button><button type="button" className="lb-btn lb-prev" aria-label="Foto anterior" onClick={() => setActive((active + photos.length - 1) % photos.length)}><i className="bi bi-chevron-left" /></button><figure><img src={img(photos[active].photo, 1600)} alt={photos[active].title} /><figcaption><small>{photos[active].type} · {photos[active].place}</small>{photos[active].title}</figcaption></figure><button type="button" className="lb-btn lb-next" aria-label="Próxima foto" onClick={() => setActive((active + 1) % photos.length)}><i className="bi bi-chevron-right" /></button></div>}
  </>;
}

function TestimonialDirectory() {
  const [mine, setMine] = useState(() => readList("aurora_depoimentos"));
  useEffect(() => {
    const form = document.querySelector("#testimonial-form");
    if (!form) return undefined;
    const submit = (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const rating = data.get("rating");
      const ratingError = document.querySelector("#rating-error");
      if (!form.checkValidity() || !rating) { form.classList.add("was-validated"); ratingError?.classList.toggle("d-block", !rating); form.reportValidity(); return; }
      const review = { name: String(data.get("nome")).trim(), event: String(data.get("evento") || "Cliente Aurora").trim(), rating: Number(rating), text: String(data.get("mensagem")).trim(), date: new Date().toISOString() };
      const next = [review, ...readList("aurora_depoimentos")];
      writeList("aurora_depoimentos", next); setMine(next); form.reset(); form.classList.remove("was-validated"); ratingError?.classList.remove("d-block");
      document.dispatchEvent(new CustomEvent("aurora:toast", { detail: "Obrigado! Seu depoimento foi publicado nesta página." }));
    };
    form.addEventListener("submit", submit);
    return () => form.removeEventListener("submit", submit);
  }, []);
  return [...mine, ...TESTIMONIALS].map((review, index) => <div className={`col-md-6 col-lg-4 reveal delay-${index % 3 + 1}`} key={`${review.name}-${index}`}><figure className="testimonial m-0"><i className="bi bi-quote quote-icon" aria-hidden="true" /><div className="rating" aria-label={`${review.rating} de 5 estrelas`}>{Array.from({ length: 5 }, (_, i) => <i className={`bi ${i < Math.round(review.rating) ? "bi-star-fill" : "bi-star"}`} key={i} />)}</div><blockquote>“{review.text}”</blockquote><figcaption className="d-flex align-items-center gap-3 who"><span className="avatar">{review.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase()}</span><span><strong>{review.name}</strong><small>{review.event}</small></span></figcaption></figure></div>);
}

function BlogDirectory() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const categories = [...new Set(POSTS.map((post) => post.category))];
  const featured = POSTS[0];
  const visible = POSTS.filter((post) => (!category || post.category === category) && (!query || `${post.title} ${post.excerpt} ${post.content}`.toLowerCase().includes(query.toLowerCase().trim())));
  const card = (post, index) => <div className="col-md-6" key={post.id}><article className="card-soft post-card"><a href="#" className="d-block card-media" data-post={post.id} aria-label={`Ler: ${post.title}`}><span className="tag">{post.category}</span><img src={img(post.photo, 800)} alt="" loading="lazy" /></a><div className="card-body-soft"><div className="post-meta"><span><i className="bi bi-calendar3" /> {moneyDate(post.date)}</span><span><i className="bi bi-clock" /> {post.read} min de leitura</span></div><h4 style={{ fontSize: "1.5rem" }}><a href="#" className="text-reset" data-post={post.id}>{post.title}</a></h4><p>{post.excerpt}</p><a href="#" className="link-arrow" data-post={post.id}>Ler artigo <i className="bi bi-arrow-right" /></a></div></article></div>;
  return <>
    <article className="post-featured mb-5 reveal"><a href="#" className="card-media d-block" data-post={featured.id} aria-label={`Ler: ${featured.title}`}><img src={img(featured.photo, 1200)} alt="" /></a><div className="body"><span className="eyebrow">Em destaque · {featured.category}</span><h2 className="h1 mb-3" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>{featured.title}</h2><p>{featured.excerpt}</p><div className="post-meta mb-4"><span><i className="bi bi-calendar3" /> {moneyDate(featured.date)}</span><span><i className="bi bi-clock" /> {featured.read} min de leitura</span></div><a href="#" className="btn btn-gold" data-post={featured.id}>Ler artigo</a></div></article>
    <div className="row g-5"><div className="col-lg-8"><div className="filter-bar justify-content-start mb-4" role="group" aria-label="Filtrar por categoria">{["", ...categories].map((item) => <button type="button" className={`filter-btn ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)} key={item || "all"}>{item || "Todos"}</button>)}</div><div className="row g-4">{visible.length ? visible.map(card) : <div className="col-12"><div className="empty-state">Nenhum artigo encontrado. Tente outra palavra.</div></div>}</div></div>
      <aside className="col-lg-4"><div className="sidebar-box mb-4"><h5>Buscar</h5><label htmlFor="blog-search" className="visually-hidden">Buscar artigos</label><div className="search-field"><i className="bi bi-search" /><input type="search" id="blog-search" className="form-control" placeholder="Palavra-chave" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div><div className="sidebar-box mb-4"><h5>Categorias</h5><ul className="list-unstyled m-0">{categories.map((item) => <li key={item}><button type="button" className="d-flex justify-content-between py-1 text-reset w-100 border-0 bg-transparent text-start" onClick={() => setCategory(item)}>{item}<span className="text-gold">{POSTS.filter((post) => post.category === item).length}</span></button></li>)}</ul></div><div className="sidebar-box mb-4"><h5>Mais recentes</h5>{POSTS.slice(0, 4).map((post) => <a href="#" className="d-flex gap-3 mb-3 text-reset" data-post={post.id} key={post.id}><span className="frame flex-shrink-0" style={{ width: 72, height: 72, borderRadius: 10 }}><img className="img-cover" src={img(post.photo, 200)} alt="" loading="lazy" /></span><span><strong className="d-block" style={{ fontSize: ".95rem", lineHeight: 1.3 }}>{post.title}</strong><small className="text-muted-soft">{moneyDate(post.date)}</small></span></a>)}</div><div className="estimate-box"><h5>Checklist gratuito</h5><p>Receba por e-mail nosso checklist completo de planejamento.</p><form className="newsletter-form d-grid gap-2" noValidate><label htmlFor="blog-nl" className="visually-hidden">E-mail</label><input type="email" id="blog-nl" className="form-control" placeholder="Seu e-mail" required /><button className="btn btn-gold" type="submit">Quero o checklist</button></form></div></aside></div>
  </>;
}

const components = {
  "react-services-list": <ServiceCards />,
  "react-suppliers-app": <SupplierDirectory />,
  "react-gallery-app": <PortfolioGallery />,
  "react-testimonials-list": <TestimonialDirectory />,
  "react-blog-app": <BlogDirectory />,
};

for (const [id, component] of Object.entries(components)) {
  const node = document.getElementById(id);
  if (node) {
    createRoot(node).render(component);
    requestAnimationFrame(() => node.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible")));
  }
}
