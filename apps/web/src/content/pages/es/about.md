---
url: acerca-de
title: 'Acerca de csvtovcf: quién lo hace y cómo funciona'
h1: 'Acerca de csvtovcf'
description: 'csvtovcf convierte gratis hojas de contactos a vCard, con código abierto y solo en tu navegador. Quién lo hace, cómo se financia y cómo contactar.'
lead: 'csvtovcf convierte hojas de contactos en archivos vCard sin enviarlas a ningún sitio. Es un proyecto pequeño e independiente con un motor de código abierto.'
nav: 'Acerca de'
summary: 'Quién hace csvtovcf, cómo funciona y cómo contactarnos.'
updated: 2026-11-04
---

## Qué es

csvtovcf.com convierte listas de contactos de Excel, Google Sheets, Contactos de Google, Outlook, LinkedIn o cualquier CRM en archivos **vCard (.vcf)** que importan los teléfonos y los programas de correo. Nació porque las opciones que había eran programas de escritorio de pago con versiones de prueba limitadas a diez contactos, o sitios web que suben tu agenda a un servidor y adivinan las columnas.

**Datos:**

- Lanzamiento: noviembre de 2026. Esta página se actualizó por última vez en la fecha que aparece abajo.
- Idiomas: inglés, español, portugués (Brasil), indonesio, turco, alemán, francés y ruso.
- Formatos: CSV, TSV, XLSX, XLS y ODS de entrada; vCard 2.1, 3.0 y 4.0, CSV de Google y CSV de Outlook de salida.
- Precio: gratis, sin cuenta, sin límite de filas.

## Cómo funciona

La página se carga una vez. A partir de ahí, cada paso (leer el archivo, detectar la codificación, asignar las columnas, limpiar los teléfonos, escribir la vCard) se ejecuta en un Web Worker dentro de tu navegador. No se sube nada, y después de la primera visita el convertidor funciona sin conexión. La [página de privacidad](/es/privacidad/) explica exactamente qué se envía por la red y qué no.

El motor de conversión es de código abierto, con licencia MIT: [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf), y está en npm como [`csvtovcf`](https://www.npmjs.com/package/csvtovcf). Los números de teléfono se comprueban con [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js); las hojas de cálculo se leen con [SheetJS](https://sheetjs.com/). Todas las bibliotecas y fuentes aparecen en la [página de licencias](/es/licencias/).

## Quién lo hace

csvtovcf lo hace un desarrollador independiente que también mantiene otras herramientas de un solo propósito: [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/) y otras que aparecen al pie de cada página. Cada una hace una sola cosa y no necesita cuenta.

## Contacto

Errores, columnas mal asignadas, un teléfono que no importa un archivo: escribe a **hello@csvtovcf.com** o abre un issue en [GitHub](https://github.com/itensity-dev/csvtovcf/issues). Si un archivo se convierte mal, describe sus columnas y una fila de ejemplo inventada; por favor, no envíes datos de contactos reales.

csvtovcf no está afiliado a Apple, Google, Microsoft, Samsung ni LinkedIn; sus nombres de productos se usan solo para describir la compatibilidad.
