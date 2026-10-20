// Page definitions. Every page is built for both languages unless noted.
const B = require('./build');
const C = require('./content');
const { img, url, L, layout, videoCard, ytPlayer, instaCard, serviceCard, collabCard, faqList, faqLd, videoLd, ORG_LD, serviceLd, ctaBanner, steps, priceTerms, awardsBlock, testimonials, proofBar, esc } = B;
const { todo, SETTINGS: S, UI, FILMS, SERVICES, SERVICE_ORDER, FORM_OPTIONS, FAQ } = C;

const LANGS = ['de', 'en'];

// ===========================================================================
// Home
// ===========================================================================
const HOME_STRIP = ['verbindung', 'vogel', 'tomato', 'donaumoos', 'kohle'];
for (const lang of LANGS) {
  const body = `
<section class="hero hero--center-v">
  <div class="hero-media hero-parallax">${img('naturlandschaft-naturfilm-produktion-bayern.webp', L(lang, 'Reh überquert im Abendlicht einen Feldweg', 'Deer crossing a country road at sunset'), { eager: true })}</div>
  <div class="container hero-content hero-content--center">
    <span class="eyebrow hero-counter" data-reveal style="transition-delay:.35s">${L(lang, 'Mutter Natur · Naturfilm & Filmproduktion aus Bayern', 'Mutter Natur · Nature film production from Bavaria')}</span>
    <h1 class="hero-display hero-display--compact hero-zoom kinetic-text" data-reveal style="transition-delay:.1s">${L(lang, 'Natur und Umwelt, revolutionär erzählt.', 'Revolutionizing Environmental Storytelling')}</h1>
    <p class="lede hero-counter" data-reveal style="transition-delay:.6s">${L(lang,
      'Wir erzählen visuelle Geschichten – aus der Natur selbst und für Unternehmen und Organisationen, die sie schützen: von hochwertigen Filmen und Fotografie bis zu strategischem Content für Social Media.',
      'We create visual stories – from nature itself and for the businesses and organizations protecting it: from high-quality films and photography to strategic content for social media.')}</p>
    <div class="hero-actions hero-counter" data-reveal style="transition-delay:.85s">
      <a href="${url('work', lang)}" class="btn btn-primary">${L(lang, 'Filme ansehen', 'Watch our films')}</a>
      <a href="${url('contact', lang)}#projektanfrage" class="btn btn-ghost">${UI[lang].cta}</a>
    </div>
  </div>
</section>

${proofBar(lang)}

<section class="section section-border-top">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${L(lang, 'Unsere Mission', 'Our mission')}</span>
      <h2 class="kinetic-text">${L(lang, 'Wir machen Ihre Wirkung sichtbar.', 'We make your impact visible.')}</h2>
      <p class="lede" style="margin-top:1rem">${L(lang,
        'Mutter Natur wurde mit einer Mission gegründet: die Geschichten von Projekten, Organisationen und Menschen zu erzählen, die die Umwelt schützen. Wir zeigen die Verbindung zwischen Mensch und Natur – und was möglich ist, wenn beide im Einklang leben. Das treibt uns an.',
        'Mutter Natur was founded with the mission of telling the stories of projects, organizations, and people working to protect the environment. We showcase the connection between people and nature, and the possibilities of living together in harmony. That’s what drives us.')}</p>
    </div>
    <div class="duo">
      <a class="duo-tile reveal-left" href="${url('films', lang)}" data-reveal data-static-img>
        ${img('filmstill-naturaufnahme-social.avif', L(lang, 'Reh im goldenen Abendlicht', 'Deer in golden evening light'))}
        <div class="duo-body">
          <span class="num">01</span>
          <h3>${L(lang, 'Geschichten aus der Natur', 'Stories from nature itself')}</h3>
          <p>${L(lang,
            'Eigene Naturfilme und Kurzdokumentationen – über Gämsen in den Alpen, Kohlmeisen im Winter, die Rückkehr des Weißstorchs. Frei erzählt und auf Festivals gezeigt.',
            'Our own nature films and short documentaries – about chamois in the Alps, great tits in winter, the return of the white stork. Independently told and shown at festivals.')}</p>
          <span class="service-more">${L(lang, 'Unsere Naturfilme', 'Our nature films')} →</span>
        </div>
      </a>
      <a class="duo-tile reveal-right" href="${url('docs', lang)}" data-reveal data-static-img>
        ${img('fotografie-social-media-portfolio.avif', L(lang, 'Freiwilliger trägt einen Eimer bei einer Pflanzaktion', 'Volunteer carrying a bucket at a planting event'))}
        <div class="duo-body">
          <span class="num">02</span>
          <h3>${L(lang, 'Geschichten von Menschen, die sie schützen', 'Stories of the people protecting it')}</h3>
          <p>${L(lang,
            'Dokumentationen, Imagefilme und Content für Unternehmen, Tourismus, NGOs und Zweckverbände, die für die Natur kämpfen – und dabei gesehen werden sollen.',
            'Documentaries, image films and content for companies, tourism, NGOs and public bodies that fight for nature – and deserve to be seen doing it.')}</p>
          <span class="service-more">${L(lang, 'Dokumentationen & Markenfilme', 'Documentaries & brand films')} →</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="section section-border-top" id="leistungen">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${L(lang, 'Zusammenarbeit & Preise', 'Working together & pricing')}</span>
      <h2>${L(lang, 'Sechs Wege, mit uns zu arbeiten.', 'Six ways to work with us.')}</h2>
      <p class="lede" style="margin-top:1rem">${L(lang, 'Für alle, die nachhaltig etwas bewegen: vom schnellen Content bis zum Dokumentarfilm – mit klaren Endpreisen.', 'For everyone creating lasting change: from fast content to documentary film – with clear, final prices.')}</p>
    </div>
    <div class="service-grid six">
${SERVICE_ORDER.map((k) => serviceCard(k, lang)).join('\n')}
${collabCard(lang)}
    </div>
  </div>
</section>

<section class="section section-border-top">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${L(lang, 'Ausgewählte Filme', 'Selected films')}</span>
      <h2>${L(lang, 'Sehen Sie selbst.', 'See for yourself.')}</h2>
      <p class="lede" style="margin-top:1rem">${L(lang, 'Ein freier Naturfilm und eine Auftragsproduktion – mit demselben Anspruch gedreht.', 'An independent nature film and a commissioned production – made to the same standard.')}</p>
    </div>
    <div class="case-teaser is-flipped">
      <div data-reveal>${ytPlayer('waechter', lang)}</div>
      <div data-reveal>
        <span class="eyebrow">${L(lang, 'Eigenproduktion · Naturfilm', 'Independent production · Nature film')}</span>
        <h3 class="h2">${FILMS.waechter.title[lang]}</h3>
        <p class="lede" style="margin-top:1rem">${FILMS.waechter.desc[lang]}</p>
        <p class="card-meta" style="margin-top:1rem">${L(lang, 'Kurzdokumentation · 13:40 Min. · Auf Festivals: DOK.fest München, 22. INKAFEST', 'Short documentary · 13:40 min · At festivals: DOK.fest München, 22nd INKAFEST')}</p>
        <a class="btn btn-ghost" style="margin-top:1.75rem" href="${url('films', lang)}">${L(lang, 'Alle Naturfilme', 'All nature films')}</a>
      </div>
    </div>
    <div class="case-teaser" style="margin-top:clamp(3.5rem,8vw,6rem)">
      <div data-reveal>
        <span class="eyebrow">${UI[lang].caseLabel} · ${L(lang, 'Tourismus', 'Tourism')}</span>
        <h3 class="h2">${L(lang, 'Teufelshöhle Pottenstein: mehr Reichweite für eine der größten Schauhöhlen Deutschlands.', 'Teufelshöhle Pottenstein: more reach for one of Germany’s largest show caves.')}</h3>
        <p class="lede" style="margin-top:1rem">${L(lang,
          'Zusammen mit dem Tourismusverband Pottenstein haben wir die Dokumentation „Eine Welt unter unseren Füßen“ produziert – mit zwei Zielen: die Reichweite der Höhle steigern und Material für die Öffentlichkeitsarbeit liefern.',
          'Together with the Pottenstein tourism association we produced the documentary “Eine Welt unter unseren Füßen” (A world beneath our feet) – with two goals: increase the cave’s reach and deliver material for public relations.')}</p>
        <a class="btn btn-ghost" style="margin-top:1.75rem" href="${url('caseTeufel', lang)}">${L(lang, 'Zur Fallstudie', 'Read the case study')}</a>
      </div>
      <div data-reveal>${ytPlayer('teufel', lang)}</div>
    </div>
  </div>
  <div class="film-strip-wrap">
    <div class="container film-strip-head" data-reveal>
      <span class="eyebrow" style="margin:0">${L(lang, 'Weitere Filme', 'More films')}</span>
      <div class="strip-nav">
        <button type="button" data-strip="-1" aria-label="${L(lang, 'Vorherige Filme', 'Previous films')}">←</button>
        <button type="button" data-strip="1" aria-label="${L(lang, 'Nächste Filme', 'Next films')}">→</button>
      </div>
    </div>
    <div class="film-strip" tabindex="0" aria-label="${L(lang, 'Weitere Filme', 'More films')}">
${HOME_STRIP.map((k) => videoCard(k, lang)).join('\n')}
    </div>
    <div class="container"><p class="yt-note" style="margin-top:1rem">${UI[lang].ytNote} <a href="${url('datenschutz', 'de')}#videos">${UI[lang].privacy}</a></p><p style="margin-top:2rem"><a class="text-link" href="${url('work', lang)}">${L(lang, 'Alle Arbeiten ansehen', 'See all work')}</a></p></div>
  </div>
</section>

${testimonials(lang)}

<section class="section section-border-top">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">${L(lang, 'So läuft es ab', 'How it works')}</span>
      <h2>${L(lang, 'In drei Schritten zu Ihrem Film.', 'Three steps to your film.')}</h2>
    </div>
    ${steps(lang)}
  </div>
</section>

<section class="section section-border-top">
  <div class="container feature-split" data-reveal>
    <div>
      <span class="eyebrow">${L(lang, 'Eigene Filme & Koproduktionen', 'Independent films & co-productions')}</span>
      <h2>${L(lang, 'Sie haben eine Geschichte, die ein Naturfilm werden sollte?', 'Do you have a story that should become a nature film?')}</h2>
      <p class="lede" style="margin-top:1rem">${L(lang,
        'Neben Auftragsproduktionen entwickeln wir eigene Natur- und Dokumentarfilme – Geschichten, die Mensch und Natur wieder verbinden. Dafür arbeiten wir gern mit Sendern, Produktionsfirmen, Förderungen und Menschen zusammen, die etwas zu erzählen haben.',
        'Alongside commissioned work we develop our own nature and documentary films – stories that reconnect humans and nature. For these we love to work with broadcasters, production companies, funding bodies and people who have something to tell.')}</p>
      <div class="hero-actions">
        <a href="${url('films', lang)}" class="btn btn-ghost">${L(lang, 'Unsere Naturfilme', 'Our nature films')}</a>
        <a href="${url('about', lang)}" class="text-link" style="align-self:center">${L(lang, 'Mehr über uns', 'More about us')}</a>
      </div>
    </div>
    ${img('naturaufnahme-wiederverbindung-mission.webp', L(lang, 'Verschneite Berggipfel im Nebel', 'Snow-covered mountain peaks in the mist'))}
  </div>
</section>

${ctaBanner(lang, L(lang, 'Lassen Sie uns Geschichten erzählen, die zählen.', 'Let’s tell stories that matter.'), L(lang, 'Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 48 Stunden – persönlich und unverbindlich.', 'Tell us about your project. We get back to you within 48 hours – personally and without obligation.'))}
`;
  layout({
    lang, key: 'home', section: null, grain: true, body,
    title: L(lang, 'Naturfilm- & Imagefilm-Produktion aus Bayern | Mutter Natur', 'Nature Films, Documentaries & Image Films from Bavaria | Mutter Natur'),
    desc: L(lang,
      'Naturfilme, Dokumentationen, Imagefilme und Social Content: Geschichten aus der Natur und von Menschen, die sie schützen. Aus Bayern, für ganz DACH.',
      'Nature films, documentaries, image films and social content: stories from nature and of the people protecting it. From Bavaria, for Germany, Austria and Switzerland.'),
    ld: [ORG_LD(), ...['waechter', 'teufel', ...HOME_STRIP].map((k) => videoLd(k, lang))],
  });
}

