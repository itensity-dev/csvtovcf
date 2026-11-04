---
url: importar-vcf-en-iphone
title: 'Cómo importar un archivo VCF en iPhone (todos los contactos)'
h1: 'Cómo importar un archivo VCF en iPhone'
description: 'Agrega todos los contactos de un .vcf a tu iPhone: con AirDrop, Mail o Archivos en el teléfono, o con iCloud.com en la computadora. Pasos para iOS 26 y soluciones.'
lead: 'Dos formas de importar un .vcf completo con muchos contactos: abrir el archivo en el iPhone y tocar “Agregar todos los contactos”, o importarlo en iCloud.com y dejar que se sincronice.'
nav: 'Importar en iPhone'
summary: 'Pasa todos los contactos de un .vcf a un iPhone: en el teléfono o con iCloud.com.'
steps:
  - 'Crea el .vcf con el [convertidor](/es/): vCard 3.0 y formato de teléfono “E.164” (`+525512345678`).'
  - 'Envíalo al iPhone: por AirDrop desde una Mac, en un correo a ti mismo, o guárdalo en iCloud Drive y ábrelo en la app Archivos.'
  - 'Toca el archivo. iOS muestra los contactos que contiene; toca **Agregar todos los contactos** (en España, **Añadir todos los contactos**; según la versión, el botón incluye el número de contactos, p. ej., 248). Si Archivos solo muestra una vista previa, toca Compartir → **Contactos**.'
  - 'Comprueba que los contactos queden en la cuenta correcta: Configuración (en España, Ajustes) → Apps → Contactos → **Cuenta predeterminada** (Default Account) decide si van a iCloud, a Gmail o a “En mi iPhone”.'
faq:
  - q: 'El iPhone solo muestra el primer contacto. ¿Dónde están los demás?'
    a: 'Si el archivo se abrió en una vista previa (Vista rápida), solo se ve una tarjeta. Usa Compartir → Contactos, o abre el archivo desde Mail, Mensajes o Archivos, que muestran la lista completa con “Agregar todos los contactos”. También puedes importarlo en iCloud.com: cada tarjeta se convierte en un contacto aparte.'
  - q: '¿Necesito iCloud para importar contactos?'
    a: 'No. Abrir el .vcf en el teléfono funciona sin iCloud; los contactos se guardan en la cuenta predeterminada. iCloud.com es útil cuando tienes el archivo en una computadora.'
  - q: 'Algunos contactos no se agregaron. ¿Por qué?'
    a: 'Cuando importas desde Mensajes, iOS agrega solo las tarjetas que no están ya en tus contactos. Revisa los duplicados y la lista de filas omitidas en el informe del convertidor.'
  - q: 'Los nombres salen con caracteres raros después de importar.'
    a: 'Probablemente la vCard era 2.1 o no estaba en UTF-8. Vuelve a convertir con vCard 3.0: el convertidor siempre escribe en UTF-8. [Por qué los nombres salen con caracteres raros](/es/contactos-con-caracteres-raros/).'
  - q: 'Los cumpleaños sin año aparecen con el año 1604.'
    a: 'iOS usa 1604 internamente para indicar “sin año”. Los contactos convertidos aquí guardan los cumpleaños sin año como `--05-17`; si tu versión de iOS muestra un año, edita la tarjeta una vez y bórralo.'
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## Método 1: en el iPhone

Es la forma más rápida cuando el archivo ya está en el teléfono o en tu correo.

1. **Pasa el archivo al iPhone.** Envíalo por AirDrop desde una Mac, mándatelo por correo o por Mensajes, o guárdalo en iCloud Drive.
2. **Ábrelo.** En Mail o Mensajes, toca el archivo adjunto. En Archivos, toca el archivo; si solo ves la vista previa de una tarjeta, toca el botón Compartir y elige **Contactos**.
3. **Agrégalos todos.** La lista muestra cada tarjeta del archivo. Toca **Agregar todos los contactos** (en España, **Añadir todos los contactos**); el texto exacto depende de la versión de iOS y puede incluir el número de contactos.
4. **Listo.** Los contactos aparecen en la app Contactos y en la app Teléfono. WhatsApp, Telegram y otras apps los ven después de su siguiente sincronización de contactos.

## Método 2: iCloud.com en la computadora

Apple documenta esta vía. También sirve para archivos con muchos contactos y es cómoda cuando el .vcf está en tu computadora.

1. Inicia sesión en [icloud.com](https://www.icloud.com/) y abre **Contactos**.
2. Haz clic en el botón **+** y elige **Importar contacto**. Algunas versiones de la página muestran en su lugar un icono de engranaje con **Importar vCard**.
3. Elige el archivo .vcf. Cada persona del archivo se convierte en un contacto aparte en *Todos los contactos*.
4. En el iPhone, Contactos tiene que estar activado en iCloud: Configuración (Ajustes) → tu nombre → iCloud → Contactos. Los contactos nuevos llegan en menos de un minuto.

## Antes de importar

- **Usa vCard 3.0.** Es la versión que exportan los propios iPhone. vCard 2.1 es solo para teléfonos antiguos.
- **Escribe los números en formato internacional.** `+525512345678` funciona cuando viajas y en las apps de mensajería; los números sin código de país pueden no asociarse con cuentas de WhatsApp.
- **Quita los duplicados antes.** La pestaña *Duplicados* del convertidor muestra las personas que aparecen dos veces en tu hoja; marca “Combinar” para unirlas.
- **Haz una copia de seguridad.** Importar es fácil de repetir, pero deshacerlo es pesado: exporta tus contactos actuales desde iCloud.com antes de importar cientos de contactos nuevos.

## Deshacer una importación

iOS no tiene “deshacer importación”. En iCloud.com puedes seleccionar varios contactos con Mayús+clic o Cmd+clic y borrarlos juntos, así que prueba el archivo con unas pocas filas antes de importar miles.
