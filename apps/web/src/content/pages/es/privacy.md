---
url: privacidad
title: 'Privacidad — csvtovcf'
h1: 'Privacidad'
description: 'Tus archivos de contactos se procesan en tu dispositivo y nunca se suben. Qué guarda csvtovcf, qué registros existen y qué servicios de terceros se usan y por qué.'
lead: 'En resumen: tus archivos nunca salen de tu dispositivo. El sitio no tiene cuentas, no usa cookies de seguimiento y no ve los nombres, números ni encabezados de columna que conviertes.'
nav: 'Privacidad'
summary: 'Qué se procesa y dónde, qué se registra y qué servicios se usan.'
updated: 2026-11-04
---

## Tus archivos

- Los archivos que sueltas, eliges o pegas los lee tu navegador y se procesan en un **Web Worker en tu dispositivo**. No se suben, no se guardan en ningún servidor y no se comparten con nadie.
- Puedes comprobarlo: abre las herramientas para desarrolladores del navegador, pestaña Red (Network), y convierte un archivo. Mientras el convertidor trabaja, solo carga su propio código desde csvtovcf.com (el lector de hojas de cálculo se descarga la primera vez que abres un archivo de Excel). Ninguna solicitud contiene tus datos.
- La Content-Security-Policy del sitio limita las conexiones de red al propio csvtovcf.com. Si la analítica está activada, también permite el contador anónimo que se describe más abajo. Los scripts de analítica nunca reciben datos del convertidor.
- Cuando cierras o recargas la pestaña, los datos desaparecen. No se escribe nada en el almacenamiento de tu navegador.

## Qué ve el servidor

El servidor entrega las páginas y guarda un registro de acceso estándar: dirección IP, hora, página solicitada, tipo de navegador y página de procedencia. El registro se usa para mantener el servicio en funcionamiento y frenar abusos. Se conserva 14 días como máximo y no se combina con otros datos. Nunca contiene tus archivos, porque nunca se envían.

## Almacenamiento en tu navegador

- `localStorage`: el tema de color que elegiste (claro, oscuro o automático), si lo cambiaste.
- `sessionStorage`: si cerraste el aviso “esta página está disponible en tu idioma”.
- Un service worker guarda en caché los archivos propios del sitio para que el convertidor funcione sin conexión. Nunca guarda tus archivos ni tus resultados.

csvtovcf no instala cookies propias.

## Analítica

De forma predeterminada, el sitio funciona **sin analítica**. Si se activa, usamos Plausible Analytics: sin cookies, sin datos personales y sin guardar direcciones IP. Solo se cuentan las páginas vistas y un evento anónimo por conversión. El evento registra la versión de vCard, el formato de salida, el tipo de origen detectado (por ejemplo, “CSV de Google”) y el número de contactos como rango (por ejemplo, “11–100”). Nunca se envían nombres, números, direcciones, nombres de archivo ni encabezados de columna.

## Publicidad

La publicidad está **desactivada** por ahora. Si se activa, los anuncios aparecerán solo fuera del convertidor. En el Espacio Económico Europeo, el Reino Unido y Suiza, el diálogo de consentimiento certificado de Google te pedirá tu elección antes de usar cookies publicitarias. Los scripts de anuncios no pueden leer tus datos de contacto, porque están en el Web Worker y no en la página. Esta página indicará el proveedor de anuncios antes de que se muestre ninguno.

## Enlaces a otros sitios

Las guías enlazan a páginas de ayuda de Apple, Google y Microsoft, y el pie de página enlaza a otras herramientas del mismo autor. Esos sitios tienen sus propias políticas de privacidad.

## Tus derechos y contacto

Como no recopilamos datos personales desde el convertidor, no hay nada que consultar, exportar ni borrar. Para preguntas sobre los registros del servidor o sobre cualquier punto de esta página, escribe a **hello@csvtovcf.com**. También tienes derecho a presentar una reclamación ante tu autoridad de protección de datos.