// ===========================================================================
// Services overview
// ===========================================================================
const ALL_FAQ = ['dauer', 'lieferzeit', 'korrektur', 'anzahlung', 'steuer', 'reisekosten', 'reisen', 'wetter', 'foerder', 'rechte'];
for (const lang of LANGS) {
  const body = `
<section class="section service-hero">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${L(lang, 'Leistungen & Preise', 'Services & pricing')}</span>
      <h1>${L(lang, 'Was wir für Sie produzieren – und was es kostet.', 'What we produce for you – and what it costs.')}</h1>
      <p class="lede" style="margin-top:1.25rem">${L(lang,
        'Viele Unternehmen und Organisationen leisten wertvolle Arbeit für die Natur – doch kaum jemand sieht sie. Wir zeigen sie glaubwürdig: mit echten Bildern, echten Menschen und echten Ergebnissen. Wählen Sie die Tiefe, die zu Ihrem Ziel passt.',
        'Many companies and organizations do meaningful work for nature – but that impact often stays invisible. We show it credibly: real footage, real people, real outcomes. Choose the depth that matches your goals.')}</p>
    </div>
    <div class="service-grid six">
${SERVICE_ORDER.map((k) => serviceCard(k, lang)).join('\n')}
${collabCard(lang)}
    </div>
    <div class="price-box" style="margin-top:2.5rem" data-reveal>
      <h2 style="font-size:1.3rem">${L(lang, 'Gut zu wissen zu unseren Preisen', 'Good to know about our pricing')}</h2>
      <p style="margin-top:0.75rem">${L(lang,
        'Alle Preise sind Orientierungswerte. Jedes Projekt kalkulieren wir individuell nach Umfang, Drehort, Anzahl der Drehtage und Produktionsaufwand – Sie erhalten ein persönliches Angebot.',
        'All prices are orientation ranges. Every project is calculated individually based on scope, location, number of shooting days and production requirements – you receive a personal offer.')}</p>
      ${priceTerms(lang)}
    </div>
  </div>
</section>

<section class="section section-border-top">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">${L(lang, 'So läuft es ab', 'How it works')}</span>
      <h2>${L(lang, 'In drei Schritten zu Ihrem Film.', 'Three steps to your film.')}</h2>
    </div>
    ${steps(lang)}
  </div>
</section>

<section class="section section-border-top" id="faq">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>${L(lang, 'Häufige Fragen', 'Frequently asked questions')}</h2>
    </div>
    ${faqList(ALL_FAQ, lang)}
  </div>
</section>

${ctaBanner(lang, L(lang, 'Nicht sicher, welches Paket passt?', 'Not sure which package fits?'), L(lang, 'Schreiben Sie uns kurz, was Sie vorhaben. Wir empfehlen Ihnen ehrlich, was sich lohnt.', 'Tell us briefly what you have in mind. We’ll honestly recommend what is worth it.'), 'filmstill-naturlandschaft-cta.webp', L(lang, 'Nebliger Wald mit Sonnenstrahlen', 'Misty forest with sun rays'))}
`;
  layout({
    lang, key: 'services', section: 'services', body, og: 'independent-filme-portfolio',
    title: L(lang, 'Leistungen & Preise: Imagefilm, Dokumentarfilm, Social Media | Mutter Natur', 'Services & Pricing: Image Film, Documentary, Social Media | Mutter Natur'),
    desc: L(lang,
      'Foto- & Video-Content ab 700 €, Imagefilm ab 1.300 €, Dokumentarfilm ab 3.000 €, Social Media und langfristige Zusammenarbeit. Endpreise, Ablauf und FAQ.',
      'Photo & video content from €700, image films from €1,300, documentaries from €3,000, social media and long-term collaboration. Final prices, process and FAQ.'),
    ld: [faqLd(ALL_FAQ, lang)],
  });
}

