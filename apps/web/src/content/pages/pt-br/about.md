---
url: sobre
title: 'Sobre o csvtovcf — quem faz e como funciona'
h1: 'Sobre o csvtovcf'
description: 'O csvtovcf é um conversor gratuito e de código aberto de planilhas de contatos para vCard que roda todo no navegador. Quem faz, como se mantém e como falar conosco.'
lead: 'O csvtovcf converte planilhas de contatos em arquivos vCard sem mandá-las para lugar nenhum. É um projeto pequeno e independente, com mecanismo de conversão de código aberto.'
nav: 'Sobre'
summary: 'Quem faz o csvtovcf, como funciona e como entrar em contato.'
updated: 2026-11-04
---

## O que é

O csvtovcf.com transforma listas de contatos do Excel, do Planilhas Google, do Google Contatos, do Outlook, do LinkedIn ou de qualquer CRM em arquivos **vCard (.vcf)** que celulares e programas de e-mail importam. Ele foi criado porque as opções que existiam eram programas pagos para computador com versão de teste limitada a dez contatos, ou sites que enviam a sua agenda para um servidor e tentam adivinhar as colunas.

**Fatos:**

- Lançamento: novembro de 2026. Esta página foi atualizada pela última vez na data mostrada abaixo.
- Idiomas: inglês, espanhol, português (Brasil), indonésio, turco, alemão, francês, russo.
- Formatos: entrada em CSV, TSV, XLSX, XLS e ODS; saída em vCard 2.1, 3.0 e 4.0, CSV do Google e CSV do Outlook.
- Preço: grátis, sem cadastro, sem limite de linhas.

## Como funciona

A página carrega uma vez. Depois disso, cada etapa — ler o arquivo, detectar a codificação, ligar as colunas, padronizar os telefones, gravar o vCard — roda num Web Worker no seu navegador. Nada é enviado, e depois da primeira visita o conversor funciona off-line. A [página de privacidade](/pt-br/privacidade/) explica exatamente o que é e o que não é enviado pela rede.

O mecanismo de conversão é de código aberto, sob a licença MIT: [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf), e está no npm como [`csvtovcf`](https://www.npmjs.com/package/csvtovcf). Os telefones são validados com a [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js); as planilhas são lidas com o [SheetJS](https://sheetjs.com/). Todas as bibliotecas e fontes estão listadas na [página de licenças](/pt-br/licencas/).

## Quem faz

O csvtovcf é feito por um desenvolvedor independente que também mantém algumas outras ferramentas de propósito único: [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/) e outras listadas no rodapé de cada página. Cada uma faz uma coisa só e não exige cadastro.

## Contato

Relatos de bugs, colunas ligadas errado, um celular que não importa um arquivo: escreva para **hello@csvtovcf.com** ou abra uma issue no [GitHub](https://github.com/itensity-dev/csvtovcf/issues). Se um arquivo for convertido errado, descreva as colunas e uma linha de exemplo inventada — por favor, não mande dados reais de contatos.

O csvtovcf não tem vínculo com Apple, Google, Microsoft, Samsung ou LinkedIn; os nomes desses produtos são usados só para descrever compatibilidade.
