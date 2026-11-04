---
url: convertir-excel-a-vcf
title: 'Convertir Excel a VCF: exportar contactos de Excel a vCard'
h1: 'Convertir Excel a VCF'
description: 'Convierte una lista de contactos de Excel (.xlsx o .xls) a un archivo VCF para iPhone, Android y Google. Lee el libro directamente y no pierde dígitos. Sin subir nada.'
lead: 'Abre tu libro de Excel directamente, sin pasar por “Guardar como CSV”, y convierte cada fila en una tarjeta de contacto dentro de un solo .vcf. Los teléfonos guardados como números recuperan su código de país; el archivo nunca sale de este dispositivo.'
nav: 'Excel a VCF'
summary: 'Libro XLSX o XLS directo a vCard, con selector de hoja.'
steps:
  - 'Suelta arriba el archivo de Excel (.xlsx, .xls u .ods). Si el libro tiene varias hojas, elige la de los contactos; las hojas ocultas aparecen marcadas.'
  - 'Comprueba que se encontró la fila de encabezado y que las columnas están conectadas a los campos correctos: “Nombre”, “Celular”, “Correo” y “Empresa” se reconocen en muchos idiomas.'
  - 'Indica el país de tus números. Excel quita el 0 inicial y el “+” de los teléfonos guardados como números; el país sirve para recuperarlos.'
  - 'Descarga el .vcf e impórtalo en el teléfono: [iPhone](/es/importar-vcf-en-iphone/), [Android](/es/importar-contactos-vcf-android/).'
features:
  - feature: 'Archivos de Excel'
    value: '.xlsx y .xlsm (Excel 2007 y posteriores), .xls (Excel 97–2003 y anteriores, incluidas las páginas de códigos de Excel 95), .ods. Cualquier hoja; las ocultas aparecen en la lista.'
  - feature: 'Valores de celda'
    value: 'Los números se leen completos (`525512345678`, nunca `5,25512E+11`). Las celdas de fecha se convierten en cumpleaños. Las fórmulas se leen por su último valor calculado.'
  - feature: 'Fila de encabezado'
    value: 'Se encuentra sola, también cuando hay filas de título encima. Desmarca “La primera fila es el encabezado” si tu hoja empieza directamente con datos.'
  - feature: 'Limpieza de teléfonos'
    value: 'Los números sin “+” ni 0 inicial se completan con el país elegido y se escriben en formato internacional, como `+52 55 1234 5678`. Los números no válidos se marcan, no se borran.'
  - feature: 'Salida'
    value: 'Un .vcf (vCard 3.0, 4.0 o 2.1), un ZIP con una tarjeta por contacto, o un CSV de Google o de Outlook.'
  - feature: 'No compatible'
    value: 'Libros protegidos con contraseña (quítala antes en Excel), archivos de Apple Numbers, fotos de contacto incrustadas en celdas.'
faq:
  - q: '¿Tengo que guardar antes el Excel como CSV?'
    a: 'No, y es mejor no hacerlo. Cuando Excel guarda un CSV, escribe los números tal como se ven, así que un teléfono que aparece como `5,25512E+11` se guarda sin sus últimos dígitos. Si se lee el .xlsx directamente, se conservan todos.'
  - q: 'Mis números no tienen el 0 inicial ni el signo +. ¿Funcionarán?'
    a: 'Sí. Elige el país en “Formato de teléfono”: un número como `5512345678` con México seleccionado se convierte en `+525512345678`. También se reconocen los números que empiezan por el código de país sin “+” (`525512345678`).'
  - q: 'Las primeras filas de mi hoja son un título y una línea vacía. ¿Es un problema?'
    a: 'No. Las filas que están encima del encabezado real se omiten, y los números de fila del informe coinciden con los que Excel muestra a la izquierda.'
  - q: '¿Puedo convertir varias hojas o libros a la vez?'
    a: 'Suelta varios archivos juntos y se combinan en un solo resultado. Dentro de un mismo libro, convierte una hoja, cambia de hoja y vuelve a descargar.'
  - q: '¿Funciona con Excel para Mac o con LibreOffice?'
    a: 'Sí. El convertidor lee el archivo, no el programa: funcionan los .xlsx de Excel para Mac, de Excel en la web o descargados de Google Sheets, y los .ods de LibreOffice.'
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

Los archivos de Excel no son un formato de contactos, así que los teléfonos no pueden importarlos. Un archivo **VCF** (vCard) se puede importar en cualquier lado, con una tarjeta por persona. El convertidor lee las celdas de la hoja, asigna las columnas a campos vCard y escribe una tarjeta por fila.

**Por qué es mejor leer el libro que un CSV.** Dentro de un .xlsx, un número de teléfono se guarda completo (hasta 15 dígitos), aunque la celda muestre `5,25512E+11`. Solo cuando Excel *guarda un CSV* escribe el texto visible, y los dígitos ocultos se pierden. Por eso esta página abre los .xlsx y .xls directamente. Más detalles en [por qué Excel muestra los teléfonos como E+11](/es/numeros-de-telefono-excel-e11/).

**Qué le hace Excel a los números de teléfono.** Un número escrito en una celda con formato General pierde el cero inicial (`01141234567` → `1141234567`, como pasa con los números de Argentina) y el signo más (`+525512345678` → `525512345678`). El convertidor no adivina a ciegas. Analiza cada número con las reglas de numeración del país que elijas y comprueba que el resultado sea un número real de ese país. Si un número empieza por el prefijo internacional de ese país (52 en el caso de México), se trata como internacional. El informe cuenta cuántos números se completaron así, y las tarjetas muestran el resultado antes de que descargues.

**Fechas.** Las celdas de cumpleaños con formato de fecha se leen como fechas, sea cual sea el formato de visualización de la hoja. También se leen fechas escritas como texto, como `17/05/1990` o `05/17/1990`: el convertidor mira toda la columna para decidir si va primero el día o el mes.

**Las columnas que no son campos de contacto** (“Notas”, “ID de cliente”, “Último pedido”) pueden ir a la nota u omitirse. No se exporta nada que hayas marcado como *omitir*.
