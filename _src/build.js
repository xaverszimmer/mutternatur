// Static site generator for the bilingual Mutter Natur website.
//   node _src/build.js
// Writes plain HTML files into the site root (German) and /en (English),
// plus sitemap.xml and _redirects. Texts live in _src/content.js.
const fs = require('fs');
const path = require('path');
const C = require('./content');
const { todo, SETTINGS: S, ROUTES, UI, FILMS, INSTA, FAQ, SERVICES, SERVICE_ORDER } = C;

const ROOT = path.resolve(__dirname, '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-sizes.json'), 'utf8'));
const TODAY = new Date().toISOString().slice(0, 10);
const LANGS = ['de', 'en'];
const written = [];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripTags = (s) => String(s).replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const url = (key, lang) => ROUTES[key][lang] || ROUTES[key].de;
const L = (lang, de, en) => (lang === 'de' ? de : en);
const t = (obj, lang) => (obj && typeof obj === 'object' && 'de' in obj ? obj[lang] : obj);

function img(file, alt, { cls = '', eager = false, attrs = '' } = {}) {
  const size = SIZES[file];
  if (!size) throw new Error(`Missing size for ${file} – add it to _src/image-sizes.json`);
  const load = eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img src="/assets/img/${file}" alt="${esc(alt)}" width="${size[0]}" height="${size[1]}" ${load}${cls ? ` class="${cls}"` : ''}${attrs ? ' ' + attrs : ''}>`;
}

const PLAY_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="#fff" stroke="none"/></svg>';

// Click-to-load YouTube player
function ytPlayer(key, lang) {
  const f = FILMS[key];
  const title = f.fullTitle ? `${f.title[lang]} – ${f.fullTitle}` : f.title[lang];
  return `<div class="yt">
  <div class="yt-frame${f.logo ? ' is-logo' : ''}">
    <button type="button" class="yt-facade" data-yt="${f.yt}" data-title="${esc(title)}" aria-label="${esc(UI[lang].play + ': ' + title)}">
      ${img(f.thumb, f.alt[lang])}
      <span class="yt-play">${PLAY_SVG}</span>
    </button>
  </div>
  <p class="yt-note">${UI[lang].ytNote} <a href="${url('datenschutz', 'de')}#videos">${UI[lang].privacy}</a></p>
</div>`;
}

function videoCard(key, lang, { h = 'h3', link } = {}) {
  const f = FILMS[key];
  return `<article class="video-card" data-reveal>
  ${ytPlayer(key, lang)}
  <${h}>${f.title[lang]}</${h}>
  <p>${f.desc[lang]}</p>
  <span class="card-meta">${f.meta[lang]}</span>${link ? `\n  <p><a class="text-link" href="${link.href}">${link.text}</a></p>` : ''}
</article>`;
}

function instaCard(key, lang) {
  const it = INSTA[key];
  return `<div class="card" data-reveal>
  <button type="button" class="ig-facade" data-ig="${it.url}" data-title="${esc(it.title)}" aria-label="${esc(it.title + ' – Instagram')}">
    <div class="card-media">${img(it.img, it.alt[lang])}</div>
  </button>
  <h3>${it.title}</h3>
  <p class="card-meta">${it.meta[lang]}</p>
</div>`;
}

function serviceCard(sk, lang) {
  const s = SERVICES[sk];
  const price = s.from ? `${UI[lang].from} ${lang === 'de' ? s.from.toLocaleString('de-DE') + ' €' : '€' + s.from.toLocaleString('en-US')}` : UI[lang].individual;
  return `<a class="service-card${s.featured ? ' is-featured' : ''}" href="${url(sk, lang)}" data-reveal>
  ${s.featured ? `<span class="badge">${UI[lang].recommended}</span>` : ''}
  <div class="card-media">${img(s.img, s.alt[lang])}</div>
  <div class="service-card-body">
    <h3>${s.title[lang]}</h3>
    <p>${s.short[lang]}</p>
    <span class="service-price">${price}</span>
    <span class="service-more">${UI[lang].more} →</span>
  </div>
</a>`;
}

function faqList(keys, lang) {
  return `<div class="faq-list">
${keys.map((k) => `  <details class="faq-item">
    <summary>${FAQ[k].q[lang]}</summary>
    <p>${FAQ[k].a[lang]}</p>
  </details>`).join('\n')}
</div>`;
}

function faqLd(keys, lang) {
  // Only answered questions go into structured data
  const done = keys.filter((k) => !/TODO/.test(stripTags(FAQ[k].a[lang])) && !/class="todo"/.test(FAQ[k].a[lang]));
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: done.map((k) => ({ '@type': 'Question', name: FAQ[k].q[lang], acceptedAnswer: { '@type': 'Answer', text: stripTags(FAQ[k].a[lang]) } })),
  };
}

function videoLd(key, lang) {
  const f = FILMS[key];
  return {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: f.fullTitle ? `${f.title[lang]} – ${f.fullTitle}` : f.title[lang],
    description: stripTags(f.desc[lang]) || f.title[lang],
    thumbnailUrl: `${S.site}/assets/img/${f.thumb}`, uploadDate: f.date, duration: f.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${f.yt}`, contentUrl: `https://www.youtube.com/watch?v=${f.yt}`,
    inLanguage: 'de', creator: { '@id': `${S.site}/#organization` },
  };
}