// ===========================================================================
// Service pages
// ===========================================================================
for (const sk of SERVICE_ORDER) {
  const s = SERVICES[sk];
  for (const lang of LANGS) {
    const inquiry = `${url('contact', lang)}?leistung=${s.key}#projektanfrage`;
    let examples = '';
    if (s.examples.films) examples = `<div class="video-grid-3">\n${s.examples.films.map((k) => videoCard(k, lang)).join('\n')}\n</div>`;
    if (s.examples.insta) examples = `<div class="card-grid photo">\n${s.examples.insta.map((k) => instaCard(k, lang)).join('\n')}\n</div>`;
    if (s.examples.todo) examples = `<p>${todo(s.examples.todo[lang])}</p>`;
    const body = `
<section class="section service-hero">
  <div class="container service-hero-grid">
    <div data-reveal>
      <a class="back-link" href="${url('services', lang)}">← ${L(lang, 'Alle Leistungen', 'All services')}</a>
      ${s.featured ? `<span class="badge" style="margin-bottom:1rem">${UI[lang].recommended}</span>` : ''}
      <h1>${s.title[lang]}</h1>
      <p class="lede">${s.short[lang]}</p>
      <div class="hero-actions">
        <a href="${inquiry}" class="btn btn-primary">${L(lang, `${s.title.de} anfragen`, `Request ${s.title.en.toLowerCase()}`)}</a>
        <a href="#preis" class="btn btn-ghost">${L(lang, 'Preis & Umfang', 'Price & scope')}</a>
      </div>
    </div>
    <figure data-reveal>${img(s.img, s.alt[lang], { eager: true })}</figure>
  </div>
</section>

<section class="section section-border-top">
  <div class="container two-col">
    <div class="prose" data-reveal>
      <span class="eyebrow">${L(lang, 'Worum es geht', 'What it is')}</span>
${s.intro[lang].map((p) => `      <p class="lede">${p}</p>`).join('\n')}
      <h2 style="font-size:1.3rem;margin-top:2rem">${L(lang, 'Für wen?', 'Who is it for?')}</h2>
      <p>${s.forWhom[lang]}</p>
    </div>
    <div class="price-box" id="preis" data-reveal>
      <span class="eyebrow">${L(lang, 'Preis & Umfang', 'Price & scope')}</span>
      <p class="pricing-note">${s.scope[lang]}</p>
      <div class="price">${s.price[lang]}</div>
      <ul>
${s.includes[lang].map((i) => `        <li>${i}</li>`).join('\n')}
      </ul>
      <a href="${inquiry}" class="btn btn-primary">${L(lang, 'Jetzt anfragen', 'Request now')}</a>
      ${priceTerms(lang)}
    </div>
  </div>
</section>

<section class="section section-border-top">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${L(lang, 'Beispiele', 'Examples')}</span>
      <h2>${L(lang, 'So kann das aussehen.', 'What it can look like.')}</h2>
    </div>
    ${examples}
  </div>
</section>

<section class="section section-border-top">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">${L(lang, 'So läuft es ab', 'How it works')}</span>
    </div>
    ${steps(lang)}
  </div>
</section>

<section class="section section-border-top">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>${L(lang, 'Häufige Fragen', 'Frequently asked questions')}</h2>
    </div>
    ${faqList(s.faq, lang)}
    <p style="margin-top:1.5rem"><a class="text-link" href="${url('services', lang)}#faq">${L(lang, 'Alle Fragen & Antworten', 'All questions & answers')}</a></p>
  </div>
</section>

<section class="section-cta section-border-top">
  <div class="container" data-reveal>
    <h2>${L(lang, `Passt ${s.featured ? 'ein Imagefilm' : 'das'} zu Ihrem Vorhaben?`, 'Does this fit your project?')}</h2>
    <p class="lede" style="margin-inline:auto;margin-top:1rem">${L(lang, 'Schreiben Sie uns kurz – wir melden uns innerhalb von 48 Stunden.', 'Drop us a short note – we get back to you within 48 hours.')}</p>
    <a href="${inquiry}" class="btn btn-primary" style="margin-top:1.5rem">${L(lang, `${s.title.de} anfragen`, `Request ${s.title.en.toLowerCase()}`)}</a>
  </div>
</section>
`;
    const ld = [serviceLd(sk, lang), faqLd(s.faq, lang)];
    if (s.examples.films) ld.push(...s.examples.films.map((k) => videoLd(k, lang)));
    layout({ lang, key: sk, section: 'services', body, og: s.ogImg, title: s.seoTitle[lang], desc: s.seoDesc[lang], ld });
  }
}

// ===========================================================================
// Portfolio overview
// ===========================================================================
const CASES = [
  { key: 'caseTeufel', img: 'teufelshoehle-pottenstein-logo.webp', logo: true, title: 'Teufelshöhle Pottenstein',
    tag: { de: 'Tourismus · Dokumentarfilm', en: 'Tourism · Documentary' },
    text: { de: 'Mehr Reichweite und Material für die Öffentlichkeitsarbeit – zusammen mit dem Tourismusverband Pottenstein.', en: 'More reach and material for public relations – together with the Pottenstein tourism association.' } },
  { key: 'caseDonau', img: 'donaumoos-zweckverband-logo.webp', logo: true, title: 'Donaumoos',
    tag: { de: 'Zweckverband · Markenfilm', en: 'Public body · Brand film' },
    text: { de: 'Ein ruhiger Film über Landschaft, Erinnerung und Wandel für den Donaumoos Zweckverband.', en: 'A quiet film about landscape, memory and transformation for the Donaumoos Zweckverband.' } },
  { key: 'caseBerg', img: 'bergwaldprojekt-naturfotografie.webp', title: 'Bergwaldprojekt',
    tag: { de: 'NGO · Fotografie', en: 'NGO · Photography' },
    text: { de: todo('Ein Satz zum Projekt mit dem Bergwaldprojekt'), en: todo('one sentence about the Bergwaldprojekt project') } },
];
const caseCard = (c, lang) => `<a class="service-card" href="${url(c.key, lang)}" data-reveal>
  <div class="card-media${c.logo ? ' is-logo' : ''}">${img(c.img, c.title)}</div>
  <div class="service-card-body">
    <span class="card-meta" style="margin:0">${c.tag[lang]}</span>
    <h3>${c.title}</h3>
    <p>${c.text[lang]}</p>
    <span class="service-more">${L(lang, 'Fallstudie lesen', 'Read case study')} →</span>
  </div>
</a>`;

for (const lang of LANGS) {
  const worlds = [
    ['films', 'independent-filme-portfolio.webp', L(lang, 'Eule in Schwarz-Weiß', 'Owl in black and white'), L(lang, 'Filme', 'Films'),
      L(lang, 'Unsere eigenen Natur- und Kurzfilme – frei erzählt, unabhängig von Kundenprojekten.', 'Our own nature films and short films – independent of client projects.')],
    ['docs', 'dokumentarfilm-markenfilm-portfolio.webp', L(lang, 'Waldarbeiter zwischen gefällten Baumstämmen', 'Forest worker among felled tree trunks'), L(lang, 'Dokumentationen & Markenfilme', 'Documentaries & Brand Films'),
      L(lang, 'Dokumentarfilme für Unternehmen, Organisationen und Projekte.', 'Documentary storytelling for companies, organizations and meaningful projects.')],
    ['photography', 'fotografie-social-media-portfolio.avif', L(lang, 'Freiwilliger trägt einen Eimer bei einer Pflanzaktion', 'Volunteer carrying a bucket at a planting event'), L(lang, 'Fotografie & Social Media', 'Photography & Social Media'),
      L(lang, 'Fotografie, Reels und Instagram-Kooperationen für Marken und Projekte.', 'Photography, reels and Instagram collaborations for brands and projects.')],
  ];
  const body = `
<section class="section" style="padding-top:clamp(8rem,16vw,11rem)">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">Portfolio</span>
      <h1>${L(lang, 'Unsere Arbeiten.', 'Our work.')}</h1>
      <p class="lede" style="margin-top:1.25rem">${L(lang, 'Fallstudien aus echten Kundenprojekten – und unsere eigenen Filme, Dokumentationen und Fotografie.', 'Case studies from real client projects – plus our own films, documentaries and photography.')}</p>
    </div>
  </div>
</section>

<section class="section section-border-top" id="projekte" style="scroll-margin-top:5rem">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${UI[lang].footerCases}</span>
      <h2>${L(lang, 'Ausgangslage, Umsetzung, Ergebnis.', 'Challenge, approach, result.')}</h2>
    </div>
    <div class="case-list">
${CASES.map((c) => caseCard(c, lang)).join('\n')}
    </div>
  </div>
</section>

<section class="section section-border-top">
  <div class="container">
    <div class="section-head" data-reveal>
      <span class="eyebrow">${L(lang, 'Bereiche', 'Categories')}</span>
      <h2>${L(lang, 'Wählen Sie eine Erzählwelt.', 'Choose a storytelling world.')}</h2>
    </div>
    <div class="card-grid work-worlds">
${worlds.map(([k, im, alt, h, p]) => `      <a class="card" data-reveal href="${url(k, lang)}">
        <div class="card-media">${img(im, alt)}</div>
        <h3>${h}</h3>
        <p>${p}</p>
      </a>`).join('\n')}
    </div>
  </div>
</section>

${ctaBanner(lang, L(lang, 'Ihr Projekt könnte das nächste sein.', 'Your project could be next.'), L(lang, 'Erzählen Sie uns, was Sie vorhaben – wir melden uns innerhalb von 48 Stunden.', 'Tell us what you have in mind – we get back to you within 48 hours.'))}
`;
  layout({
    lang, key: 'work', section: 'work', body, og: 'independent-filme-portfolio',
    title: L(lang, 'Portfolio: Filme, Dokumentationen & Fallstudien | Mutter Natur', 'Portfolio: Films, Documentaries & Case Studies | Mutter Natur'),
    desc: L(lang, 'Fallstudien (Teufelshöhle Pottenstein, Donaumoos, Bergwaldprojekt), Naturfilme, Dokumentationen, Markenfilme und Fotografie von Mutter Natur aus Bayern.', 'Case studies (Teufelshöhle Pottenstein, Donaumoos, Bergwaldprojekt), nature films, documentaries, brand films and photography by Mutter Natur from Bavaria.'),
  });
}

