# Website-Quellen (Entwurf v2)

Die Seiten (Deutsch im Hauptverzeichnis, Englisch unter `/en/`) werden aus diesen Dateien erzeugt:

| Datei | Inhalt |
| --- | --- |
| `content.js` | Alle Texte (DE/EN), Filme, Leistungen, Preise, FAQ, Formular-Optionen, Festivals, Kundenstimmen, Einstellungen (Google-Profil, Buchungslink) |
| `pages.js` | Aufbau der einzelnen Seiten |
| `legal-impressum.html`, `legal-datenschutz.html` | Rechtstexte (nur Deutsch) |
| `image-sizes.json` | Bildmaße für `width`/`height` – bei neuen Bildern ergänzen |
| `build.js` | Layout (Header, Footer, Sprachumschalter, hreflang, Strukturdaten), Sitemap, `_redirects` |

## Ändern und neu bauen

```
node _src/build.js        # erzeugt alle HTML-Seiten, sitemap.xml und _redirects neu
node _tools/preview.js    # Vorschau unter http://localhost:8080 (verhält sich wie Cloudflare)
```

Die erzeugten HTML-Dateien nicht von Hand bearbeiten – Änderungen immer in `_src/` machen und neu bauen.
`_src/` und `_tools/` werden nicht mit deployt (siehe `.assetsignore`).

## Platzhalter

Offene Stellen stehen als `todo('…')` in `content.js` / `pages.js` und erscheinen auf der Seite orange markiert
sowie als `<!-- TODO: … -->` im HTML. Übersicht: `grep -rn "TODO" _src assets/js/main.js`.

Der Web3Forms-Schlüssel steht in `assets/js/main.js` (`WEB3FORMS_ACCESS_KEY`). Solange dort der Platzhalter steht,
öffnen die Formulare ersatzweise das E-Mail-Programm.