const ORG_LD = () => ({
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${S.site}/#organization`,
  name: 'Mutter Natur', url: `${S.site}/`,
  logo: `${S.site}/assets/img/logo-mutter-natur.png`,
  image: `${S.site}/assets/img/og/naturlandschaft-naturfilm-produktion-bayern.jpg`,
  description: 'Imagefilme, Dokumentarfilme, Fotografie und Social-Media-Content für Unternehmen, Tourismus und NGOs – aus Bayern, Raum München/Freising.',
  founder: { '@type': 'Person', name: 'Xaver Zimmermann' },
  email: S.email, priceRange: '700 €–7.000 €',
  address: { '@type': 'PostalAddress', streetAddress: 'Goldshausen 6', postalCode: '85417', addressLocality: 'Marzling', addressRegion: 'Bayern', addressCountry: 'DE' },
  areaServed: [{ '@type': 'State', name: 'Bayern' }, { '@type': 'Country', name: 'Deutschland' }, { '@type': 'Country', name: 'Österreich' }, { '@type': 'Country', name: 'Schweiz' }],
  knowsLanguage: ['de', 'en'],
  sameAs: [S.instagram, S.youtube].concat(S.googleBusinessUrl ? [S.googleBusinessUrl] : []),
});

function serviceLd(sk, lang) {
  const s = SERVICES[sk];
  const ld = {
    '@context': 'https://schema.org', '@type': 'Service', name: s.title[lang], description: s.short[lang],
    serviceType: s.title.de, provider: { '@id': `${S.site}/#organization` },
    areaServed: ['Bayern', 'Deutschland', 'Österreich', 'Schweiz'], url: S.site + url(sk, lang),
  };
  if (s.priceMin) ld.offers = { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: s.priceMin, maxPrice: s.priceMax, priceCurrency: 'EUR' } };
  return ld;
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
function header(lang, key, section) {
  const u = UI[lang];
  const other = lang === 'de' ? 'en' : 'de';
  const switchHref = ROUTES[key] && ROUTES[key][other] ? ROUTES[key][other] : url('home', other);
  const nav = [['services', 'services'], ['work', 'work'], ['about', 'about'], ['contact', 'contact']]
    .map(([k, r]) => `      <a href="${url(r, lang)}"${section === k ? ' class="is-active" aria-current="page"' : ''}>${u.nav[k]}</a>`).join('\n');
  return `<header class="site-header">
  <div class="container nav-inner">
    <a href="${url('home', lang)}" class="logo">Mutter Natur</a>
    <nav class="nav-links" id="nav-links">
${nav}
      <a href="${url('contact', lang)}#projektanfrage" class="btn btn-primary nav-cta">${u.cta}</a>
      <a href="${switchHref}" class="lang-switch" hreflang="${other}" lang="${other}" aria-label="${u.langSwitchLabel}">${u.langSwitch}</a>
    </nav>
    <button class="nav-toggle" aria-label="${u.menu}" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
  </div>
</header>`;
}

