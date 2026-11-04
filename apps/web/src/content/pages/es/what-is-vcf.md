---
url: que-es-un-archivo-vcf
title: 'Qué es un archivo VCF: versiones de vCard 2.1, 3.0 y 4.0'
h1: '¿Qué es un archivo VCF (vCard)?'
description: 'Un archivo VCF es una vCard: una tarjeta de contacto en texto plano que importa cualquier teléfono o app de correo. Qué contiene, versiones 2.1, 3.0 y 4.0 y cómo abrirlo.'
lead: 'Un archivo VCF es una vCard: texto plano que describe una o varias tarjetas de contacto (nombre, teléfonos, correos, dirección, cumpleaños) con un estándar que entienden todos los teléfonos y programas de correo.'
nav: 'Qué es un archivo VCF'
summary: 'Qué hay dentro de una vCard y en qué se diferencian las versiones 2.1, 3.0 y 4.0.'
faq:
  - q: '¿Cómo abro un archivo VCF?'
    a: 'En un teléfono, tócalo: iPhone y Android ofrecen agregar los contactos. En una computadora, con doble clic se abre la libreta de direcciones (Contactos en Mac, Outlook o Personas en Windows). Cualquier editor de texto muestra el contenido tal cual.'
  - q: '¿Un archivo VCF puede tener muchos contactos?'
    a: 'Sí. Un archivo es simplemente varios bloques `BEGIN:VCARD … END:VCARD` seguidos. iPhone, Android y Contactos de Google los importan todos a la vez; Outlook clásico, de uno en uno.'
  - q: '¿Qué versión debo usar?'
    a: 'vCard 3.0 para teléfonos, Google y Outlook. La 4.0, solo cuando una app la pida; la 2.1, para celulares básicos antiguos.'
  - q: '¿Es seguro abrir un archivo VCF?'
    a: 'Una vCard es texto plano, sin macros ni código. El riesgo habitual es el mismo que con cualquier adjunto de un remitente desconocido: los datos de contacto en sí pueden ser engañosos.'
  - q: '¿Qué diferencia hay entre .vcf y .vcard?'
    a: 'Ninguna: las dos extensiones se usan para el mismo formato. El tipo MIME es `text/vcard` (el software antiguo usa `text/x-vcard`).'
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## Qué contiene

Una vCard es texto. Cada tarjeta empieza con `BEGIN:VCARD` y termina con `END:VCARD`; cada línea intermedia es una propiedad:

```text
BEGIN:VCARD
VERSION:3.0
N:García López;María José;;;
FN:María José García López
TEL;TYPE=CELL:+525512345678
EMAIL;TYPE=INTERNET,WORK:mjgarcia@example.mx
ORG:García y Asociados
ADR;TYPE=WORK:;;Av. Reforma 222;Ciudad de México;CDMX;06600;México
BDAY:1990-05-17
NOTE:Nos conocimos en la feria comercial
END:VCARD
```

Las propiedades más comunes:

| Propiedad | Significado |
| --- | --- |
| `N` | Partes del nombre: apellidos; nombre; segundo nombre; prefijo; sufijo |
| `FN` | Nombre para mostrar |
| `TEL` | Número de teléfono, con tipos como `CELL`, `WORK`, `HOME`, `FAX` |
| `EMAIL` | Dirección de correo electrónico |
| `ADR` | Dirección: apartado postal; dirección extendida; calle; ciudad; región; código postal; país |
| `ORG`, `TITLE` | Empresa (y departamento), cargo |
| `BDAY`, `ANNIVERSARY` | Fechas |
| `NOTE`, `URL`, `CATEGORIES` | Nota, sitio web, grupos |

## Las tres versiones

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Publicación | 1996, Versit Consortium | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| Texto no ASCII (tildes, ñ, otros alfabetos) | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | UTF-8 por defecto | solo UTF-8 |
| Parámetros de tipo | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, números como URI `tel:` |
| Obligatorios | `N` | `N`, `FN` | `FN` |
| Uso típico | teléfonos antiguos, algunas exportaciones de Android | iPhone, Android, Google, Outlook | servidores CardDAV, apps más nuevas |

**vCard 3.0** es la opción segura: es la versión que exportan iOS y Contactos de Google, y todos los importadores la leen. **4.0** pone orden en el formato (por ejemplo, cumpleaños sin año como `--0517` y números como `tel:+525512345678`), pero los importadores la manejan de forma menos uniforme. **2.1** importa para los teléfonos de los años 2000, que no entienden UTF-8 a menos que cada valor no ASCII esté codificado en Quoted-Printable.

## Detalles que rompen las importaciones

- **Los saltos de línea** deben ser CRLF.
- **Las líneas largas** se pliegan a 75 bytes: la línea se corta y la siguiente empieza con un espacio. Un mal convertidor parte por la mitad una letra de varios bytes, y aparece `�` en medio de un nombre.
- **Las comas y los puntos y comas** dentro de los valores deben escaparse (`\,` `\;`); si no, una dirección como “Av. Reforma 222, piso 4” se desarma.
- **La codificación**: un archivo vCard 3.0 escrito en Windows-1252 en lugar de UTF-8 muestra las tildes y la ñ como símbolos en todos los teléfonos.

El [convertidor de este sitio](/es/) escribe todo esto correctamente en cada versión, y puedes ver el texto exacto de la primera tarjeta en su pestaña *Texto vCard* antes de descargar.
