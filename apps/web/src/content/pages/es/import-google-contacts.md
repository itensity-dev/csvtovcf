---
url: importar-contactos-a-google
title: 'Importar contactos a Google: archivo VCF o CSV, paso a paso'
h1: 'Cómo importar un VCF o CSV a Contactos de Google'
description: 'Importa un .vcf (o un CSV de Google) en Contactos de Google desde la web: Importar → Seleccionar archivo. Límites (3000 por archivo, 25 000 por cuenta) y duplicados.'
lead: 'Contactos de Google en la web importa un .vcf o un CSV de Google en cuatro pasos. Después, los contactos se sincronizan con todos tus teléfonos Android, con Gmail y con cualquier iPhone que tenga agregada la cuenta de Google.'
nav: 'Importar en Contactos de Google'
summary: 'Importa un .vcf o un CSV en contacts.google.com, con sus límites.'
steps:
  - 'Convierte tu tabla con el [convertidor](/es/): .vcf (vCard 3.0) o “CSV de Contactos de Google” en *Descargar como*.'
  - 'Abre [contacts.google.com](https://contacts.google.com/) e inicia sesión con la cuenta a la que deben ir los contactos.'
  - 'Haz clic en **Importar** en el menú de la izquierda, luego en **Seleccionar archivo**, elige el archivo y haz clic en **Importar**.'
  - 'Los contactos importados reciben una etiqueta con la fecha, como “Importado el 4/11/2026” (en inglés, “Imported on…”). Abre **Combinar y corregir** para unir los duplicados con contactos que ya tenías.'
faq:
  - q: 'VCF o CSV de Google: ¿cuál es mejor para Google?'
    a: 'Los dos se importan completos. La vCard conserva los tipos de teléfono y de correo y también sirve para otras apps; el CSV de Google es práctico si quieres ver o editar la lista en una hoja de cálculo antes de importarla.'
  - q: '¿Cuántos contactos puedo importar?'
    a: 'Google pide dividir los archivos de más de 3000 contactos, y una cuenta guarda hasta 25 000 contactos (unos 20 MB sin fotos). Divide las listas más grandes en varios archivos.'
  - q: '¿Cómo deshago una importación?'
    a: 'Haz clic en la etiqueta “Importado el…” del menú de la izquierda, selecciona todos sus contactos (casilla de arriba) y bórralos. Se quedan 30 días en la papelera.'
  - q: 'Los contactos importados no aparecen en mi teléfono.'
    a: 'Comprueba que el teléfono sincronice esa cuenta de Google: en Android, Configuración (o Ajustes) → Contraseñas y cuentas → Google → Sincronización de la cuenta → Contactos; en iPhone, Configuración (en España, Ajustes) → Apps → Contactos → Cuentas → Gmail → activa Contactos.'
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Importar paso a paso

1. Ve a [contacts.google.com](https://contacts.google.com/) en una computadora.
2. En el menú de la izquierda, haz clic en **Importar**.
3. Haz clic en **Seleccionar archivo** y elige el .vcf o el .csv.
4. Haz clic en **Importar**.

Google agrega cada contacto importado a una etiqueta nueva con la fecha de la importación. Así es fácil revisar el resultado, o borrar todo el lote si algo salió mal.

## Límites que conviene conocer

| Límite | Valor |
| --- | --- |
| Contactos por archivo de importación | unos 3000; divide los archivos más grandes |
| Contactos por cuenta | 25 000 |
| Almacenamiento para contactos | 20 MB (sin contar las fotos) |
| Un contacto | hasta 128 KB y 500 campos |

El convertidor escribe un solo archivo para cualquier número de contactos. Para más de 3000 filas, filtra la hoja en partes y convierte cada parte, o importa el mismo .vcf en un teléfono Android, que no tiene límite por archivo.

## Duplicados

Google no combina al importar. Si importas a la misma persona dos veces, tendrás dos tarjetas. Hay dos formas de evitarlo:

- **antes** de importar: abre la pestaña *Duplicados* del convertidor y marca “Combinar”; las personas con el mismo teléfono o correo pasan a ser una sola tarjeta;
- **después** de importar: en Contactos de Google, **Combinar y corregir** sugiere duplicados en toda tu cuenta.

## Números de teléfono

Google guarda los números como texto, exactamente como se importaron. Los números en formato internacional (`+52 55 1234 5678`) se muestran bien en cualquier país, y las apps de mensajería pueden asociarlos. Los números sin código de país se interpretan según la región del teléfono y pueden quedar mal en el extranjero. Por eso el convertidor escribe por defecto números con `+`.
