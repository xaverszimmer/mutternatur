// Builds the live site (mutternaturstory.com): English under /, German under /de/.
//
// Page content lives in _live/main/<lang>/<key>.html (only what goes inside <main>).
// This script wraps it with the shared <head>, header, footer and scripts, writes
// the deployable HTML files, sitemap.xml, robots.txt and _redirects, and checks
// internal links, titles and descriptions.
//
// Run: node _live/build.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://mutternaturstory.com';
const EMAIL = 'xaverszimmer@web.de';
const TODAY = new Date().toISOString().slice(0, 10);
const IG = 'https://www.instagram.com/xaverszimmer';
const IG_MND = 'https://www.instagram.com/mutternatur_d';
const YT = 'https://www.youtube.com/@MutterNatur_d';
const OG_DEFAULT = '/assets/img/og/naturlandschaft-naturfilm-produktion-bayern.jpg';
const OG_CHAMOIS = '/assets/img/og/gaemse-alpen-waechter-der-berge.jpg';

// style: 'live' = the original site design (style.css), 'v2' = Entwurf-v2 design (home.css)
// Pages with both languages have en + de; German-only pages have just de.
const PAGES = [
  { key: 'home', style: 'v2', og: OG_DEFAULT,
    en: { url: '/', title: 'Young Nature & Environmental Film Production | Mutter Natur', desc: 'Young film production company from Munich for nature films, environmental documentaries and image films – across Germany, Austria and Switzerland.' },
    de: { url: '/de/', title: 'Junge Naturfilm- & Umweltfilm-Produktion | Mutter Natur', desc: 'Junge Filmproduktion aus München für Naturfilme, Umwelt-Dokumentationen und Imagefilme – in ganz Deutschland, Österreich und der Schweiz.' } },
  { key: 'work', style: 'live', og: OG_DEFAULT,
    en: { url: '/work', name: 'Work', title: 'Portfolio: Nature Films & Documentaries | Mutter Natur', desc: 'Nature films, documentaries, brand films and photography by Mutter Natur – a young environmental film production company from Munich, Germany.' },
    de: { url: '/de/portfolio', name: 'Portfolio', title: 'Portfolio: Naturfilme & Dokumentationen | Mutter Natur', desc: 'Naturfilme, Dokumentationen, Markenfilme und Fotografie von Mutter Natur – junge Filmproduktion für Natur- und Umweltthemen aus München.' } },
  { key: 'offerings', style: 'live', og: OG_DEFAULT,
    en: { url: '/offerings', name: 'Offerings', title: 'Film Production Services & Pricing | Mutter Natur', desc: 'Photo & video content from €700, image films from €1,300, documentaries from €3,000. Nature film production for Germany, Austria and Switzerland.' },
    de: { url: '/de/leistungen', name: 'Leistungen', title: 'Leistungen & Preise: Imagefilm, Doku | Mutter Natur', desc: 'Foto- & Video-Content ab 700 €, Imagefilm ab 1.300 €, Dokumentarfilm ab 3.000 €. Naturfilm-Produktion für Deutschland, Österreich und die Schweiz.' } },
  { key: 'about', style: 'live', og: OG_DEFAULT,
    en: { url: '/about', name: 'About', title: 'About – Young Nature Film Company, Munich | Mutter Natur', desc: 'Mutter Natur is a young nature and environmental film production company from Munich, founded by filmmaker Xaver Zimmermann. Real stories, real impact.' },
    de: { url: '/de/ueber-uns', name: 'Über uns', title: 'Über uns – junge Naturfilm-Produktion | Mutter Natur', desc: 'Mutter Natur ist eine junge Produktion für Natur- und Umweltfilme aus München, gegründet von Naturfilmer Xaver Zimmermann. Echte Geschichten, echte Wirkung.' } },
  { key: 'team', style: 'live', og: '/assets/img/behind-the-scenes-dreharbeiten.webp',
    en: { url: '/team', name: 'Team', title: 'Team – Young Filmmakers & Editors | Mutter Natur', desc: 'Meet the young team behind Mutter Natur: Florian Wenk (camera), Mark Mayer (main editor) and Balnur Serik (second editor & short-form video).' },
    de: { url: '/de/team', name: 'Team', title: 'Team – junge Filmemacher & Cutter | Mutter Natur', desc: 'Das junge Team hinter Mutter Natur: Florian Wenk (Kamera), Mark Mayer (Hauptschnitt) und Balnur Serik (zweiter Schnitt & Short-Form-Video).' } },
  { key: 'contact', style: 'live', og: OG_DEFAULT,
    en: { url: '/contact', name: 'Contact', title: 'Contact – Start Your Film Project | Mutter Natur', desc: 'Plan a nature film, documentary or image film with Mutter Natur from Munich. Projects across Germany, Austria and Switzerland – reply within 48 hours.' },
    de: { url: '/de/kontakt', name: 'Kontakt', title: 'Kontakt – Filmprojekt anfragen | Mutter Natur', desc: 'Naturfilm, Dokumentation oder Imagefilm anfragen: Mutter Natur aus München dreht in Deutschland, Österreich und der Schweiz. Antwort in 48 Stunden.' } },
  { key: 'films', style: 'live', og: OG_CHAMOIS, parent: 'work',
    en: { url: '/films', name: 'Films', title: 'Nature Films & Wildlife Documentaries | Mutter Natur', desc: 'Independent nature films by Mutter Natur: The Watchers of the Mountain, The Great Connection and The Bird We Almost Lost – wildlife and conservation.' },
    de: { url: '/de/filme', name: 'Filme', title: 'Naturfilme & Tierdokumentationen | Mutter Natur', desc: 'Eigene Naturfilme: Die Wächter der Berge, Die große Verbindung und Der Vogel, den wir fast verloren hätten – Wildtiere und Naturschutz.' } },
  { key: 'documentaries', style: 'live', og: OG_DEFAULT, parent: 'work',
    en: { url: '/documentaries', name: 'Documentaries & Brand Films', title: 'Documentary & Brand Film Production | Mutter Natur', desc: 'Documentary and brand films for companies, tourism and environmental organizations – e.g. Donaumoos and Teufelshöhle Pottenstein. Made in Bavaria.' },
    de: { url: '/de/dokumentationen-markenfilme', name: 'Dokumentationen & Markenfilme', title: 'Dokumentarfilm & Markenfilm Produktion | Mutter Natur', desc: 'Dokumentarfilme und Markenfilme für Unternehmen, Tourismus und Umweltorganisationen – z. B. Donaumoos und Teufelshöhle Pottenstein. Aus Bayern.' } },
  { key: 'photography', style: 'live', og: OG_DEFAULT, parent: 'work',
    en: { url: '/photography', name: 'Photography & Social Media', title: 'Nature Photography & Social Media Content | Mutter Natur', desc: 'Nature photography, reels and Instagram collaborations for sustainable brands – Bergwaldprojekt, Ozeankind, Moorflut, Miya Forest and more.' },
    de: { url: '/de/fotografie-social-media', name: 'Fotografie & Social Media', title: 'Naturfotografie & Social-Media-Content | Mutter Natur', desc: 'Naturfotografie, Reels und Instagram-Kooperationen für nachhaltige Marken – Bergwaldprojekt, Ozeankind, Moorflut, Miya Forest und mehr.' } },
  { key: 'inside-the-journey', style: 'live', og: OG_DEFAULT, parent: 'work',
    en: { url: '/inside-the-journey', name: 'Inside the Journey', title: 'Behind the Scenes of Our Nature Films | Mutter Natur', desc: 'A look behind the camera: the process, adventures and people behind every nature film by Mutter Natur, a young film production company from Munich.' },
    de: { url: '/de/hinter-den-kulissen', name: 'Hinter den Kulissen', title: 'Hinter den Kulissen unserer Naturfilme | Mutter Natur', desc: 'Ein Blick hinter die Kamera: Prozess, Abenteuer und Menschen hinter jedem Naturfilm von Mutter Natur, der jungen Filmproduktion aus München.' } },
  { key: 'vortraege', style: 'v2', og: OG_CHAMOIS,
    de: { url: '/vortraege', name: 'Vorträge', title: 'Vorträge über Natur & Wildtiere – Xaver Zimmermann', desc: 'Naturvorträge mit eigenem Filmmaterial: „Die Wächter der Berge“ und „Wir sind viele“ von Naturfilmer Xaver Zimmermann – jetzt zum Einstiegspreis.' } },
  { key: 'kollaboration', style: 'live', og: OG_DEFAULT,
    de: { url: '/kollaboration', name: 'Instagram-Kollaboration', title: 'Instagram-Kollaboration: Mutter Natur Deutschland', desc: 'Kostenlos sichtbar werden: Natur-, Umwelt- und Tierschutzprojekte zeigen ihre Arbeit als Instagram-Collab-Post auf „Mutter Natur Deutschland“ (@mutternatur_d).' } },
  { key: 'impressum', style: 'live', og: OG_DEFAULT,
    de: { url: '/impressum', name: 'Impressum', title: 'Impressum | Mutter Natur', desc: 'Impressum von Mutter Natur (Xaver Zimmermann) gemäß § 5 DDG und § 18 MStV.' } },
  { key: 'datenschutz', style: 'live', og: OG_DEFAULT,
    de: { url: '/datenschutz', name: 'Datenschutz', title: 'Datenschutzerklärung | Mutter Natur', desc: 'Datenschutzerklärung von Mutter Natur gemäß DSGVO.' } },
  { key: '404', style: 'live', noindex: true,
    en: { url: '/404', title: 'Page not found | Mutter Natur', desc: 'This page does not exist.' },
    de: { url: '/de/404', title: 'Seite nicht gefunden | Mutter Natur', desc: 'Diese Seite gibt es nicht (mehr).' } },
];
const BY_KEY = Object.fromEntries(PAGES.map((p) => [p.key, p]));

