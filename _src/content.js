// All texts and data for the bilingual site (DE = main language, EN = /en/).
// Edit here, then run:  node _src/build.js
//
// Visible placeholders are written with todo('…'). They render as an orange
// marker on the page AND as an HTML comment <!-- TODO: … --> in the source.

const todo = (text) => `<span class="todo">[TODO: ${text}]</span><!-- TODO: ${text} -->`;

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
const SETTINGS = {
  // Final domain – used for canonical, og:*, sitemap, robots.txt and structured data
  site: 'https://mutternaturstory.com',
  // English is the main site (/, /offerings, /work …). The German version is always
  // built under /de/, but only deployed, linked (language switch, hreflang, sitemap)
  // and indexed when this is true. One switch – then run: node _src/build.js
  germanLive: false,
  email: 'xaverszimmer@web.de',
  instagram: 'https://www.instagram.com/xaverszimmer',
  // Instagram-Projekt „Mutter Natur Deutschland“ (Collab-Posts, siehe /kollaboration)
  instagramMN: 'https://www.instagram.com/mutternatur_d',
  youtube: 'https://www.youtube.com/@MutterNatur_d',
  // TODO: Google-Unternehmensprofil anlegen und den öffentlichen Link hier eintragen
  // (z. B. https://g.page/r/…). Dann erscheinen automatisch „Bewertungen auf Google“
  // im Footer, ein Hinweis auf der Kontaktseite und ein sameAs-Eintrag in den Strukturdaten.
  googleBusinessUrl: '',
  // TODO (optional): Buchungslink für ein kurzes Kennenlerngespräch (z. B. Cal.com oder Calendly).
  // Sobald eingetragen, erscheint auf der Kontaktseite ein Button „Kennenlerngespräch buchen“.
  bookingUrl: '',
};

// ---------------------------------------------------------------------------
// URLs: one entry per page. English lives at the root and keeps the URLs of the
// former live site (/work, /offerings, /about …); German lives under /de/.
// Pages with only a German path (collab, talks, legal) are German-only but live.
// ---------------------------------------------------------------------------
const ROUTES = {
  home: { de: '/de/', en: '/' },
  services: { de: '/de/leistungen', en: '/offerings' },
  photo: { de: '/de/foto-video-content', en: '/photo-video-content' },
  imagefilm: { de: '/de/imagefilm', en: '/image-film' },
  documentary: { de: '/de/dokumentarfilm', en: '/documentary-film' },
  social: { de: '/de/social-media-content', en: '/social-media-content' },
  longterm: { de: '/de/langzeit-zusammenarbeit', en: '/long-term-collaboration' },
  work: { de: '/de/portfolio', en: '/work' },
  films: { de: '/de/filme', en: '/films' },
  docs: { de: '/de/dokumentationen-markenfilme', en: '/documentaries' },
  photography: { de: '/de/fotografie-social-media', en: '/photography' },
  caseTeufel: { de: '/de/projekte/teufelshoehle-pottenstein', en: '/projects/teufelshoehle-pottenstein' },
  caseDonau: { de: '/de/projekte/donaumoos', en: '/projects/donaumoos' },
  caseBerg: { de: '/de/projekte/bergwaldprojekt', en: '/projects/bergwaldprojekt' },
  // Instagram-Kollaboration „Mutter Natur Deutschland“ – nur Deutsch, bewusst nicht in der Hauptnavigation
  collab: { de: '/kollaboration' },
  // Vorträge – nur Deutsch, nur im Footer verlinkt
  talks: { de: '/vortraege' },
  // Team – only English so far (texts from the live team page)
  team: { en: '/team' },
  about: { de: '/de/ueber-uns', en: '/about' },
  contact: { de: '/de/kontakt', en: '/contact' },
  thanks: { de: '/de/danke', en: '/thank-you' },
  impressum: { de: '/impressum' },
  datenschutz: { de: '/datenschutz' },
};

// Short page names for breadcrumbs (visible trail + BreadcrumbList)
const CRUMBS = {
  home: { de: 'Startseite', en: 'Home' },
  services: { de: 'Leistungen', en: 'Offerings' },
  work: { de: 'Portfolio', en: 'Work' },
  films: { de: 'Filme', en: 'Films' },
  docs: { de: 'Dokumentationen & Markenfilme', en: 'Documentaries' },
  photography: { de: 'Fotografie & Social Media', en: 'Photography' },
  caseTeufel: { de: 'Teufelshöhle Pottenstein', en: 'Teufelshöhle Pottenstein' },
  caseDonau: { de: 'Donaumoos', en: 'Donaumoos' },
  caseBerg: { de: 'Bergwaldprojekt', en: 'Bergwaldprojekt' },
  collab: { de: 'Instagram-Kollaboration', en: 'Instagram-Kollaboration' },
  talks: { de: 'Vorträge', en: 'Vorträge' },
  team: { de: 'Team', en: 'Team' },
  about: { de: 'Über uns', en: 'About' },
  contact: { de: 'Kontakt', en: 'Contact' },
  thanks: { de: 'Danke', en: 'Thank you' },
  impressum: { de: 'Impressum', en: 'Impressum' },
  datenschutz: { de: 'Datenschutz', en: 'Datenschutz' },
};
// Parent page of each sub-page (the trail always starts at home)
const PARENTS = {
  photo: 'services', imagefilm: 'services', documentary: 'services', social: 'services', longterm: 'services', collab: 'services',
  films: 'work', docs: 'work', photography: 'work', caseTeufel: 'work', caseDonau: 'work', caseBerg: 'work',
};

