# Website-Quellen

Die Seiten werden aus diesen Dateien erzeugt. **Englisch ist die Hauptseite** (`/`, `/offerings`, `/work`, `/about` …),
die deutsche Fassung wird immer mit gebaut (`/de/…`), geht aber erst live, wenn sie freigeschaltet ist.

| Datei | Inhalt |
| --- | --- |
| `content.js` | Einstellungen (Domain, **`germanLive`**, Google-Profil, Buchungslink), Adressen (`ROUTES`), Weiterleitungen, alle Texte (DE/EN), Filme, Leistungen, Preise, FAQ, Festivals, Kundenstimmen |
| `pages.js` | Aufbau der einzelnen Seiten (inkl. Team) |
| `vortraege.js` | Vorträge-Seite (nur Deutsch) mit Bildplätzen unter `assets/img/vortraege/` |
| `legal-impressum.html`, `legal-datenschutz.html` | Rechtstexte (nur Deutsch) |
| `image-sizes.json` | Bildmaße für `width`/`height` – bei neuen Bildern ergänzen |
| `build.js` | Layout (Header, Footer, Brotkrumen, hreflang, Strukturdaten), Sitemap, robots.txt, `_redirects`, `.assetsignore`, Prüfungen |

## Ändern und neu bauen

```
node _src/build.js        # erzeugt alle Seiten, sitemap.xml, robots.txt, _redirects und .assetsignore neu
node _tools/preview.js    # Vorschau unter http://localhost:8080
```

Die erzeugten HTML-Dateien nicht von Hand bearbeiten – Änderungen immer in `_src/` machen und neu bauen.
Der Build meldet unter `PROBLEMS` alles, was so nicht live gehen sollte (sichtbare TODOs, Titel > 60 oder
Beschreibung > 155 Zeichen, mehr als eine H1, Links auf noch nicht freigeschaltete deutsche Seiten).

## Deutsche Fassung freischalten

In `content.js` `germanLive: true` setzen und neu bauen. Dann werden die Seiten unter `/de/` mit deployt,
Sprachumschalter, hreflang und Sitemap-Einträge erscheinen, und die deutschen Einzelseiten (Kollaboration,
Vorträge, Impressum, Datenschutz) verlinken wieder auf deutsche Seiten.

## Platzhalter

Offene Stellen stehen als `todo('…')` in `content.js` / `pages.js`. Auf Seiten, die live gehen, sind sie
**ausgeblendet**: Die sichtbare Markierung fällt weg, im HTML bleibt `<!-- TODO: … -->` stehen, und Elemente,
die nur aus Platzhaltern bestehen, bekommen `hidden data-todo`. Auf noch nicht freigeschalteten Seiten
(deutsche Fassung) bleiben sie orange sichtbar. Übersicht: `grep -rn "TODO" _src assets/js/main.js`.

## Vorträge: Bildplätze

Bilder unter genau diesen Namen nach `assets/img/vortraege/` legen, Maße in `image-sizes.json` eintragen, neu bauen:
`vortraege-hero.webp`, `xaver-zimmermann-vortrag.webp`, `vortrag-waechter-der-berge.webp`, `vortrag-wir-sind-viele.webp`.
Solange eine Datei fehlt, bleibt ihr Platz unsichtbar.

Der Web3Forms-Schlüssel steht in `assets/js/main.js` (`WEB3FORMS_ACCESS_KEY`). Solange dort der Platzhalter steht,
öffnen die Formulare ersatzweise das E-Mail-Programm.