const outFile = (url) => (url.endsWith('/') ? url + 'index.html' : url + '.html').slice(1);
const urlOf = (key, lang) => { const p = BY_KEY[key]; return (p[lang] || p.de || p.en).url; };

const UI = {
  en: {
    nav: [['work', 'Work'], ['offerings', 'Offerings'], ['about', 'About'], ['team', 'Team'], ['contact', 'Contact']],
    cta: 'Start a project', menu: 'Toggle menu', switchLabel: 'Deutsche Version', switchText: 'DE',
    blurb: 'We create visual stories for sustainable businesses – from producing high-quality films and photography to strategic content for social media.',
    sitemap: 'Sitemap', home: 'Home', social: 'Social', contactH: 'Contact', getInTouch: 'Get in touch',
    sitemapLinks: [['home', 'Home'], ['work', 'Work'], ['offerings', 'Offerings & pricing'], ['about', 'About'], ['team', 'Team'], ['vortraege', 'Talks (DE)'], ['kollaboration', 'Instagram collaboration (DE)']],
    copyright: '© 2026 Mutter Natur – young nature &amp; environmental film production from Munich for Germany, Austria and Switzerland.',
    legal: [['impressum', 'Impressum'], ['datenschutz', 'Datenschutz'], ['vortraege', 'Talks (Vorträge)']],
    other: 'Deutsch', mndLabel: 'Instagram: Mutter Natur Deutschland', mailLabel: 'Email us',
    privacy: 'Privacy', igNote: 'The post only loads from Instagram after you click.', close: 'Close',
    crumbHome: 'Home', locale: 'en_US',
  },
  de: {
    nav: [['work', 'Portfolio'], ['offerings', 'Leistungen'], ['about', 'Über uns'], ['team', 'Team'], ['contact', 'Kontakt']],
    cta: 'Projekt anfragen', menu: 'Menü öffnen', switchLabel: 'English version', switchText: 'EN',
    blurb: 'Wir erzählen visuelle Geschichten für nachhaltige Unternehmen – von hochwertigen Filmen und Fotografie bis zu strategischem Content für Social Media.',
    sitemap: 'Seiten', home: 'Startseite', social: 'Social', contactH: 'Kontakt', getInTouch: 'Kontakt aufnehmen',
    sitemapLinks: [['home', 'Startseite'], ['work', 'Portfolio'], ['offerings', 'Leistungen &amp; Preise'], ['about', 'Über uns'], ['team', 'Team'], ['vortraege', 'Vorträge'], ['kollaboration', 'Instagram-Kollaboration']],
    copyright: '© 2026 Mutter Natur – junge Naturfilm- und Umweltfilm-Produktion aus München für Deutschland, Österreich und die Schweiz.',
    legal: [['impressum', 'Impressum'], ['datenschutz', 'Datenschutz'], ['vortraege', 'Vorträge']],
    other: 'English', mndLabel: 'Instagram: Mutter Natur Deutschland', mailLabel: 'E-Mail schreiben',
    privacy: 'Datenschutz', igNote: 'Der Beitrag wird erst nach Ihrem Klick von Instagram geladen.', close: 'Schließen',
    crumbHome: 'Startseite', locale: 'de_DE',
  },
};

