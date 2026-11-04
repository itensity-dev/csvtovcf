---
url: numeros-de-telefono-excel-e11
title: 'Teléfonos en Excel como E+11 (notación científica): cómo arreglarlo'
h1: 'Por qué Excel convierte los números de teléfono en E+11'
description: 'Excel muestra los números de 12 o más dígitos en notación científica y guarda así los CSV, con lo que se pierden dígitos. Cómo recuperar los números completos y evitarlo.'
lead: 'Excel muestra cualquier número de 12 o más dígitos en notación científica: `525512345678` se convierte en `5,25512E+11` (o en `5.25512E+11` si tu separador decimal es el punto). Es solo un formato de visualización hasta que guardas un CSV: entonces Excel escribe el texto abreviado y los dígitos que faltan desaparecen del archivo.'
nav: 'Teléfonos como E+11'
summary: 'Notación científica, dígitos y ceros perdidos: causas y soluciones.'
faq:
  - q: '¿Se pueden recuperar los números originales de un CSV con 5,25512E+11?'
    a: 'No. El CSV solo contiene los dígitos que se veían, p. ej. `5,25512E+11`; el resto no está en el archivo. Vuelve al libro de Excel (donde el número completo sigue guardado) o a la fuente original.'
  - q: '¿Por qué desapareció el cero inicial?'
    a: 'Excel trata `01141234567` escrito en una celda con formato General como el número 1141234567, y los números no tienen ceros a la izquierda. Lo mismo le pasa al `+` de los números internacionales. Da formato de Texto a la columna antes de escribir o pegar.'
  - q: '¿El convertidor arregla estos números?'
    a: 'Cuando se puede. Los números a los que les falta el 0 inicial o el `+` se completan con el país que elijas y se comprueban con su plan de numeración. La notación científica en la que sobrevivieron todos los dígitos (`5,25512345678E+11`) se recupera. Un `5,3E+11` con dígitos perdidos se marca en el informe; nunca se adivina.'
  - q: '¿Hay alguna opción de Excel para evitarlo?'
    a: 'En Microsoft 365 para Windows: Archivo → Opciones → Datos → Conversión automática de datos. Desmarca la opción que conserva solo los primeros 15 dígitos de los números largos y los muestra en notación científica (Keep first 15 digits of long numbers…) y la que quita los ceros iniciales (Remove leading zeros). Se aplica a los datos nuevos que escribas o abras.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## Qué pasa, paso a paso

1. **Al escribir o pegar.** Un teléfono en una celda con el formato predeterminado *General* se guarda como número. El `0` inicial y el `+` desaparecen en el acto: `+525512345678` → 525512345678.
2. **Al mostrarlo.** Con formato General, Excel muestra los números de 12 o más dígitos en notación científica si la columna es estrecha: `5,25512E+11`. Dentro de la celda sigue guardado el número completo (Excel conserva hasta 15 dígitos significativos).
3. **Al guardar como CSV.** Un CSV es texto plano, y Excel escribe cada celda tal como se *muestra*. El archivo contiene ahora `5,25512E+11`, y los últimos dígitos, `345678`, desaparecieron. Microsoft documenta este comportamiento desde Excel 97.

El paso 3 es el que destruye los datos. Antes de él, el número todavía se puede rescatar.

## Cómo rescatar los números

- **Usa el libro, no el CSV.** Suelta el .xlsx o el .xls en el [convertidor de Excel a VCF](/es/convertir-excel-a-vcf/): lee los números guardados, no lo que se muestra.
- **O ensancha la columna y cambia su formato.** Selecciona la columna → Formato de celdas → **Número** con 0 decimales (o un formato personalizado `0`). Aparecen todos los dígitos; vuelve a guardar como CSV.
- **Si solo tienes el CSV,** los dígitos perdidos no se pueden recuperar. Busca la lista original.

## Cómo evitarlo

- **Da formato de Texto a la columna de teléfonos antes de escribir los números** (Inicio → Formato de número → Texto). Así `+52 55 1234 5678` se queda exactamente como lo escribiste, con el más y los espacios.
- **Importa los CSV como texto** en lugar de abrirlos con doble clic: Datos → Desde el texto/CSV (From Text/CSV) → *Transformar datos* → pon la columna de teléfonos como *Texto*.
- **Microsoft 365:** Archivo → Opciones → Datos → *Conversión automática de datos*: desactiva que se quiten los ceros iniciales y que se conserven solo 15 dígitos en notación científica.
- **Guarda los números en formato internacional** (`+…`) en el origen. Son los que mejor sobreviven cuando se guardan como texto.

## Qué hace el convertidor con los números dañados

| En el archivo | Resultado | Se muestra como |
| --- | --- | --- |
| `5512345678` + país México | `+525512345678` | válido |
| `525512345678` (sin `+`) | `+525512345678` | “Se agregó el + que faltaba” |
| `5,25512345678E+11` | `+525512345678` | “Recuperados de la notación de Excel” |
| `5,3E+11` | se escribe sin cambios | “Destruidos por Excel”, en rojo |

Los números dañados nunca se “completan” con dígitos inventados. Se marcan en la tarjeta y aparecen en la pestaña *Avisos* con su número de fila, para que puedas corregirlos en el origen.