// URLs of the former live site that no longer exist -> new pages (301, written to _redirects).
// Every page's own .html variant (/work.html -> /work) is added automatically.
const REDIRECTS = [
  ['/inside-the-journey', '/work'], ['/inside-the-journey.html', '/work'],
  ['/services', '/offerings'], ['/documentaries-brand-films', '/documentaries'], ['/photography-social-media', '/photography'],
  // Draft URLs that were shared for review (English under /en/)
  ['/en', '/'], ['/en/', '/'], ['/en/*', '/:splat'],
];

// ---------------------------------------------------------------------------
// UI strings
// ---------------------------------------------------------------------------
const UI = {
  de: {
    nav: { services: 'Leistungen', work: 'Portfolio', about: 'Über uns', contact: 'Kontakt' },
    cta: 'Projekt anfragen',
    langSwitch: 'EN', langSwitchLabel: 'English version',
    menu: 'Menü öffnen',
    mailLabel: 'E-Mail schreiben',
    footerText: 'Naturfilme, Dokumentationen, Imagefilme und Social Content – eigene Produktionen und Auftragsarbeiten für Unternehmen, Tourismus und NGOs. Aus Bayern, Raum München/Freising.',
    footerServices: 'Leistungen', footerPages: 'Mutter Natur', footerContact: 'Kontakt',
    footerCases: 'Fallstudien', googleReviews: 'Bewertungen auf Google',
    legal: ['Impressum', 'Datenschutz'],
    copyright: '© 2026 Mutter Natur',
    from: 'ab', individual: 'Individuell', more: 'Mehr erfahren', recommended: 'Empfohlen',
    play: 'Video abspielen',
    ytNote: 'Das Video wird erst nach Ihrem Klick von YouTube (youtube-nocookie.com) geladen.',
    igNote: 'Der Beitrag wird erst nach Ihrem Klick von Instagram geladen.',
    privacy: 'Datenschutz',
    closeLabel: 'Schließen',
    backToWork: '← Zurück zum Portfolio',
    caseLabel: 'Fallstudie',
  },
  en: {
    nav: { services: 'Services', work: 'Work', about: 'About', contact: 'Contact' },
    cta: 'Start a project',
    langSwitch: 'DE', langSwitchLabel: 'Deutsche Version',
    menu: 'Open menu',
    mailLabel: 'Email us',
    footerText: 'Nature films, documentaries, image films and social content – independent productions and commissioned work for companies, tourism and NGOs. From Bavaria, Munich/Freising area.',
    footerServices: 'Services', footerPages: 'Mutter Natur', footerContact: 'Contact',
    footerCases: 'Case studies', googleReviews: 'Reviews on Google',
    legal: ['Legal notice (DE)', 'Privacy policy (DE)'],
    copyright: '© 2026 Mutter Natur',
    from: 'from', individual: 'Custom', more: 'Learn more', recommended: 'Recommended',
    play: 'Play video',
    ytNote: 'The video only loads from YouTube (youtube-nocookie.com) after you click.',
    igNote: 'The post only loads from Instagram after you click.',
    privacy: 'Privacy',
    closeLabel: 'Close',
    backToWork: '← Back to all work',
    caseLabel: 'Case study',
  },
};