// Old relative links inside the original page content -> clean URLs
const OLD_LINKS = { 'index.html': 'home', 'work.html': 'work', 'offerings.html': 'offerings', 'about.html': 'about', 'team.html': 'team', 'contact.html': 'contact', 'films.html': 'films', 'documentaries.html': 'documentaries', 'photography.html': 'photography', 'inside-the-journey.html': 'inside-the-journey', 'kollaboration.html': 'kollaboration', 'vortraege.html': 'vortraege', 'impressum.html': 'impressum', 'datenschutz.html': 'datenschutz' };

function rewriteMain(html, lang) {
  return html
    .replace(/\b(href|src|poster)="(?:\.\/)?assets\//g, '$1="/assets/')
    .replace(/href="([\w-]+\.html)(#[\w-]+)?"/g, (m, f, hash) => (OLD_LINKS[f] ? `href="${urlOf(OLD_LINKS[f], lang)}${hash || ''}"` : m));
}

// ---------- structured data ----------
const ORG = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': SITE + '/#organization',
  name: 'Mutter Natur', alternateName: ['Mutter Natur Film', 'MutterNatur'], url: SITE + '/',
  logo: SITE + '/assets/img/logo-mutter-natur.png', image: SITE + OG_DEFAULT,
  slogan: 'Revolutionizing Environmental Storytelling',
  description: 'Young nature and environmental film production company from Munich, Bavaria: nature films, documentaries, image films, photography and social media content for companies, tourism and NGOs across Germany, Austria and Switzerland.',
  founder: { '@type': 'Person', name: 'Xaver Zimmermann' }, email: EMAIL, priceRange: '€700–€7,000',
  address: { '@type': 'PostalAddress', addressLocality: 'Marzling', addressRegion: 'Bayern', addressCountry: 'DE' },
  areaServed: [{ '@type': 'City', name: 'München' }, { '@type': 'State', name: 'Bayern' }, { '@type': 'Country', name: 'Deutschland' }, { '@type': 'Country', name: 'Österreich' }, { '@type': 'Country', name: 'Schweiz' }],
  knowsAbout: ['Nature film', 'Environmental film', 'Wildlife documentary', 'Documentary film', 'Image film', 'Brand film', 'Nature photography', 'Social media content', 'Naturfilm', 'Umweltfilm', 'Imagefilm', 'Dokumentarfilm'],
  knowsLanguage: ['de', 'en'], sameAs: [IG, IG_MND, YT],
};
const WEBSITE = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#website', name: 'Mutter Natur', url: SITE + '/', inLanguage: ['en', 'de'], publisher: { '@id': SITE + '/#organization' } };
const VIDEOS = {
  waechter: { id: 'NEvhhDN1aYk', en: 'The Watchers of the Mountain', de: 'Die Wächter der Berge', date: '2026-05-13', dur: 'PT13M40S', thumb: '/assets/img/gaemse-alpen-waechter-der-berge.webp',
    den: 'High in the alpine mountains lives the chamois, perfectly adapted to one of the harshest environments on Earth.', dde: 'Hoch in den Alpen lebt die Gämse, perfekt angepasst an einen der rauesten Lebensräume der Erde.' },
  verbindung: { id: 'vrCHWQZncmA', en: 'The Great Connection', de: 'Die große Verbindung', date: '2026-01-29', dur: 'PT4M51S', thumb: '/assets/img/kohlmeise-winter-grosse-verbindung.webp',
    den: 'A short film about great tits and how they survive the winter through cooperation and trust.', dde: 'Ein Kurzfilm über Kohlmeisen und wie sie den Winter durch Zusammenarbeit und Vertrauen überleben.' },
  storch: { id: '6XkU0IRF3OY', en: 'The Bird We Almost Lost', de: 'Der Vogel, den wir fast verloren hätten', date: '2026-07-13', dur: 'PT1M49S', thumb: '/assets/img/weissstorch-deutschland-naturfilm.webp',
    den: 'The return of the white stork to Germany and the power of nature conservation.', dde: 'Die Rückkehr des Weißstorchs nach Deutschland und die Kraft des Naturschutzes.' },
  donaumoos: { id: 'I__fzaND0aY', en: 'Donaumoos', de: 'Donaumoos', date: '2026-07-03', dur: 'PT2M1S', thumb: '/assets/img/donaumoos-zweckverband-logo.webp',
    den: 'A quiet brand film about landscape, memory and transformation for the Donaumoos Zweckverband.', dde: 'Ein ruhiger Markenfilm über Landschaft, Erinnerung und Wandel für den Donaumoos-Zweckverband.' },
  teufelshoehle: { id: 'w-qL0l7yaEQ', en: 'Teufelshöhle Pottenstein – Eine Welt unter unseren Füßen', de: 'Teufelshöhle Pottenstein – Eine Welt unter unseren Füßen', date: '2026-07-23', dur: 'PT6M34S', thumb: '/assets/img/teufelshoehle-pottenstein-logo.webp',
    den: 'A documentary about one of Germany’s largest show caves.', dde: 'Eine Dokumentation über eine der größten Schauhöhlen Deutschlands.' },
  tomato: { id: 'XMBAGjxrCUk', en: 'The Tomato', de: 'The Tomato', date: '2026-08-09', dur: 'PT45S', thumb: '/assets/img/the-tomato-35mm-kurzfilm.webp',
    den: 'A short film shot on 35mm analogue film.', dde: 'Ein Kurzfilm, gedreht auf analogem 35-mm-Film.' },
  kohle: { id: '7PCvgDm-tVs', en: 'Kohle', de: 'Kohle', date: '2026-10-02', dur: 'PT27S', thumb: '/assets/img/kohle-imagefilm-probefilm.webp',
    den: 'A short image film by Mutter Natur.', dde: 'Ein kurzer Imagefilm von Mutter Natur.' },
};
const video = (k, lang) => { const v = VIDEOS[k]; return { '@context': 'https://schema.org', '@type': 'VideoObject', name: v[lang], description: lang === 'de' ? v.dde : v.den, thumbnailUrl: SITE + v.thumb, uploadDate: v.date, duration: v.dur, embedUrl: 'https://www.youtube-nocookie.com/embed/' + v.id, contentUrl: 'https://www.youtube.com/watch?v=' + v.id, inLanguage: 'de', creator: { '@id': SITE + '/#organization' } }; };
const PAGE_VIDEOS = { home: ['waechter', 'teufelshoehle', 'verbindung', 'storch', 'tomato', 'donaumoos', 'kohle'], films: ['waechter', 'verbindung', 'storch'], documentaries: ['donaumoos', 'teufelshoehle'] };
const PERSON = { '@context': 'https://schema.org', '@type': 'Person', '@id': SITE + '/#xaver', name: 'Xaver Zimmermann', jobTitle: 'Nature filmmaker and founder', worksFor: { '@id': SITE + '/#organization' }, url: SITE + '/about', sameAs: [IG] };

