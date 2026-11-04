---
url: contactos-con-caracteres-raros
title: 'Contactos con caracteres raros (Ã©, Ã±, ???): cómo arreglarlos'
h1: 'Por qué los contactos importados salen con caracteres raros y cómo arreglarlo'
description: 'Nombres como “MuÃ±oz”, “JosÃ©” o “????” después de importar contactos vienen de una codificación de texto equivocada. Cómo reconocer la causa y convertir bien el archivo.'
lead: 'Los nombres con caracteres raros (`MuÃ±oz`, `JosÃ©`, `Ð˜Ð²Ð°Ð½`, `Èâàí`, `????`) indican que el archivo se leyó con una codificación de texto distinta de la que se usó al escribirlo. La solución es leer el original con la codificación correcta y escribir la vCard en UTF-8.'
nav: 'Contactos con caracteres raros'
summary: 'Reconoce la confusión de codificación detrás de Ã©, Ã± o ??? y arréglala.'
faq:
  - q: '¿Puedo reparar los nombres que ya están dañados en mi teléfono?'
    a: 'Normalmente es más fácil borrar el lote importado e importar un archivo correcto. Repararlos sobre lo ya importado solo funciona cuando el daño es reversible (UTF-8 leído como Latin-1); los signos de interrogación significan que las letras se perdieron.'
  - q: '¿Por qué Excel guarda mi CSV con signos de interrogación?'
    a: '“CSV (delimitado por comas)” guarda en la página de códigos de Windows de tu sistema. Las letras que no están en ella (el cirílico en una computadora en español, la ğ turca en una en alemán) se convierten en `?`. Guarda como “CSV UTF-8 (delimitado por comas)” o convierte directamente el .xlsx.'
  - q: '¿Qué codificación debe tener una vCard?'
    a: 'UTF-8. vCard 3.0 y 4.0 la dan por supuesta; en vCard 2.1, cada valor no ASCII debe llevar `CHARSET=UTF-8` y codificación Quoted-Printable. El convertidor de este sitio siempre lo hace así.'
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Reconoce el patrón

Cada tipo de daño tiene un aspecto típico, y ese aspecto te dice qué salió mal:

| Lo que ves | Debería decir | Causa |
| --- | --- | --- |
| `MuÃ±oz`, `JosÃ©` | Muñoz, José | archivo UTF-8 leído como Windows-1252 / Latin-1 |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | cirílico en UTF-8 leído como Windows-1252 |
| `Èâàí Ïåòðîâ` | Иван Петров | archivo Windows-1251 leído como Windows-1252 |
| `Ayþe Yýlmaz` | Ayşe Yılmaz | Windows-1254 (turco) leído como Windows-1252 |
| `ÇáÇÓã` | الاسم | Windows-1256 (árabe) leído como Latin-1 |
| `Иван` → `????` | Иван | letras perdidas al guardar en una página de códigos que no las tiene |
| `Ã` o `�` en medio de un nombre | — | una línea larga se cortó dentro de una letra de varios bytes |

Todos estos casos, salvo los signos de interrogación, se pueden reparar a partir del archivo original. Los signos de interrogación no: las letras se reemplazaron al guardar el archivo.

## Cómo arreglarlo

1. **Vuelve al archivo original**: el CSV o el libro de Excel, no la vCard dañada.
2. **Ábrelo en el [convertidor](/es/).** Detecta la codificación (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS y otras) y muestra las primeras filas. Si los nombres siguen viéndose mal, elige otra codificación en la lista *Codificación*. La vista previa cambia al instante, así que ves cuál es la correcta.
3. **Descarga vCard 3.0.** El archivo se escribe en UTF-8, que leen todos los teléfonos actuales.
4. **Borra la importación dañada e importa el archivo nuevo.** En Contactos de Google, la etiqueta “Importado el…” te permite borrar todo el lote.

## Por qué pasa

Un archivo de texto no dice qué codificación usa. El formato “CSV” clásico de Excel, la exportación CSV de Outlook y muchos CRM escriben en la **página de códigos de Windows** de la computadora: Windows-1252 en Europa occidental y América, 1251 para el cirílico, 1254 para el turco, 1256 para el árabe. Luego un teléfono o un servicio web lee el archivo como UTF-8, y cada letra que no existe en inglés (á, é, ñ, ü…) se convierte en símbolos. También pasa al revés: un archivo UTF-8 abierto por un programa antiguo que espera Windows-1252 muestra `Ã©` en lugar de `é` y `Ã±` en lugar de `ñ`.

Los teléfonos antiguos agregan un tercer problema. Esperan vCard 2.1 y solo entienden el texto no ASCII cuando está marcado con `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE`. Sin esa marca, un archivo UTF-8 perfectamente correcto se ve roto en ellos. Para esos teléfonos, elige **vCard 2.1** en el convertidor.

## Cómo evitarlo la próxima vez

- En Excel, usa **Archivo → Guardar como → CSV UTF-8 (delimitado por comas)**, o sáltate el CSV y convierte el .xlsx.
- En Outlook, exporta y convierte enseguida; no vuelvas a guardar el CSV en Excel.
- En Google Sheets, las descargas en CSV siempre son UTF-8.