// ===========================================================================
// Portfolio sub-pages
// ===========================================================================
function subCta(lang, h2) {
  return `<section class="section-cta section-border-top">
  <div class="container" data-reveal>
    <h2>${h2}</h2>
    <p class="lede" style="margin-inline:auto;margin-top:1rem">${L(lang, 'Erzählen Sie uns von Ihrem Projekt – wir melden uns innerhalb von 48 Stunden.', 'Tell us about your project – we get back to you within 48 hours.')}</p>
    <div class="hero-actions" style="justify-content:center;margin-top:1.5rem">
      <a href="${url('contact', lang)}#projektanfrage" class="btn btn-primary">${UI[lang].cta}</a>
      <a href="${url('work', lang)}" class="btn btn-ghost">${UI[lang].backToWork}</a>
    </div>
  </div>
</section>`;
}
const compactHero = (lang, imgFile, alt, eyebrow, h1, lede = '') => `<section class="hero hero-compact">
  <div class="hero-media">${img(imgFile, alt, { eager: true })}</div>
  <div class="container hero-content" data-reveal>
    <a class="back-link" href="${url('work', lang)}">${UI[lang].backToWork}</a>
    <span class="eyebrow">${eyebrow}</span>
    <h1>${h1}</h1>${lede ? `\n    <p class="lede">${lede}</p>` : ''}
  </div>
</section>`;

for (const lang of LANGS) {
  // Films
  layout({
    lang, key: 'films', section: 'work', og: 'filmstill-naturdokumentation-hero',
    title: L(lang, 'Naturfilme & Kurzdokumentationen | Mutter Natur', 'Nature Films & Short Documentaries | Mutter Natur'),
    desc: L(lang, 'Eigene Naturfilme und Kurzdokumentationen von Mutter Natur: Die Wächter der Berge, Die große Verbindung, Der Vogel, den wir fast verloren hätten, The Tomato.', 'Independent nature films and short documentaries by Mutter Natur: The Watchers of the Mountain, The Great Connection, The Bird We Almost Lost, The Tomato.'),
    ld: ['waechter', 'verbindung', 'vogel', 'tomato'].map((k) => videoLd(k, lang)),
    body: `
${compactHero(lang, 'filmstill-naturdokumentation-hero.avif', L(lang, 'Schwan vor einem Schloss im Abendlicht', 'Swan in front of a palace at dusk'), L(lang, 'Portfolio / Filme', 'Portfolio / Films'), L(lang, 'Unsere eigenen Filme und visuellen Geschichten.', 'Independent films and visual stories by Mutter Natur.'), L(lang, 'Frei erzählte Naturfilme und Kurzdokumentationen – gezeigt auf Festivals wie dem DOK.fest München.', 'Independently told nature films and short documentaries – shown at festivals such as DOK.fest München.'))}
<section class="section">
  <div class="container video-grid-3" style="grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))">
${['waechter', 'verbindung', 'vogel', 'tomato'].map((k) => videoCard(k, lang, { h: 'h2' })).join('\n')}
  </div>
</section>
${subCta(lang, L(lang, 'Sie wollen einen Film in diesem Stil?', 'Want a film like this for your project?'))}
`,
  });

  // Documentaries & brand films
  layout({
    lang, key: 'docs', section: 'work', og: 'dokumentarfilm-markenfilm-portfolio',
    title: L(lang, 'Dokumentationen & Markenfilme für Organisationen | Mutter Natur', 'Documentaries & Brand Films for Organizations | Mutter Natur'),
    desc: L(lang, 'Dokumentarische Markenfilme für Unternehmen, Tourismus und Organisationen – u. a. für den Donaumoos Zweckverband und die Teufelshöhle Pottenstein.', 'Documentary brand films for companies, tourism and organizations – including the Donaumoos Zweckverband and the Teufelshöhle Pottenstein.'),
    ld: ['donaumoos', 'teufel', 'kohle'].map((k) => videoLd(k, lang)),
    body: `
${compactHero(lang, 'dokumentarfilm-markenfilm-portfolio.webp', L(lang, 'Waldarbeiter zwischen gefällten Baumstämmen', 'Forest worker among felled tree trunks'), L(lang, 'Portfolio / Dokumentationen & Markenfilme', 'Portfolio / Documentaries & Brand Films'), L(lang, 'Dokumentarfilme für Unternehmen, Organisationen und Projekte.', 'Documentary storytelling for companies, organizations, and meaningful projects.'), L(lang, 'Wir drehen authentische, dokumentarische Filme und Markengeschichten – mit Fokus auf echte Menschen, Veränderung und Emotion.', 'We create authentic documentary-style films and brand stories, focused on real people, transformation and emotional storytelling.'))}
<section class="section">
  <div class="container video-grid-3">
${videoCard('donaumoos', lang, { h: 'h2', link: { href: url('caseDonau', lang), text: L(lang, 'Zur Fallstudie', 'Read the case study') } })}
${videoCard('teufel', lang, { h: 'h2', link: { href: url('caseTeufel', lang), text: L(lang, 'Zur Fallstudie', 'Read the case study') } })}
${videoCard('kohle', lang, { h: 'h2', link: { href: url('imagefilm', lang), text: L(lang, 'Mehr zum Imagefilm', 'More about image films') } })}
  </div>
</section>
${subCta(lang, L(lang, 'Ihre Organisation verdient einen Film wie diesen.', 'Your organization deserves a film like this.'))}
`,
  });

  // Photography & social media
  layout({
    lang, key: 'photography', section: 'work', og: 'naturfotografie-hero-muenchen',
    title: L(lang, 'Fotografie & Social-Media-Content | Mutter Natur', 'Photography & Social Media Content | Mutter Natur'),
    desc: L(lang, 'Fotografie, Reels und Instagram-Kooperationen für Marken und Projekte – u. a. Bergwaldprojekt, Ozeankind, Moorflut und Miya Forest.', 'Photography, reels and Instagram collaborations for brands and projects – including Bergwaldprojekt, Ozeankind, Moorflut and Miya Forest.'),
    body: `
${compactHero(lang, 'naturfotografie-hero-muenchen.jpg', L(lang, 'Porträt eines Jungen in einem Türrahmen', 'Portrait of a boy in a doorway'), L(lang, 'Portfolio / Fotografie & Social Media', 'Portfolio / Photography & Social Media'), L(lang, 'Visueller Content und digitales Storytelling für Marken.', 'Visual content and digital storytelling for brands.'))}
<section class="section">
  <div class="container card-grid photo masonry">
${Object.keys(C.INSTA).map((k) => instaCard(k, lang)).join('\n')}
  </div>
</section>
<section class="section section-border-top" id="mutter-natur-deutschland">
  <div class="container feature-split" data-reveal>
    <div>
      <span class="eyebrow">Instagram · @mutternatur_d</span>
      <h2>${L(lang, 'Mutter Natur Deutschland: Ihr Projekt auf unserem Kanal.', 'Mutter Natur Deutschland: your project on our channel.')}</h2>
      <p class="lede" style="margin-top:1rem">${L(lang,
        'Auf Instagram zeigen wir Natur-, Umwelt- und Tierschutzprojekte aus dem deutschsprachigen Raum – als gemeinsamen Collab-Post: zwei Accounts, eine Reichweite. Kostenlos.',
        'On Instagram we feature nature, environmental and animal-protection projects from German-speaking countries – as joint collab posts: two accounts, one reach. Free of charge.')}</p>
      <div class="hero-actions">
        <a href="${url('collab', 'de')}" class="btn btn-primary">${L(lang, 'So funktioniert die Kollaboration', 'How the collaboration works (German)')}</a>
        <a href="${S.instagramMN}" class="btn btn-ghost" target="_blank" rel="noopener">@mutternatur_d</a>
      </div>
    </div>
    ${img(C.COLLAB.img, C.COLLAB.alt[lang])}
  </div>
</section>
${subCta(lang, L(lang, 'Sie brauchen Fotos und Content für Ihre Kanäle?', 'Need photos and content for your channels?'))}
`,
  });
}

