---
url: adicionar-varios-contatos-no-celular
title: 'Como importar contatos do Excel para o celular, todos de uma vez'
h1: 'Como adicionar muitos contatos no celular de uma vez'
description: 'Adicione centenas de contatos no iPhone ou Android a partir de uma lista do Excel ou CSV: converta para um arquivo VCF e importe. Serve também para WhatsApp e Telegram.'
lead: 'Não é preciso digitar contato por contato. Transforme a lista num único arquivo .vcf e importe — o celular adiciona todos os contatos de uma vez, e os apps de mensagem os encontram na agenda.'
nav: 'Vários contatos no celular'
summary: 'Da planilha para centenas de contatos no celular, numa importação só.'
steps:
  - 'Coloque os contatos numa planilha: uma linha por pessoa e uma linha de cabeçalho com “Nome” e “Celular” (mais colunas são bem-vindas).'
  - 'Solte o arquivo no [conversor](/pt-br/) e escolha o país dos números; eles são gravados com o prefixo internacional (+55…).'
  - 'Baixe um único .vcf com todos os contatos.'
  - 'Importe: no [Android](/pt-br/importar-contatos-vcf-android/), em Contatos → Organizar → Importar do arquivo; no [iPhone](/pt-br/importar-vcf-no-iphone/), abrindo o arquivo e tocando em “Adicionar Todos os Contatos”.'
faq:
  - q: 'Quantos contatos um celular importa de uma vez?'
    a: 'Milhares. Um único .vcf com alguns milhares de cartões é importado no iPhone e no Android. O Google Contatos na web pede arquivos de no máximo 3.000 contatos e guarda 25.000 por conta.'
  - q: 'Os contatos vão aparecer no WhatsApp ou no Telegram?'
    a: 'Sim, quando os números estão no formato internacional e o app atualiza os contatos. Números sem código do país muitas vezes não são associados a uma conta.'
  - q: 'Preciso de um app ou de um programa pago?'
    a: 'Não. O próprio app Contatos do celular importa arquivos .vcf, e o conversor deste site é gratuito e roda no navegador.'
  - q: 'Dá para remover os contatos importados depois?'
    a: 'No Google Contatos, apague o marcador “Importado em …” junto com os contatos dele. No iPhone, apague pelo iCloud.com, onde dá para selecionar vários de uma vez. Teste antes com um arquivo pequeno.'
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## O caminho mais rápido

O celular não importa planilhas, mas importa arquivos **vCard (.vcf)**, e um arquivo pode ter qualquer quantidade de contatos. Então o trabalho é: planilha → um .vcf → importação.

**Prepare a planilha.** Uma linha por pessoa. O mínimo é uma coluna de nome e uma de telefone; colunas de e-mail, empresa e aniversário também são reconhecidas. O nome pode estar numa coluna (“Nome completo”) ou em duas (“Nome”, “Sobrenome”).

**Converta.** O [conversor](/pt-br/) reconhece as colunas, grava os números no formato internacional e avisa sobre números que não parecem válidos — antes que eles parem no seu celular. Pessoas que aparecem duas vezes podem ser mescladas.

**Importe.** Um arquivo, um toque no celular. Detalhes para [Android](/pt-br/importar-contatos-vcf-android/) e [iPhone](/pt-br/importar-vcf-no-iphone/).

## Para WhatsApp, Telegram e Signal

Os apps de mensagem leem a agenda do celular e procuram cada número no formato internacional. Duas coisas decidem se um contato aparece:

- **O código do país.** `+55 11 91234-5678` é encontrado; `(11) 91234-5678` só é encontrado se o país do próprio celular for o Brasil. O conversor acrescenta o código a partir do país que você escolher.
- **Uma atualização.** Depois de importar, abra a tela de nova conversa do app. No WhatsApp para Android: ⋮ → Atualizar.

Adicionar contatos em massa só para mandar mensagem a desconhecidos é spam e leva ao bloqueio de contas. Use isso para quem espera ter notícias suas: a sua equipe, membros, clientes que passaram o número.

## Listas grandes

- **Divida para o Google Contatos.** A importação na web aceita cerca de 3.000 contatos por arquivo. Filtre a planilha em partes e converta cada parte.
- **Escolha a conta.** Contatos salvos na conta Google ou no iCloud têm backup e aparecem em todos os seus aparelhos. O armazenamento “só no telefone” fica neste aparelho.
- **Confira antes de importar.** O relatório do conversor lista linhas puladas, números inválidos e duplicados, com números de linha que você encontra no Excel.
