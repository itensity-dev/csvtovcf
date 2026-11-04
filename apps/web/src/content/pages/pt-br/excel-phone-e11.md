---
url: excel-telefone-notacao-cientifica
title: 'Telefone no Excel aparece como 5,5E+12: por que e como corrigir'
h1: 'Por que o Excel transforma telefones em 5,5E+12'
description: 'O Excel mostra números com 12 ou mais dígitos em notação científica e salva o CSV assim, perdendo dígitos. Como recuperar os números completos e evitar que isso aconteça.'
lead: 'O Excel mostra qualquer número com 12 ou mais dígitos em notação científica — `5511912345678` vira `5,51191E+12`. Isso é só um formato de exibição até você salvar um CSV: aí o Excel grava o texto abreviado, e os dígitos que faltam somem do arquivo.'
nav: 'Telefones como 5,5E+12'
summary: 'Notação científica, dígitos perdidos, zeros perdidos — causas e soluções.'
faq:
  - q: 'Dá para recuperar os números originais de um CSV com 5,5E+12?'
    a: 'Não. O CSV tem só os dígitos que apareciam na tela, por exemplo `5,5E+12`; o resto não está no arquivo. Volte à planilha do Excel (onde o número completo continua guardado) ou à fonte original.'
  - q: 'Por que o zero inicial sumiu?'
    a: 'O Excel trata `011912345678` digitado numa célula com formato Geral como o número 11912345678, e números não têm zeros à esquerda. O mesmo acontece com o `+` dos números internacionais. Formate a coluna como Texto antes de digitar ou colar.'
  - q: 'O conversor conserta esses números?'
    a: 'Quando é possível. Números sem o 0 inicial ou sem o `+` são completados a partir do país escolhido e conferidos com o plano de numeração dele. A notação científica em que todos os dígitos sobreviveram (`5,511912345678E+12`) é restaurada. `5,5E+12` com dígitos perdidos é sinalizado no relatório, nunca adivinhado.'
  - q: 'Existe uma configuração no Excel para evitar isso?'
    a: 'No Microsoft 365 para Windows: em Arquivo → Opções → Dados → Conversão automática de dados (Automatic data conversion), desmarque “Manter os primeiros 15 dígitos de números longos e exibir em notação científica, se necessário” e “Remover zeros à esquerda”. Vale para os dados novos que você digitar ou abrir.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## O que acontece, passo a passo

1. **Digitar ou colar.** Um telefone numa célula com o formato padrão *Geral* é guardado como número. O `0` inicial e o `+` somem na hora: `+5511912345678` → 5511912345678.
2. **Exibir.** No formato Geral, o Excel mostra números com 12 ou mais dígitos em notação científica se a coluna for estreita: `5,51191E+12`. Dentro da célula, o número completo continua guardado (o Excel mantém até 15 dígitos significativos).
3. **Salvar como CSV.** Um CSV é texto puro, e o Excel grava cada célula do jeito que ela é *exibida*. O arquivo passa a conter `5,51191E+12`, e os últimos dígitos, `2345678`, somem. A Microsoft documenta esse comportamento desde o Excel 97.

O passo 3 é o que destrói os dados. Antes dele, o número ainda pode ser salvo.

## Como salvar os números

- **Use a planilha, não o CSV.** Solte o .xlsx ou o .xls no [conversor de Excel para VCF](/pt-br/converter-excel-para-vcf/): ele lê os números guardados, não a exibição.
- **Ou alargue a coluna e formate.** Selecione a coluna → Formatar Células → **Número** com 0 casas decimais (ou um formato personalizado `0`). Os dígitos completos aparecem; salve o CSV de novo.
- **Se você só tem o CSV,** os dígitos perdidos não podem ser recuperados. Procure a lista original.

## Como evitar

- **Formate a coluna de telefone como Texto antes de digitar os números** (Página Inicial → Formato de Número → Texto). Assim `+55 11 91234-5678` fica exatamente como foi digitado, com o sinal de mais e os espaços.
- **Importe arquivos CSV como texto** em vez de abrir com clique duplo: Dados → De Texto/CSV → *Transformar Dados* → defina a coluna de telefone como *Texto*.
- **Microsoft 365:** Arquivo → Opções → Dados → *Conversão automática de dados*: desligue a remoção de zeros à esquerda e a opção de manter só 15 dígitos em notação científica.
- **Mantenha os números internacionais** (`+…`) na origem. Eles se conservam melhor guardados como texto.

## O que o conversor faz com números danificados

| No arquivo | Resultado | Aparece como |
| --- | --- | --- |
| `11912345678` + país Brasil | `+5511912345678` | válido |
| `5511912345678` (sem `+`) | `+5511912345678` | “+ adicionado onde faltava” |
| `5,511912345678E+12` | `+5511912345678` | “restaurado da notação do Excel” |
| `5,5E+12` | gravado sem alteração | “destruído pelo Excel”, em vermelho |

Números danificados nunca são “completados” com dígitos inventados. Eles ficam marcados no cartão e listados na aba *Avisos* com os números das linhas, para você corrigir na origem.
