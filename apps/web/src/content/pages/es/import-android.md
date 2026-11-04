---
url: importar-contactos-vcf-android
title: 'Cómo importar un archivo VCF en Android (Samsung, Xiaomi, Motorola)'
h1: 'Cómo importar un archivo VCF en Android'
description: 'Importa todos los contactos de un .vcf en Android: app Contactos de Google (Pixel, Motorola y muchos más), Contactos de Samsung y Xiaomi. Rutas de menú y soluciones.'
lead: 'Android importa de una sola vez un .vcf con muchos contactos. La ruta del menú depende de la app de contactos: Contactos de Google en Pixel, Motorola y muchos otros celulares, o la app propia de Samsung en los Galaxy.'
nav: 'Importar en Android'
summary: 'Rutas de menú para Contactos de Google, Samsung y Xiaomi.'
steps:
  - 'Crea el .vcf con el [convertidor](/es/) (vCard 3.0) y pásalo al celular: descárgalo directamente en él o cópialo a la carpeta Descargas.'
  - '**App Contactos de Google:** abre Contactos → **Organizar** (pestaña inferior) → **Importar desde archivo** → elige el .vcf → elige la cuenta de Google.'
  - '**Contactos de Samsung:** abre Contactos → menú ☰ → **Administrar contactos** → **Importar o exportar contactos** → **Importar** → elige dónde está el archivo → marca el .vcf → elige dónde guardar (cuenta Samsung, Google, teléfono) → **Importar**.'
  - 'Abre la app Contactos y revisa algunas tarjetas. Guárdalos en la cuenta de Google si los quieres en otros dispositivos y en Gmail.'
faq:
  - q: 'No encuentro “Importar” en la app Contactos de Google.'
    a: 'En las versiones actuales está en la pestaña **Organizar**, abajo → Importar desde archivo. En versiones anteriores: menú (☰) → Configuración → Importar, o “Corregir y administrar” (Fix & manage) → Importar desde archivo. Las versiones recientes lo pasaron a la pestaña Organizar.'
  - q: '¿Dónde conviene guardar los contactos?'
    a: 'En tu cuenta de Google, si quieres tener copia de seguridad y verlos en todos tus dispositivos (y en Gmail). El almacenamiento “Teléfono” o “Dispositivo” los deja solo en este celular, y se pierden con él.'
  - q: 'En mi Samsung los nombres aparecen como símbolos.'
    a: 'Vuelve a convertir con vCard 3.0, no con 2.1. La versión 2.1 escribe el texto no ASCII (tildes, ñ, otros alfabetos) en Quoted-Printable, y algunos teléfonos lo decodifican mal.'
  - q: 'WhatsApp no muestra los contactos nuevos.'
    a: 'WhatsApp asocia los contactos por el número internacional completo. Convierte con el formato de teléfono “E.164” y el país correcto, y luego actualiza los contactos en WhatsApp (Nuevo chat → ⋮ → Actualizar).'
  - q: '¿Puedo importar un CSV directamente en Android?'
    a: 'La app Contactos de Google no importa CSV en el teléfono; la versión web, contacts.google.com, sí. Si lo conviertes a .vcf, puedes importarlo directamente en el celular.'
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## App Contactos de Google (Pixel, Motorola, Nokia, OnePlus y otros)

La app Contactos de Google viene instalada en los Pixel, en los Motorola y en muchos otros teléfonos. También se puede instalar en cualquier Android desde Google Play.

1. Abre **Contactos**.
2. Toca **Organizar** en la parte inferior de la pantalla.
3. Toca **Importar desde archivo**.
4. Elige el .vcf en el selector de archivos (normalmente está en *Descargas*).
5. Si tienes varias cuentas, elige la cuenta de Google donde guardarlos. Todas las tarjetas del archivo se importan de una vez.

Contactos de Google admite hasta 25 000 contactos por cuenta. Para listas muy grandes, importa por partes de unos pocos miles.

## Samsung Galaxy (Contactos de Samsung, One UI)

1. Abre **Contactos**.
2. Toca el menú **☰** (tres líneas).
3. Toca **Administrar contactos** (en España, *Gestionar contactos*).
4. Toca **Importar o exportar contactos** (en versiones anteriores, *Importar/Exportar contactos*).
5. Toca **Importar**, elige el almacenamiento donde está el archivo (*Almacenamiento interno*), marca el .vcf y toca **Listo**.
6. Elige dónde guardar (*Cuenta Samsung*, una cuenta de *Google* o *Teléfono*) y toca **Importar**.

Los nombres de las opciones pueden variar un poco entre versiones de One UI, pero la ruta por **Administrar contactos** se mantiene desde hace años.

## Xiaomi, Redmi y POCO (MIUI / HyperOS)

En los teléfonos con la app Contactos propia de Xiaomi: Contactos → **⋮** → **Ajustes** → **Importar y exportar** (Import and export) → **Importar desde almacenamiento** (Import from storage), y elige el archivo. Los teléfonos que usan la app Contactos de Google siguen los pasos de Google de arriba. Si no encuentras estas opciones, usa el método de la sección siguiente.

## Cualquier teléfono: abrir el archivo

Si tu celular usa otra app de contactos, o no encuentras los menús de arriba: al tocar un .vcf en el administrador de archivos (Archivos, Mis archivos) o en un adjunto de correo, normalmente aparece *Abrir con → Contactos*. Hace la misma importación, pero eliges la cuenta en el cuadro de diálogo siguiente.

## Antes de importar

- **vCard 3.0, UTF-8.** Es lo que este convertidor escribe por defecto y lo que exporta el propio Android.
- **Números internacionales.** `+525512345678` en lugar de `55 1234 5678` permite que las apps de mensajería asocien el contacto y funciona cuando estás en roaming.
- **Un solo archivo.** Un .vcf con todos los contactos es más práctico que cientos de archivos pequeños; usa la opción ZIP solo si un sistema pide una tarjeta por archivo.