// ---------------------------------------------------------------------------
// Films (YouTube). Durations/dates from the public YouTube pages.
// ---------------------------------------------------------------------------
const FILMS = {
  waechter: {
    yt: 'NEvhhDN1aYk', thumb: 'gaemse-alpen-waechter-der-berge.webp', duration: 'PT13M40S', date: '2026-05-13',
    title: { de: 'Die Wächter der Berge', en: 'The Watchers of the Mountain' },
    alt: { de: 'Gämse in den Alpen – Filmplakat „Die Wächter der Berge“', en: 'Chamois in the Alps – poster of “The Watchers of the Mountain”' },
    desc: {
      de: 'Hoch in den Alpen lebt die Gämse – perfekt angepasst an eine der härtesten Umgebungen der Erde. Doch selbst dort beeinflusst der Mensch die Tierwelt immer stärker.',
      en: 'High in the alpine mountains lives the chamois, perfectly adapted to one of the harshest environments on Earth. But even in these remote landscapes, human presence is increasingly affecting wildlife.',
    },
    meta: { de: 'Kurzdokumentation · Alpine Tierwelt · 2026', en: 'Short documentary · Alpine wildlife · 2026' },
  },
  verbindung: {
    yt: 'vrCHWQZncmA', thumb: 'kohlmeise-winter-grosse-verbindung.webp', duration: 'PT4M51S', date: '2026-01-29',
    title: { de: 'Die große Verbindung', en: 'The Great Connection' },
    alt: { de: 'Kohlmeise im Winter – Filmplakat „Die große Verbindung“', en: 'Great tit in winter – poster of “The Great Connection”' },
    desc: {
      de: 'Ein Kurzfilm über Kohlmeisen und ihre Herausforderungen im Winter – und wie sie durch Zusammenhalt, Vertrauen und ihre starke Verbindung überleben.',
      en: 'A short film about great tits and the challenges they face during winter. It shows how they survive through cooperation, trust, and their strong connection with each other.',
    },
    meta: { de: 'Kurzdokumentation · Visuelle Geschichte · 2025', en: 'Short documentary · Visual story · 2025' },
  },
  vogel: {
    yt: '6XkU0IRF3OY', thumb: 'weissstorch-deutschland-naturfilm.webp', duration: 'PT1M49S', date: '2026-07-13',
    title: { de: 'Der Vogel, den wir fast verloren hätten', en: 'The Bird We Almost Lost' },
    alt: { de: 'Weißstorch-Nest auf einem Werbeschild – Filmplakat', en: 'White stork nest on an advertising sign – film poster' },
    desc: {
      de: 'Der Weißstorch war in Deutschland fast verschwunden. Diese Dokumentation erzählt von seiner bemerkenswerten Rückkehr – und davon, was Naturschutz bewirken kann.',
      en: 'The white stork was once on the brink of disappearing from Germany. This documentary tells the story of its remarkable return and the power of nature conservation.',
    },
    meta: { de: 'Kurzdokumentation · Naturschutz · 2026', en: 'Short documentary · Conservation · 2026' },
  },
  tomato: {
    yt: 'XMBAGjxrCUk', thumb: 'the-tomato-35mm-kurzfilm.webp', duration: 'PT45S', date: '2026-08-09',
    title: { de: 'The Tomato', en: 'The Tomato' },
    alt: { de: 'Tomaten-Saattüte in der Erde – Titelbild „Look Closer“', en: 'Tomato seed packet in the soil – title image “Look Closer”' },
    desc: {
      de: `Ein Kurzfilm, gedreht auf 35 mm. ${todo('kurze Beschreibung, worum es in „The Tomato“ geht')}`,
      en: `A short film shot on 35mm. ${todo('short description of what “The Tomato” is about')}`,
    },
    meta: { de: 'Kurzfilm · 35 mm · 2026', en: 'Short film · 35mm · 2026' },
  },
  donaumoos: {
    yt: 'I__fzaND0aY', thumb: 'donaumoos-zweckverband-logo.webp', logo: true, duration: 'PT2M1S', date: '2026-07-03',
    title: { de: 'Donaumoos', en: 'Donaumoos' },
    fullTitle: '„Wir haben die Möglichkeit, gemeinsam dieses Moor zu schützen“',
    alt: { de: 'Logo Donaumoos Zweckverband', en: 'Donaumoos Zweckverband logo' },
    desc: { de: 'Ein ruhiger Film über Landschaft, Erinnerung und Wandel.', en: 'A quiet film about landscape, memory, and transformation.' },
    meta: { de: 'Dokumentation · Markenfilm · 2026', en: 'Documentary · Brand film · 2026' },
  },
  teufel: {
    yt: 'w-qL0l7yaEQ', thumb: 'teufelshoehle-pottenstein-logo.webp', logo: true, duration: 'PT6M34S', date: '2026-07-23',
    title: { de: 'Teufelshöhle Pottenstein', en: 'Teufelshöhle Pottenstein' },
    fullTitle: 'Eine Welt unter unseren Füßen',
    alt: { de: 'Logo Teufelshöhle Pottenstein', en: 'Teufelshöhle Pottenstein logo' },
    desc: { de: 'Eine Dokumentation über eine der größten Schauhöhlen Deutschlands.', en: "A documentary about one of Germany's largest show caves." },
    meta: { de: 'Dokumentation · Markenfilm · 2026', en: 'Documentary · Brand film · 2026' },
  },
  kohle: {
    yt: '7PCvgDm-tVs', thumb: 'kohle-imagefilm-probefilm.webp', duration: 'PT27S', date: '2026-10-02',
    title: { de: 'Kohle', en: 'Kohle' },
    alt: { de: 'Holzkohle und Grill – Titelbild „Kohle“', en: 'Charcoal and grill – title image “Kohle”' },
    desc: { de: 'Ein kurzer Imagefilm – ein Probefilm von Mutter Natur.', en: 'A short image film – a test production by Mutter Natur.' },
    meta: { de: 'Imagefilm · Probefilm · 2026', en: 'Image film · Test production · 2026' },
  },
};

// Instagram work (loaded only after a click)
const INSTA = {
  bergwald: { url: 'https://www.instagram.com/p/DZVE6E8CEML/embed', img: 'bergwaldprojekt-naturfotografie.webp', title: 'Bergwaldprojekt',
    alt: { de: 'Freiwillige bei der Arbeit im Bergwald über einem See', en: 'Volunteer working in a mountain forest above a lake' }, meta: { de: 'Fotografie', en: 'Photography' } },
  ozeankind: { url: 'https://www.instagram.com/reel/DZFilLsIctZ/embed', img: 'ozeankind-naturfotografie.webp', title: 'Ozeankind',
    alt: { de: 'Kinder schauen in ein Aquarium mit Meerespflanzen', en: 'Children looking into an aquarium with sea plants' }, meta: { de: 'Reel', en: 'Reel' } },
  timo: { url: 'https://www.instagram.com/p/DZusv7DAHNa/embed', img: 'timo-spengler-instagram-zusammenarbeit.webp', title: 'Timo Spengler',
    alt: { de: 'Junger Fuchs im Wald', en: 'Young fox in the forest' }, meta: { de: 'Instagram-Kooperation', en: 'Instagram collaboration' } },
  moorflut: { url: 'https://www.instagram.com/reel/DZ5h1MxM0Qv/embed', img: 'moorflut-sponsoring-instagram.webp', title: 'Moorflut',
    alt: { de: 'Mütze mit Eisvogel-Stickerei', en: 'Beanie with kingfisher embroidery' }, meta: { de: 'Gesponserte Instagram-Kooperation', en: 'Sponsored Instagram collaboration' } },
  giardino: { url: 'https://www.instagram.com/p/DXMw9TXjMjd/embed', img: 'giardino-galderisi-instagram-zusammenarbeit.webp', title: 'Giardino Galderisi',
    alt: { de: 'Zitronen am Baum und Produktpackung', en: 'Lemons on the tree and product packaging' }, meta: { de: 'Instagram-Kooperation', en: 'Instagram collaboration' } },
  vacher: { url: 'https://www.instagram.com/reel/DZR29jMIJrE/embed', img: 'vacher-hofwiesen-instagram-zusammenarbeit.webp', title: 'Vacher Hofwiesen',
    alt: { de: 'Logo Vacher Hofwiesen mit Storch', en: 'Vacher Hofwiesen logo with stork' }, meta: { de: 'Instagram-Kooperation', en: 'Instagram collaboration' } },
  miya: { url: 'https://www.instagram.com/reel/DbGKTxcukG4/embed', img: 'miya-forest-instagram-zusammenarbeit.webp', title: 'Miya Forest',
    alt: { de: 'Logo Miya Forest', en: 'Miya Forest logo' }, meta: { de: 'Instagram-Kooperation', en: 'Instagram collaboration' } },
};

