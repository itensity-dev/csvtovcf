---
url: importar-contactos-a-outlook
title: 'Cómo importar contactos a Outlook (VCF y CSV)'
h1: 'Cómo importar contactos a Outlook'
description: 'Importa muchos contactos a Outlook: CSV para el nuevo Outlook, Outlook.com y Outlook clásico (un .vcf con varios contactos entra de uno en uno), y Outlook para Mac.'
lead: 'En Outlook, el CSV es la vía para importar contactos en bloque. El nuevo Outlook y Outlook.com solo importan CSV, y Outlook clásico te pide confirmar cada tarjeta de un .vcf con varios contactos. El convertidor escribe los dos formatos.'
nav: 'Importar en Outlook'
summary: 'CSV para el nuevo Outlook y Outlook.com; CSV o vCard para Outlook clásico y Mac.'
steps:
  - 'En el [convertidor](/es/), elige **CSV de Outlook** en *Descargar como* y descarga el archivo.'
  - '**Nuevo Outlook / Outlook.com:** Personas → **Administrar contactos** → **Importar contactos** → Examinar → elige el CSV → **Importar**.'
  - '**Outlook clásico para Windows:** Archivo → **Abrir y exportar** → **Importar o exportar** → *Importar de otro programa o archivo* → *Valores separados por comas* → elige el archivo y qué hacer con los duplicados → elige la carpeta **Contactos** → **Finalizar**.'
  - 'Revisa algunos contactos. Si faltan campos, repite la importación y usa **Asignar campos personalizados** en el último paso del asistente.'
faq:
  - q: '¿Por qué no importar el .vcf en Outlook?'
    a: 'El nuevo Outlook y Outlook.com no importan archivos vCard. Outlook clásico abre un .vcf con varios contactos de uno en uno: confirmas cada tarjeta, y muchos usuarios cuentan que solo llega el primer contacto. La propia Microsoft recomienda pasar por CSV cuando son muchos contactos.'
  - q: 'Mi Outlook está en español. ¿Funcionan los encabezados del CSV en inglés?'
    a: 'Microsoft indica que el idioma de los encabezados del CSV debe coincidir con el idioma de Outlook. Si después de importar quedan campos vacíos, usa **Asignar campos personalizados** en el asistente de importación y arrastra cada columna a su campo de Outlook: Mobile Phone → Teléfono móvil, y así con las demás.'
  - q: 'Los nombres salen como `Ã±`, `Ã©` o `???` después de importar.'
    a: 'Outlook clásico a veces lee mal los CSV en UTF-8. Prueba la vía .vcf con unos pocos contactos para comprobarlo, o abre el CSV en Excel, guárdalo como “CSV (delimitado por comas)” en el idioma de tu Windows e importa ese archivo.'
  - q: '¿Cómo importo en Outlook para Mac?'
    a: 'Arrastra el .vcf a Personas, o usa Archivo → Importar. Microsoft documenta que en la ventana solo se muestra el primer contacto, pero que se guardan todos los contactos de la vCard.'
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## Qué archivo usar en cada Outlook

| Outlook | Mejor archivo | Ruta |
| --- | --- | --- |
| Nuevo Outlook para Windows, Outlook.com, Outlook en la web | CSV de Outlook | Personas → Administrar contactos → Importar contactos |
| Outlook clásico para Windows (2016–2024, Microsoft 365) | CSV de Outlook | Archivo → Abrir y exportar → Importar o exportar |
| Outlook para Mac | .vcf (vCard 3.0) | Arrastrar a Personas, o Archivo → Importar |
| Un solo contacto en cualquier Outlook | .vcf | Abrir el archivo → Guardar y cerrar |

## Outlook clásico: el asistente de importación

1. **Archivo** → **Abrir y exportar** → **Importar o exportar**.
2. Elige **Importar de otro programa o archivo** → **Siguiente**.
3. Elige **Valores separados por comas** → **Siguiente**.
4. Busca el CSV con **Examinar**. Elige qué hacer con los duplicados: *Reemplazar duplicados con elementos importados*, *Permitir la creación de duplicados* o *No importar elementos duplicados* → **Siguiente**.
5. Selecciona la carpeta **Contactos** de la cuenta correcta → **Siguiente**.
6. Marca la acción para el archivo. Si Outlook no está en inglés, haz clic en **Asignar campos personalizados**, comprueba que cada columna caiga en el campo correcto y luego **Aceptar** → **Finalizar**.

## Qué contiene el CSV de Outlook de este convertidor

Las columnas usan los nombres propios de Outlook en inglés: `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday`, etc. Cada teléfono va a la columna que corresponde a su tipo. Los números de más van a *Other Phone*, *Car Phone* y *Callback*. Lo que no cabe (un cuarto correo, una cuarta dirección) se agrega a *Notes* en lugar de perderse. Los cumpleaños se escriben como `M/D/YYYY` (mes/día/año), la forma en que el propio Outlook los exporta.

## Si solo necesitas unos pocos contactos

Abre cada .vcf (elige “ZIP, un .vcf por contacto” en el convertidor). Outlook muestra la ventana del contacto; haz clic en **Guardar y cerrar**. Sirve para diez contactos y es tedioso para mil.
