---
url: google-contatos-csv-para-vcf
title: 'CSV do Google Contatos para VCF: converter Google CSV em vCard'
h1: 'CSV do Google Contatos para VCF'
description: 'Converta um CSV exportado do Google Contatos (layout atual ou antigo) em arquivo VCF para iPhone ou Outlook. Mantém rótulos, vários números por célula e aniversários.'
lead: 'Converte uma exportação de contatos em “CSV do Google” num arquivo vCard. Os rótulos de telefone e e-mail, vários valores numa mesma célula (` ::: `), os marcadores e os aniversários sem ano são mantidos.'
nav: 'CSV do Google Contatos para VCF'
summary: 'Exportação CSV do Google Contatos (layout novo e antigo) para vCard.'
steps:
  - 'Solte o CSV exportado do Google Contatos (Exportar → CSV do Google). O layout atual (`First Name`, `Phone 1 - Label`) e o antigo (`Given Name`, `Group Membership`) são reconhecidos.'
  - 'As colunas são ligadas automaticamente e marcadas como **certo**; em geral não há nada a mudar.'
  - 'Escolha o país dos números salvos sem código do país e se os duplicados devem ser mesclados.'
  - 'Baixe o .vcf e importe no [iPhone](/pt-br/importar-vcf-no-iphone/) ou no [Outlook](/pt-br/importar-contatos-no-outlook/).'
features:
  - feature: 'Layouts'
    value: 'Google CSV atual (`First Name`, `Labels`, `E-mail 1 - Label`…) e o antigo (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type`…).'
  - feature: 'Vários valores'
    value: 'Vários números ou e-mails numa célula, separados por ` ::: `, viram linhas `TEL` / `EMAIL` separadas, cada uma com o seu rótulo.'
  - feature: 'Rótulos'
    value: 'Mobile, Work, Home, Main, Work Fax, Home Fax e Pager viram tipos do vCard; rótulos personalizados (por exemplo “WhatsApp”) são mantidos como `X-ABLabel`.'
  - feature: 'Marcadores (grupos)'
    value: '`Labels` / `Group Membership` viram `CATEGORIES`; os marcadores de sistema `* myContacts` e `* starred` são descartados.'
  - feature: 'Datas'
    value: 'Aniversários com e sem ano (`--05-17`); a data comemorativa de `Event 1` é mantida.'
  - feature: 'Não é transferido'
    value: 'Fotos (o CSV só tem um link) e “File As”; campos personalizados vão para a nota.'
faq:
  - q: 'O Google Contatos já exporta vCard. Por que converter o CSV?'
    a: 'Se você ainda tem acesso à conta Google, Exportar → vCard é o caminho mais simples. Use esta página quando só tiver o CSV — enviado por outra pessoa, exportado anos atrás ou editado no Excel — ou quando quiser padronizar os números e mesclar duplicados antes.'
  - q: 'O que significa ` ::: ` no meu CSV?'
    a: 'O Google junta vários valores do mesmo tipo numa célula e separa com ` ::: `. Por exemplo, dois celulares: `+55 11 91234-5678 ::: +55 21 99876-5432`. Eles viram duas linhas de telefone separadas no cartão.'
  - q: 'Os marcadores (grupos) são mantidos?'
    a: 'Sim, como `CATEGORIES`. O iPhone não mostra categorias, mas o Google Contatos, o Outlook e a maioria dos apps de Android mostram.'
  - q: 'Por que alguns números aparecem como inválidos?'
    a: 'O Google exporta os números como foram digitados. Um número local sem código do país é conferido com o país que você escolher; se não se encaixar no plano de numeração desse país, ele é gravado sem alteração e marcado.'
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

**Google CSV** (no menu em português, “CSV do Google”) é o formato de tabela que o Google Contatos usa para exportar e importar. Ele é diferente de uma lista simples. Cada telefone, e-mail, endereço e site tem um par de colunas — `Phone 1 - Label` e `Phone 1 - Value` — e uma única célula pode ter vários valores separados por ` ::: `. Conversores genéricos costumam errar aqui: colocam `+55 11 91234-5678 ::: +55 21 99876-5432` num só campo ou perdem os rótulos.

**Como os rótulos viram tipos do vCard.** O rótulo decide o tipo de cada linha:

| Rótulo do Google | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| personalizado, por exemplo “WhatsApp” | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

Um asterisco antes do rótulo (`* Work`) marca o valor principal em exportações antigas; ele é removido.

**Dois layouts.** O Google mudou os nomes das colunas na exportação CSV. Os arquivos atuais começam com `First Name, Middle Name, Last Name`; os antigos, com `Name, Given Name, Additional Name, Family Name`, e usam `Type` em vez de `Label`. Os dois são detectados automaticamente — o painel do arquivo mostra qual foi encontrado.

**Aniversários sem ano.** O Google os guarda como `--05-17`. Eles são gravados no vCard da mesma forma, então o ano fica vazio em vez de virar 1604 ou 1900.
