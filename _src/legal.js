// Impressum and Datenschutz (German only). The legal texts themselves live in
// legal-impressum.html and legal-datenschutz.html – edit them there.
// {{CONTACT}} is replaced with the contact page of the live site.
const fs = require('fs');
const path = require('path');
const { layout, url, linkLang } = require('./build');

const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8').replace(/\{\{CONTACT\}\}/g, url('contact', linkLang('de')));

layout({
  lang: 'de', key: 'impressum', section: null, og: 'naturlandschaft-naturfilm-produktion-bayern',
  title: 'Impressum | Mutter Natur Film',
  desc: 'Impressum von Mutter Natur Film (Xaver Zimmermann, Marzling bei Freising, Bayern) gemäß § 5 DDG und § 18 MStV.',
  body: read('legal-impressum.html'),
});

layout({
  lang: 'de', key: 'datenschutz', section: null, og: 'naturlandschaft-naturfilm-produktion-bayern',
  title: 'Datenschutzerklärung | Mutter Natur',
  desc: 'Datenschutzerklärung von Mutter Natur gemäß DSGVO: Hosting, Kontaktformular, YouTube- und Instagram-Inhalte erst nach Klick.',
  body: read('legal-datenschutz.html'),
});
