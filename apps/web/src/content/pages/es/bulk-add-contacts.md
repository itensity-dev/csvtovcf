---
url: agregar-varios-contactos-a-la-vez
title: 'Cómo agregar varios contactos a la vez al celular (desde Excel)'
h1: 'Cómo agregar muchos contactos al celular de una vez'
description: 'Agrega cientos de contactos a un iPhone o Android desde una lista de Excel o CSV: conviértela en un solo archivo VCF e impórtalo. También para WhatsApp y Telegram.'
lead: 'No hace falta escribir los contactos uno por uno. Convierte la lista en un solo archivo .vcf e impórtalo: el teléfono agrega todos los contactos de una vez, y las apps de mensajería los toman de la agenda.'
nav: 'Agregar muchos contactos'
summary: 'De una hoja de cálculo a cientos de contactos en el celular con una sola importación.'
steps:
  - 'Pon los contactos en una hoja de cálculo: una fila por persona y una fila de encabezado con “Nombre” y “Celular” o “Teléfono” (puedes agregar más columnas).'
  - 'Suelta el archivo en el [convertidor](/es/) y elige el país de los números; se escriben con el prefijo internacional (+…).'
  - 'Descarga un solo .vcf con todos los contactos.'
  - 'Impórtalo: en [Android](/es/importar-contactos-vcf-android/), con Contactos → Organizar → Importar desde archivo; en [iPhone](/es/importar-vcf-en-iphone/), abriendo el archivo y tocando “Agregar todos los contactos”.'
faq:
  - q: '¿Cuántos contactos puede importar un teléfono de una vez?'
    a: 'Miles. Un solo .vcf con varios miles de tarjetas se importa en iPhone y en Android. Contactos de Google en la web pide archivos de 3000 contactos como máximo y guarda 25 000 por cuenta.'
  - q: '¿Los contactos aparecerán en WhatsApp o Telegram?'
    a: 'Sí, cuando los números estén en formato internacional y la app haya actualizado sus contactos. Los números sin código de país muchas veces no se asocian con ninguna cuenta.'
  - q: '¿Necesito una app o un programa de pago?'
    a: 'No. La app Contactos del propio teléfono importa archivos .vcf, y el convertidor de este sitio es gratis y funciona en el navegador.'
  - q: '¿Puedo borrar después los contactos importados?'
    a: 'En Contactos de Google, borra la etiqueta “Importado el…” junto con sus contactos. En iPhone, bórralos en iCloud.com, donde puedes seleccionar muchos a la vez. Prueba antes con un archivo corto.'
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## La vía más rápida

Los teléfonos no importan hojas de cálculo, pero sí archivos **vCard (.vcf)**, y un solo archivo puede tener cualquier número de contactos. Así que el trabajo es: hoja de cálculo → un .vcf → importar.

**Prepara la hoja.** Una fila por persona. Lo mínimo es una columna de nombre y otra de teléfono; también se reconocen columnas de correo, empresa y cumpleaños. El nombre puede ir en una columna (“Nombre completo”) o en dos (“Nombre”, “Apellidos”).

**Convierte.** El [convertidor](/es/) reconoce las columnas, escribe los números en formato internacional y avisa de los números que no parecen válidos antes de que lleguen a tu teléfono. Las personas que aparecen dos veces se pueden combinar.

**Importa.** Un archivo, un toque en el teléfono. Detalles para [Android](/es/importar-contactos-vcf-android/) y para [iPhone](/es/importar-vcf-en-iphone/).

## Para WhatsApp, Telegram y Signal

Las apps de mensajería leen la agenda y buscan cada número en formato internacional. Dos cosas deciden si un contacto aparece:

- **El código de país.** `+52 55 1234 5678` se asocia; `55 1234 5678` solo se asocia si el país del propio teléfono es México. El convertidor agrega el código del país que elijas.
- **Actualizar.** Después de importar, abre la pantalla de nuevo chat de la app. En WhatsApp para Android: ⋮ → Actualizar.

Agregar contactos en masa solo para escribir a desconocidos es spam, y las cuentas acaban bloqueadas. Úsalo con personas que esperan tener noticias tuyas: tu equipo, los socios o miembros, los clientes que te dieron su número.

## Listas grandes

- **Divide para Contactos de Google.** La importación web acepta unos 3000 contactos por archivo. Filtra la hoja en partes y convierte cada una.
- **Elige la cuenta.** Los contactos guardados en la cuenta de Google o de iCloud tienen copia de seguridad y aparecen en todos tus dispositivos. El almacenamiento “solo en el teléfono” se queda en ese dispositivo.
- **Revisa antes de importar.** El informe del convertidor enumera las filas omitidas, los números no válidos y los duplicados, con números de fila que puedes encontrar en Excel.