// ===========================================================================
// Case studies
// ===========================================================================
function caseStudy(lang, { key, title, seo, h1, lede, facts, sections, media, og, ld }) {
  const body = `
<section class="section service-hero">
  <div class="container">
    <div data-reveal style="max-width:60rem">
      <a class="back-link" href="${url('work', lang)}#projekte">← ${L(lang, 'Alle Fallstudien', 'All case studies')}</a>
      <span class="eyebrow">${UI[lang].caseLabel} · ${title}</span>
      <h1 class="case-h1">${h1}</h1>
      <p class="lede" style="margin-top:1.25rem">${lede}</p>
    </div>
    <dl class="case-facts" data-reveal>
${facts.map(([k, v]) => `      <div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
    </dl>
  </div>
</section>

<section class="section section-border-top">
  <div class="container" data-reveal>${media}</div>
</section>

<section class="section section-border-top">
  <div class="container case-steps">
${sections.map(([h, p]) => `    <div class="case-step" data-reveal>
      <h2>${h}</h2>
      <div class="prose">${p}</div>
    </div>`).join('\n')}
  </div>
</section>

${ctaBanner(lang, L(lang, 'Sie haben ein ähnliches Projekt?', 'Have a similar project?'), L(lang, 'Erzählen Sie uns davon – wir melden uns innerhalb von 48 Stunden.', 'Tell us about it – we get back to you within 48 hours.'))}
`;
  layout({ lang, key, section: 'work', body, og, title: seo, desc: stripPlain(lede).slice(0, 158), ld });
}
const stripPlain = (s) => B.stripTags(s);
const H = (lang) => ({
  start: L(lang, 'Ausgangslage', 'The starting point'),
  goal: L(lang, 'Ziel', 'The goal'),
  did: L(lang, 'Was wir gemacht haben', 'What we did'),
  result: L(lang, 'Ergebnis', 'The result'),
});

for (const lang of LANGS) {
  const h = H(lang);
  caseStudy(lang, {
    key: 'caseTeufel', title: 'Teufelshöhle Pottenstein', seo: L(lang, 'Fallstudie Teufelshöhle Pottenstein: Dokumentarfilm für den Tourismus | Mutter Natur', 'Case Study Teufelshöhle Pottenstein: Documentary for Tourism | Mutter Natur'), og: 'teufelshoehle-pottenstein-logo',
    h1: L(lang, 'Mehr Reichweite für eine der größten Schauhöhlen Deutschlands.', 'More reach for one of Germany’s largest show caves.'),
    lede: L(lang,
      'Gemeinsam mit dem Tourismusverband Pottenstein haben wir die Dokumentation „Eine Welt unter unseren Füßen“ über die Teufelshöhle produziert.',
      'Together with the Pottenstein tourism association we produced the documentary “Eine Welt unter unseren Füßen” (A world beneath our feet) about the Teufelshöhle.'),
    facts: [
      [L(lang, 'Partner', 'Partner'), L(lang, 'Tourismusverband Pottenstein', 'Pottenstein tourism association')],
      [L(lang, 'Leistung', 'Service'), L(lang, 'Dokumentarfilm', 'Documentary film')],
      ['Film', '„Eine Welt unter unseren Füßen“ · 6:34 Min.'],
      [L(lang, 'Veröffentlicht', 'Published'), '2026'],
    ],
    media: ytPlayer('teufel', lang),
    sections: [
      [h.start, `<p>${L(lang, 'Die Teufelshöhle in Pottenstein ist eine der größten Schauhöhlen Deutschlands.', 'The Teufelshöhle in Pottenstein is one of Germany’s largest show caves.')} ${todo(L(lang, 'Ausgangslage genauer beschreiben: Was war die Herausforderung vor dem Projekt?', 'describe the starting point: what was the challenge before the project?'))}</p>`],
      [h.goal, `<p>${L(lang, 'Zwei Ziele: die Reichweite der Höhle steigern und Material für die Öffentlichkeitsarbeit liefern.', 'Two goals: increase the cave’s reach and deliver material for public relations.')}</p>`],
      [h.did, `<p>${L(lang, 'Wir haben die Dokumentation „Eine Welt unter unseren Füßen“ produziert.', 'We produced the documentary “Eine Welt unter unseren Füßen”.')} ${todo(L(lang, 'Umfang ergänzen: Drehtage, Interviews, zusätzliche Fotos oder Social-Clips', 'add scope: shooting days, interviews, additional photos or social clips'))}</p>`],
      [h.result, `<p>${todo(L(lang, 'Ergebnis mit Zahlen oder Einsatz: z. B. Aufrufe, Reichweite, wo der Film eingesetzt wird, Zitat des Tourismusverbands', 'result with numbers or usage: e.g. views, reach, where the film is used, quote from the tourism association'))}</p>`],
    ],
    ld: [videoLd('teufel', lang)],
  });

  caseStudy(lang, {
    key: 'caseDonau', title: 'Donaumoos', seo: L(lang, 'Fallstudie Donaumoos: Markenfilm für den Zweckverband | Mutter Natur', 'Case Study Donaumoos: Brand Film for a Public Body | Mutter Natur'), og: 'donaumoos-zweckverband-logo',
    h1: L(lang, 'Ein Film über Landschaft, Erinnerung und Wandel.', 'A film about landscape, memory and transformation.'),
    lede: L(lang,
      'Für den Donaumoos Zweckverband haben wir einen ruhigen, dokumentarischen Markenfilm produziert: „Wir haben die Möglichkeit, gemeinsam dieses Moor zu schützen“.',
      'For the Donaumoos Zweckverband we produced a quiet, documentary-style brand film: “Wir haben die Möglichkeit, gemeinsam dieses Moor zu schützen” (We have the chance to protect this moor together).'),
    facts: [
      [L(lang, 'Auftraggeber', 'Client'), 'Donaumoos Zweckverband'],
      [L(lang, 'Leistung', 'Service'), L(lang, 'Dokumentation · Markenfilm', 'Documentary · Brand film')],
      ['Film', '2:01 Min.'],
      [L(lang, 'Veröffentlicht', 'Published'), '2026'],
    ],
    media: ytPlayer('donaumoos', lang),
    sections: [
      [h.start, `<p>${todo(L(lang, 'Ausgangslage: Was macht der Zweckverband, was war die Herausforderung?', 'starting point: what does the association do, what was the challenge?'))}</p>`],
      [h.goal, `<p>${todo(L(lang, 'Ziel des Films', 'goal of the film'))}</p>`],
      [h.did, `<p>${L(lang, 'Ein ruhiger Film über Landschaft, Erinnerung und Wandel im Donaumoos.', 'A quiet film about landscape, memory and transformation in the Donaumoos.')} ${todo(L(lang, 'Umfang ergänzen: Drehtage, Interviews, Lieferumfang', 'add scope: shooting days, interviews, deliverables'))}</p>`],
      [h.result, `<p>${todo(L(lang, 'Ergebnis mit Zahlen oder Einsatz, ggf. Zitat des Zweckverbands', 'result with numbers or usage, ideally a quote from the association'))}</p>`],
    ],
    ld: [videoLd('donaumoos', lang)],
  });

  caseStudy(lang, {
    key: 'caseBerg', title: 'Bergwaldprojekt', seo: L(lang, 'Fallstudie Bergwaldprojekt: Fotografie & Social Media | Mutter Natur', 'Case Study Bergwaldprojekt: Photography & Social Media | Mutter Natur'), og: 'bergwaldprojekt-naturfotografie',
    h1: L(lang, 'Bergwaldprojekt', 'Bergwaldprojekt') + ` ${todo(L(lang, 'Untertitel mit Kernaussage des Projekts', 'subtitle with the key message of the project'))}`,
    lede: todo(L(lang, 'Ein bis zwei Sätze: Wer ist das Bergwaldprojekt und was haben wir gemeinsam gemacht?', 'one or two sentences: who is the Bergwaldprojekt and what did we do together?')),
    facts: [
      [L(lang, 'Partner', 'Partner'), 'Bergwaldprojekt'],
      [L(lang, 'Leistung', 'Service'), L(lang, 'Fotografie & Social Media', 'Photography & social media')],
      [L(lang, 'Zeitraum', 'Period'), todo(L(lang, 'Jahr', 'year'))],
    ],
    media: `<div class="card-grid photo" style="grid-template-columns:1fr;max-width:40rem">${instaCard('bergwald', lang)}</div>`,
    sections: [
      [h.start, `<p>${todo(L(lang, 'Ausgangslage', 'starting point'))}</p>`],
      [h.goal, `<p>${todo(L(lang, 'Ziel', 'goal'))}</p>`],
      [h.did, `<p>${todo(L(lang, 'Was wir gemacht haben (Fotos, Beiträge, Umfang)', 'what we did (photos, posts, scope)'))}</p>`],
      [h.result, `<p>${todo(L(lang, 'Ergebnis', 'result'))}</p>`],
    ],
  });
}

// ===========================================================================
// About
// ===========================================================================
for (const lang of LANGS) {
  const body = `
<section class="section" style="padding-top:clamp(8rem,16vw,11rem)">
  <div class="container about-hero" data-reveal>
    <div>
      <span class="eyebrow">${UI[lang].nav.about}</span>
      <h1>${L(lang, 'Filme über Menschen, die etwas für die Natur tun.', 'Films about people who do something for nature.')}</h1>
      <p class="lede" style="margin-top:1.25rem">${L(lang, 'Mutter Natur ist eine Filmproduktion aus Bayern, Raum München/Freising.', 'Mutter Natur is a film production company from Bavaria, based in the Munich/Freising area.')}</p>
      <p style="margin-top:1.25rem">${L(lang,
        'Unsere Dokumentationen zeigen Umweltprojekte, ihre echte Wirkung, die Schönheit der Natur und die zerbrechliche Verbindung zwischen Mensch und Erde. Wir erzählen, was mit unserem Planeten passiert – und was möglich ist, wenn Menschen handeln.',
        'Our documentaries explore environmental projects — showing their real impact, the beauty of nature, and the fragile connection between humans and the earth. We tell stories that reveal what is happening to our planet — and what is still possible when people take action.')}</p>
    </div>
    <figure>
      ${img('xaver-zimmermann-naturfilmer-muenchen.webp', L(lang, 'Grünes Unendlich-Emblem von Mutter Natur', 'Green infinity emblem of Mutter Natur'), { eager: true })}
    </figure>
  </div>
</section>

<section class="section section-border-top" id="gruender">
  <div class="container founder-split" data-reveal>
    <div class="founder-photo-wrap">
      ${img('xaver-zimmermann-gruender-portrait.webp', L(lang, 'Xaver Zimmermann, Gründer von Mutter Natur', 'Xaver Zimmermann, founder of Mutter Natur'), { cls: 'founder-photo' })}
    </div>
    <div>
      <span class="eyebrow">${L(lang, 'Der Gründer', 'Meet the founder')}</span>
      <h2>${L(lang, 'Hallo, ich bin Xaver Zimmermann.', 'Hi, I’m Xaver Zimmermann.')}</h2>
      <p class="lede" style="margin-top:1rem">${L(lang, 'Ich bin Naturfilmer und Geschichtenerzähler aus dem Raum München und habe Mutter Natur gegründet.', 'I’m a nature filmmaker and storyteller from the Munich area, and the founder of Mutter Natur.')}</p>
      <p style="margin-top:1rem">${L(lang, 'Jedes Projekt beginnt bei mir gleich: mit Zuhören. Der Natur, den Menschen, die mit ihr leben, und der Wirkung, die wir gemeinsam erreichen wollen.', 'Every project starts the same way for me — by listening. To nature, to the people living alongside it, and to the impact we’re trying to make together.')}</p>
      <p style="margin-top:1rem">${L(lang, 'Mutter Natur ist ein kleines Team: Ich arbeite eng mit festen Partnern zusammen – je nachdem, was eine Produktion braucht. Sie haben also immer einen direkten Ansprechpartner.', 'Mutter Natur is a small team — I work closely with trusted collaborators depending on what each production needs. So you always have one direct contact.')}</p>
    </div>
  </div>
</section>

<section class="section section-border-top">
  <div class="container principles-block" data-reveal>
    <h2>${L(lang, 'Unsere Haltung', 'What we stand for')}</h2>
    <p class="lede">${L(lang, 'Echte Geschichten statt inszenierter Werbung. Wir zeigen, was ist – nicht, was sich verkauft. Denn wer anders hinsieht, handelt anders.', 'Real stories, not staged narratives. We show what is, not what sells. Because once we see differently, we begin to act differently.')}</p>
    <p>${L(lang, 'Wir arbeiten mit Unternehmen, Organisationen und Projekten, die wirklich etwas bewegen – und erzählen Geschichten, die über Werbung hinausgehen und lange tragen.', 'We work with brands, organizations and projects that create real impact – and tell stories that go beyond advertising and are built to last.')}</p>
  </div>
</section>

<section class="section section-border-top" id="festivals">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">Festivals</span>
      <h2>${L(lang, 'Unsere Filme auf Festivals', 'Our films at festivals')}</h2>
    </div>
    ${awardsBlock(lang)}
  </div>
</section>

<section class="section section-border-top">
  <div class="container" data-reveal>
    <div class="section-head">
      <span class="eyebrow">${L(lang, 'Für wen wir arbeiten', 'Who we work with')}</span>
    </div>
    <ul class="check-list">
      <li>${L(lang, 'Unternehmen und nachhaltige Marken', 'Companies and sustainable brands')}</li>
      <li>${L(lang, 'Tourismus- und naturnahe Organisationen', 'Tourism and nature-based organizations')}</li>
      <li>${L(lang, 'Umwelt-NGOs, Naturschutzprojekte und Stiftungen', 'Environmental NGOs, conservation projects and foundations')}</li>
      <li>${L(lang, 'Behörden, Zweckverbände, Forschung und Wissenschaft', 'Public authorities, special-purpose associations, research and science')}</li>
      <li>${L(lang, 'Lokale Initiativen mit echter Relevanz', 'Local initiatives with real-world relevance')}</li>
      <li>${L(lang, 'Sender, Produktionsfirmen und Förderungen – für eigene Naturfilme und Koproduktionen', 'Broadcasters, production companies and funding bodies – for independent nature films and co-productions')}</li>
    </ul>
  </div>
</section>

${ctaBanner(lang, L(lang, 'Lassen Sie uns zusammenarbeiten.', 'Let’s work together.'), L(lang, 'Wir melden uns innerhalb von 48 Stunden.', 'We get back to you within 48 hours.'), 'regisseur-dreharbeiten-natur.webp', L(lang, 'Regisseur mit Kamera bei Dreharbeiten', 'Director with camera on a shoot'))}
`;
  layout({
    lang, key: 'about', section: 'about', body, og: 'xaver-zimmermann-gruender-portrait',
    title: L(lang, 'Über uns – Naturfilmer Xaver Zimmermann | Mutter Natur', 'About – Nature Filmmaker Xaver Zimmermann | Mutter Natur'),
    desc: L(lang, 'Mutter Natur ist eine Filmproduktion aus Bayern (Raum München/Freising), gegründet von Naturfilmer Xaver Zimmermann. Filme über Menschen, die etwas für die Natur tun.', 'Mutter Natur is a film production company from Bavaria (Munich/Freising area), founded by nature filmmaker Xaver Zimmermann.'),
    ld: [{ '@context': 'https://schema.org', '@type': 'Person', name: 'Xaver Zimmermann', jobTitle: L(lang, 'Naturfilmer & Gründer', 'Nature filmmaker & founder'), worksFor: { '@id': `${S.site}/#organization` }, image: `${S.site}/assets/img/xaver-zimmermann-gruender-portrait.webp` }],
  });
}

