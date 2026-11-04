---
url: convertir-csv-de-google-a-vcf
title: 'Convertir CSV de Contactos de Google a VCF (vCard)'
h1: 'Convertir CSV de Contactos de Google a VCF'
description: 'Convierte un CSV exportado de Contactos de Google (formato actual o antiguo) a VCF para iPhone u Outlook. Conserva etiquetas, varios números por celda y cumpleaños.'
lead: 'Convierte una exportación de contactos en “CSV de Google” en un archivo vCard. Se conservan las etiquetas de teléfono y correo, los varios valores en una misma celda (` ::: `), los grupos y los cumpleaños sin año.'
nav: 'CSV de Google a VCF'
summary: 'Exportación CSV de Contactos de Google (formato nuevo y antiguo) a vCard.'
steps:
  - 'Suelta el CSV exportado de Contactos de Google (Exportar → CSV de Google). Se reconocen el formato actual (`First Name`, `Phone 1 - Label`) y el antiguo (`Given Name`, `Group Membership`).'
  - 'Las columnas se conectan solas y llevan la marca **segura**; normalmente no hay nada que cambiar.'
  - 'Elige el país para los números guardados sin código de país y decide si quieres combinar los duplicados.'
  - 'Descarga el .vcf e impórtalo en el [iPhone](/es/importar-vcf-en-iphone/) o en [Outlook](/es/importar-contactos-a-outlook/).'
features:
  - feature: 'Formatos'
    value: 'CSV de Google actual (`First Name`, `Labels`, `E-mail 1 - Label`…) y el antiguo (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type`…).'
  - feature: 'Varios valores'
    value: 'Varios números o correos en una celda, separados por ` ::: `, se convierten en líneas `TEL` / `EMAIL` separadas, cada una con su etiqueta.'
  - feature: 'Etiquetas'
    value: 'Mobile, Work, Home, Main, Work Fax, Home Fax y Pager (celular, trabajo, casa, principal, fax del trabajo, fax de casa, localizador) se convierten en tipos de vCard; las etiquetas personalizadas (p. ej., “WhatsApp”) se conservan como `X-ABLabel`.'
  - feature: 'Grupos'
    value: '`Labels` / `Group Membership` se convierten en `CATEGORIES`; las etiquetas del sistema `* myContacts` y `* starred` se descartan.'
  - feature: 'Fechas'
    value: 'Cumpleaños con y sin año (`--05-17`); el aniversario de `Event 1` se conserva.'
  - feature: 'No se traspasa'
    value: 'Las fotos (el CSV solo guarda un enlace) y “File As”. Los campos personalizados se escriben en la nota.'
faq:
  - q: 'Contactos de Google puede exportar vCard por sí mismo. ¿Por qué convertir el CSV?'
    a: 'Si todavía tienes la cuenta de Google, Exportar → vCard es el camino más simple. Usa esta página cuando solo tienes el CSV (porque te lo mandó otra persona, lo exportaste hace años o lo editaste en Excel) o cuando quieres limpiar los números y combinar los duplicados antes.'
  - q: '¿Qué significa ` ::: ` en mi CSV?'
    a: 'Google junta varios valores del mismo tipo en una celda y los separa con ` ::: `. Por ejemplo, dos números de celular: `+52 55 1234 5678 ::: +52 55 9876 5432`. En la tarjeta se convierten en dos líneas de teléfono separadas.'
  - q: '¿Se conservan los grupos (etiquetas)?'
    a: 'Sí, como `CATEGORIES`. El iPhone no muestra las categorías, pero Contactos de Google, Outlook y la mayoría de las apps de Android sí.'
  - q: '¿Por qué algunos números aparecen como no válidos?'
    a: 'Google exporta los números tal como se escribieron. Un número local sin código de país se comprueba con el país que elijas; si no encaja en el plan de numeración de ese país, se escribe sin cambios y se marca.'
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

**CSV de Google** es el formato de tabla que usa Contactos de Google (Google Contacts) para exportar e importar. Es distinto de una lista simple. Cada teléfono, correo, dirección y sitio web tiene un par de columnas (`Phone 1 - Label` y `Phone 1 - Value`), y una sola celda puede contener varios valores separados por ` ::: `. Los convertidores genéricos suelen fallar aquí: meten `+52 55 1234 5678 ::: +52 55 9876 5432` en un solo campo o pierden las etiquetas.

**Cómo las etiquetas se convierten en tipos de vCard.** La etiqueta decide el tipo de cada línea:

| Etiqueta de Google | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| personalizada, p. ej. “WhatsApp” | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

Un asterisco delante de una etiqueta (`* Work`) marca el valor principal en las exportaciones antiguas; se elimina.

**Dos formatos.** Google cambió los nombres de las columnas de su exportación CSV. Los archivos actuales empiezan con `First Name, Middle Name, Last Name`; los antiguos, con `Name, Given Name, Additional Name, Family Name`, y usan `Type` en lugar de `Label`. Los dos se detectan solos: el panel del archivo muestra cuál se encontró.

**Cumpleaños sin año.** Google los guarda como `--05-17`. Se escriben en la vCard de la misma forma, así que el año queda vacío en lugar de convertirse en 1604 o 1900.