function faqSchema(main) {
  const qs = [...main.matchAll(/<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)];
  if (!qs.length) return null;
  const txt = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qs.map((m) => ({ '@type': 'Question', name: txt(m[1]), acceptedAnswer: { '@type': 'Answer', text: txt(m[2]) } })) };
}
function breadcrumb(p, lang) {
  if (p.key === 'home' || p.noindex) return null;
  const items = [[UI[lang].crumbHome, urlOf('home', lang)]];
  if (p.parent) items.push([BY_KEY[p.parent][lang].name, urlOf(p.parent, lang)]);
  items.push([p[lang].name, p[lang].url]);
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + u })) };
}
function schemas(p, lang, main) {
  const list = [];
  if (p.key === 'home') list.push(ORG, WEBSITE);
  if (p.key === 'about') list.push(PERSON);
  for (const k of PAGE_VIDEOS[p.key] || []) list.push(video(k, lang));
  if (p.key === 'vortraege') list.push({ '@context': 'https://schema.org', '@type': 'Service', name: 'Naturvorträge mit eigenem Filmmaterial', serviceType: 'Vortrag', provider: { '@id': SITE + '/#xaver' }, areaServed: ['Deutschland', 'Österreich', 'Schweiz'], description: p.de.desc });
  const faq = faqSchema(main); if (faq) list.push(faq);
  const bc = breadcrumb(p, lang); if (bc) list.push(bc);
  return list.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`).join('\n');
}

// ---------- page chrome ----------
const esc = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;').replace(/"/g, '&quot;');
const LOGO = 'MutterNatur<sup>®</sup>';

function head(p, lang, main) {
  const d = p[lang];
  const alt = p.en && p.de;
  const canonical = SITE + d.url;
  const lines = [
    '<meta charset="UTF-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(d.title)}</title>`, `<meta name="description" content="${esc(d.desc)}">`,
  ];
  if (p.noindex) lines.push('<meta name="robots" content="noindex">');
  else {
    lines.push(`<link rel="canonical" href="${canonical}">`);
    if (alt) lines.push(`<link rel="alternate" hreflang="en" href="${SITE + p.en.url}">`, `<link rel="alternate" hreflang="de" href="${SITE + p.de.url}">`, `<link rel="alternate" hreflang="x-default" href="${SITE + p.en.url}">`);
    lines.push('<meta property="og:type" content="website">', '<meta property="og:site_name" content="Mutter Natur">', `<meta property="og:locale" content="${UI[lang].locale}">`);
    if (alt) lines.push(`<meta property="og:locale:alternate" content="${UI[lang === 'en' ? 'de' : 'en'].locale}">`);
    lines.push(`<meta property="og:title" content="${esc(d.title)}">`, `<meta property="og:description" content="${esc(d.desc)}">`, `<meta property="og:image" content="${SITE + (p.og || OG_DEFAULT)}">`, `<meta property="og:url" content="${canonical}">`, '<meta name="twitter:card" content="summary_large_image">');
  }
  lines.push('<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">', '<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">', '<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">');
  if (p.style === 'v2') {
    const hero = (main.match(/<div class="hero-media[^"]*"><img src="([^"]+)"/) || [])[1];
    lines.push('<link rel="preload" href="/assets/fonts/Inter-400-13.woff2" as="font" type="font/woff2" crossorigin>', '<link rel="preload" href="/assets/fonts/Syne-700-24.woff2" as="font" type="font/woff2" crossorigin>');
    if (hero) lines.push(`<link rel="preload" href="${hero}" as="image" fetchpriority="high">`);
    lines.push('<link rel="stylesheet" href="/assets/css/fonts.css">', '<link rel="stylesheet" href="/assets/css/home.css">');
  } else {
    lines.push('<link rel="stylesheet" href="/assets/css/style.css">');
  }
  const ld = p.noindex ? '' : schemas(p, lang, main);
  return lines.join('\n') + (ld ? '\n' + ld : '');
}