// ===========================================================================
// Contact (two forms) + thank-you page
// ===========================================================================
const opt = (list) => list.map((o) => `<option>${o}</option>`).join('');
for (const lang of LANGS) {
  const thanks = url('thanks', lang);
  const svcOptions = FORM_OPTIONS.service.map((o) => `<option data-key="${o.key}">${o[lang]}</option>`).join('');
  const optional = `<span class="opt">(${L(lang, 'optional', 'optional')})</span>`;
  const privacyNote = `<p class="form-privacy">${L(lang, 'Ihre Angaben verwenden wir nur, um Ihre Anfrage zu beantworten. Der Versand läuft über Web3Forms – mehr dazu in der', 'We only use your details to answer your inquiry. Sending is handled by Web3Forms – see our')} <a href="${url('datenschutz', 'de')}#formulare">${L(lang, 'Datenschutzerklärung', 'privacy policy (German)')}</a>.</p>`;
  const honeypot = `<div class="hp-field" aria-hidden="true"><label>Bitte leer lassen <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></label></div>`;
  const booking = S.bookingUrl
    ? `<p style="margin-top:2rem"><a class="btn btn-ghost" href="${S.bookingUrl}" target="_blank" rel="noopener">${L(lang, 'Kennenlerngespräch buchen (15 Min.)', 'Book a 15-minute intro call')}</a></p>`
    : '<!-- TODO (optional): Buchungslink in _src/content.js (SETTINGS.bookingUrl) eintragen – dann erscheint hier „Kennenlerngespräch buchen“ -->';
  const gbp = S.googleBusinessUrl
    ? `<div><dt>Google</dt><dd><a href="${S.googleBusinessUrl}" target="_blank" rel="noopener">${UI[lang].googleReviews}</a></dd></div>`
    : '<!-- TODO: Google-Unternehmensprofil in _src/content.js (SETTINGS.googleBusinessUrl) eintragen – dann erscheint hier der Link zu den Google-Bewertungen -->';

  const body = `
<section class="hero hero-compact">
  <div class="hero-media">${img('naturdokumentation-filmstill-kontakt.webp', L(lang, 'Nebelige Bergketten in Schwarz-Weiß', 'Misty mountain ridges in black and white'), { eager: true })}</div>
  <div class="container hero-content" data-reveal>
    <span class="eyebrow">${UI[lang].nav.contact}</span>
    <h1>${L(lang, 'Erzählen Sie uns von Ihrem Projekt.', 'Tell us about your project.')}</h1>
    <p class="lede">${L(lang, 'Ob konkreter Auftrag oder erste Idee: Schreiben Sie uns. Wir melden uns innerhalb von 48 Stunden – persönlich und unverbindlich.', 'Whether it’s a concrete project or an early idea: get in touch. We reply within 48 hours – personally and without obligation.')}</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div data-reveal>
      <h2 style="font-size:1.5rem">${L(lang, 'Zwei Wege zu uns', 'Two ways to reach us')}</h2>
      <div class="contact-choice">
        <a href="#kurzanfrage"><strong>${L(lang, 'Kurzanfrage', 'Quick inquiry')}</strong><span>${L(lang, 'Für Fragen und erste Ideen – in einer Minute ausgefüllt.', 'For questions and early ideas – done in a minute.')}</span></a>
        <a href="#projektanfrage"><strong>${L(lang, 'Projektanfrage', 'Project inquiry')}</strong><span>${L(lang, 'Für konkrete Vorhaben – damit wir Ihnen schnell ein Angebot machen können.', 'For concrete projects – so we can send you an offer quickly.')}</span></a>
      </div>
      <dl class="contact-meta">
        <div><dt>${L(lang, 'E-Mail', 'Email')}</dt><dd><a href="mailto:${S.email}">${S.email}</a></dd></div>
        <div><dt>${L(lang, 'Standort', 'Location')}</dt><dd>${L(lang, 'Bayern, Raum München/Freising – unterwegs in Deutschland, Österreich, der Schweiz und weltweit', 'Bavaria, Munich/Freising area – working across Germany, Austria, Switzerland and worldwide')}</dd></div>
        <div><dt>${L(lang, 'Antwort', 'Response')}</dt><dd>${L(lang, 'Innerhalb von 48 Stunden', 'Within 48 hours')}</dd></div>
        ${gbp}
      </dl>
      ${booking}
    </div>

    <div class="form-stack">
      <form class="form-card" id="kurzanfrage" data-form="${L(lang, 'Kurzanfrage über die Website', 'Quick inquiry via website')}" data-thanks="${thanks}" novalidate data-reveal>
        <span class="eyebrow">${L(lang, 'Kurzanfrage', 'Quick inquiry')}</span>
        <h2>${L(lang, 'Kurze Nachricht schreiben', 'Send a short message')}</h2>
        <p style="margin:0.5rem 0 1.5rem">${L(lang, 'Unverbindlich – wir antworten innerhalb von 48 Stunden.', 'No obligation – we reply within 48 hours.')}</p>
        <div class="form-field"><label for="k-name">Name</label><input id="k-name" name="name" type="text" autocomplete="name" required></div>
        <div class="form-field"><label for="k-email">${L(lang, 'E-Mail', 'Email')}</label><input id="k-email" name="email" type="email" autocomplete="email" required></div>
        <div class="form-field"><label for="k-message">${L(lang, 'Ihre Nachricht', 'Your message')}</label><textarea id="k-message" name="nachricht" rows="5" required></textarea></div>
        ${honeypot}
        <button type="submit" class="btn btn-primary">${L(lang, 'Nachricht senden', 'Send message')}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        ${privacyNote}
      </form>

      <form class="form-card" id="projektanfrage" data-form="${L(lang, 'Projektanfrage über die Website', 'Project inquiry via website')}" data-thanks="${thanks}" novalidate data-reveal>
        <span class="eyebrow">${L(lang, 'Projektanfrage', 'Project inquiry')}</span>
        <h2>${L(lang, 'Ihr Projekt im Detail', 'Your project in detail')}</h2>
        <p style="margin:0.5rem 0 0.5rem">${L(lang, 'Je mehr wir wissen, desto schneller und genauer wird unser Angebot. Pflichtfelder sind nur Name und E-Mail.', 'The more we know, the faster and more precise our offer. Only name and email are required.')}</p>

        <h3>${L(lang, '1. Über Sie', '1. About you')}</h3>
        <div class="form-row">
          <div class="form-field"><label for="p-name">Name</label><input id="p-name" name="name" type="text" autocomplete="name" required></div>
          <div class="form-field"><label for="p-email">${L(lang, 'E-Mail', 'Email')}</label><input id="p-email" name="email" type="email" autocomplete="email" required></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label for="p-org">${L(lang, 'Organisation / Unternehmen', 'Organization / company')} ${optional}</label><input id="p-org" name="organisation" type="text" autocomplete="organization"></div>
          <div class="form-field"><label for="p-orgtype">${L(lang, 'Art der Organisation', 'Type of organization')} ${optional}</label><select id="p-orgtype" name="organisationsart"><option value="">${L(lang, 'Bitte wählen', 'Please choose')}</option>${opt(FORM_OPTIONS.orgType[lang])}</select></div>
        </div>
        <div class="form-field"><label for="p-phone">${L(lang, 'Telefon', 'Phone')} ${optional}</label><input id="p-phone" name="telefon" type="tel" autocomplete="tel"></div>

        <h3>${L(lang, '2. Ihr Projekt', '2. Your project')}</h3>
        <div class="form-row">
          <div class="form-field"><label for="p-service">${L(lang, 'Projektart', 'Type of project')}</label><select id="p-service" name="leistung"><option value="">${L(lang, 'Bitte wählen', 'Please choose')}</option>${svcOptions}</select></div>
          <div class="form-field"><label for="p-budget">${L(lang, 'Budgetrahmen', 'Budget range')}</label><select id="p-budget" name="budget"><option value="">${L(lang, 'Bitte wählen', 'Please choose')}</option>${opt(FORM_OPTIONS.budget[lang])}</select></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label for="p-time">${L(lang, 'Zeitrahmen', 'Timeframe')}</label><select id="p-time" name="zeitrahmen"><option value="">${L(lang, 'Bitte wählen', 'Please choose')}</option>${opt(FORM_OPTIONS.timeframe[lang])}</select></div>
          <div class="form-field"><label for="p-location">${L(lang, 'Drehort', 'Location')} ${optional}</label><input id="p-location" name="drehort" type="text"></div>
        </div>
        <div class="form-field"><label for="p-desc">${L(lang, 'Worum geht es?', 'What is it about?')} ${optional}</label><textarea id="p-desc" name="beschreibung" rows="5" placeholder="${esc(L(lang, 'Ein paar Sätze zu Ihrem Projekt, Ihrem Ziel und Ihrer Zielgruppe', 'A few sentences about your project, your goal and your audience'))}"></textarea></div>
        ${honeypot}
        <button type="submit" class="btn btn-primary">${L(lang, 'Projektanfrage senden', 'Send project inquiry')}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        ${privacyNote}
      </form>
    </div>
  </div>
</section>
`;
  layout({
    lang, key: 'contact', section: 'contact', body, og: 'naturdokumentation-filmstill-kontakt',
    title: L(lang, 'Kontakt & Projektanfrage | Mutter Natur', 'Contact & Project Inquiry | Mutter Natur'),
    desc: L(lang, 'Imagefilm, Dokumentation oder Social Content anfragen: Kurzanfrage oder Projektanfrage – Antwort innerhalb von 48 Stunden. Mutter Natur, Bayern (Raum München/Freising).', 'Request an image film, documentary or social content: quick inquiry or project inquiry – reply within 48 hours. Mutter Natur, Bavaria (Munich/Freising area).'),
  });

  // Thank-you page
  layout({
    lang, key: 'thanks', section: 'contact', noindex: true, og: 'naturlandschaft-naturfilm-produktion-bayern',
    title: L(lang, 'Danke für Ihre Anfrage | Mutter Natur', 'Thank you for your inquiry | Mutter Natur'),
    desc: L(lang, 'Ihre Anfrage ist bei uns angekommen. Wir melden uns innerhalb von 48 Stunden.', 'Your inquiry has arrived. We will get back to you within 48 hours.'),
    body: `
<section class="section" style="padding-top:clamp(8rem,16vw,11rem)">
  <div class="container" style="max-width:46rem" data-reveal>
    <span class="eyebrow">${L(lang, 'Anfrage gesendet', 'Inquiry sent')}</span>
    <h1>${L(lang, 'Danke! Ihre Anfrage ist bei uns.', 'Thank you! Your inquiry has arrived.')}</h1>
    <p class="lede" style="margin-top:1.25rem">${L(lang, 'Wir melden uns innerhalb von 48 Stunden persönlich bei Ihnen.', 'We will get back to you personally within 48 hours.')}</p>
    <h2 style="font-size:1.3rem;margin-top:2.5rem">${L(lang, 'So geht es weiter', 'What happens next')}</h2>
    <ol class="next-steps">
      <li>${L(lang, 'Wir lesen Ihre Anfrage in Ruhe.', 'We read your inquiry carefully.')}</li>
      <li>${L(lang, 'Innerhalb von 48 Stunden melden wir uns – meist mit ein paar gezielten Fragen zu Ihrem Projekt.', 'Within 48 hours we get back to you – usually with a few targeted questions about your project.')}</li>
      <li>${L(lang, 'Sie erhalten ein individuelles Angebot mit Konzept, Umfang und Preis.', 'You receive a personal proposal with concept, scope and price.')}</li>
    </ol>
    <p style="margin-top:2rem">${L(lang, 'Eilig? Schreiben Sie direkt an', 'In a hurry? Email us directly at')} <a class="text-link" href="mailto:${S.email}">${S.email}</a>.</p>
    <div class="hero-actions">
      <a href="${url('work', lang)}" class="btn btn-primary">${L(lang, 'Bis dahin: Filme ansehen', 'Meanwhile: watch our films')}</a>
      <a href="${url('home', lang)}" class="btn btn-ghost">${L(lang, 'Zur Startseite', 'Back to the homepage')}</a>
    </div>
  </div>
</section>
`,
  });
}