// ---------------------------------------------------------------------------
// FAQ (shared between the services overview and the service pages)
// ---------------------------------------------------------------------------
const FAQ = {
  dauer: {
    q: { de: 'Wie lange dauert eine Produktion?', en: 'How long does a production typically take?' },
    a: {
      de: 'Das hängt vom Projekt ab. Für ein schnelles Foto- und Video-Shooting reicht oft ein Tag vor Ort. Für Imagefilme und Dokumentationen planen wir meist zwischen einem und fünf Drehtagen – je nach Geschichte, Drehorten und dem Zugang zu Menschen und Orten.',
      en: "It really depends on the project. For a quick photo & video shoot, a single day on location is often enough. For documentaries and image films, we're usually looking at somewhere between one and five shooting days, depending on the story, the locations involved, and how much access we need to the people and places we're filming.",
    },
  },
  lieferzeit: {
    q: { de: 'Wann bekommen wir den fertigen Film?', en: 'When do we receive the finished film?' },
    a: { de: todo('übliche Lieferzeit nach dem Dreh, z. B. „in der Regel X Wochen nach dem letzten Drehtag“'), en: todo('usual delivery time after the shoot, e.g. “usually X weeks after the last shooting day”') },
  },
  korrektur: {
    q: { de: 'Wie viele Korrekturschleifen sind inklusive?', en: 'How many rounds of revisions are included?' },
    a: {
      de: `${todo('Anzahl')} Korrekturschleifen sind im Preis enthalten. Jede weitere Korrekturschleife ist kostenpflichtig.`,
      en: `${todo('number')} rounds of revisions are included in the price. Every additional round is charged separately.`,
    },
  },
  anzahlung: {
    q: { de: 'Wie läuft die Bezahlung?', en: 'How does payment work?' },
    a: {
      de: `Mit der Auftragsbestätigung werden 50 % des Gesamtpreises als Anzahlung fällig. ${todo('Wann ist der Rest fällig – z. B. bei Lieferung?')}`,
      en: `A 50% deposit is due when the project is confirmed. ${todo('When is the remaining amount due – e.g. on delivery?')}`,
    },
  },
  steuer: {
    q: { de: 'Kommt noch Mehrwertsteuer dazu?', en: 'Is VAT added on top?' },
    a: { de: 'Nein. Alle Preise sind Endpreise – es kommt keine Steuer obendrauf.', en: 'No. All prices are final prices – no tax is added on top.' },
  },
  reisekosten: {
    q: { de: 'Wie werden Reisekosten berechnet?', en: 'How are travel costs calculated?' },
    a: { de: 'Reisekosten berechnen wir individuell – je nach Drehort und Dauer der Produktion.', en: 'Travel costs are calculated individually, depending on the location and the length of the production.' },
  },
  reisen: {
    q: { de: 'Drehen Sie auch außerhalb von Bayern?', en: 'Do you travel for productions?' },
    a: {
      de: 'Ja, sehr gern. Unterwegs zu sein gehört fest zu unserer Arbeit – wir fahren dorthin, wo die Geschichte spielt. Unser Schwerpunkt liegt in Bayern, Deutschland, Österreich und der Schweiz, Projekte weltweit sind möglich.',
      en: 'Yes – very much so. Being on the road is a core part of how we work: we go wherever the story is. Our focus is Bavaria, Germany, Austria and Switzerland, and we are happy to take on projects worldwide.',
    },
  },
  wetter: {
    q: { de: 'Was passiert bei schlechtem Wetter?', en: 'What happens if the weather is bad?' },
    a: { de: todo('Regelung bei schlechtem Wetter, z. B. Ersatztermin, Kosten'), en: todo('bad-weather policy, e.g. alternative date, costs') },
  },
  foerder: {
    q: { de: 'Unterstützen Sie bei Förderanträgen?', en: 'Can you help with funding applications?' },
    a: { de: todo('Ob und wie Sie bei Förderanträgen unterstützen'), en: todo('whether and how you support funding applications') },
  },
  rechte: {
    q: { de: 'Wer erhält die Nutzungsrechte an Film und Fotos?', en: 'Who owns the usage rights for the final film and photos?' },
    a: {
      de: `Das halten wir immer vor Produktionsbeginn schriftlich fest, damit später nichts offen ist. In den meisten Fällen gehen die vollen Nutzungsrechte an Film und Fotos mit der Lieferung an Sie. <!-- TODO: Nutzungsrechte bestätigen bzw. genauer festlegen (Umfang, Dauer, Ausnahmen wie Musiklizenzen) -->`,
      en: `This is always agreed on in writing before we start production, so there's no ambiguity later. In most cases, full usage rights for the final film and photos go to you as the client once the project is delivered. <!-- TODO: confirm / specify usage rights (scope, duration, exceptions such as music licences) -->`,
    },
  },
};

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
const PRICE_TERMS = {
  de: [
    'Alle Preise sind Endpreise – es kommt keine Steuer obendrauf.',
    'Reisekosten berechnen wir individuell. Bei Auftragsbestätigung sind 50 % Anzahlung fällig.',
    `${todo('Anzahl')} Korrekturschleifen sind inklusive, jede weitere ist kostenpflichtig.`,
  ],
  en: [
    'All prices are final prices – no tax is added on top.',
    'Travel costs are calculated individually. A 50% deposit is due when the project is confirmed.',
    `${todo('number')} rounds of revisions are included; additional rounds are charged separately.`,
  ],
};

