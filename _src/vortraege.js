// Vorträge (German only) – built with the shared layout, so fonts, colours,
// spacing and animations match the rest of the site.
//
// Image slots: put the photos into assets/img/vortraege/ under exactly these
// names, add their size to _src/image-sizes.json and rebuild. Until a file
// exists, its slot renders nothing (the page is designed to work without images).
const fs = require('fs');
const path = require('path');
const { img, url, linkLang, layout, esc, ROOT } = require('./build');
const { SETTINGS: S } = require('./content');

const SIZES = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-sizes.json'), 'utf8'));
const SLOTS = {
  hero: { file: 'vortraege/vortraege-hero.webp', alt: 'Xaver Zimmermann bei einem Vortrag vor Publikum' },
  speaker: { file: 'vortraege/xaver-zimmermann-vortrag.webp', alt: 'Naturfilmer Xaver Zimmermann mit Kamera in den Bergen' },
  waechter: { file: 'vortraege/vortrag-waechter-der-berge.webp', alt: 'Gämse im Steilgelände der Alpen – Vortrag „Die Wächter der Berge“' },
  viele: { file: 'vortraege/vortrag-wir-sind-viele.webp', alt: 'Menschen bei einer gemeinsamen Naturschutzaktion – Vortrag „Wir sind viele“' },
};
const has = (k) => fs.existsSync(path.join(ROOT, 'assets/img', SLOTS[k].file)) && SIZES[SLOTS[k].file];
const slot = (k, opts) => (has(k) ? img(SLOTS[k].file, SLOTS[k].alt, opts) : `<!-- Bildplatz: assets/img/${SLOTS[k].file} (noch leer) -->`);

const ll = linkLang('de');
const mail = `mailto:${S.email}?subject=${encodeURIComponent('Vortragsanfrage')}`;
const ARROW = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5"/></svg>';

const TALKS = [
  {
    id: 'waechter', num: '01', slot: 'waechter',
    eyebrow: 'Vortrag 01 · Naturfilm live',
    title: 'Die Wächter der Berge', sub: 'Auge in Auge mit Gämsen',
    intro: 'Gämsen stehen in den Alpen unter wachsendem Druck. Ich habe einen Film gedreht, der sie sichtbar macht. In diesem Vortrag nehme ich Sie mit: in die Berge, zu den Tieren und hinter die Kamera – und zeige, wie aus einem Filmprojekt etwas Großes entsteht.',
    points: [
      ['Die Gämsen und die Berge', 'Wer die Tiere sind, wie sie im Steilgelände leben und was sie in den Alpen unter Druck setzt.'],
      ['Die Entstehung', 'Monate Arbeit, ein Dreh im Steilgelände, viele Anläufe. Wie ein Film wirklich entsteht – mit den Geschichten, die im Film keinen Platz hatten.'],
      ['Wildtiere finden, ohne sie zu stören', 'Geduld, Respekt und Handwerk: Was es braucht, um Tieren nah zu kommen, ohne ihnen zu nahe zu kommen.'],
      ['Das größere Projekt', 'Aus dem Film wächst gerade ein deutlich längerer Film. Sie erfahren, wohin das führt und wie so ein Weg aussieht.'],
    ],
    facts: [
      ['Format', '60 bis 90 Minuten, mit Filmausschnitten und Raum für Fragen'],
      ['Passt zu', 'Alpenverein und Naturfreunde, Fotogruppen, Volkshochschulen, Festivals, Naturparks und Museen'],
      ['Technik', 'Eigene Technik und eigenes Filmmaterial bringe ich mit'],
    ],
    take: 'Sie gehen mit einem anderen Blick auf die Berge nach Hause.',
    film: true,
  },
  {
    id: 'viele', num: '02', slot: 'viele',
    eyebrow: 'Vortrag 02 · Umweltschutz',
    title: 'Wir sind viele', sub: 'Warum der Umweltschutz zusammenrücken muss',
    intro: 'Der Umweltschutz muss näher zusammenrücken als je zuvor. Wir sind eins. Wir sind viele. Und wir müssen uns gemeinsam zeigen, statt uns unterkriegen zu lassen. Ich erzähle, warum das notwendig ist – und wie wir es gemeinsam stark machen.',
    points: [
      ['Wer wir sind', 'Ich arbeite mit sehr vielen Umweltschutzorganisationen und bin tief in der Szene. Sie sehen, wie groß und vielfältig wir wirklich sind.'],
      ['Warum es jetzt notwendig ist', 'Warum gemeinsames Auftreten kein Nice-to-have ist, sondern den Unterschied macht. Vor allem: das Warum.'],
      ['Wie wir Menschen zum Handeln bringen', 'Wie wir Menschen überzeugen, zu handeln und zu helfen – mit Nähe statt Abstraktion, mit Geschichten statt Zahlenfluten.'],
      ['Wie die Zukunft aussieht', 'Was möglich ist, wenn wir zusammenstehen. Ein Ausblick, der Mut macht und Lust auf den nächsten Schritt.'],
    ],
    facts: [
      ['Format', '60 bis 90 Minuten, mit eigenem Filmmaterial und Raum für Fragen'],
      ['Passt zu', 'Umweltverbänden und Ortsgruppen, Umweltbildung, Hochschulen, Klimaschutz-Teams, Tagungen'],
      ['Technik', 'Eigene Technik und eigenes Filmmaterial bringe ich mit'],
    ],
    take: 'Sie gehen mit Rückenwind nach Hause – und mit Ideen, wie Sie andere mitnehmen.',
  },
];

