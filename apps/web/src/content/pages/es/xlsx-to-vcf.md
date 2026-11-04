---
url: convertir-xlsx-a-vcf
title: 'Convertir XLSX a VCF: contactos de un libro de Excel a vCard'
h1: 'Convertir XLSX a VCF'
description: 'Convierte una hoja de contactos .xlsx a VCF (vCard): elige la hoja, conserva teléfonos y fechas completos y obtén un .vcf para iPhone, Android o Google. Sin subir nada.'
lead: 'Elige una hoja de tu libro .xlsx y obtén un .vcf con una tarjeta por fila. Los números de teléfono se leen completos y las celdas de fecha se convierten en cumpleaños.'
nav: 'XLSX a VCF'
summary: 'Libros de Excel modernos (.xlsx) a vCard, eligiendo la hoja.'
steps:
  - 'Suelta arriba el .xlsx. Se abre la primera hoja visible con datos; cambia de hoja en la lista “Hoja”.'
  - 'Mira la vista previa de las primeras filas: las letras de columna son las mismas que en Excel, y los números de fila también.'
  - 'Revisa las conexiones de las columnas y elige el país de los teléfonos y la versión de vCard (3.0 sirve para todos los teléfonos actuales).'
  - 'Descarga el .vcf, o un ZIP con un archivo por contacto si necesitas adjuntar las tarjetas una por una.'
features:
  - feature: 'Libros'
    value: '.xlsx, .xlsm y .xlsb; se puede elegir cualquier hoja y las ocultas aparecen marcadas.'
  - feature: 'Fórmulas'
    value: 'Se usa el último valor calculado, por ejemplo un nombre formado con `=B2&" "&C2`.'
  - feature: 'Celdas combinadas y vacías'
    value: 'Una celda combinada se lee una sola vez, en su celda superior izquierda. Las columnas vacías se ocultan en el panel de asignación.'
  - feature: 'Números largos'
    value: 'Se leen exactos hasta 15 dígitos, el límite de precisión del propio Excel. Las cadenas de más dígitos deben guardarse como texto en Excel.'
  - feature: 'Salida'
    value: 'vCard 3.0, 4.0 o 2.1; un solo archivo o ZIP; CSV de Google o de Outlook.'
faq:
  - q: '¿Por qué no exportar la hoja como CSV y convertir eso?'
    a: 'Porque la exportación a CSV de Excel escribe lo que muestra la celda. Un teléfono que se ve como `5,25512E+11` se exporta con los dígitos cortados. El .xlsx todavía guarda el número completo, así que convierte el libro directamente.'
  - q: 'Mis contactos están repartidos en varias hojas. ¿Puedo juntarlos?'
    a: 'Convierte cada hoja e importa los archivos uno tras otro, o copia antes las filas a una sola hoja. Se pueden combinar varios archivos: suéltalos juntos.'
  - q: '¿Cómo se leen los cumpleaños guardados en Excel?'
    a: 'Las celdas con formato de fecha se leen como fechas, sea cual sea su formato de visualización. También se leen fechas en texto: `17/05/1990`, `05/17/1990`, `1990-05-17` o `17 de mayo de 1990`, en 13 idiomas.'
  - q: '¿Se ejecutan fórmulas o macros?'
    a: 'No. Las macros nunca se ejecutan. Las celdas con fórmula se leen con los valores que Excel guardó en el archivo.'
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

Un archivo **.xlsx** es un archivo ZIP con partes XML: una por hoja, más el texto compartido y los estilos de celda. El convertidor lo descomprime en tu navegador con [SheetJS](https://sheetjs.com/) y lee las celdas de la hoja que elijas. No se envía nada a ningún sitio.

**Números y texto.** Excel guarda un teléfono como número o como texto. Los números pierden el `0` inicial y el `+`. El convertidor los recupera con el país que elijas y comprueba cada resultado con el plan de numeración de ese país. Los números que no pasan la comprobación se escriben sin cambios y se marcan, así que nada desaparece sin aviso. Si en una columna hay más que unos pocos números afectados, una nota bajo el nombre del archivo indica cuántos.

**Fechas.** Excel guarda una fecha como el número de días transcurridos desde 1900 (o desde 1904 en los libros antiguos de Mac). El convertidor lee el tipo de celda y convierte las celdas de fecha reales en valores `BDAY`. Un cumpleaños sin año (`--05-17`) se queda sin año.

**Asignación.** El panel de conexiones muestra cada columna que no está vacía con su letra, su encabezado y valores de ejemplo. Cambia cualquier conexión con su lista; una segunda lista fija el tipo, así puedes marcar una columna como celular, trabajo o casa. Tus cambios se aplican al momento en la vista previa de las tarjetas.

Para el caso general y los archivos CSV, usa el [convertidor de CSV a VCF](/es/).