const SERVICES = {
  photo: {
    key: 'foto-video', img: 'fotoproduktion-vor-ort.webp', ogImg: 'fotoproduktion-vor-ort', from: 700, priceMin: 700, priceMax: 1300,
    title: { de: 'Foto- & Video-Content', en: 'Photo & Video Content' },
    alt: { de: 'Porträt mit Stirnlampe bei einer Fotoproduktion vor Ort', en: 'Portrait with a headlamp during an on-location photo shoot' },
    seoTitle: { de: 'Foto- & Videoproduktion für Firmen, Bayern | Mutter Natur', en: 'Photo & Video Content for Businesses, Bavaria | Mutter Natur' },
    seoDesc: {
      de: 'Schnelle Foto- und Videoproduktion für Website, Social Media und Presse: ½–1 Drehtag, bearbeitete Fotos, kurzer Videoschnitt. 700–1.300 €. Aus Bayern.',
      en: 'Fast photo and video production for web, social media and press: ½–1 day shoot, edited photos, short video cut. €700–€1,300 final price. From Bavaria.',
    },
    short: {
      de: 'Schnelle, kompakte Produktion für klare Kommunikation – sofort einsetzbares Material ohne lange Vorlaufzeit.',
      en: 'Fast, compact visual production for clear communication — ready-to-use assets without a long production timeline.',
    },
    price: { de: '700–1.300 €', en: '€700–€1,300' },
    scope: { de: 'Kurzproduktion (½–1 Tag)', en: 'Short-form production (0.5–1 day)' },
    includes: { de: ['Halber bis ganzer Drehtag vor Ort', 'Bearbeitetes Foto-Set', 'Kurzer Video-Schnitt'], en: ['Half- to full-day shoot', 'Edited photo set', 'Short video cutdown'] },
    intro: {
      de: [
        'Sie brauchen frisches, ehrliches Bildmaterial für Website, Social Media oder Presse – und zwar bald? Dann ist das Ihr Paket.',
        'Wir kommen für einen halben oder ganzen Tag zu Ihnen, fotografieren und filmen, was Ihre Arbeit ausmacht, und liefern bearbeitete Fotos plus einen kurzen Video-Schnitt. Ohne langes Konzept, ohne großen Aufwand auf Ihrer Seite.',
      ],
      en: [
        'Need fresh, honest visuals for your website, social media or press – and soon? This is your package.',
        'We come to you for half a day or a full day, photograph and film what makes your work special, and deliver an edited photo set plus a short video cut. No lengthy concept phase, no big effort on your side.',
      ],
    },
    forWhom: {
      de: 'Ideal für Unternehmen und Tourismusbetriebe, die regelmäßig neues Material brauchen – zum Saisonstart, für eine Veranstaltung, ein neues Angebot oder einfach einen stärkeren Auftritt.',
      en: 'Ideal for companies and tourism businesses that regularly need new material – for the start of the season, an event, a new offer or simply a stronger presence.',
    },
    examples: { insta: ['bergwald', 'ozeankind', 'vacher'] },
    faq: ['dauer', 'lieferzeit', 'rechte', 'anzahlung', 'reisekosten', 'wetter'],
  },
  imagefilm: {
    key: 'imagefilm', featured: true, img: 'regisseur-dreharbeiten-natur.webp', ogImg: 'regisseur-dreharbeiten-natur', from: 1300, priceMin: 1300, priceMax: 3000,
    title: { de: 'Imagefilm', en: 'Image Film' },
    alt: { de: 'Filmemacher mit Kamera bei Dreharbeiten', en: 'Filmmaker with a camera on a shoot' },
    seoTitle: { de: 'Imagefilm produzieren lassen in Bayern | Mutter Natur', en: 'Image Film Production in Bavaria & Munich | Mutter Natur' },
    seoDesc: {
      de: 'Imagefilm für Unternehmen, Tourismus und NGOs: 1–2 Drehtage, Idee bis fertiger Schnitt, 1.300–3.000 €. Filmproduktion aus Bayern, Raum München/Freising.',
      en: 'Image films for companies, tourism and NGOs: 1–2 shooting days, idea to final cut, €1,300–€3,000. Film production from Munich/Freising, Bavaria.',
    },
    short: {
      de: 'Ein kompakter, cineastischer Film rund um ein bis zwei Drehtage – damit Partner und Kunden sofort verstehen, warum Ihre Arbeit zählt.',
      en: 'Structured cinematic storytelling built around one to two shooting days — a concise film that gives partners an immediate emotional understanding of why your work matters.',
    },
    price: { de: '1.300–3.000 €', en: '€1,300–€3,000' },
    scope: { de: '1–2 Drehtage · cineastischer Kurzfilm', en: '1–2 shooting days · cinematic short film' },
    includes: {
      de: ['1–2 Drehtage vor Ort', 'Kurzfilm von der Idee bis zum fertigen Schnitt', 'Geeignet für Kampagnen & Markenkommunikation'],
      en: ['1–2 shooting days on location', 'Cinematic short film, concept to final cut', 'Suitable for campaigns & brand storytelling'],
    },
    intro: {
      de: [
        'Ein Imagefilm ist oft das Erste, was Kunden, Partner oder Förderer von Ihnen sehen. Er muss schnell zeigen, wer Sie sind und warum es Sie braucht.',
        'Wir entwickeln mit Ihnen die Geschichte, drehen ein bis zwei Tage vor Ort und schneiden daraus einen Film, den Sie auf Ihrer Website, auf Social Media, auf Messen und in Präsentationen einsetzen können.',
        'Für die meisten Anfragen ist der Imagefilm der beste Einstieg: genug Tiefe für echte Emotion, bei überschaubarem Aufwand und Budget.',
      ],
      en: [
        'An image film is often the first thing customers, partners or funders see of you. It has to show quickly who you are and why your work matters.',
        'We develop the story with you, shoot for one or two days on location and edit a film you can use on your website, on social media, at trade fairs and in presentations.',
        'For most inquiries, the image film is the best place to start: enough depth for real emotion, with a manageable effort and budget.',
      ],
    },
    forWhom: {
      de: 'Für Unternehmen und Tourismusorganisationen, die ihre Haltung zur Natur zeigen wollen – und für NGOs, Vereine und Zweckverbände, die Unterstützer gewinnen möchten.',
      en: 'For companies and tourism organizations that want to show their commitment to nature – and for NGOs, associations and public bodies that want to win supporters.',
    },
    examples: { films: ['kohle', 'donaumoos'] },
    faq: ['dauer', 'korrektur', 'lieferzeit', 'rechte', 'anzahlung', 'steuer'],
  },
  documentary: {
    key: 'dokumentarfilm', img: 'dokumentarfilm-dreharbeiten.webp', ogImg: 'dokumentarfilm-dreharbeiten', from: 3000, priceMin: 3000, priceMax: 7000,
    title: { de: 'Dokumentarfilm', en: 'Documentary Short Production' },
    alt: { de: 'Interview-Dreh vor einem Naturparkhaus', en: 'Interview shoot in front of a nature park visitor centre' },
    seoTitle: { de: 'Dokumentarfilm für Organisationen, Bayern | Mutter Natur', en: 'Documentary Films for Organizations, Bavaria | Mutter Natur' },
    seoDesc: {
      de: 'Dokumentarischer Kurzfilm (ca. 4–6 Min.) mit Fotopaket und Social-Media-Cutdowns – für Unternehmen, Tourismus und NGOs. 3.000–7.000 € Endpreis. Aus Bayern.',
      en: 'Cinematic short documentary (approx. 4–6 min) with photo package and social media cutdowns – for companies, tourism and NGOs. €3,000–€7,000 final price.',
    },
    short: {
      de: 'Tiefes, cineastisches Storytelling mit echten Menschen, Orten und Wirkung – ein dokumentarischer Kurzfilm, der weit über klassisches Marketing hinausgeht.',
      en: 'Deep, cinematic storytelling built around real people, real places and real impact — a documentary-style short film that goes beyond traditional marketing.',
    },
    price: { de: '3.000–7.000 €', en: '€3,000–€7,000' },
    scope: { de: 'Mehrtägige Produktion · komplettes Postproduktions-Paket', en: 'Multi-day production · full post-production package' },
    includes: {
      de: ['Dokumentarischer Kurzfilm (ca. 4–6 Minuten)', 'Fotopaket', 'Social-Media-Cutdowns', 'Entwicklung der Erzählung & Regie'],
      en: ['Cinematic short documentary (approx. 4–6 minutes)', 'Photography package', 'Social media cutdowns', 'Narrative development & direction'],
    },
    intro: {
      de: [
        'Manche Geschichten brauchen mehr Zeit: ein Ort, den man erst verstehen muss, Menschen, die ein Projekt tragen, eine Veränderung, die man sehen will.',
        'Dafür drehen wir über mehrere Tage, entwickeln die Erzählung gemeinsam mit Ihnen und liefern einen dokumentarischen Kurzfilm – dazu ein Fotopaket und kurze Clips für Social Media.',
      ],
      en: [
        'Some stories need more time: a place you first have to understand, people who carry a project, a change you want to see.',
        'For these stories we shoot over several days, develop the narrative together with you and deliver a short documentary – plus a photo package and short clips for social media.',
      ],
    },
    forWhom: {
      de: 'Für Tourismusorganisationen, Unternehmen und NGOs mit einer Geschichte, die Tiefe verdient – und für Projekte, die Förderer, Politik oder Öffentlichkeit überzeugen wollen.',
      en: 'For tourism organizations, companies and NGOs with a story that deserves depth – and for projects that need to convince funders, policymakers or the public.',
    },
    examples: { films: ['teufel', 'waechter'] },
    faq: ['dauer', 'korrektur', 'lieferzeit', 'rechte', 'reisekosten', 'foerder'],
  },
  social: {
    key: 'social-media', img: 'naturaufnahme-social-media-content.webp', ogImg: 'naturaufnahme-social-media-content', from: null,
    title: { de: 'Social-Media-Produktion & Betreuung', en: 'Social Media Production & Management' },
    alt: { de: 'Mädchen beim Schwimmen im See', en: 'Girl swimming in a lake' },
    seoTitle: { de: 'Social-Media-Content für Marken, Bayern | Mutter Natur', en: 'Social Media Content for Brands in Bavaria | Mutter Natur' },
    seoDesc: {
      de: 'Laufender Content für Instagram und TikTok: Reels, Kurzvideos und auf Wunsch komplette Account-Betreuung – für Unternehmen, Tourismus und NGOs aus Bayern.',
      en: 'Ongoing content for Instagram, TikTok and beyond: reels, short-form videos and optional full account management – for companies, tourism and NGOs.',
    },
    short: {
      de: 'Laufender Content für Instagram, TikTok und mehr – für Sichtbarkeit, Vertrauen und langfristiges Wachstum Ihrer Community.',
      en: 'Ongoing content for Instagram, TikTok and beyond — building visibility, trust and long-term audience growth.',
    },
    price: { de: 'Individuell kalkuliert', en: 'Individually calculated' },
    scope: { de: 'Abhängig von Frequenz, Umfang und Tiefe der Zusammenarbeit', en: 'Depends on frequency, scope and collaboration depth' },
    includes: {
      de: ['Regelmäßige Content-Produktion', 'Reels & Kurzvideos', 'Optional: komplette Account-Betreuung'],
      en: ['Regular content production', 'Reels / short-form videos', 'Optional full account management'],
    },
    intro: {
      de: [
        'Ein guter Film ist ein Anfang. Sichtbar bleiben Sie durch regelmäßige Inhalte, die zeigen, was bei Ihnen passiert.',
        'Wir produzieren laufend Reels und Kurzformate aus Ihrer Arbeit – und übernehmen auf Wunsch die komplette Betreuung Ihres Accounts.',
      ],
      en: [
        'A good film is a beginning. You stay visible through regular content that shows what is happening at your place.',
        'We continuously produce reels and short-form content from your work – and, if you like, take over the full management of your account.',
      ],
    },
    forWhom: {
      de: 'Für Unternehmen, Tourismusbetriebe und NGOs, die auf Instagram und TikTok dauerhaft präsent sein wollen, ohne selbst ein Content-Team aufzubauen.',
      en: 'For companies, tourism businesses and NGOs that want a lasting presence on Instagram and TikTok without building their own content team.',
    },
    examples: { insta: ['moorflut', 'timo', 'giardino'] },
    faq: ['rechte', 'anzahlung', 'steuer'],
  },
  longterm: {
    key: 'langzeit', img: 'langzeitprojekt-naturdokumentation.webp', ogImg: 'langzeitprojekt-naturdokumentation', from: null,
    title: { de: 'Langfristige Zusammenarbeit', en: 'Long-Term Collaboration' },
    alt: { de: 'Gämse am Hang und ein lächelnder Filmemacher', en: 'Chamois on a slope and a smiling filmmaker' },
    seoTitle: { de: 'Langfristige Filmbegleitung, Bayern & DACH | Mutter Natur', en: 'Long-Term Film Partnership, Bavaria & DACH | Mutter Natur' },
    seoDesc: {
      de: 'Wir begleiten Ihr Projekt über Monate oder Jahre mit Film, Foto und Social Content – individuell abgestimmt. Aus Bayern, für DACH und weltweit.',
      en: 'We document your project over months or years with film, photography and social content – scope, cadence and channels tailored to you. From Bavaria.',
    },
    short: {
      de: 'Für Projekte, die kontinuierlich erzählt werden wollen: Wir werden Ihr fester visueller Partner und dokumentieren Ihren Weg über die Zeit.',
      en: 'For projects that require continuous storytelling. We become your long-term visual partner, documenting your journey over time.',
    },
    price: { de: 'Individuelles Partnerschaftsmodell', en: 'Custom partnership model' },
    scope: { de: 'Individuell nach gemeinsamen Zielen und Laufzeit', en: 'Developed individually based on shared goals and duration' },
    includes: {
      de: ['Laufende Content-Produktion', 'Langfristige visuelle Partnerschaft', 'Umfang & Rhythmus nach Bedarf'],
      en: ['Ongoing content production', 'Long-term visual partnership', 'Custom scope & cadence'],
    },
    intro: {
      de: [
        'Renaturierung, Aufforstung, ein Schutzprojekt über mehrere Jahre: Wirkung entsteht oft langsam. Genau das lässt sich mit Film zeigen – wenn jemand dranbleibt.',
        'Wir begleiten Ihr Projekt über die Zeit. Umfang, Rhythmus und Kanäle entwickeln wir individuell mit Ihnen.',
      ],
      en: [
        'Rewilding, reforestation, a conservation project over several years: impact often takes time. Film can show exactly that – if someone stays with it.',
        'We accompany your project over time. Scope, cadence and channels are developed individually with you.',
      ],
    },
    forWhom: {
      de: 'Für NGOs, Zweckverbände, Stiftungen und Unternehmen mit Projekten, die über Monate oder Jahre laufen.',
      en: 'For NGOs, public bodies, foundations and companies with projects that run over months or years.',
    },
    examples: { todo: { de: 'Beispielprojekt für eine langfristige Zusammenarbeit ergänzen', en: 'add an example project for a long-term collaboration' } },
    faq: ['anzahlung', 'rechte', 'reisen'],
  },
};
const SERVICE_ORDER = ['photo', 'imagefilm', 'documentary', 'social', 'longterm'];

