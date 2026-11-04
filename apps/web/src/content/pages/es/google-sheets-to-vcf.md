---
url: convertir-google-sheets-a-vcf
title: 'Convertir Google Sheets a VCF: pega los contactos y descarga'
h1: 'Convertir Google Sheets a VCF'
description: 'Copia las celdas de contactos de Google Sheets, pégalas aquí y descarga un VCF para iPhone, Android o Contactos de Google. Sin instalar nada ni dar acceso a tu cuenta.'
lead: 'Selecciona las filas de contactos en Google Sheets, cópialas, pégalas aquí y descarga un .vcf. Sin complementos y sin acceso a tu cuenta de Google: las celdas pasan de tu portapapeles a esta página y a ningún otro sitio.'
nav: 'Google Sheets a VCF'
summary: 'Pega celdas de Google Sheets y descarga un .vcf.'
steps:
  - 'En Google Sheets, selecciona las filas de contactos junto con la fila de encabezado (clic en el número de la primera fila, Mayús+clic en el de la última) y cópialas con Ctrl+C (⌘C en Mac).'
  - 'Haz clic arriba en **Pegar celdas**, pega con Ctrl+V y pulsa **Usar estas celdas**. Las celdas pegadas llegan separadas por tabuladores, así que las comas dentro de nombres o direcciones no causan problemas.'
  - 'Revisa las conexiones de las columnas y elige el país para los números sin código de país.'
  - 'Descarga el .vcf e impórtalo: en [Android](/es/importar-contactos-vcf-android/), en [iPhone](/es/importar-vcf-en-iphone/) o en [Contactos de Google](/es/importar-contactos-a-google/).'
features:
  - feature: 'Entrada'
    value: 'Celdas pegadas desde Google Sheets, Excel, LibreOffice o Numbers (separadas por tabuladores), o un archivo descargado con Archivo → Descargar → .xlsx o .csv.'
  - feature: 'Acceso a la cuenta'
    value: 'Ninguno. Sin complemento, sin iniciar sesión, sin API de Google: el convertidor solo ve lo que pegas.'
  - feature: 'Números de teléfono'
    value: 'Sheets suele guardar los teléfonos como números (sin “+” ni 0 inicial). Se completan con el país elegido y se escriben en formato internacional.'
  - feature: 'Salida'
    value: 'vCard 3.0, 4.0 o 2.1; un archivo o un ZIP; CSV de Contactos de Google si prefieres importar la lista en Contactos de Google como tabla.'
  - feature: 'Límites'
    value: 'Ninguno en el convertidor. Para pegar muchísimas filas (más de 100 000) es más cómodo usar un archivo .xlsx descargado.'
faq:
  - q: '¿Hay un complemento de Google Sheets para esto?'
    a: 'Esta página es la alternativa a un complemento: un complemento necesita permiso para leer tus hojas de cálculo, mientras que copiar y pegar le da a esta página solo las celdas que seleccionas.'
  - q: '¿Descargo la hoja como CSV o como Excel?'
    a: 'Cualquiera de las dos opciones sirve. Archivo → Descargar → Microsoft Excel (.xlsx) conserva los números y las fechas como valores; el CSV también va bien, porque Google Sheets escribe los CSV en UTF-8.'
  - q: 'Los números pegados perdieron el cero inicial. ¿Se pueden reparar?'
    a: 'Sí, si eliges el país correcto: el número nacional se completa con el código de país. Para que en adelante se queden tal como los escribes, da a la columna el formato Formato → Número → Texto sin formato.'
  - q: '¿Puedo pasar los contactos directamente a Contactos de Google?'
    a: 'Importa el .vcf descargado en contacts.google.com → Importar. Google acepta hasta 3000 contactos por archivo. [Guía](/es/importar-contactos-a-google/).'
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

Google Sheets (Hojas de cálculo de Google) es donde se guardan y comparten muchas listas de contactos: inscripciones a eventos, listas de equipos, exportaciones de clientes. Para pasar a esas personas a un teléfono, la hoja tiene que convertirse en un archivo **VCF** (vCard).

**Por qué pegar en lugar de usar un complemento.** Los complementos que crean vCards a partir de una hoja piden permiso para ver tus hojas de cálculo. Copiar celdas le da a esta página exactamente lo que seleccionaste y nada más. Cuando copias desde Sheets, el portapapeles guarda las celdas como texto separado por tabuladores. El convertidor lee ese formato tal cual, incluidos los saltos de línea dentro de las celdas y las comillas.

**Encabezados.** Copia también la fila de encabezado: así “Nombre”, “Teléfono” o “Correo” se reconocen y se conectan solos. Sin encabezado, las columnas se asignan por su contenido. Una columna de correos, una de teléfonos y una con valores de dos palabras se encuentran igual, pero revisa las conexiones.

**Números en Sheets.** Igual que Excel, Google Sheets trata `01141234567` como un número si la columna no es de texto sin formato, y le quita el cero inicial. El convertidor conoce el plan de numeración de cada país. Con México seleccionado, `5512345678` se convierte en `+525512345678` y se comprueba que sea un número válido.

**Duplicados.** En las hojas compartidas, la misma persona suele aparecer dos veces. Abre la pestaña *Duplicados* después de pegar: las personas con el mismo teléfono o correo se agrupan, y puedes combinarlas antes de descargar.