function footer(lang) {
  const u = UI[lang];
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top v2">
      <div class="footer-brand">
        <a href="${url('home', lang)}" class="logo">Mutter Natur</a>
        <p>${u.footerText}</p>
      </div>
      <div class="footer-col">
        <h4>${u.footerServices}</h4>
        <ul>
${SERVICE_ORDER.map((k) => `          <li><a href="${url(k, lang)}">${SERVICES[k].title[lang]}</a></li>`).join('\n')}
        </ul>
      </div>
      <div class="footer-col">
        <h4>${u.footerPages}</h4>
        <ul>
          <li><a href="${url('work', lang)}">${u.nav.work}</a></li>
          <li><a href="${url('work', lang)}#projekte">${u.footerCases}</a></li>
          <li><a href="${url('about', lang)}">${u.nav.about}</a></li>
          <li><a href="${url('services', lang)}">${L(lang, 'Preise', 'Pricing')}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>${u.footerContact}</h4>
        <ul>
          <li><a href="mailto:${S.email}">${S.email}</a></li>
          <li><a href="${url('contact', lang)}#projektanfrage">${u.cta}</a></li>
          <li><a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${S.youtube}" target="_blank" rel="noopener">YouTube</a></li>
${S.googleBusinessUrl ? `          <li><a href="${S.googleBusinessUrl}" target="_blank" rel="noopener">${u.googleReviews}</a></li>` : '          <!-- TODO: Google-Unternehmensprofil in _src/content.js (SETTINGS.googleBusinessUrl) eintragen – dann erscheint hier „Bewertungen auf Google“ -->'}
        </ul>
      </div>
    </div>
    <div class="footer-wordmark" aria-hidden="true">Mutter Natur</div>
    <div class="footer-bottom">
      <span>${u.copyright}</span>
      <div class="footer-legal">
        <a href="${url('impressum', 'de')}">${u.legal[0]}</a>
        <a href="${url('datenschutz', 'de')}">${u.legal[1]}</a>
      </div>
    </div>
  </div>
</footer>`;
}

const MODAL = (lang) => `<div class="video-modal" id="media-modal" hidden>
  <div class="video-modal-backdrop" data-modal-close></div>
  <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Instagram">
    <button type="button" class="video-modal-close" data-modal-close aria-label="${UI[lang].closeLabel}">&times;</button>
    <div class="video-modal-frame is-portrait"></div>
    <p class="yt-note">${UI[lang].igNote} <a href="${url('datenschutz', 'de')}#videos">${UI[lang].privacy}</a></p>
  </div>
</div>`;

const MOBILE_CTA = (lang) => `<div class="mobile-cta">
  <a href="${url('contact', lang)}#projektanfrage" class="btn btn-primary">${UI[lang].cta}</a>
  <a href="mailto:${S.email}" class="btn btn-ghost mobile-cta-mail" aria-label="${UI[lang].mailLabel}">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg>
  </a>
</div>`;

function layout({ lang, key, section, title, desc, body, ld = [], og = 'naturlandschaft-naturfilm-produktion-bayern', noindex = false, grain = false, file }) {
  const pathname = file ? null : url(key, lang);
  const alt = ROUTES[key] || {};
  const hreflang = !file && alt.de && alt.en
    ? `<link rel="alternate" hreflang="de" href="${S.site}${alt.de}">\n<link rel="alternate" hreflang="en" href="${S.site}${alt.en}">\n<link rel="alternate" hreflang="x-default" href="${S.site}${alt.de}">\n`
    : '';
  const ldList = (Array.isArray(ld) ? ld : [ld]).filter(Boolean);
  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}${pathname ? `<link rel="canonical" href="${S.site}${pathname}">\n` : ''}${hreflang}<meta property="og:type" content="website">
<meta property="og:site_name" content="Mutter Natur">
<meta property="og:locale" content="${lang === 'de' ? 'de_DE' : 'en_US'}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${S.site}/assets/img/og/${og}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
${pathname ? `<meta property="og:url" content="${S.site}${pathname}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/css/style.css">
${ldList.map((d) => `<script type="application/ld+json">\n${JSON.stringify(d)}\n</script>`).join('\n')}
</head>
<body>
${grain ? '<div class="grain-overlay" aria-hidden="true"></div>\n' : ''}${header(lang, key, section)}

<main>
${body.trim()}
</main>

${MODAL(lang)}

${footer(lang)}
${MOBILE_CTA(lang)}
<script src="/assets/js/main.js"></script>
</body>
</html>
`;
  const out = file || (pathname.endsWith('/') ? pathname + 'index.html' : pathname + '.html');
  const abs = path.join(ROOT, out);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html);
  written.push({ out, pathname, key, lang, noindex });
}

// Reusable blocks ------------------------------------------------------------
const ctaBanner = (lang, h2, p, imgFile = 'naturlandschaft-sonnenuntergang-cta.avif', imgAlt) => `<section class="cta-banner">
  <div class="bg-img">${img(imgFile, imgAlt || L(lang, 'Landschaft im Abendlicht', 'Landscape in the evening light'))}</div>
  <div class="container">
    <div class="section-head center" data-reveal>
      <h2>${h2}</h2>
      <p class="lede" style="margin-inline:auto;margin-top:1rem">${p}</p>
      <div class="hero-actions" style="justify-content:center;margin-top:1.5rem">
        <a href="${url('contact', lang)}#projektanfrage" class="btn btn-primary">${UI[lang].cta}</a>
        <a href="mailto:${S.email}" class="btn btn-ghost">${S.email}</a>
      </div>
    </div>
  </div>
</section>`;

const steps = (lang) => `<div class="steps">
  <div class="step">
    <h3><span class="step-num">1</span> ${L(lang, 'Anfrage', 'Inquiry')}</h3>
    <p>${L(lang, 'Sie schreiben uns kurz, worum es geht – per Formular oder E-Mail. Das dauert zwei Minuten.', 'You tell us briefly what it is about – via the form or by email. It takes two minutes.')}</p>
  </div>
  <div class="step">
    <h3><span class="step-num">2</span> ${L(lang, 'Gespräch', 'Conversation')}</h3>
    <p>${L(lang, 'Innerhalb von 48 Stunden melden wir uns und stellen ein paar gezielte Fragen, um Ihr Projekt wirklich zu verstehen.', 'We get back to you within 48 hours and ask a few targeted questions to fully understand your project.')}</p>
  </div>
  <div class="step">
    <h3><span class="step-num">3</span> ${L(lang, 'Angebot', 'Proposal')}</h3>
    <p>${L(lang, 'Sie erhalten ein individuelles Angebot mit Konzept, Umfang und Preis. Passt alles, legen wir los.', 'You receive a personal proposal with concept, scope and price. If everything fits, we get started.')}</p>
  </div>
</div>`;

const priceTerms = (lang) => `<div class="price-terms">
${C.PRICE_TERMS[lang].map((p) => `  <p>${p}</p>`).join('\n')}
</div>`;

function awardsBlock(lang) {
  return `<div class="award-list">
${C.AWARDS.map((a) => `  <div class="award">
    <div class="laurel" aria-hidden="true"><!-- TODO: Lorbeer-Grafik des Festivals einsetzen -->${L(lang, 'Lorbeer', 'Laurel')}</div>
    <div>
      <strong>${a.festival}</strong>
      <span>${a.film}</span>
      <span>${todo(L(lang, 'Gewinner oder Offizielle Auswahl', 'Winner or Official Selection'))} · ${todo(L(lang, 'Jahr', 'year'))}</span>
    </div>
  </div>`).join('\n')}
</div>`;
}

function testimonials(lang) {
  const list = C.TESTIMONIALS;
  const cards = list.length
    ? list.map((x) => `  <figure class="testimonial-card">
    <blockquote class="testimonial-quote">„${x.quote[lang]}“</blockquote>
    <figcaption class="testimonial-meta">${x.img ? img(x.img, x.org, { attrs: 'style="width:3rem;height:3rem;object-fit:cover"' }) : ''}<strong>${x.name}</strong><br>${x.role[lang]}, ${x.org}</figcaption>
  </figure>`).join('\n')
    : `  <figure class="testimonial-card">
    <blockquote class="testimonial-quote">${todo(L(lang, 'Zitat', 'quote'))}</blockquote>
    <figcaption class="testimonial-meta">${todo(L(lang, 'Name, Funktion, Organisation, optional Foto/Logo', 'name, role, organization, optional photo/logo'))}</figcaption>
  </figure>`;
  return `<!-- Kundenstimmen: unsichtbar, bis in _src/content.js (TESTIMONIALS) echte Zitate stehen. -->
<section class="section section-border-top"${list.length ? '' : ' hidden'} aria-labelledby="stimmen">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">${L(lang, 'Stimmen', 'Testimonials')}</span>
      <h2 id="stimmen">${L(lang, 'Was unsere Partner sagen', 'What our partners say')}</h2>
    </div>
    <div class="testimonial-grid">
${cards}
    </div>
  </div>
</section>`;
}

const proofBar = (lang) => `<section class="proof" aria-label="${L(lang, 'Referenzen', 'References')}">
  <div class="container proof-grid" data-reveal>
    <div>
      <span class="eyebrow">${L(lang, 'Unsere Filme auf Festivals', 'Our films at festivals')}</span>
      <!-- TODO: Status je Festival bestätigen (Gewinner / Offizielle Auswahl) – Details auf der Über-uns-Seite -->
      <div class="festival-list"><span>DOK.fest München</span><span>INKAFEST</span><span>Filmfest Schleswig-Holstein</span></div>
    </div>
    <div>
      <span class="eyebrow">${L(lang, 'Partner & Auftraggeber', 'Partners & clients')}</span>
      <div class="logo-row">
        <a class="logo-tile" href="${url('caseDonau', lang)}">${img('donaumoos-zweckverband-logo.webp', 'Donaumoos Zweckverband')}</a>
        <a class="logo-tile" href="${url('caseTeufel', lang)}">${img('teufelshoehle-pottenstein-logo.webp', 'Teufelshöhle Pottenstein')}</a>
        <!-- TODO: weitere Kundenlogos (z. B. Bergwaldprojekt, Ozeankind, Moorflut) – nur mit Freigabe der Kunden einsetzen -->
      </div>
    </div>
  </div>
</section>`;

module.exports = { esc, stripTags, url, L, t, img, ytPlayer, videoCard, instaCard, serviceCard, faqList, faqLd, videoLd, ORG_LD, serviceLd, layout, ctaBanner, steps, priceTerms, awardsBlock, testimonials, proofBar, written, ROOT, TODAY, LANGS };

// Pages are defined in pages.js
if (require.main === module) {
  require('./pages');
  // Sitemap with language alternates (indexable pages only)
  const pairs = {};
  for (const w of written) if (w.pathname && !w.noindex) (pairs[w.key] = pairs[w.key] || {})[w.lang] = w.pathname;
  const rows = [];
  for (const [key, p] of Object.entries(pairs)) {
    for (const lang of Object.keys(p)) {
      const alts = p.de && p.en ? `\n    <xhtml:link rel="alternate" hreflang="de" href="${S.site}${p.de}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${S.site}${p.en}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${S.site}${p.de}"/>` : '';
      const prio = key === 'home' ? '1.0' : ['impressum', 'datenschutz'].includes(key) ? '0.2' : SERVICES[key] || key === 'services' || key === 'contact' ? '0.9' : '0.7';
      rows.push(`  <url>\n    <loc>${S.site}${p[lang]}</loc>${alts}\n    <lastmod>${TODAY}</lastmod>\n    <priority>${prio}</priority>\n  </url>`);
    }
  }
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows.join('\n')}\n</urlset>\n`);
  // Redirects from the old English-only URLs
  const red = C.REDIRECTS.flatMap(([from, to]) => [`${from} ${to} 301`, `${from}.html ${to} 301`]);
  fs.writeFileSync(path.join(ROOT, '_redirects'), `# Old URLs of the English-only site -> new German pages (generated by _src/build.js)\n${red.join('\n')}\n`);
  console.log(`Built ${written.length} pages, ${rows.length} sitemap entries.`);
}