// Options for the detailed inquiry form
const FORM_OPTIONS = {
  orgType: {
    de: ['Unternehmen', 'Tourismus', 'NGO / Verein / Stiftung', 'Behörde / Zweckverband', 'Sender / Produktionsfirma / Förderung', 'Sonstiges'],
    en: ['Company', 'Tourism', 'NGO / association / foundation', 'Public authority / special-purpose association', 'Broadcaster / production company / funding body', 'Other'],
  },
  service: SERVICE_ORDER.map((k) => ({ key: SERVICES[k].key, de: SERVICES[k].title.de, en: SERVICES[k].title.en }))
    .concat([{ key: 'naturfilm', de: 'Naturfilm / Koproduktion', en: 'Nature film / co-production' }, { key: 'instagram', de: 'Instagram-Kollaboration (kostenlos)', en: 'Instagram collaboration (free)' }, { key: 'offen', de: 'Noch offen – ich brauche Beratung', en: 'Not sure yet – I need advice' }]),
  timeframe: {
    de: ['So bald wie möglich (innerhalb eines Monats)', 'In 1–3 Monaten', 'In 3–6 Monaten', 'In mehr als 6 Monaten', 'Noch offen'],
    en: ['As soon as possible (within a month)', 'In 1–3 months', 'In 3–6 months', 'In more than 6 months', 'Not decided yet'],
  },
  budget: {
    de: ['700–1.300 € (Foto- & Video-Content)', '1.300–3.000 € (Imagefilm)', '3.000–7.000 € (Dokumentarfilm)', 'Mehr als 7.000 €', 'Laufendes Budget (Social Media / Langzeit)', 'Noch offen'],
    en: ['€700–€1,300 (photo & video content)', '€1,300–€3,000 (image film)', '€3,000–€7,000 (documentary)', 'More than €7,000', 'Ongoing budget (social media / long-term)', 'Not decided yet'],
  },
};