function switchHref(p, lang) {
  const other = lang === 'en' ? 'de' : 'en';
  return p[other] ? p[other].url : urlOf('home', other);
}

function header(p, lang) {
  const u = UI[lang];
  const other = lang === 'en' ? 'de' : 'en';
  const links = u.nav.map(([k, label]) => `      <a href="${urlOf(k, lang)}"${k === p.key ? ' class="is-active" aria-current="page"' : ''}>${label}</a>`);
  if (p.style === 'v2') links.push(`      <a href="${urlOf('contact', lang)}#projektanfrage" class="btn btn-primary nav-cta">${u.cta}</a>`);
  links.push(`      <a href="${switchHref(p, lang)}" class="lang-switch" hreflang="${other}" lang="${other}" aria-label="${u.switchLabel}">${u.switchText}</a>`);
  return `${p.style === 'v2' ? '<div class="grain-overlay" aria-hidden="true"></div>\n' : ''}<header class="site-header">
  <div class="container nav-inner">
    <a href="${urlOf('home', lang)}" class="logo">${LOGO}</a>
    <nav class="nav-links" id="nav-links">
${links.join('\n')}
    </nav>
    <button class="nav-toggle" aria-label="${u.menu}" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
  </div>
</header>`;
}

function footer(p, lang) {
  const u = UI[lang];
  const other = lang === 'en' ? 'de' : 'en';
  const li = (href, label, ext) => `          <li><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a></li>`;
  const sitemap = u.sitemapLinks.map(([k, label]) => li(urlOf(k, lang), label)).join('\n');
  const social = [li(IG, 'Instagram', 1), li(IG_MND, u.mndLabel, 1), li(YT, 'YouTube', 1)].join('\n');
  const contact = [li('mailto:' + EMAIL, EMAIL), li(urlOf('contact', lang), u.getInTouch)].join('\n');
  const legal = u.legal.map(([k, label]) => `        <a href="${urlOf(k, lang)}">${label}</a>`).concat(`        <a href="${switchHref(p, lang)}" hreflang="${other}" lang="${other}">${u.other}</a>`).join('\n');
  const foot = `<footer class="site-footer">
  <div class="container">
    <div class="footer-top${p.style === 'v2' ? ' v2' : ''}">
      <div class="footer-brand">
        <a href="${urlOf('home', lang)}" class="logo">${LOGO}</a>
        <p>${u.blurb}</p>
      </div>
      <div class="footer-col">
        <h4>${u.sitemap}</h4>
        <ul>
${sitemap}
        </ul>
      </div>
      <div class="footer-col">
        <h4>${u.social}</h4>
        <ul>
${social}
        </ul>
      </div>
      <div class="footer-col">
        <h4>${u.contactH}</h4>
        <ul>
${contact}
        </ul>
      </div>
    </div>
    <div class="footer-wordmark" aria-hidden="true">MutterNatur®</div>
    <div class="footer-bottom">
      <span>${u.copyright}</span>
      <div class="footer-legal">
${legal}
      </div>
    </div>
  </div>
</footer>`;
  if (p.style !== 'v2') return foot + '\n<script src="/assets/js/main.js"></script>';
  return `<div class="video-modal" id="media-modal" hidden>
  <div class="video-modal-backdrop" data-modal-close></div>
  <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Instagram">
    <button type="button" class="video-modal-close" data-modal-close aria-label="${u.close}">&times;</button>
    <div class="video-modal-frame is-portrait"></div>
    <p class="yt-note">${u.igNote} <a href="/datenschutz#videos">${u.privacy}</a></p>
  </div>
</div>

${foot}
<div class="mobile-cta">
  <a href="${urlOf('contact', lang)}#projektanfrage" class="btn btn-primary">${u.cta}</a>
  <a href="mailto:${EMAIL}" class="btn btn-ghost mobile-cta-mail" aria-label="${u.mailLabel}">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg>
  </a>
</div>
<script src="/assets/js/home.js"></script>`;
}

