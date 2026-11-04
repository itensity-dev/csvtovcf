---
url: ''
title: 'Convertir CSV a VCF gratis (vCard), sin subir archivos'
h1: 'Convertir CSV a VCF (vCard)'
description: 'Convierte una lista de contactos en CSV o Excel a un archivo VCF (vCard 3.0, 4.0 o 2.1) para iPhone, Android, Google y Outlook. Funciona en tu navegador, sin subir nada.'
lead: 'Convierte una hoja de contactos en un solo archivo .vcf que se importa en iPhone, Android, Contactos de Google y Outlook: asigna las columnas, limpia los números de teléfono y detecta los duplicados. El archivo se lee en este dispositivo y nunca se sube.'
nav: 'CSV a VCF'
summary: 'Cualquier hoja de contactos a un archivo .vcf, con asignación de columnas y limpieza de teléfonos.'
steps:
  - 'Suelta tu archivo CSV, Excel u ODS en el recuadro de arriba, o pega celdas de Google Sheets. La codificación y el separador se detectan solos; si en la vista previa aparecen símbolos como `Ã©` o `Ã±` en lugar de letras, elige otra codificación.'
  - 'Revisa las conexiones. Cada columna está conectada a un campo vCard; conviene mirar las que llevan la marca **dudosa**. Las columnas en “omitir” no se exportan.'
  - 'Elige el país para los números escritos sin código de país (en las páginas en español viene seleccionado México). Los números se guardan como `+525512345678`, así se marcan bien desde cualquier país y las apps de mensajería los reconocen.'
  - 'Descarga el .vcf (vCard 3.0, salvo que un dispositivo pida otra versión) e impórtalo: [iPhone](/es/importar-vcf-en-iphone/), [Android](/es/importar-contactos-vcf-android/), [Contactos de Google](/es/importar-contactos-a-google/), [Outlook](/es/importar-contactos-a-outlook/).'
features:
  - feature: 'Entrada'
    value: 'CSV, TSV y TXT con cualquier separador (coma, punto y coma, tabulador, barra vertical, la línea `sep=` de Excel); XLSX, XLS y ODS con selector de hoja; celdas pegadas desde Google Sheets o Excel. Varios archivos a la vez.'
  - feature: 'Codificaciones'
    value: 'UTF-8 con o sin BOM, UTF-16, Windows-1250 a 1258, KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Se detectan automáticamente; puedes cambiarlas y ver el resultado al instante en la vista previa.'
  - feature: 'Exportaciones reconocidas'
    value: 'CSV de Contactos de Google (formato actual y antiguo), CSV de Outlook con encabezados en inglés, alemán, francés, ruso, español, portugués o turco, Connections.csv de LinkedIn, listas simples de “nombre + teléfono” con o sin fila de encabezado.'
  - feature: 'Números de teléfono'
    value: 'Se pasan a formato internacional con las reglas de libphonenumber; los números de celular (móvil) se marcan como celular. Los números no válidos se conservan y se marcan. Se detectan la notación `5,5E+11` de Excel y los números guardados sin “+”.'
  - feature: 'Nombres'
    value: 'Un nombre completo en una sola celda se separa en nombre, segundo nombre y apellidos, incluidos “Apellido, Nombre”, los patronímicos rusos, los dos apellidos del español y partículas como *van* o *da*.'
  - feature: 'Duplicados'
    value: 'Se detectan por número de teléfono y correo electrónico. Combinarlos es opcional; ves los grupos antes de descargar.'
  - feature: 'Salida'
    value: 'vCard 3.0 (predeterminada), 4.0 o 2.1; un solo .vcf o un ZIP con un archivo por contacto; CSV de Contactos de Google; CSV de Outlook.'
  - feature: 'Tamaño'
    value: 'Probado con 100 000 filas: unos segundos en una computadora portátil. Sin límite de filas: el límite es la memoria de tu dispositivo.'
  - feature: 'Privacidad'
    value: 'Sin subir archivos, sin cuenta, sin rastrear el contenido de los archivos. Funciona sin conexión después de la primera visita.'
  - feature: 'No compatible'
    value: 'Fotos de contacto (las hojas de cálculo no las tienen), archivos de Apple Numbers (expórtalos antes a CSV), archivos de Excel protegidos con contraseña.'
