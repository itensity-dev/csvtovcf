---
url: contatos-com-caracteres-estranhos
title: 'Contatos com caracteres estranhos (Ã§, Ã£, ???): como corrigir'
h1: 'Por que os contatos importados aparecem com caracteres estranhos, e como corrigir'
description: 'Nomes como “ConceiÃ§Ã£o”, “JosÃ©” ou “????” depois de importar contatos vêm de uma codificação de texto errada. Como reconhecer a causa e converter o arquivo direito.'
lead: 'Nomes embaralhados — `JosÃ©`, `ConceiÃ§Ã£o`, `Ð˜Ð²Ð°Ð½`, `????` — significam que o arquivo foi lido numa codificação de texto diferente daquela em que foi gravado. A solução é ler o original com a codificação certa e gravar o vCard em UTF-8.'
nav: 'Caracteres estranhos nos contatos'
summary: 'Reconheça a confusão de codificação por trás de Ã§, Ã© ou ??? e corrija.'
faq:
  - q: 'Dá para consertar nomes que já estão embaralhados no celular?'
    a: 'Normalmente é mais fácil apagar o lote importado e importar um arquivo correto. Consertar no próprio celular só funciona quando a troca é reversível (UTF-8 lido como Latin-1); pontos de interrogação significam que as letras se perderam.'
  - q: 'Por que o Excel salva meu CSV com pontos de interrogação?'
    a: '“CSV (separado por vírgulas)” salva na página de código do Windows do seu sistema. Letras fora dela — cirílico num PC brasileiro, o ğ turco num PC alemão — viram `?`. Salve como “CSV UTF-8 (delimitado por vírgulas)”, ou converta o .xlsx diretamente.'
  - q: 'Que codificação um vCard deve ter?'
    a: 'UTF-8. O vCard 3.0 e o 4.0 partem desse pressuposto; no vCard 2.1, cada valor fora do ASCII precisa levar `CHARSET=UTF-8` e a codificação Quoted-Printable. O conversor deste site sempre faz isso.'
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Reconheça o padrão

Cada tipo de embaralhamento tem uma cara típica, e essa cara diz o que deu errado:

| O que você vê | Deveria ser | Causa |
| --- | --- | --- |
| `JosÃ©`, `ConceiÃ§Ã£o` | José, Conceição | arquivo UTF-8 lido como Windows-1252 / Latin-1 |
| `Jo�o`, `Concei��o` | João, Conceição | arquivo Windows-1252 (o padrão do Excel em português) lido como UTF-8: cada letra acentuada vira `�` |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | cirílico em UTF-8 lido como Windows-1252 |
| `Èâàí Ïåòðîâ` | Иван Петров | arquivo Windows-1251 lido como Windows-1252 |
| `Ayþe Yýlmaz` | Ayşe Yılmaz | Windows-1254 (turco) lido como Windows-1252 |
| `ÇáÇÓã` | الاسم | Windows-1256 (árabe) lido como Latin-1 |
| `Иван` → `????` | Иван | letras perdidas ao salvar numa página de código que não as tem |
| um só `Ã` ou `�` no meio de um nome | — | uma linha longa foi cortada no meio de uma letra de vários bytes |

Os seis primeiros casos podem ser recuperados a partir do arquivo original. Os pontos de interrogação, não: as letras foram substituídas quando o arquivo foi salvo.

## Como corrigir

1. **Volte ao arquivo original** — o CSV ou a planilha do Excel, não o vCard embaralhado.
2. **Abra-o no [conversor](/pt-br/).** Ele detecta a codificação (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS e outras) e mostra as primeiras linhas. Se os nomes ainda parecerem errados, escolha outra codificação na lista *Codificação*. A prévia muda na hora, então dá para ver qual é a certa.
3. **Baixe em vCard 3.0.** O arquivo é gravado em UTF-8, que todo celular atual lê.
4. **Apague a importação embaralhada e importe o arquivo novo.** No Google Contatos, o marcador “Importado em …” permite apagar o lote inteiro.

## Por que isso acontece

Um arquivo de texto não diz qual codificação usa. O formato “CSV” clássico do Excel, a exportação CSV do Outlook e muitos CRMs gravam na **página de código do Windows** do computador: Windows-1252 no Brasil, na Europa Ocidental e no resto das Américas, 1251 para cirílico, 1254 para turco, 1256 para árabe. Depois, um celular ou serviço web lê o arquivo como UTF-8, e cada letra acentuada vira símbolos. O inverso também acontece: um arquivo UTF-8 aberto por um programa antigo que espera Windows-1252 mostra `Ã©` no lugar de `é`.

Os celulares antigos trazem um terceiro problema. Eles esperam vCard 2.1 e só entendem texto não latino quando ele vem marcado com `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE`. Sem essa marcação, um arquivo UTF-8 perfeito parece quebrado neles. Escolha **vCard 2.1** no conversor para esses aparelhos.

## Como evitar da próxima vez

- No Excel, use **Arquivo → Salvar como → CSV UTF-8 (delimitado por vírgulas)**, ou pule o CSV e converta o .xlsx.
- No Outlook, exporte e converta logo em seguida; não salve o CSV de novo no Excel.
- No Planilhas Google, os downloads em CSV são sempre UTF-8.