// Festivals – status and year still to be confirmed
const AWARDS = [
  { film: 'Die Wächter der Berge', festival: 'DOK.fest München' },
  { film: 'Die Wächter der Berge', festival: '22. INKAFEST' },
  { film: 'Die große Verbindung', festival: 'Filmfest Schleswig-Holstein' },
  { film: 'Die große Verbindung', festival: 'Kurzfilm Festival Mo&Friese' },
];

// Partners & clients shown in the moving band on the home page (image, name, kind of work)
const PHOTO_KIND = {
  photo: { de: 'Fotografie', en: 'Photography' },
  reel: { de: 'Reel', en: 'Reel' },
  collab: { de: 'Instagram-Kooperation', en: 'Instagram collaboration' },
};
const PARTNERS = [
  { name: 'Bergwaldprojekt', img: 'bergwaldprojekt-naturfotografie.webp', route: 'caseBerg', kind: PHOTO_KIND.photo, alt: INSTA.bergwald.alt },
  { name: 'Donaumoos Zweckverband', img: 'donaumoos-zweckverband-logo.webp', logo: true, route: 'caseDonau', kind: { de: 'Markenfilm', en: 'Brand film' }, alt: FILMS.donaumoos.alt },
  { name: 'Ozeankind', img: 'ozeankind-naturfotografie.webp', route: 'photography', kind: PHOTO_KIND.reel, alt: INSTA.ozeankind.alt },
  { name: 'Teufelshöhle Pottenstein', img: 'teufelshoehle-pottenstein-logo.webp', logo: true, route: 'caseTeufel', kind: { de: 'Dokumentarfilm', en: 'Documentary film' }, alt: FILMS.teufel.alt },
  { name: 'Timo Spengler', img: 'timo-spengler-instagram-zusammenarbeit.webp', route: 'photography', kind: PHOTO_KIND.collab, alt: INSTA.timo.alt },
  { name: 'Moorflut', img: 'moorflut-sponsoring-instagram.webp', route: 'photography', kind: INSTA.moorflut.meta, alt: INSTA.moorflut.alt },
  { name: 'Bergwaldprojekt', img: 'instagram-beitrag-mutter-natur-film.avif', route: 'caseBerg', kind: PHOTO_KIND.photo, alt: { de: 'Freiwillige entrinden einen Baumstamm im Bergwald', en: 'Volunteer debarking a tree trunk in a mountain forest' } },
  { name: 'Giardino Galderisi', img: 'giardino-galderisi-instagram-zusammenarbeit.webp', route: 'photography', kind: PHOTO_KIND.collab, alt: INSTA.giardino.alt },
  { name: 'Vacher Hofwiesen', img: 'vacher-hofwiesen-instagram-zusammenarbeit.webp', logo: true, route: 'photography', kind: PHOTO_KIND.collab, alt: INSTA.vacher.alt },
  { name: 'Ozeankind', img: 'instagram-reel-mutter-natur-film.webp', route: 'photography', kind: PHOTO_KIND.reel, alt: { de: 'Mädchen in Warnweste sammelt Müll mit einer Greifzange', en: 'Girl in a hi-vis vest collecting litter with a grabber' } },
  { name: 'Miya Forest', img: 'miya-forest-instagram-zusammenarbeit.webp', logo: true, route: 'photography', kind: PHOTO_KIND.collab, alt: INSTA.miya.alt },
];

