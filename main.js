/**
 * TAIGA TSUKADA — Site JavaScript
 * No jQuery / No Bootstrap — pure vanilla JS
 */

/* ── Nav Data ───────────────────────────── */
const NAV = {
  jp: [  // `ja`: small Japanese label shown under the English one (Japanese pages only)
    { label: "Home",     href: "index.html",    ja: "ホーム" },
    { label: "About",    href: "about.html",    ja: "経歴" },
    { label: "Research", href: "research.html", ja: "研究" },
    { label: "Works",    href: "works.html",    ja: "業績" },
  ],
  en: [
    { label: "Home",     href: "index_en.html" },
    { label: "About",    href: "about_en.html" },
    { label: "Research", href: "research_en.html" },
    { label: "Works",    href: "works_en.html" },
  ],
};

function getActivePage() {
  return location.pathname.split("/").pop() || "index.html";
}

function buildNav(activePage, lang) {
  const items        = NAV[lang] || NAV.jp;
  const otherLang    = lang === "jp" ? "en" : "jp";
  const otherLabel   = lang === "jp" ? "EN" : "日本語";
  const currentIdx   = items.findIndex(i => i.href === activePage);
  const otherItems   = NAV[otherLang];
  const otherHref    = (currentIdx >= 0 && otherItems[currentIdx])
    ? otherItems[currentIdx].href : otherItems[0].href;

  const isJa = lang === "jp";   // Japanese text in the header only on Japanese pages
  const liItems = items.map(item => {
    const active = item.href === activePage;
    const ja = isJa && item.ja ? `<span class="nav-ja">${item.ja}</span>` : "";
    return `<li><a href="${item.href}"${active ? ' class="active"' : ''}>${item.label}${ja}</a></li>`;
  }).join("\n");
  const logoJa = isJa ? `<span class="nav-logo-ja">塚田 大河</span>` : "";

  return `
<nav class="site-nav" role="navigation" aria-label="メインナビゲーション">
  <div class="nav-inner">
    <a class="nav-logo" href="${items[0].href}">TAIGA TSUKADA${logoJa}</a>
    <button class="nav-toggle" aria-label="メニューを開く" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links${isJa ? " nav-links--ja" : ""}" id="nav-links">
      ${liItems}
      <li class="lang-switcher">
        <a href="${otherHref}" aria-label="Switch language">${otherLabel}</a>
      </li>
    </ul>
  </div>
</nav>`;
}

function buildFooter(lang) {
  const isJa = lang === "jp";
  const year = new Date().getFullYear();
  // Last updated = the page file's modification time (GitHub Pages sends Last-Modified)
  const d = new Date(document.lastModified);
  const pad = n => String(n).padStart(2, "0");
  const updated = isNaN(d) ? "" : `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
  const updatedLabel = updated ? (isJa ? `最終更新 ${updated}` : `Last updated ${updated}`) : "";
  return `
<footer class="site-footer">
  <div class="container">
    <ul class="footer-profiles">
      <li><a href="https://orcid.org/0000-0003-2036-308X" target="_blank" rel="noopener" aria-label="ORCID" title="ORCID"><i class="fab fa-orcid"></i></a></li>
      <li><a href="https://scholar.google.com/citations?user=L_Qqt3kAAAAJ" target="_blank" rel="noopener" aria-label="Google Scholar" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a></li>
      <li><a href="https://github.com/tsukada-cs" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><i class="fab fa-github"></i></a></li>
    </ul>
    <ul class="footer-links">
      <li><a href="https://rammb2.cira.colostate.edu/research/tropical-cyclones/" target="_blank" rel="noopener">Tropical Cyclones Group</a></li>
      <li><a href="https://www.cira.colostate.edu/" target="_blank" rel="noopener">CIRA</a></li>
      <li><a href="https://www.colostate.edu/" target="_blank" rel="noopener">CSU</a></li>
    </ul>
    <p class="footer-meta">© ${year} Taiga Tsukada${updatedLabel ? `<span class="footer-sep">·</span>${updatedLabel}` : ""}</p>
  </div>
</footer>`;
}

/* ── Public API ──────────────────────────── */
function header(pageTitle, lang = "jp") {
  const activePage = getActivePage();
  const navHtml    = buildNav(activePage, lang);

  const main = document.querySelector("main");
  if (main) {
    main.insertAdjacentHTML("beforebegin", navHtml);
  } else {
    document.body.insertAdjacentHTML("afterbegin", navHtml);
  }

  if (pageTitle) document.title = `TAIGA TSUKADA | ${pageTitle}`;

  // Hamburger toggle — set up after DOM insertion
  function initHamburger() {
    const toggle = document.querySelector(".nav-toggle");
    const links  = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.addEventListener("click", e => {
      if (links.classList.contains("open") &&
          !toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
  initHamburger();

  // Transparent over the hero photo; becomes the ink-paper bar once the page is scrolled
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const update = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    update();   // also right away (e.g. after reloading mid-page)
    window.addEventListener("scroll", update, { passive: true });
  }
}

function footer(lang = "jp") {
  const footerHtml = buildFooter(lang);
  const main = document.querySelector("main");
  if (main) {
    main.insertAdjacentHTML("afterend", footerHtml);
  } else {
    document.body.insertAdjacentHTML("beforeend", footerHtml);
  }
}

/* ── IntersectionObserver Scroll Reveal ──── */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ── CSS-only Hero Crossfade Slideshow ───── */
function initHeroSlides() {
  const slides = document.querySelectorAll(".hero-bg-slides .slide");
  if (slides.length < 2) return;
  // Slides 2.. (data-bg) are fetched only after the page itself has finished loading
  const loadRest = () => slides.forEach(sl => {
    if (sl.dataset.bg) sl.style.backgroundImage = `url('${sl.dataset.bg}')`;
  });
  if (document.readyState === "complete") loadRest();
  else window.addEventListener("load", loadRest, { once: true });
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove("active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }, 5000);
}

/* ── 筆 strokes sized to the text above them ──
   .section-rule gets the width of the preceding .section-title text, and the
   hero underline the width of the hero title (via --hero-brush-w).
   Re-measured once web fonts have loaded and when the window is resized. */
function textWidth(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  return Math.round(range.getBoundingClientRect().width);
}
function fitBrushStrokes() {
  document.querySelectorAll(".section-rule").forEach(rule => {
    const title = rule.previousElementSibling;
    if (title && title.classList.contains("section-title")) {
      rule.style.width = textWidth(title) + "px";
    }
  });
  document.querySelectorAll(".hero-content").forEach(hero => {
    const title = hero.querySelector(".hero-page-title, .hero-name");
    if (title) hero.style.setProperty("--hero-brush-w", textWidth(title) + "px");
  });
}

/* ── Init ────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  fitBrushStrokes();
  initReveal();
  initHeroSlides();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBrushStrokes);
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitBrushStrokes, 150);
  }, { passive: true });
});