// ===========================================================================
// Instagram collaboration "Mutter Natur Deutschland" (German only, not in the
// main navigation). Text taken from "Mutter-Natur-Kollaboration.html" (Google Drive).
// ===========================================================================
{
  const sections = [
    ['Wer wir sind', `<p>Mutter Natur Deutschland ist eine dokumentarische Plattform für Natur-, Umwelt- und Tierschutzprojekte im deutschsprachigen Raum.</p>
      <p>Dahinter steht eine Produktionsfirma, die sich auf die filmische Begleitung von Umwelt- und Naturprojekten spezialisiert hat: <a class="text-link" href="/">Mutter Natur</a>.</p>
      <p>Aus dieser Arbeit ist eine einfache Idee entstanden: Diese Geschichten nicht nur in einzelnen Filmen zu erzählen, sondern einen Ort zu schaffen, an dem sie alle sichtbar werden.</p>`],
    ['Was wir suchen', `<p>Projekte, Organisationen und Initiativen, die aktiv etwas für Natur, Umwelt, Tiere oder Nachhaltigkeit tun – und mehr Sichtbarkeit verdienen, als sie gerade haben.</p>
      <p>Uns interessiert nicht die perfekte Hochglanz-Story. Uns interessiert die echte:</p>
      <p><strong>Wer steckt dahinter? Warum gibt es dieses Projekt? Und was verändert sich dadurch wirklich?</strong></p>`],
    ['Wie es funktioniert', `<ol class="next-steps">
        <li><span><strong>Du entscheidest.</strong> Welchen Teil deiner Arbeit du zeigen willst, und wie. Reel oder Bildpost, dein Material, deine Form.</span></li>
        <li><span><strong>Wir veröffentlichen gemeinsam.</strong> Als Instagram-Collab-Post – zwei Accounts, eine Reichweite. Die Rechte an deinem Content bleiben bei dir.</span></li>
        <li><span><strong>Kein eigenes Material?</strong> Dann springen wir ein und produzieren mit dir zusammen. Daraus wird ein eigener Auftrag, den wir gemeinsam abstimmen.</span></li>
      </ol>
      <p style="margin-top:1.4em">Keine Vorgaben, keine Kosten. Wir schauen uns jeden Beitrag nur kurz an – nicht um reinzureden, sondern um sicherzugehen, dass er zu unserer Mission passt.</p>`],
    ['Was du davon hast', `<ul class="check-list">
        <li><span><strong>Zugang zu unserer Community.</strong> Menschen, die sich schon für die Natur interessieren und nur noch den letzten Schub zur echten Aktion brauchen.</span></li>
        <li><span><strong>Sichtbarkeit über zwei Kanäle.</strong> Mutter Natur und unser persönliches Netzwerk.</span></li>
        <li><span><strong>Professionelle, dokumentarische Aufbereitung deiner Geschichte.</strong> Kostenlos.</span></li>
        <li><span><strong>Einen Partner, der mitdenkt.</strong> Wenn aus deiner Story mehr werden soll, bauen wir gemeinsam weiter.</span></li>
      </ul>`],
    ['Grundprinzipien der Beiträge', `<ul class="check-list">
        <li>Ein starker Hook</li>
        <li>Emotionaler Einstieg</li>
        <li>Klare, verständliche Story</li>
        <li>Authentischer, dokumentarischer Stil</li>
        <li>Positive, lösungsorientierte Wirkung</li>
      </ul>`],
    ['Die Vision', `<p>Mutter Natur Deutschland soll die zentrale Plattform für moderne Natur- und Umweltprojekte im deutschsprachigen Raum werden.</p>
      <p class="lede">Mit echten Geschichten. Echter Reichweite. Und einer Community, die nicht nur zusieht, sondern selbst aktiv wird.</p>`],
  ];
  const body = `
<section class="hero hero-compact">
  <div class="hero-media">${img(C.COLLAB.img, C.COLLAB.alt.de, { eager: true })}</div>
  <div class="container hero-content" data-reveal>
    <a class="back-link" href="${url('services', 'de')}">← Alle Wege der Zusammenarbeit</a>
    <span class="eyebrow">Instagram-Kollaboration · Kostenlos</span>
    <h1>Mutter Natur Deutschland</h1>
    <p class="lede">Dokumentarische Plattform &amp; Umweltbewegung auf Instagram – für Projekte, die etwas für Natur, Umwelt und Tiere tun.</p>
    <div class="hero-actions">
      <a href="${url('contact', 'de')}?leistung=instagram#projektanfrage" class="btn btn-primary">Jetzt Kontakt aufnehmen</a>
      <a href="${S.instagramMN}" class="btn btn-ghost" target="_blank" rel="noopener">@mutternatur_d ansehen</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width:46rem;text-align:center" data-reveal>
    <p class="lede" style="font-size:clamp(1.3rem,3vw,1.75rem);color:var(--fg);margin-inline:auto">Es gibt Menschen, die jeden Tag für unsere Natur kämpfen.</p>
    <p class="lede" style="margin:0.6rem auto 0">Oft, ohne dass es jemand sieht.</p>
  </div>
</section>

<section class="section section-border-top">
  <div class="container" style="max-width:52rem" data-reveal>
    <div class="faq-list collab-list">
${sections.map(([h, p], i) => `      <details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary>${h}</summary>
        <div class="prose" style="margin-top:1rem">${p}</div>
      </details>`).join('\n')}
    </div>
  </div>
</section>

<section class="section-cta section-border-top">
  <div class="container" data-reveal>
    <h2>Nächster Schritt</h2>
    <p class="lede" style="margin-inline:auto;margin-top:1rem">Schreib uns kurz: Welches Projekt willst du zeigen – und was willst du daraus erzählen? Wir melden uns, und gemeinsam bringen wir deine Geschichte raus in die Welt.</p>
    <div class="hero-actions" style="justify-content:center;margin-top:1.5rem">
      <a href="${url('contact', 'de')}?leistung=instagram#projektanfrage" class="btn btn-primary">Jetzt Kontakt aufnehmen</a>
      <a href="mailto:${S.email}?subject=${encodeURIComponent('Instagram-Kollaboration Mutter Natur Deutschland')}" class="btn btn-ghost">Per E-Mail schreiben</a>
      <a href="${S.instagramMN}" class="btn btn-ghost" target="_blank" rel="noopener">Auf Instagram schreiben</a>
    </div>
    <p class="eyebrow" style="margin-top:3rem;color:var(--accent)">Go out there. Let’s live it.</p>
  </div>
</section>
`;
  layout({
    lang: 'de', key: 'collab', section: 'services', body, og: 'filmstill-wiederverbindung-galerie',
    title: 'Instagram-Kollaboration: Mutter Natur Deutschland | Mutter Natur',
    desc: 'Kostenlos sichtbar werden: Natur-, Umwelt- und Tierschutzprojekte zeigen ihre Arbeit als Instagram-Collab-Post auf „Mutter Natur Deutschland“ (@mutternatur_d).',
  });
}