faq:
  - q: '¿Se sube mi lista de contactos a algún sitio?'
    a: 'No. Tu navegador lee el archivo y un Web Worker en tu dispositivo lo convierte. Para comprobarlo, abre las herramientas para desarrolladores (F12), ve a la pestaña Red (Network) y convierte un archivo: ninguna solicitud lleva tus datos. Después de la primera visita, el convertidor también funciona sin conexión a internet.'
  - q: '¿Qué versión de vCard elijo?'
    a: 'vCard 3.0. iPhone, Android, Contactos de Google y Outlook la importan. Elige 4.0 solo si una app la pide, y 2.1 para teléfonos antiguos (celulares básicos, Nokia o Sony Ericsson viejos) que muestran letras raras con 3.0.'
  - q: '¿Por qué mis números aparecen como 5,51235E+11 o 5.51235E+11?'
    a: 'Excel mostró el número largo en notación científica y el CSV se guardó así, de modo que los dígitos originales ya no están en el archivo. Da formato de Texto a la columna de teléfonos en Excel y vuelve a exportar, o suelta directamente el archivo .xlsx, donde el número completo sigue guardado. [Por qué pasa](/es/numeros-de-telefono-excel-e11/).'
  - q: '¿Se conservan los nombres con tildes, ñ, cirílico o árabe?'
    a: 'Sí, si la codificación se lee bien. El convertidor la detecta y muestra las primeras filas; si ves `Ã©`, `Ã±`, `Ð¸` o signos de interrogación, elige otra codificación en la lista. El .vcf siempre se escribe en UTF-8, que leen todos los teléfonos actuales.'
  - q: '¿Puedo agregar todos los contactos a un iPhone de una vez?'
    a: 'Sí. Envía el .vcf al iPhone por AirDrop, Mail o Archivos, ábrelo y toca “Agregar todos los contactos” (en España, “Añadir todos los contactos”). [Guía paso a paso](/es/importar-vcf-en-iphone/).'
  - q: '¿Cuántos contactos puedo convertir?'
    a: 'El convertidor no tiene límite. Contactos de Google acepta hasta 3000 contactos por archivo importado y 25 000 por cuenta; divide las listas más grandes en varios archivos.'
  - q: '¿De verdad es gratis?'
    a: 'Sí: sin cuenta, sin marca de agua, sin límite de filas. El motor de conversión es de código abierto, con licencia MIT.'
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard) es el formato estándar de las tarjetas de contacto: cualquier app de teléfono o de correo puede importarlo. Un CSV es solo una tabla, y los teléfonos no importan tablas. El convertidor transforma cada fila en una tarjeta:

```text
BEGIN:VCARD
VERSION:3.0
N:García López;María José;;;
FN:María José García López
TEL;TYPE=CELL:+525512345678
EMAIL;TYPE=INTERNET:mjgarcia@example.mx
ORG:García y Asociados
BDAY:1990-05-17
END:VCARD
```

**Por qué vCard 3.0 es la opción predeterminada.** La versión 3.0 ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)) es el formato que exportan el propio iPhone, Android y Contactos de Google, así que se importa sin problemas en todas partes. La versión 4.0 ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) es más nueva, pero no aporta nada que necesite una agenda de teléfono. La versión 2.1 existe para los teléfonos antiguos: el texto con caracteres fuera de ASCII (tildes, ñ, cirílico…) se escribe en Quoted-Printable con `CHARSET=UTF-8`, la única forma que entienden esos aparatos.

**Qué contiene el archivo.** Cada tarjeta lleva los dos campos obligatorios: `N` (partes del nombre) y `FN` (nombre para mostrar). Si una fila no tiene nombre, se usa la empresa; si tampoco hay empresa, el correo, y por último el número. El texto se escapa y las líneas largas se pliegan a 75 bytes sin partir ninguna letra por la mitad, así que las tildes, la ñ, el cirílico, el árabe, el chino y los emojis llegan intactos. Los saltos de línea son CRLF, como exige el estándar.

**Tipos de teléfono.** Una columna llamada “Celular”, “Móvil”, “Mobile”, “Handy” o “Cep Telefonu” se convierte en `TYPE=CELL`. En una columna genérica “Teléfono” decide el plan de numeración: los números de celular quedan como celular y los fijos, como “teléfono”.

**Qué pasa con lo demás.** Las columnas que no necesitas pueden quedar en *omitir*. Las fechas que el convertidor no sabe leer no se pierden: van a la nota. Cada fila omitida aparece en una lista con su número de fila (el mismo que muestra Excel) y el motivo.

Más información: [qué es un archivo VCF y en qué se diferencian las versiones](/es/que-es-un-archivo-vcf/), [por qué los nombres importados se convierten en símbolos](/es/contactos-con-caracteres-raros/).
