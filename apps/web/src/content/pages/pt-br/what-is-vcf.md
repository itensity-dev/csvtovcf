---
url: o-que-e-arquivo-vcf
title: 'O que é um arquivo VCF? As versões 2.1, 3.0 e 4.0 do vCard'
h1: 'O que é um arquivo VCF (vCard)?'
description: 'Um arquivo VCF é um vCard: um cartão de contato em texto que todo celular e app de e-mail importa. O que tem dentro, como as versões 2.1, 3.0 e 4.0 diferem e como abrir.'
lead: 'Um arquivo VCF é um vCard: texto simples que descreve um ou mais cartões de contato — nome, telefones, e-mails, endereço, aniversário — num padrão que todo celular e programa de e-mail entende.'
nav: 'O que é um arquivo VCF'
summary: 'O que tem dentro de um vCard e como as versões 2.1, 3.0 e 4.0 diferem.'
faq:
  - q: 'Como abro um arquivo VCF?'
    a: 'No celular, toque nele: o iPhone e o Android oferecem adicionar os contatos. No computador, um clique duplo abre a agenda (Contatos no Mac, Outlook ou Pessoas no Windows). Qualquer editor de texto mostra o texto puro.'
  - q: 'Um arquivo VCF pode ter muitos contatos?'
    a: 'Sim. O arquivo é simplesmente vários blocos `BEGIN:VCARD … END:VCARD`, um depois do outro. iPhone, Android e Google Contatos importam todos de uma vez; o Outlook clássico vai um por um.'
  - q: 'Qual versão devo usar?'
    a: 'vCard 3.0 para celulares, Google e Outlook. A 4.0 só quando algum app pedir; a 2.1 para celulares básicos antigos.'
  - q: 'É seguro abrir um arquivo VCF?'
    a: 'Um vCard é texto simples, sem macros nem código. O risco é o mesmo de qualquer anexo de remetente desconhecido: os próprios dados do contato podem ser enganosos.'
  - q: 'Qual a diferença entre .vcf e .vcard?'
    a: 'Nenhuma — as duas extensões são usadas para o mesmo formato. O tipo MIME é `text/vcard` (programas mais antigos usam `text/x-vcard`).'
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## O que tem dentro

Um vCard é texto. Cada cartão começa com `BEGIN:VCARD` e termina com `END:VCARD`; cada linha no meio é uma propriedade:

```text
BEGIN:VCARD
VERSION:3.0
N:da Silva;João;;;
FN:João da Silva
TEL;TYPE=CELL:+5511912345678
EMAIL;TYPE=INTERNET,WORK:joao@example.com.br
ORG:Silva Comércio
TITLE:Gerente
ADR;TYPE=WORK:;;Av. Paulista\, 1000;São Paulo;SP;01310-100;Brasil
BDAY:1990-05-17
NOTE:Conheci na feira do setor
END:VCARD
```

As propriedades mais comuns:

| Propriedade | Significado |
| --- | --- |
| `N` | Partes do nome: sobrenome; nome; nome do meio; prefixo; sufixo |
| `FN` | Nome de exibição |
| `TEL` | Telefone, com tipos como `CELL`, `WORK`, `HOME`, `FAX` |
| `EMAIL` | Endereço de e-mail |
| `ADR` | Endereço: caixa postal; complemento; rua; cidade; estado; CEP; país |
| `ORG`, `TITLE` | Empresa (e departamento), cargo |
| `BDAY`, `ANNIVERSARY` | Datas |
| `NOTE`, `URL`, `CATEGORIES` | Nota, site, grupos |

## As três versões

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Publicação | 1996, Versit Consortium | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| Acentos e texto não latino | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | UTF-8 por padrão | só UTF-8 |
| Parâmetros de tipo | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, números como URIs `tel:` |
| Obrigatórios | `N` | `N`, `FN` | `FN` |
| Uso típico | celulares antigos, algumas exportações do Android | iPhone, Android, Google, Outlook | servidores CardDAV, apps mais novos |

O **vCard 3.0** é a escolha segura: é a versão que o iOS e o Google Contatos exportam, e todo importador lê. A **4.0** organiza melhor o formato (por exemplo, aniversários sem ano como `--0517`, números como `tel:+5511912345678`), mas os importadores lidam com ela de forma menos consistente. A **2.1** importa para os celulares dos anos 2000, que não entendem UTF-8 a menos que cada valor não latino venha codificado em Quoted-Printable.

## Detalhes que quebram importações

- **Quebras de linha** precisam ser CRLF.
- **Linhas longas** são dobradas em 75 bytes: a linha quebra e a seguinte começa com um espaço. Um conversor ruim corta ao meio uma letra de vários bytes, e aparece `�` no meio do nome.
- **Vírgulas e pontos e vírgulas** dentro dos valores precisam ser escapados (`\,` `\;`); senão, um endereço como “Av. Paulista, 1000, conj. 12” se desmancha.
- **Codificação**: um vCard 3.0 gravado em Windows-1252 em vez de UTF-8 mostra os acentos como símbolos em todos os celulares.

O [conversor deste site](/pt-br/) grava tudo isso corretamente em cada versão, e você pode ver o texto exato do primeiro cartão na aba *Texto do vCard* antes de baixar.