// ===========================================================================
// 404 pages (served by Cloudflare for unknown URLs; nearest 404.html wins)
// ===========================================================================
for (const lang of LANGS) {
  layout({
    lang, key: 'home', file: lang === 'de' ? '404.html' : 'en/404.html', noindex: true, section: null,
    title: L(lang, 'Seite nicht gefunden | Mutter Natur', 'Page not found | Mutter Natur'),
    desc: L(lang, 'Diese Seite gibt es nicht (mehr).', 'This page does not exist.'),
    body: `
<section class="section-cta" style="padding-top:clamp(10rem,20vw,13rem)">
  <div class="container" data-reveal>
    <span class="eyebrow">404</span>
    <h1>${L(lang, 'Seite nicht gefunden.', 'Page not found.')}</h1>
    <p class="lede" style="margin-inline:auto;margin-top:1rem">${L(lang, 'Die gesuchte Seite existiert nicht oder wurde verschoben.', 'The page you are looking for does not exist or has moved.')}</p>
    <div class="hero-actions" style="justify-content:center">
      <a href="${url('home', lang)}" class="btn btn-primary">${L(lang, 'Zur Startseite', 'Back to the homepage')}</a>
      <a href="${url('services', lang)}" class="btn btn-ghost">${UI[lang].nav.services}</a>
    </div>
  </div>
</section>
`,
  });
}

// ===========================================================================
// Legal pages (German only)
// ===========================================================================
require('./legal');

// ===========================================================================
// Vorträge (German only, standalone design)
// ===========================================================================
require('./vortraege');
