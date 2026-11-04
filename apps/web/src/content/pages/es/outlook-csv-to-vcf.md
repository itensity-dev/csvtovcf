---
url: convertir-csv-de-outlook-a-vcf
title: 'Convertir CSV de Outlook a VCF: contactos de Outlook a vCard'
h1: 'Convertir CSV de Outlook a VCF'
description: 'Convierte contactos exportados de Outlook (CSV en cualquier idioma) a un solo VCF para iPhone, Android o Gmail. Lee encabezados traducidos y codificaciones de Windows.'
lead: 'Convierte una exportación de contactos de Outlook en un solo .vcf. Funciona con encabezados en español, inglés, alemán, francés, ruso y otros idiomas de Outlook, y con las codificaciones de Windows con las que escribe Outlook.'
nav: 'CSV de Outlook a VCF'
summary: 'Exportación de contactos de Outlook (CSV en cualquier idioma) a un solo archivo vCard.'
steps:
  - 'Exporta desde Outlook. Outlook clásico: Archivo → Abrir y exportar → Importar o exportar → Exportar a un archivo → Valores separados por comas → Contactos. Nuevo Outlook y Outlook.com: Personas → Administrar contactos → Exportar contactos.'
  - 'Suelta arriba el .csv. El convertidor detecta la codificación (Outlook suele escribir en Windows-1252 o 1251, no en UTF-8) y el separador (`;` en muchas configuraciones europeas, como la de España).'
  - 'Revisa las conexiones: la columna `Title` de Outlook es el tratamiento (Sr., Dr.) y `Job Title` es el cargo. Las columnas vacías (Outlook exporta unas 90) se ocultan.'
  - 'Descarga el .vcf e impórtalo en el [iPhone](/es/importar-vcf-en-iphone/) o en [Android](/es/importar-contactos-vcf-android/).'
features:
  - feature: 'Versiones de Outlook'
    value: 'Exportaciones CSV de Outlook clásico para Windows (2010–2024, Microsoft 365), del nuevo Outlook, de Outlook.com y de Outlook para Mac.'
  - feature: 'Idiomas de los encabezados'
    value: 'Inglés, alemán (`Vorname`, `Telefon geschäftlich`), francés (`Prénom`, `Tél. mobile`), ruso (`Имя`, `Рабочий телефон`), español, portugués, italiano, neerlandés, polaco y turco.'
  - feature: 'Teléfonos'
    value: 'Las columnas Business, Home, Mobile, Primary, Company Main, Fax y Pager conservan su tipo; Car, Callback, ISDN y Radio pasan a “otro”.'
  - feature: 'Direcciones'
    value: 'Calle, ciudad, estado, código postal y país de las direcciones Business / Home / Other se convierten en tres entradas `ADR` con su tipo; Street 2 y 3 se unen a la calle.'
  - feature: 'Valores vacíos'
    value: 'Outlook escribe las fechas vacías como `0/0/00`: se ignoran y no se convierten en el año 2000.'
  - feature: 'No se traspasa'
    value: 'Fotos, marcas de seguimiento, “Internet Free Busy”, campos de usuario 1–4 (asígnalos a la nota si los necesitas).'
faq:
  - q: 'Outlook puede guardar un contacto como vCard. ¿Por qué convertir el CSV?'
    a: 'Outlook guarda una vCard por contacto; no permite exportar todos los contactos a un solo .vcf. La exportación CSV contiene a todos, y esta página la convierte en un solo archivo .vcf, o en un ZIP con una tarjeta por contacto.'
  - q: 'Mi exportación tiene encabezados en español (o en alemán, francés, ruso…). ¿Funciona?'
    a: 'Sí. Outlook clásico escribe los encabezados en el idioma de su interfaz, y el convertidor los conoce. El panel del archivo muestra “CSV de Outlook, encabezados traducidos” y el idioma que detectó.'
  - q: '¿Por qué aparece `Mr.` o `Sr.` en el nombre?'
    a: 'La columna `Title` de Outlook guarda el tratamiento, así que se escribe como prefijo del nombre. Si no lo quieres en el teléfono, pon esa columna en *omitir*.'
  - q: 'Los nombres salen como `MuÃ±oz`, `MÃ¼ller` o con signos de interrogación.'
    a: 'La codificación se leyó mal. Elige la que usó Outlook: Windows-1252 para el español y otros idiomas de Europa occidental, Windows-1251 para el cirílico, Windows-1250 para Europa central. La vista previa se actualiza al instante. [Más sobre nombres con caracteres raros](/es/contactos-con-caracteres-raros/).'
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

Outlook exporta los contactos como un CSV de hasta unas 90 columnas: tres direcciones, diecinueve campos de teléfono, tres correos, campos de usuario y más. En la mayoría de los contactos, casi todas están vacías. El convertidor oculta las columnas vacías, conecta el resto a campos vCard y escribe una tarjeta por contacto.

**Encabezados traducidos.** Outlook clásico nombra las columnas en el idioma de su interfaz. La documentación de Microsoft dice que, para importar, el idioma de los encabezados debe coincidir con el de Outlook, así que un Outlook en alemán escribe `Vorname, Nachname, Mobiltelefon`. El convertidor reconoce estos encabezados por sus palabras, no por una lista fija. Por eso `Teléfono del trabajo`, `Telefon geschäftlich`, `Téléphone (bureau)` y `Рабочий телефон` acaban todos como teléfono del trabajo.

**Campos que confunden a otros convertidores.**

- `Title` es el tratamiento (Sr., Sra., Dr.); `Job Title` es el cargo.
- `Business Street`, `Business Street 2` y `Business Street 3` forman una sola dirección.
- `E-mail Type` (`SMTP`) y `E-mail Display Name` no son direcciones y se omiten.
- `Birthday` = `0/0/00` significa “sin cumpleaños”.

**Codificaciones.** Outlook clásico suele escribir el CSV en la página de códigos de Windows de tu sistema, no en UTF-8, y un CSV que se volvió a guardar con un Excel europeo usa punto y coma. Las dos cosas se detectan. Si los nombres se ven mal, cambia la codificación en el panel del archivo y mira cómo cambia la vista previa.

**¿De vuelta a Outlook?** Para pasar contactos *a* Outlook, el CSV es el camino más seguro: Outlook clásico importa un .vcf con varios contactos de tarjeta en tarjeta. Elige “CSV de Outlook” en *Descargar como*. [Guía para importar en Outlook](/es/importar-contactos-a-outlook/).
