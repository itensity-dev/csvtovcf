---
url: convertir-xls-a-vcf
title: 'Convertir XLS a VCF: archivos de Excel antiguos a vCard'
h1: 'Convertir XLS a VCF'
description: 'Convierte listas de contactos .xls de Excel 97–2003, CRM antiguos y programas de sincronización a VCF. Decodifica las páginas de códigos antiguas. Sin subir nada.'
lead: 'Lee el formato binario antiguo de Excel (.xls), incluidos los archivos de Excel 95, de programas de contabilidad y de software de sincronización de teléfonos, y escribe un .vcf que importan los teléfonos actuales.'
nav: 'XLS a VCF'
summary: 'Archivos de contactos .xls antiguos (Excel 97–2003 y anteriores) a vCard.'
steps:
  - 'Suelta arriba el archivo .xls. El formato se detecta por el contenido del archivo, así que un libro con la extensión equivocada también se abre.'
  - 'Elige la hoja si hay varias y revisa la vista previa: los nombres con tildes, ñ, cirílico, griego, turco o letras de Europa central deben leerse bien.'
  - 'Revisa las conexiones de las columnas y elige el país para los números sin código de país.'
  - 'Descarga el .vcf. Elige vCard 2.1 solo si el archivo va de vuelta a un teléfono antiguo; los teléfonos actuales usan 3.0.'
features:
  - feature: 'Formatos'
    value: 'BIFF8 (.xls de Excel 97–2003), BIFF5 (Excel 95), BIFF2–4 y Excel 2003 XML, además de .xlsx y .ods.'
  - feature: 'Páginas de códigos antiguas'
    value: 'El texto de los .xls anteriores a Unicode (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5…) se decodifica con la página de códigos guardada en el archivo.'
  - feature: 'Números y fechas'
    value: 'Los teléfonos se leen completos; las celdas de fecha, incluido el sistema de fechas 1904 de los libros antiguos de Mac, se convierten en cumpleaños.'
  - feature: 'Salida'
    value: 'vCard 3.0 (predeterminada), 4.0 o 2.1, un archivo o uno por contacto; CSV de Google; CSV de Outlook.'
  - feature: 'No compatible'
    value: '.xls cifrados (con contraseña de apertura), archivos de Lotus 1-2-3 y Quattro.'
faq:
  - q: '¿Qué diferencia hay entre XLS y XLSX?'
    a: '.xls es el formato binario que Excel usó hasta 2003; .xlsx es el formato XML comprimido que se usa desde Excel 2007. Aquí los dos se leen igual. Algunos programas antiguos y herramientas de sincronización de teléfonos todavía exportan .xls.'
  - q: 'Los nombres de mi archivo antiguo salen como `Ãëåá` o con signos de interrogación. ¿Qué hago?'
    a: 'En este convertidor no debería pasar: los archivos .xls guardan su página de códigos, y se aplica al leerlos. Si las letras siguen mal, lo más probable es que el texto ya estuviera dañado cuando se escribió en Excel. Abre el archivo en Excel y revisa las celdas ahí.'
  - q: '¿Puedo convertir un .xls con miles de contactos?'
    a: 'Sí. No hay límite de filas; 100 000 filas se convierten en unos segundos. Para Contactos de Google, divide el resultado en archivos de hasta 3000 contactos.'
  - q: '¿Qué versión de vCard sirve para un teléfono antiguo?'
    a: 'vCard 2.1. Escribe el texto no ASCII (tildes, ñ, cirílico…) en Quoted-Printable con `CHARSET=UTF-8`, que entienden los teléfonos de los años 2000. A los smartphones dales 3.0.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS** es el formato de archivo que Excel usaba antes de 2007. Sigue siendo habitual en listas de contactos exportadas desde CRM antiguos, programas de contabilidad, centrales telefónicas y programas de sincronización de teléfonos. Los teléfonos no pueden leerlo, y Contactos de Google solo importa CSV o vCard. El convertidor lee el .xls por sí mismo, así que no necesitas tener Excel instalado.

**Páginas de códigos.** Excel 97–2003 guarda el texto en Unicode, pero los archivos de Excel 95 y de algunos generadores lo guardan en la página de códigos del equipo que los creó: Windows-1252 para el español y otros idiomas de Europa occidental, Windows-1251 para el ruso, 1250 para el polaco o el checo, 1254 para el turco. El convertidor aplica la página de códigos registrada en el archivo, así que `Muñoz` sigue siendo `Muñoz` e `Иванов` sigue siendo `Иванов`. El .vcf siempre se escribe en UTF-8.

**De filas a tarjetas.** La fila de encabezado se detecta sola. Las columnas se reconocen por su nombre en muchos idiomas: “Teléfono”, “Handy”, “Телефон” y “Cep Telefonu” se convierten todas en números de teléfono. Cada fila pasa a ser una tarjeta con los campos obligatorios `N` y `FN`; las filas sin nombre, teléfono, correo, empresa ni dirección se omiten y aparecen en una lista con su número de fila.

**Qué versión descargar.** vCard 3.0 se importa en iPhone, Android, Contactos de Google y Outlook. vCard 2.1 está para los teléfonos de los que solían venir esos .xls: celulares básicos y los primeros Nokia o Sony Ericsson. [En qué se diferencian las versiones](/es/que-es-un-archivo-vcf/).
