/* =========================================================
   Aurora Celebrações — JavaScript principal (Vanilla JS)
   Sem back-end: os dados enviados ficam no localStorage
   do navegador do visitante.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const params = new URLSearchParams(location.search);

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    },
    remove(key) { try { localStorage.removeItem(key); } catch (e) { /* ignora */ } }
  };
  const session = {
    get(key, fallback) { try { const v = sessionStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
    set(key, value) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignora */ } }
  };

  const formatDate = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const money = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const initials = (name) => name.replace(/&/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const stars = (n) => Array.from({ length: 5 }, (_, i) => `<i class="bi ${i < Math.round(n) ? "bi-star-fill" : "bi-star"}"></i>`).join("");
  const protocol = () => "AUR-" + Date.now().toString(36).toUpperCase().slice(-6);

  /* ---------- Toast ---------- */
  function toast(message, type = "success") {
    let box = $(".toast-container");
    if (!box) {
      box = document.createElement("div");
      box.className = "toast-container position-fixed bottom-0 start-50 translate-middle-x p-3";
      document.body.appendChild(box);
    }
    const icon = type === "success" ? "bi-check-circle-fill text-gold" : "bi-info-circle-fill text-rose";
    const el = document.createElement("div");
    el.className = "toast align-items-center bg-white";
    el.setAttribute("role", "status");
    el.innerHTML = `<div class="d-flex"><div class="toast-body d-flex gap-2 align-items-center"><i class="bi ${icon} fs-5"></i><span>${message}</span></div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button></div>`;
    box.appendChild(el);
    if (window.bootstrap) {
      const t = new bootstrap.Toast(el, { delay: 4500 });
      el.addEventListener("hidden.bs.toast", () => el.remove());
      t.show();
    } else {
      el.classList.add("show");
      setTimeout(() => el.remove(), 4500);
    }
  }
  document.addEventListener("aurora:toast", (event) => toast(event.detail || "Concluído."));

  /* ---------- Imagens: fallback elegante se uma foto não carregar ---------- */
  document.addEventListener("error", (e) => {
    const t = e.target;
    if (t && t.tagName === "IMG" && !t.dataset.failed) {
      t.dataset.failed = "1";
      t.classList.add("img-fallback");
      t.removeAttribute("srcset");
      t.src = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
    }
  }, true);

  function loadBackgrounds() {
    $$("[data-bg]").forEach((el) => {
      const url = el.dataset.bg;
      const probe = new Image();
      probe.onload = () => { el.style.backgroundImage = `url("${url}")`; };
      probe.onerror = () => el.classList.add("img-fallback");
      probe.src = url;
    });
  }

  /* ---------- Cabeçalho, navegação e botões flutuantes ---------- */
  function initChrome() {
    const header = $(".site-header");
    const topBtn = $(".fab-top");
    const onScroll = () => {
      const y = window.scrollY;
      header && header.classList.toggle("scrolled", y > 40);
      topBtn && topBtn.classList.toggle("show", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    topBtn && topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Destaca o item de menu da página atual
    const page = document.body.dataset.page;
    $$(".navbar .nav-link").forEach((a) => {
      if (a.dataset.page === page) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
    });

    // Fecha o menu mobile ao clicar em um link
    const collapse = $("#mainNav");
    $$("#mainNav .nav-link, #mainNav .btn").forEach((a) =>
      a.addEventListener("click", () => {
        if (collapse && collapse.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      })
    );

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Animações ao rolar ---------- */
  let revealObserver = null;
  function observeReveal(scope = document) {
    const items = $$(".reveal:not(.visible)", scope);
    if (!("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("visible")); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("visible"); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  function initCounters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1800;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("pt-BR") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); counterObserver.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach((n) => counterObserver.observe(n));
  }

  /* ---------- Templates de cards ---------- */
  const serviceCard = (s, i = 0) => `
    <div class="col-md-6 col-lg-4 reveal delay-${(i % 3) + 1}">
      <article class="card-soft">
        <a href="servico.html?id=${s.id}" class="d-block card-media" aria-label="${s.title}">
          <img src="${img(s.photo, 800)}" alt="${s.title}" loading="lazy">
        </a>
        <div class="card-body-soft">
          <div class="d-flex align-items-center gap-3 mb-3">
            <span class="icon-circle"><i class="bi ${s.icon}"></i></span>
            <h3 class="m-0">${s.title}</h3>
          </div>
          <p>${s.short}</p>
          <a href="servico.html?id=${s.id}" class="link-arrow">Ver detalhes <i class="bi bi-arrow-right"></i></a>
        </div>
      </article>
    </div>`;

  const favorites = () => store.get("aurora_favoritos", []);
  const supplierCard = (s, i = 0) => {
    const fav = favorites().includes(s.id);
    return `
    <div class="col-sm-6 col-lg-4 col-xl-3 reveal delay-${(i % 4) + 1}">
      <article class="card-soft supplier-card">
        <div class="card-media">
          <span class="tag">${s.category}</span>
          <button type="button" class="fav-btn ${fav ? "active" : ""}" data-fav="${s.id}" aria-pressed="${fav}" aria-label="${fav ? "Remover dos" : "Adicionar aos"} favoritos: ${s.name}">
            <i class="bi ${fav ? "bi-heart-fill" : "bi-heart"}"></i>
          </button>
          <img src="${img(s.photo, 700)}" alt="${s.name}" loading="lazy">
        </div>
        <div class="card-body-soft">
          <div class="rating mb-1">${stars(s.rating)} <span>${s.rating.toFixed(1)} (${s.reviews})</span></div>
          <h4 class="mb-2" style="font-size:1.4rem">${s.name}</h4>
          <div class="supplier-meta mb-2"><span><i class="bi bi-geo-alt"></i> ${s.city}</span><span><i class="bi bi-cash-coin"></i> ${s.price}</span></div>
          <p class="mb-3" style="font-size:.92rem">${s.desc}</p>
          <a href="orcamento.html?fornecedor=${encodeURIComponent(s.name)}" class="btn btn-outline-gold btn-sm w-100">Solicitar orçamento</a>
        </div>
      </article>
    </div>`;
  };

  const postCard = (p, i = 0) => `
    <div class="col-md-6 col-lg-4 reveal delay-${(i % 3) + 1}">
      <article class="card-soft post-card">
        <a href="#" class="d-block card-media" data-post="${p.id}" aria-label="Ler: ${p.title}">
          <span class="tag">${p.category}</span>
          <img src="${img(p.photo, 800)}" alt="" loading="lazy">
        </a>
        <div class="card-body-soft">
          <div class="post-meta"><span><i class="bi bi-calendar3"></i> ${formatDate(p.date)}</span><span><i class="bi bi-clock"></i> ${p.read} min de leitura</span></div>
          <h4 style="font-size:1.5rem"><a href="#" class="text-reset" data-post="${p.id}">${p.title}</a></h4>
          <p>${p.excerpt}</p>
          <a href="#" class="link-arrow" data-post="${p.id}">Ler artigo <i class="bi bi-arrow-right"></i></a>
        </div>
      </article>
    </div>`;

  const testimonialCard = (t, i = 0) => `
    <div class="col-md-6 col-lg-4 reveal delay-${(i % 3) + 1}">
      <figure class="testimonial m-0">
        <i class="bi bi-quote quote-icon" aria-hidden="true"></i>
        <div class="rating" aria-label="${t.rating} de 5 estrelas">${stars(t.rating)}</div>
        <blockquote>“${escapeHTML(t.text)}”</blockquote>
        <figcaption class="d-flex align-items-center gap-3 who">
          <span class="avatar">${escapeHTML(initials(t.name))}</span>
          <span><strong>${escapeHTML(t.name)}</strong><small>${escapeHTML(t.event)}</small></span>
        </figcaption>
      </figure>
    </div>`;

  const emptyState = (msg) => `<div class="col-12"><div class="empty-state"><i class="bi bi-search-heart"></i>${msg}</div></div>`;

  /* ---------- Home ---------- */
  function initHome() {
    const fs = $("#featured-services");
    if (fs) fs.innerHTML = SERVICES.slice(0, 6).map(serviceCard).join("");

    const hs = $("#home-suppliers");
    if (hs) hs.innerHTML = [1, 3, 5, 10].map((id, i) => supplierCard(SUPPLIERS.find((s) => s.id === id), i)).join("");

    const hp = $("#home-posts");
    if (hp) hp.innerHTML = POSTS.slice(0, 3).map(postCard).join("");

    const hg = $("#home-gallery");
    if (hg) {
      const layout = ["g-tall", "", "g-wide", "", "", "g-tall", "g-wide", ""];
      hg.innerHTML = PORTFOLIO.slice(0, 8).map((p, i) => `
        <button type="button" class="gallery-item ${layout[i]} reveal reveal-zoom" data-lightbox="${i}">
          <img src="${img(p.photo, 900)}" alt="${p.title} — ${p.type}" loading="lazy">
          <span class="cap"><small>${p.type}</small><h5>${p.title}</h5></span>
        </button>`).join("");
      initLightbox(PORTFOLIO.slice(0, 8), hg);
    }

    // Carrossel de depoimentos
    const tc = $("#testimonial-carousel .carousel-inner");
    const ti = $("#testimonial-carousel .carousel-indicators");
    if (tc && ti) {
      const list = TESTIMONIALS.slice(0, 4);
      tc.innerHTML = list.map((t, i) => `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <div class="testimonial-feature">
            <div class="rating mb-3 fs-5">${stars(t.rating)}</div>
            <blockquote>“${t.text}”</blockquote>
            <div class="d-inline-flex align-items-center gap-3 text-start">
              <span class="avatar">${initials(t.name)}</span>
              <span><strong class="d-block">${t.name}</strong><small class="text-muted-soft">${t.event}</small></span>
            </div>
          </div>
        </div>`).join("");
      ti.innerHTML = list.map((_, i) => `<button type="button" data-bs-target="#testimonial-carousel" data-bs-slide-to="${i}" ${i === 0 ? 'class="active" aria-current="true"' : ""} aria-label="Depoimento ${i + 1}"></button>`).join("");
    }

    // Busca rápida de fornecedores
    const qs = $("#quick-search");
    if (qs) {
      const cat = $("#qs-category", qs);
      const city = $("#qs-city", qs);
      cat.innerHTML += SUPPLIER_CATEGORIES.map((c) => `<option>${c}</option>`).join("");
      city.innerHTML += [...new Set(SUPPLIERS.map((s) => s.city))].sort().map((c) => `<option>${c}</option>`).join("");
      qs.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (cat.value) q.set("categoria", cat.value);
        if (city.value) q.set("cidade", city.value);
        location.href = "fornecedores.html" + (q.toString() ? "?" + q : "");
      });
    }
  }

  /* ---------- Serviços ---------- */
  function initServices() {
    const list = $("#services-list");
    if (list) list.innerHTML = SERVICES.map(serviceCard).join("");
  }

  function initServiceDetail() {
    const root = $("#service-detail");
    if (!root) return;
    const s = SERVICES.find((x) => x.id === params.get("id")) || SERVICES[0];
    document.title = `${s.title} | Aurora Celebrações`;
    $("#sd-title").textContent = s.title;
    $("#sd-crumb").textContent = s.title;
    $("#sd-short").textContent = s.short;
    const bg = $("#sd-bg");
    bg.dataset.bg = img(s.photo, 1800);

    $("#sd-nav").innerHTML = SERVICES.map((x) =>
      `<a href="servico.html?id=${x.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-2 ${x.id === s.id ? "active" : ""}" ${x.id === s.id ? 'aria-current="page"' : ""}><i class="bi ${x.icon}"></i> ${x.title}</a>`).join("");

    root.innerHTML = `
      <div class="frame mb-4 reveal" style="aspect-ratio:16/9"><img class="img-cover" src="${img(s.photo, 1400)}" alt="${s.title}"></div>
      <span class="eyebrow">Sobre o serviço</span>
      <h2 class="mb-3">${s.title}</h2>
      <p class="fs-5 mb-4">${s.description}</p>
      <div class="row g-4 mb-5">
        <div class="col-md-6"><h3 class="h4 mb-3">O que está incluso</h3><ul class="check-list">${s.includes.map((i) => `<li>${i}</li>`).join("")}</ul></div>
        <div class="col-md-6"><div class="row g-2">${s.gallery.map((g) => `<div class="col-4"><button type="button" class="gallery-item m-0" data-lightbox-src="${g}" style="aspect-ratio:3/4"><img class="img-cover" src="${img(g, 500)}" alt="Evento realizado: ${s.title}" loading="lazy" style="min-height:0"></button></div>`).join("")}</div></div>
      </div>
      <h3 class="mb-4">Pacotes</h3>
      <div class="row g-4 mb-5 pt-2">${s.packages.map((p) => `
        <div class="col-md-6 col-xl-${Math.max(4, 12 / s.packages.length)}">
          <div class="package ${p.featured ? "featured" : ""}">
            <h4>${p.name}</h4>
            <div class="price mb-3">${p.price}</div>
            <ul class="check-list mb-4">${p.items.map((i) => `<li>${i}</li>`).join("")}</ul>
            <a href="orcamento.html?servico=${s.id}&pacote=${encodeURIComponent(p.name)}" class="btn ${p.featured ? "btn-gold" : "btn-outline-gold"} w-100">Quero este pacote</a>
          </div>
        </div>`).join("")}
      </div>
      <p class="small text-muted-soft mb-5">Valores de referência. O orçamento final depende da data, do local e do número de convidados.</p>
      <h3 class="mb-4">Perguntas frequentes</h3>
      <div class="accordion" id="faq">${s.faq.map(([q, a], i) => `
        <div class="accordion-item">
          <h4 class="accordion-header"><button class="accordion-button ${i ? "collapsed" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#faq${i}" aria-expanded="${!i}" aria-controls="faq${i}">${q}</button></h4>
          <div id="faq${i}" class="accordion-collapse collapse ${i ? "" : "show"}" data-bs-parent="#faq"><div class="accordion-body text-muted-soft">${a}</div></div>
        </div>`).join("")}
      </div>`;

    const cta = $("#sd-cta");
    if (cta) cta.href = `orcamento.html?servico=${s.id}`;

    const related = $("#sd-related");
    if (related) related.innerHTML = SERVICES.filter((x) => x.id !== s.id).slice(0, 3).map(serviceCard).join("");

    // Mini-galeria do serviço abre no lightbox
    const items = s.gallery.map((g) => ({ photo: g, title: s.title, type: "Portfólio" }));
    initLightbox(items, root, "[data-lightbox-src]");
  }

  /* ---------- Fornecedores ---------- */
  function initSuppliers() {
    const grid = $("#suppliers-list");
    if (!grid) return;
    const catBar = $("#supplier-filters");
    const citySel = $("#supplier-city");
    const search = $("#supplier-search");
    const sort = $("#supplier-sort");
    const favOnly = $("#supplier-fav");
    const count = $("#supplier-count");

    const state = Object.assign({ cat: "", city: "", q: "", sort: "rating", fav: false }, session.get("aurora_filtros_fornecedores", {}));
    if (params.get("categoria")) state.cat = params.get("categoria");
    if (params.get("cidade")) state.city = params.get("cidade");

    catBar.innerHTML = ["", ...SUPPLIER_CATEGORIES].map((c) =>
      `<button type="button" class="filter-btn" data-cat="${c}">${c || "Todos"}</button>`).join("");
    citySel.innerHTML = `<option value="">Todas as cidades</option>` +
      [...new Set(SUPPLIERS.map((s) => s.city))].sort().map((c) => `<option>${c}</option>`).join("");

    const render = () => {
      session.set("aurora_filtros_fornecedores", state);
      $$(".filter-btn", catBar).forEach((b) => { const on = b.dataset.cat === state.cat; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
      citySel.value = state.city; search.value = state.q; sort.value = state.sort; favOnly.checked = state.fav;
      const favs = favorites();
      const q = state.q.trim().toLowerCase();
      let list = SUPPLIERS.filter((s) =>
        (!state.cat || s.category === state.cat) &&
        (!state.city || s.city === state.city) &&
        (!state.fav || favs.includes(s.id)) &&
        (!q || (s.name + " " + s.desc + " " + s.category).toLowerCase().includes(q)));
      list.sort((a, b) => state.sort === "name" ? a.name.localeCompare(b.name) : state.sort === "reviews" ? b.reviews - a.reviews : b.rating - a.rating);
      count.textContent = `${list.length} ${list.length === 1 ? "fornecedor encontrado" : "fornecedores encontrados"}`;
      grid.innerHTML = list.length ? list.map(supplierCard).join("") : emptyState("Nenhum fornecedor encontrado com esses filtros.<br><button type='button' class='btn btn-outline-gold btn-sm mt-3' id='clear-filters'>Limpar filtros</button>");
      observeReveal(grid);
    };

    catBar.addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; render(); } });
    citySel.addEventListener("change", () => { state.city = citySel.value; render(); });
    sort.addEventListener("change", () => { state.sort = sort.value; render(); });
    favOnly.addEventListener("change", () => { state.fav = favOnly.checked; render(); });
    let timer;
    search.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { state.q = search.value; render(); }, 220); });
    grid.addEventListener("click", (e) => {
      if (e.target.closest("#clear-filters")) { Object.assign(state, { cat: "", city: "", q: "", fav: false }); render(); }
    });
    document.addEventListener("aurora:fav", () => { if (state.fav) render(); });
    render();
  }

  // Favoritos funcionam em qualquer página que mostre fornecedores
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    const id = Number(btn.dataset.fav);
    let favs = favorites();
    const on = !favs.includes(id);
    favs = on ? [...favs, id] : favs.filter((f) => f !== id);
    store.set("aurora_favoritos", favs);
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on);
    btn.querySelector("i").className = "bi " + (on ? "bi-heart-fill" : "bi-heart");
    const s = SUPPLIERS.find((x) => x.id === id);
    toast(on ? `${s.name} foi adicionado aos favoritos.` : `${s.name} foi removido dos favoritos.`, on ? "success" : "info");
    document.dispatchEvent(new CustomEvent("aurora:fav"));
  });

  /* ---------- Portfólio + Lightbox ---------- */
  function initLightbox(items, scope, selector = "[data-lightbox]") {
    let lb = $("#lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "lightbox";
      lb.className = "lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Visualização de foto");
      lb.innerHTML = `
        <button type="button" class="lb-btn lb-close" aria-label="Fechar"><i class="bi bi-x-lg"></i></button>
        <button type="button" class="lb-btn lb-prev" aria-label="Foto anterior"><i class="bi bi-chevron-left"></i></button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button type="button" class="lb-btn lb-next" aria-label="Próxima foto"><i class="bi bi-chevron-right"></i></button>`;
      document.body.appendChild(lb);
    }
    let list = items, index = 0, lastFocus = null;
    const imgEl = $("img", lb), cap = $("figcaption", lb);
    const show = (i) => {
      index = (i + list.length) % list.length;
      const it = list[index];
      imgEl.classList.remove("img-fallback"); delete imgEl.dataset.failed;
      imgEl.src = img(it.photo, 1600);
      imgEl.alt = it.title;
      cap.innerHTML = `<small>${it.type}${it.place ? " · " + it.place : ""}</small>${it.title}`;
    };
    const open = (i) => { lastFocus = document.activeElement; show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };

    lb.onclick = (e) => {
      if (e.target.closest(".lb-close") || e.target === lb) close();
      else if (e.target.closest(".lb-prev")) show(index - 1);
      else if (e.target.closest(".lb-next")) show(index + 1);
    };
    lb.onkeydown = null;
    document.onkeydown = (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    };
    scope.addEventListener("click", (e) => {
      const b = e.target.closest(selector);
      if (!b) return;
      const visible = $$(selector, scope);
      if (selector === "[data-lightbox]" && scope.dataset.filtered) {
        list = visible.map((v) => items[Number(v.dataset.lightbox)]);
        open(visible.indexOf(b));
      } else {
        list = items;
        open(visible.indexOf(b));
      }
    });
  }

  function initPortfolio() {
    const grid = $("#gallery");
    if (!grid) return;
    const bar = $("#gallery-filters");
    const types = [...new Set(PORTFOLIO.map((p) => p.type))];
    bar.innerHTML = ["", ...types].map((t) => `<button type="button" class="filter-btn" data-type="${t}">${t || "Todos"}</button>`).join("");
    grid.dataset.filtered = "1";
    const render = (type) => {
      $$(".filter-btn", bar).forEach((b) => { const on = b.dataset.type === type; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
      grid.innerHTML = PORTFOLIO.map((p, i) => (!type || p.type === type) ? `
        <button type="button" class="gallery-item reveal reveal-zoom" data-lightbox="${i}">
          <img src="${img(p.photo, 900)}" alt="${p.title} — ${p.type}" loading="lazy" style="aspect-ratio:900/${p.h}">
          <span class="cap"><small>${p.type} · ${p.place}</small><h5>${p.title}</h5></span>
        </button>` : "").join("");
      observeReveal(grid);
    };
    bar.addEventListener("click", (e) => { const b = e.target.closest("[data-type]"); if (b) render(b.dataset.type); });
    render("");
    initLightbox(PORTFOLIO, grid);
  }

  /* ---------- Depoimentos ---------- */
  function initTestimonials() {
    const grid = $("#testimonials-list");
    if (!grid) return;
    const render = () => {
      const mine = store.get("aurora_depoimentos", []);
      grid.innerHTML = [...mine, ...TESTIMONIALS].map(testimonialCard).join("");
      observeReveal(grid);
    };
    render();

    const form = $("#testimonial-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const rating = form.querySelector("input[name=rating]:checked");
      const ratingErr = $("#rating-error");
      ratingErr.classList.toggle("d-block", !rating);
      if (!form.checkValidity() || !rating) { form.classList.add("was-validated"); return; }
      const data = {
        name: form.nome.value.trim(),
        event: form.evento.value.trim() || "Cliente Aurora",
        rating: Number(rating.value),
        text: form.mensagem.value.trim(),
        date: new Date().toISOString()
      };
      const mine = store.get("aurora_depoimentos", []);
      mine.unshift(data);
      store.set("aurora_depoimentos", mine);
      form.reset();
      form.classList.remove("was-validated");
      render();
      toast("Obrigado! Seu depoimento foi publicado nesta página.");
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Blog ---------- */
  function openPost(id) {
    const p = POSTS.find((x) => x.id === id);
    const modalEl = $("#postModal");
    if (!p || !modalEl || !window.bootstrap) return;
    $(".modal-hero", modalEl).innerHTML = `<img class="img-cover" src="${img(p.photo, 1400)}" alt="">`;
    $(".modal-title", modalEl).textContent = p.title;
    $(".post-meta", modalEl).innerHTML = `<span><i class="bi bi-bookmark"></i> ${p.category}</span><span><i class="bi bi-calendar3"></i> ${formatDate(p.date)}</span><span><i class="bi bi-clock"></i> ${p.read} min</span>`;
    $(".article-content", modalEl).innerHTML = p.content;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-post]");
    if (!a) return;
    e.preventDefault();
    if ($("#postModal")) openPost(a.dataset.post);
    else location.href = "blog.html?post=" + a.dataset.post;
  });

  function initBlog() {
    const grid = $("#blog-list");
    if (!grid) return;
    const bar = $("#blog-filters");
    const search = $("#blog-search");
    const cats = [...new Set(POSTS.map((p) => p.category))];
    let state = { cat: "", q: "" };

    const feat = $("#post-featured");
    const f = POSTS[0];
    if (feat) feat.innerHTML = `
      <a href="#" class="card-media d-block" data-post="${f.id}" aria-label="Ler: ${f.title}"><img src="${img(f.photo, 1200)}" alt=""></a>
      <div class="body">
        <span class="eyebrow">Em destaque · ${f.category}</span>
        <h2 class="h1 mb-3" style="font-size:clamp(1.8rem,3vw,2.6rem)">${f.title}</h2>
        <p>${f.excerpt}</p>
        <div class="post-meta mb-4"><span><i class="bi bi-calendar3"></i> ${formatDate(f.date)}</span><span><i class="bi bi-clock"></i> ${f.read} min de leitura</span></div>
        <div><a href="#" class="btn btn-gold" data-post="${f.id}">Ler artigo</a></div>
      </div>`;

    $("#blog-categories").innerHTML = cats.map((c) =>
      `<li><a href="#" class="d-flex justify-content-between py-1 text-reset" data-cat-link="${c}">${c} <span class="text-gold">${POSTS.filter((p) => p.category === c).length}</span></a></li>`).join("");
    $("#blog-recent").innerHTML = POSTS.slice(0, 4).map((p) => `
      <a href="#" class="d-flex gap-3 mb-3 text-reset" data-post="${p.id}">
        <span class="frame flex-shrink-0" style="width:72px;height:72px;border-radius:10px"><img class="img-cover" src="${img(p.photo, 200)}" alt="" loading="lazy"></span>
        <span><strong class="d-block" style="font-size:.95rem;line-height:1.3">${p.title}</strong><small class="text-muted-soft">${formatDate(p.date)}</small></span>
      </a>`).join("");

    bar.innerHTML = ["", ...cats].map((c) => `<button type="button" class="filter-btn" data-cat="${c}">${c || "Todos"}</button>`).join("");
    const render = () => {
      $$(".filter-btn", bar).forEach((b) => { const on = b.dataset.cat === state.cat; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
      const q = state.q.trim().toLowerCase();
      const list = POSTS.filter((p) => (!state.cat || p.category === state.cat) && (!q || (p.title + p.excerpt + p.content).toLowerCase().includes(q)));
      grid.innerHTML = list.length ? list.map((p, i) => postCard(p, i).replace("col-md-6 col-lg-4", "col-md-6")).join("") : emptyState("Nenhum artigo encontrado. Tente outra palavra.");
      observeReveal(grid);
    };
    bar.addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; render(); } });
    $("#blog-categories").addEventListener("click", (e) => {
      const a = e.target.closest("[data-cat-link]");
      if (a) { e.preventDefault(); state.cat = a.dataset.catLink; render(); grid.scrollIntoView({ behavior: "smooth" }); }
    });
    let timer;
    search.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { state.q = search.value; render(); }, 220); });
    render();
    if (params.get("post")) openPost(params.get("post"));
  }

  /* ---------- Máscara de telefone ---------- */
  function phoneMask(input) {
    input.addEventListener("input", () => {
      let v = input.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
      else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      else if (v.length) v = v.replace(/^(\d{0,2})/, "($1");
      input.value = v;
    });
  }

  /* ---------- Contato ---------- */
  function initContact() {
    const form = $("#contact-form");
    if (!form) return;
    $$("input[type=tel]", form).forEach(phoneMask);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); $(":invalid", form)?.focus(); return; }
      const msg = Object.fromEntries(new FormData(form).entries());
      msg.protocolo = protocol();
      msg.data = new Date().toISOString();
      const list = store.get("aurora_mensagens", []);
      list.unshift(msg);
      store.set("aurora_mensagens", list);
      form.reset();
      form.classList.remove("was-validated");
      $("#contact-success").innerHTML = `<div class="alert border-0 bg-beige d-flex gap-3 align-items-start mt-4" role="status"><i class="bi bi-envelope-check fs-3 text-gold"></i><div><strong>Mensagem registrada! Protocolo ${msg.protocolo}.</strong><br><span class="text-muted-soft">Ela ficou salva neste navegador. Para resposta imediata, fale com a gente pelo WhatsApp (11) 98765-4321.</span></div></div>`;
    });
  }

  /* ---------- Newsletter ---------- */
  function initNewsletter() {
    $$(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = $("input[type=email]", form);
        if (!input.checkValidity() || !input.value) { input.classList.add("is-invalid"); input.focus(); return; }
        input.classList.remove("is-invalid");
        const list = store.get("aurora_newsletter", []);
        if (!list.includes(input.value)) list.push(input.value);
        store.set("aurora_newsletter", list);
        form.reset();
        toast("Inscrição confirmada! Você vai receber nossas dicas.");
      });
    });
  }

  /* ---------- Orçamento (formulário em etapas) ---------- */
  function initQuote() {
    const form = $("#quote-form");
    if (!form) return;
    const steps = $$(".form-step", form);
    const dots = $$(".stepper .step");
    const prev = $("#q-prev"), next = $("#q-next"), submit = $("#q-submit");
    let current = 0;

    // Opções de serviço geradas a partir dos dados
    $("#q-services").innerHTML = SERVICES.map((s) => `
      <div class="col-6 col-md-4">
        <label class="option-tile"><input type="checkbox" name="servicos" value="${s.id}">
          <span class="tile"><i class="bi ${s.icon}"></i><span>${s.title}</span></span></label>
      </div>`).join("");
    $$("input[type=tel]", form).forEach(phoneMask);

    // Data mínima = hoje
    const dateInput = form.data;
    if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

    // Pré-preenchimento vindo de links (serviço, pacote, fornecedor)
    const draft = store.get("aurora_orcamento_rascunho", null);
    if (draft) fillForm(draft);
    if (params.get("servico")) {
      const cb = form.querySelector(`input[name=servicos][value="${params.get("servico")}"]`);
      if (cb) cb.checked = true;
    }
    const extras = [];
    if (params.get("pacote")) extras.push(`Pacote de interesse: ${params.get("pacote")}`);
    if (params.get("fornecedor")) extras.push(`Fornecedor de interesse: ${params.get("fornecedor")}`);
    if (extras.length && !form.mensagem.value.includes(extras[0])) form.mensagem.value = (extras.join("\n") + "\n" + form.mensagem.value).trim();

    function fillForm(data) {
      Object.entries(data).forEach(([k, v]) => {
        const els = form.querySelectorAll(`[name="${k}"]`);
        els.forEach((el) => {
          if (el.type === "checkbox") el.checked = Array.isArray(v) ? v.includes(el.value) : false;
          else if (el.type === "radio") el.checked = el.value === v;
          else el.value = v;
        });
      });
    }
    function readForm() {
      const fd = new FormData(form);
      const data = {};
      for (const [k, v] of fd.entries()) {
        if (k === "servicos") (data.servicos = data.servicos || []).push(v);
        else data[k] = v;
      }
      data.servicos = data.servicos || [];
      return data;
    }

    // Estimativa de investimento (apenas referência)
    const guests = form.convidados, guestsOut = $("#q-guests-out");
    function estimate() {
      const d = readForm();
      guestsOut.textContent = guests.value;
      const n = Number(guests.value);
      const perGuest = { classico: 420, rustico: 340, praia: 480, moderno: 400, intimista: 520 }[d.estilo] || 400;
      const typeFactor = { casamento: 1, "mini-wedding": 1.15, "15-anos": .8, corporativo: .9, aniversario: .7, bodas: .75 }[d.tipo] || 1;
      const serviceAdd = { "assessoria-completa": 11900, cerimonial: 4800, decoracao: 18000, "mini-wedding": 8900, "destination-wedding": 14900, "eventos-sociais": 9900, corporativos: 7500, gastronomia: 1900 };
      const add = d.servicos.reduce((sum, s) => sum + (serviceAdd[s] || 0), 0);
      const base = n * perGuest * typeFactor + add;
      const low = Math.round(base * .85 / 1000) * 1000, high = Math.round(base * 1.2 / 1000) * 1000;
      $("#q-estimate").textContent = `${money(low)} – ${money(high)}`;
      $("#q-estimate-per").textContent = `≈ ${money(Math.round(base / n))} por convidado`;
      $("#q-summary").innerHTML = [
        d.tipo ? `<li>Evento: ${form.querySelector(`[name=tipo][value="${d.tipo}"]`)?.dataset.label || d.tipo}</li>` : "",
        `<li>${n} convidados</li>`,
        d.data ? `<li>Data: ${formatDate(d.data)}</li>` : "",
        d.cidade ? `<li>Local: ${escapeHTML(d.cidade)}</li>` : "",
        d.servicos.length ? `<li>${d.servicos.length} serviço(s) selecionado(s)</li>` : ""
      ].join("");
    }

    const saveDraft = () => { const d = readForm(); delete d.aceite; store.set("aurora_orcamento_rascunho", d); };
    form.addEventListener("input", () => { estimate(); saveDraft(); });
    form.addEventListener("change", () => { estimate(); saveDraft(); });

    function validateStep(i) {
      const step = steps[i];
      let ok = true;
      $$("input, select, textarea", step).forEach((el) => { if (!el.checkValidity()) ok = false; });
      // Etapa 1: tipo de evento obrigatório
      const radioGroup = $("[data-required-group]", step);
      if (radioGroup) {
        const checked = radioGroup.querySelector("input:checked");
        $(".group-error", step).classList.toggle("d-block", !checked);
        if (!checked) ok = false;
      }
      step.classList.toggle("was-validated", !ok);
      if (!ok) { const first = $(":invalid", step); first && first.focus(); }
      return ok;
    }

    function go(i) {
      current = i;
      steps.forEach((s, k) => s.classList.toggle("active", k === i));
      dots.forEach((d, k) => { d.classList.toggle("active", k === i); d.classList.toggle("done", k < i); });
      prev.classList.toggle("invisible", i === 0);
      next.classList.toggle("d-none", i === steps.length - 1);
      submit.classList.toggle("d-none", i !== steps.length - 1);
      const top = form.getBoundingClientRect().top + window.scrollY - 120;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
    }
    next.addEventListener("click", () => { if (validateStep(current)) go(current + 1); });
    prev.addEventListener("click", () => go(current - 1));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateStep(current)) return;
      const d = readForm();
      d.protocolo = protocol();
      d.criadoEm = new Date().toISOString();
      d.estimativa = $("#q-estimate").textContent;
      const list = store.get("aurora_orcamentos", []);
      list.unshift(d);
      store.set("aurora_orcamentos", list);
      store.remove("aurora_orcamento_rascunho");
      $("#q-protocol").textContent = d.protocolo;
      $("#q-name").textContent = d.nome.split(" ")[0];
      bootstrap.Modal.getOrCreateInstance($("#quoteSuccess")).show();
      form.reset();
      steps.forEach((s) => s.classList.remove("was-validated"));
      go(0);
      estimate();
      renderRequests();
    });

    $("#q-clear").addEventListener("click", () => {
      form.reset();
      store.remove("aurora_orcamento_rascunho");
      steps.forEach((s) => s.classList.remove("was-validated"));
      go(0); estimate();
      toast("Formulário limpo.", "info");
    });

    function renderRequests() {
      const box = $("#my-requests");
      const list = store.get("aurora_orcamentos", []);
      $("#my-requests-wrap").classList.toggle("d-none", !list.length);
      box.innerHTML = list.map((r, i) => `
        <div class="sidebar-box mb-3 d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <div>
            <strong class="d-block">${escapeHTML(r.protocolo)} · ${escapeHTML(r.nome)}</strong>
            <small class="text-muted-soft">${new Date(r.criadoEm).toLocaleDateString("pt-BR")} · ${r.convidados} convidados · estimativa ${escapeHTML(r.estimativa)}</small>
          </div>
          <button type="button" class="btn btn-sm btn-outline-gold" data-del="${i}"><i class="bi bi-trash3"></i> Excluir</button>
        </div>`).join("");
    }
    $("#my-requests").addEventListener("click", (e) => {
      const b = e.target.closest("[data-del]");
      if (!b) return;
      const list = store.get("aurora_orcamentos", []);
      list.splice(Number(b.dataset.del), 1);
      store.set("aurora_orcamentos", list);
      renderRequests();
      toast("Solicitação excluída.", "info");
    });

    go(0);
    estimate();
    renderRequests();
  }

  /* ---------- Inicialização ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initChrome();
    initHome();
    initServices();
    initServiceDetail();
    initSuppliers();
    initPortfolio();
    initTestimonials();
    initBlog();
    initContact();
    initNewsletter();
    initQuote();
    loadBackgrounds();
    observeReveal();
    initCounters();
  });
  window.addEventListener("load", () => {
    const pre = $(".preloader");
    if (pre) { pre.classList.add("hide"); setTimeout(() => pre.remove(), 700); }
  });
  // Garante que o preloader nunca fique preso
  setTimeout(() => { const pre = document.querySelector(".preloader"); if (pre) pre.classList.add("hide"); }, 3500);
})();