// German pages say "Datenschutz" in the video notes of the v2 homepage
function localiseMain(main, lang) {
  if (lang !== 'de') return main;
  return main.replace(/The video only loads from YouTube \(youtube-nocookie\.com\) after you click\. <a href="\/datenschutz#videos">Privacy<\/a>/g, 'Das Video wird erst nach Ihrem Klick von YouTube (youtube-nocookie.com) geladen. <a href="/datenschutz#videos">Datenschutz</a>');
}

// ---------- build ----------
const built = [];
for (const p of PAGES) {
  for (const lang of ['en', 'de']) {
    if (!p[lang]) continue;
    const src = path.join(__dirname, 'main', lang, p.key + '.html');
    let main = rewriteMain(fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n'), lang);
    main = localiseMain(main, lang);
    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
${head(p, lang, main)}
</head>
<body>
${header(p, lang)}

<main>
${main.trimEnd()}
</main>

${footer(p, lang)}
</body>
</html>
`;
    const out = outFile(p[lang].url);
    fs.mkdirSync(path.dirname(path.join(ROOT, out)), { recursive: true });
    fs.writeFileSync(path.join(ROOT, out), html);
    built.push({ p, lang, out, html });
  }
}

// sitemap.xml with hreflang alternates
const sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
for (const p of PAGES) {
  if (p.noindex) continue;
  for (const lang of ['en', 'de']) {
    if (!p[lang]) continue;
    const prio = p.key === 'home' ? '1.0' : ['offerings', 'contact', 'work'].includes(p.key) ? '0.9' : ['impressum', 'datenschutz'].includes(p.key) ? '0.2' : '0.7';
    sm.push('  <url>', `    <loc>${SITE + p[lang].url}</loc>`, `    <lastmod>${TODAY}</lastmod>`);
    if (p.en && p.de) sm.push(`    <xhtml:link rel="alternate" hreflang="en" href="${SITE + p.en.url}"/>`, `    <xhtml:link rel="alternate" hreflang="de" href="${SITE + p.de.url}"/>`, `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + p.en.url}"/>`);
    sm.push(`    <priority>${prio}</priority>`, '  </url>');
  }
}
sm.push('</urlset>', '');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm.join('\n'));
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// _redirects: .html -> clean URL, and guesses for German slugs without /de/
const red = ['# Generated by _live/build.js', '# .html -> URL without extension'];
for (const { p, lang, out } of built) {
  if (p.key === '404') continue;
  const u = p[lang].url;
  red.push(`/${out} ${u} 301`);
}
red.push('# German addresses without /de/ and old draft addresses', '/de /de/ 301');
for (const p of PAGES) {
  if (!p.en || !p.de || p.key === 'home' || p.key === '404') continue;
  const guess = p.de.url.replace('/de/', '/');
  if (!PAGES.some((q) => (q.en && q.en.url === guess) || (q.de && q.de.url === guess))) red.push(`${guess} ${p.de.url} 301`);
}
red.push('/services /offerings 301', '/en / 301', '/en/* /:splat 301', '');
fs.writeFileSync(path.join(ROOT, '_redirects'), red.join('\n'));

