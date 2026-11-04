# Impressum — шаблон (не опубликован)

Impressum (§ 5 DDG, Германия; § 5 ECG, Австрия) нужен, если сайт ориентирован на немецкоязычную аудиторию и имеет коммерческий характер (например, при включённой рекламе). Решение и данные — за владельцем. Чтобы опубликовать: создать `apps/web/src/content/pages/<lang>/impressum.md` для нужных языков, добавить `impressum` в `PAGE_IDS` и `PAGE_KIND` (`legal`) в `apps/web/src/i18n/pages.ts`.

```markdown
---
url: impressum
title: 'Impressum — csvtovcf'
h1: Impressum
description: 'Anbieterkennzeichnung für csvtovcf.com.'
lead: 'Angaben gemäß § 5 DDG.'
nav: Impressum
summary: 'Anbieterkennzeichnung.'
updated: 2026-11-04
---

TODO: Name / Firma

TODO: Straße und Hausnummer, PLZ Ort, Land

**Kontakt:** E-Mail: hello@csvtovcf.com — TODO: Telefon (oder ein zweiter schneller Kontaktweg)

TODO: Umsatzsteuer-ID gemäß § 27a UStG (falls vorhanden)

**Verantwortlich für den Inhalt** (§ 18 Abs. 2 MStV): TODO: Name, Anschrift

**Verbraucherstreitbeilegung:** Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
```
