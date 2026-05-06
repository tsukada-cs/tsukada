/**
 * TAIGA TSUKADA — Site JavaScript
 * No jQuery / No Bootstrap — pure vanilla JS
 */

/* ── Nav Data ───────────────────────────── */
const NAV = {
  jp: [
    { label: "Home",     href: "index.html" },
    { label: "About",    href: "about.html" },
    { label: "Research", href: "research.html" },
    { label: "Works",    href: "works.html" },
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

  const liItems = items.map(item => {
    const active = item.href === activePage;
    return `<li><a href="${item.href}"${active ? ' class="active"' : ''}>${item.label}</a></li>`;
  }).join("\n");

  return `
<nav class="site-nav" role="navigation" aria-label="メインナビゲーション">
  <div class="nav-inner">
    <a class="nav-logo" href="${items[0].href}">TAIGA TSUKADA</a>
    <button class="nav-toggle" aria-label="メニューを開く" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="nav-links">
      ${liItems}
      <li class="lang-switcher">
        <a href="${otherHref}" aria-label="Switch language">${otherLabel}</a>
      </li>
    </ul>
  </div>
</nav>`;
}

function buildFooter(lang) {
  const year = new Date().getFullYear();
  const copy = lang === "jp"
    ? `© ${year} Taiga Tsukada`
    : `© ${year} Taiga Tsukada`;
  return `
<footer class="site-footer">
  <div class="container">
    <ul class="footer-links">
      <li><a href="https://rammb2.cira.colostate.edu/research/tropical-cyclones/" target="_blank" rel="noopener">Tropical Cyclones Group</a></li>
      <li><a href="https://www.cira.colostate.edu/" target="_blank" rel="noopener">CIRA</a></li>
      <li><a href="https://www.colostate.edu/" target="_blank" rel="noopener">CSU</a></li>
    </ul>
    <p>${copy}</p>
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

  // Scroll-blur on nav
  const nav = document.querySelector(".site-nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 30);
    }, { passive: true });
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
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove("active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }, 5000);
}

/* ── Init ────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initHeroSlides();
});