// ---------- checks ----------
const problems = [];
const exists = (u) => {
  const clean = u.split('#')[0].split('?')[0];
  if (clean === '' ) return true;
  const f = clean.endsWith('/') ? clean + 'index.html' : clean;
  return [f, f + '.html'].some((c) => fs.existsSync(path.join(ROOT, c.slice(1))));
};
for (const { p, lang, out, html } of built) {
  const d = p[lang];
  if (!p.noindex && d.title.length > 60) problems.push(`${out}: title ${d.title.length} chars`);
  if (!p.noindex && d.desc.length > 160) problems.push(`${out}: description ${d.desc.length} chars`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${out}: needs exactly one h1`);
  if (/TODO|PLATZHALTER|\[TODO|data-todo|framerusercontent|mutternatur-film\.de/i.test(html)) problems.push(`${out}: placeholder or old domain left`);
  for (const m of html.matchAll(/(?:href|src|poster)="(\/[^"]*)"/g)) if (!exists(m[1])) problems.push(`${out}: broken ${m[1]}`);
  for (const m of html.matchAll(/href="([\w-]+\.html)"/g)) problems.push(`${out}: relative link ${m[1]}`);
  for (const m of html.matchAll(/href="#([\w-]+)"/g)) if (!html.includes(`id="${m[1]}"`)) problems.push(`${out}: missing anchor #${m[1]}`);
}
// anchors on other pages
for (const { out, html } of built) {
  for (const m of html.matchAll(/href="(\/[^"#]*)#([\w-]+)"/g)) {
    const target = built.find((b) => b.p[b.lang].url === m[1]);
    if (target && !target.html.includes(`id="${m[2]}"`)) problems.push(`${out}: ${m[1]}#${m[2]} anchor missing`);
  }
}
console.log(`Built ${built.length} pages.`);
if (problems.length) { console.log(problems.join('\n')); process.exitCode = 1; } else console.log('All checks passed.');