// Testimonials: the section stays invisible until at least one real quote is entered.
// Example entry:
// { quote: { de: '…', en: '…' }, name: 'Vorname Nachname', role: { de: 'Funktion', en: 'Role' }, org: 'Organisation', img: 'datei.webp' /* optional photo or logo */ },
const TESTIMONIALS = [
  // TODO: echte Kundenstimmen eintragen (Zitat, Name, Funktion, Organisation, optional Foto/Logo)
];

// Sixth way to work together: free Instagram collab posts on @mutternatur_d
const COLLAB = {
  img: 'filmstill-wiederverbindung-galerie.webp',
  alt: { de: 'Menschen pflanzen gemeinsam junge Bäume im Wald', en: 'People planting young trees together in a forest' },
  title: { de: 'Instagram-Kollaboration', en: 'Instagram Collaboration' },
  short: {
    de: 'Sie tun etwas für Natur, Umwelt oder Tiere? Zeigen Sie es mit uns als Collab-Post auf „Mutter Natur Deutschland“ – zwei Accounts, eine Reichweite.',
    en: 'Doing something for nature, the environment or animals? Share it with us as a collab post on “Mutter Natur Deutschland” – two accounts, one reach.',
  },
  price: { de: 'Kostenlos', en: 'Free' },
};

module.exports = { PARTNERS, COLLAB, todo, SETTINGS, ROUTES, CRUMBS, PARENTS, REDIRECTS, UI, FILMS, INSTA, FAQ, PRICE_TERMS, SERVICES, SERVICE_ORDER, FORM_OPTIONS, AWARDS, TESTIMONIALS };
