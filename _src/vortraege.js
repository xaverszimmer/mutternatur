// Vorträge (German only). Standalone page with its own design – the page itself
// lives in vortraege.html; here we only add canonical, hreflang, Open Graph and
// favicons and fill in the {{…}} placeholders from SETTINGS / ROUTES.
const fs = require('fs');
const path = require('path');
const { esc, url, written, ROOT } = require('./build');
const { SETTINGS: S } = require('./content');

const key = 'talks';
const pathname = url(key, 'de');
const src = fs.readFileSync(path.join(__dirname, 'vortraege.html'), 'utf8');
const title = src.match(/<title>([^<]*)<\/title>/)[1];
const desc = src.match(/<meta name="description" content="([^"]*)">/)[1];
const og = 'naturlandschaft-naturfilm-produktion-bayern';

// No English version yet – hreflang de only
const head = `<link rel="canonical" href="${S.site}${pathname}">
<link rel="alternate" hreflang="de" href="${S.site}${pathname}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Mutter Natur">
<meta property="og:locale" content="de_DE">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${S.site}/assets/img/og/${og}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${S.site}${pathname}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">`;

const html = src
  .replace('<!--HEAD-->', head)
  .replace(/\{\{EMAIL\}\}/g, esc(S.email))
  .replace(/\{\{HOME\}\}/g, `${S.site}/`)
  .replace(/\{\{HOST\}\}/g, S.site.replace(/^https?:\/\//, ''))
  .replace(/\{\{IMPRESSUM\}\}/g, url('impressum', 'de'))
  .replace(/\{\{DATENSCHUTZ\}\}/g, url('datenschutz', 'de'));
if (/\{\{|<!--HEAD-->/.test(html)) throw new Error('vortraege.html: unfilled placeholder');

const out = pathname + '.html';
fs.writeFileSync(path.join(ROOT, out), html);
written.push({ out, pathname, key, lang: 'de', noindex: false });
