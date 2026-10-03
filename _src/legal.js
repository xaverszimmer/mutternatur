// Impressum and Datenschutz (German only). The legal texts themselves live in
// legal-impressum.html and legal-datenschutz.html – edit them there.
const fs = require('fs');
const path = require('path');
const { layout } = require('./build');

const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');

layout({
  lang: 'de', key: 'impressum', section: null, og: 'naturlandschaft-naturfilm-produktion-bayern',
  title: 'Impressum | Mutter Natur',
  desc: 'Impressum von Mutter Natur (Xaver Zimmermann) gemäß § 5 DDG / § 18 MStV.',
  body: read('legal-impressum.html'),
});

layout({
  lang: 'de', key: 'datenschutz', section: null, og: 'naturlandschaft-naturfilm-produktion-bayern',
  title: 'Datenschutzerklärung | Mutter Natur',
  desc: 'Datenschutzerklärung von Mutter Natur gemäß DSGVO.',
  body: read('legal-datenschutz.html'),
});