const talkSection = (t) => `<section class="section section-border-top talk" id="${t.id}" aria-labelledby="${t.id}-h">
  <span class="talk-num" aria-hidden="true">${t.num}</span>
  <div class="container">
    <div class="${has(t.slot) ? 'feature-split' : 'talk-head'}" data-reveal>
      <div>
        <span class="eyebrow">${t.eyebrow}</span>
        <h2 id="${t.id}-h">${t.title}<span class="talk-sub">${t.sub}</span></h2>
        <p class="lede" style="margin-top:1.25rem">${t.intro}</p>
      </div>
      ${has(t.slot) ? `<figure>${slot(t.slot)}</figure>` : slot(t.slot)}
    </div>
    <div class="audience-grid talk-points" style="margin-top:clamp(2.5rem,6vw,4rem)">
${t.points.map(([h, p], i) => `      <div data-reveal><span class="num">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('\n')}
    </div>
    <dl class="case-facts" data-reveal>
${t.facts.map(([k, v]) => `      <div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
    </dl>
    <p class="talk-take" data-reveal>${t.take}</p>
    <div class="hero-actions" data-reveal>
      <a href="${mail}%3A%20${encodeURIComponent(t.title)}" class="btn btn-primary">„${t.title}“ anfragen</a>${t.film ? `
      <a href="${url('films', ll)}" class="btn btn-ghost">Den Film ansehen</a>` : ''}
    </div>
  </div>
</section>`;

const body = `
<section class="hero hero-compact talks-hero${has('hero') ? '' : ' is-graphic'}">
  <div class="hero-media">${has('hero') ? slot('hero', { eager: true }) : `${slot('hero')}
    <svg class="talks-range" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#2a3324" d="M0 330 L120 270 L230 318 L360 210 L470 290 L590 180 L700 262 L820 160 L940 255 L1060 205 L1180 280 L1300 230 L1440 300 L1440 600 L0 600Z" opacity=".75"/>
      <path fill="#1d2219" d="M0 430 L140 360 L260 410 L390 330 L520 400 L650 310 L780 395 L900 340 L1030 410 L1160 350 L1290 405 L1440 360 L1440 600 L0 600Z"/>
      <path fill="#141517" d="M0 520 L160 470 L300 505 L450 455 L620 510 L760 468 L930 515 L1090 470 L1240 512 L1440 480 L1440 600 L0 600Z"/>
    </svg>`}</div>
  <div class="container hero-content" data-reveal>
    <span class="eyebrow">Vorträge · Naturfilm · Umweltschutz</span>
    <h1 class="kinetic-text">Geschichten von draußen, die bleiben.</h1>
    <p class="lede">Zwei Vorträge von Naturfilmer Xaver Zimmermann aus Bayern – mit eigenem Filmmaterial, echten Geschichten und einem Blick, der nach dem Abend bleibt.</p>
    <div class="hero-actions">
      <a href="#anfrage" class="btn btn-primary">Vortrag anfragen</a>
      <a href="#waechter" class="btn btn-ghost">Die zwei Vorträge</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container about-hero" data-reveal>
    <div>
      <span class="eyebrow">Wer erzählt</span>
      <h2>Ich bin Xaver, Naturfilmer.</h2>
      <p class="lede" style="margin-top:1.25rem">Ich bin Naturfilmer und Fotograf aus dem Raum München und drehe Filme für Menschen und Organisationen, die etwas bewegen wollen.</p>
      <p style="margin-top:1rem">Mit der NGO Wildes Bayern habe ich den Film „Die Wächter der Berge“ gedreht – in Deutschland, Österreich, der Schweiz und Frankreich. Und ich arbeite mit sehr vielen Umweltschutzorganisationen zusammen.</p>
      <p style="margin-top:1rem">Auf der Bühne stehe ich nicht zum ersten Mal. Mit diesen Vorträgen starte ich etwas Neues: mit voller Energie und eigenem Material statt Folien von der Stange.</p>
    </div>
    ${has('speaker') ? `<figure>${slot('speaker')}</figure>` : `${slot('speaker')}
    <div class="talk-refs">
      <span class="eyebrow">Referenzen</span>
      <ul class="check-list">
        <li>Naturparkhaus Zillertal</li>
        <li>Teufelshöhle Pottenstein</li>
        <li>Bayerisches Donaumoos</li>
        <li>Wildes Bayern</li>
        <li>Gewinner Mo &amp; Friese Film Festival</li>
      </ul>
    </div>`}
  </div>
</section>

${TALKS.map(talkSection).join('\n\n')}

<section class="section section-border-top">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">So läuft es ab</span>
      <h2>Vom ersten Hallo zum Abend.</h2>
    </div>
    <div class="steps">
${[['Sie schreiben mir', 'Kurz reicht: Wer sind Sie, welches Publikum, welcher Zeitraum.'],
    ['Wir sprechen', 'Thema, Länge und Konditionen klären wir persönlich – passend zu Ihnen.'],
    ['Ich bereite vor', 'Ich schneide den Abend auf Ihr Publikum zu und bringe Technik und Material mit.'],
    ['Der Abend', 'Echte Bilder, echte Geschichten, Raum für Fragen und Gespräch.']]
    .map(([h, p], i) => `      <div class="step">\n        <h3><span class="step-num">${i + 1}</span> ${h}</h3>\n        <p>${p}</p>\n      </div>`).join('\n')}
    </div>
  </div>
</section>

<section class="section-cta section-border-top talks-cta" id="anfrage">
  <div class="container" data-reveal>
    <span class="eyebrow">Anfragen</span>
    <h2 class="kinetic-text">Lassen Sie uns einen Abend planen.</h2>
    <p class="lede" style="margin-inline:auto;margin-top:1rem">Schreiben Sie mir kurz, welcher Vortrag zu Ihnen passt und wann. Den Rest besprechen wir persönlich.</p>
    <div class="hero-actions" style="justify-content:center;margin-top:1.5rem">
      <a href="${mail}" class="btn btn-primary">Vortrag anfragen ${ARROW}</a>
      <a href="${url('contact', ll)}#kurzanfrage" class="btn btn-ghost" hreflang="en">Kontaktformular (EN)</a>
    </div>
    <p style="margin:1.5rem auto 0"><a class="text-link" href="mailto:${S.email}">${esc(S.email)}</a> · <a class="text-link" href="${S.instagram}" target="_blank" rel="noopener">Instagram @xaverszimmer</a></p>
  </div>
</section>
`;

layout({
  lang: 'de', key: 'talks', section: null, body, og: 'gaemse-alpen-waechter-der-berge',
  title: 'Vorträge zu Naturfilm & Umweltschutz, Bayern | Mutter Natur',
  desc: 'Vorträge von Naturfilmer Xaver Zimmermann aus Bayern: „Die Wächter der Berge“ und „Wir sind viele“ – mit eigenem Filmmaterial, für Vereine und Festivals.',
  ld: [{
    '@context': 'https://schema.org', '@type': 'Person', '@id': `${S.site}/#xaver-zimmermann`,
    name: 'Xaver Zimmermann', jobTitle: 'Naturfilmer und Referent', worksFor: { '@id': `${S.site}/#organization` },
    url: `${S.site}${url('talks', 'de')}`, sameAs: [S.instagram],
    knowsAbout: ['Naturfilm', 'Wildtierfilm', 'Gämsen', 'Umweltschutz', 'Naturschutz'],
    makesOffer: TALKS.map((t) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `Vortrag: ${t.title} – ${t.sub}`, description: t.intro, areaServed: ['Bayern', 'Deutschland', 'Österreich', 'Schweiz'] },
    })),
  }],
});
