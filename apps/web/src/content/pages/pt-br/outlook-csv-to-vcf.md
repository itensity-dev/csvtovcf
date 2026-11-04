---
url: outlook-csv-para-vcf
title: 'CSV do Outlook para VCF: converter contatos do Outlook em vCard'
h1: 'Converter CSV do Outlook para VCF'
description: 'Converta contatos exportados do Outlook (CSV em qualquer idioma) num único arquivo VCF para iPhone, Android ou Gmail. Lê cabeçalhos traduzidos e codificações do Windows.'
lead: 'Transforma uma exportação de contatos do Outlook num único .vcf. Funciona com cabeçalhos em português, inglês, alemão, francês, russo e outros idiomas do Outlook, e com as codificações do Windows que o Outlook usa.'
nav: 'CSV do Outlook para VCF'
summary: 'Exportação de contatos do Outlook (CSV, qualquer idioma) para um único vCard.'
steps:
  - 'Exporte do Outlook: no Outlook clássico — Arquivo → Abrir e Exportar → Importar/Exportar → Exportar para um arquivo → Valores Separados por Vírgula → Contatos. No novo Outlook e no Outlook.com — Pessoas → Gerenciar contatos → Exportar contatos.'
  - 'Solte o .csv acima. O conversor detecta a codificação (o Outlook costuma gravar em Windows-1252 ou 1251, não em UTF-8) e o separador (`;` em muitas configurações regionais, inclusive a do Brasil).'
  - 'Confira as ligações: o `Title` do Outlook é o pronome de tratamento (Sr., Dr.), e o `Job Title` é o cargo. As colunas vazias — o Outlook exporta cerca de 90 — ficam escondidas.'
  - 'Baixe o .vcf e importe no [iPhone](/pt-br/importar-vcf-no-iphone/) ou no [Android](/pt-br/importar-contatos-vcf-android/).'
features:
  - feature: 'Versões do Outlook'
    value: 'Exportações CSV do Outlook clássico para Windows (2010–2024, Microsoft 365), do novo Outlook, do Outlook.com e do Outlook para Mac.'
  - feature: 'Idiomas dos cabeçalhos'
    value: 'Português (`Nome`, `Sobrenome`, `Telefone comercial`), inglês, alemão (`Vorname`, `Telefon geschäftlich`), francês (`Prénom`, `Tél. mobile`), russo (`Имя`, `Рабочий телефон`), espanhol, italiano, holandês, polonês, turco.'
  - feature: 'Telefones'
    value: 'As colunas de telefone comercial, residencial, celular, principal, principal da empresa, fax e pager mantêm o tipo; carro, retorno de chamada, ISDN e rádio viram “outro”.'
  - feature: 'Endereços'
    value: 'Rua, cidade, estado, CEP e país dos endereços comercial, residencial e outro viram três entradas `ADR` com tipo; as linhas 2 e 3 da rua são juntadas à primeira.'
  - feature: 'Valores vazios'
    value: 'O Outlook grava datas vazias como `0/0/00` — elas são ignoradas, não viram o ano 2000.'
  - feature: 'Não é transferido'
    value: 'Fotos, sinalizadores, “Internet Free Busy”, campos do usuário 1–4 (ligue-os à nota se precisar).'
faq:
  - q: 'O Outlook salva um contato como vCard. Por que converter o CSV?'
    a: 'O Outlook salva um vCard por contato; não existe exportação de todos os contatos para um único .vcf. A exportação CSV tem todo mundo, e esta página transforma esse CSV em um só arquivo .vcf — ou num ZIP com um cartão por contato.'
  - q: 'Minha exportação tem cabeçalhos em português (ou alemão, francês…). Funciona?'
    a: 'Sim. O Outlook clássico escreve os cabeçalhos no idioma da interface, e o conversor conhece esses nomes. O painel do arquivo mostra “CSV do Outlook, cabeçalhos traduzidos” e o idioma detectado.'
  - q: 'Por que aparece `Sr.` no nome?'
    a: 'A coluna `Title` do Outlook guarda o pronome de tratamento, então ele vai para o prefixo do nome. Se não quiser isso no celular, marque essa coluna como *ignorar*.'
  - q: 'Os nomes saem como `ConceiÃ§Ã£o`, `Concei��o` ou com pontos de interrogação.'
    a: 'A codificação foi lida errado. Escolha a codificação que o Outlook usou: Windows-1252 para português e outros idiomas da Europa Ocidental, Windows-1251 para cirílico, Windows-1250 para a Europa Central. A prévia muda na hora. [Mais sobre nomes com caracteres estranhos](/pt-br/contatos-com-caracteres-estranhos/).'
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

O Outlook exporta contatos como um CSV com até ~90 colunas: três endereços, dezenove campos de telefone, três e-mails, campos do usuário e mais. A maioria fica vazia para quase todo mundo. O conversor esconde as colunas vazias, liga o resto aos campos do vCard e grava um cartão por contato.

**Cabeçalhos traduzidos.** O Outlook clássico dá nome às colunas no idioma da interface. A documentação da Microsoft diz que, para importar, o idioma dos cabeçalhos precisa ser o mesmo do Outlook; por isso um Outlook em alemão grava `Vorname, Nachname, Mobiltelefon`. O conversor reconhece esses cabeçalhos pelas palavras, não por uma lista fixa. É assim que `Telefone comercial`, `Telefon geschäftlich`, `Téléphone (bureau)` e `Рабочий телефон` acabam todos como telefone comercial.

**Campos que confundem outros conversores.**

- `Title` é o pronome de tratamento (Sr., Sra., Dr.); `Job Title` é o cargo.
- `Business Street`, `Business Street 2` e `Business Street 3` pertencem a um mesmo endereço.
- `E-mail Type` (`SMTP`) e `E-mail Display Name` não são endereços e são ignorados.
- `Birthday` = `0/0/00` quer dizer “sem aniversário”.

**Codificações.** O Outlook clássico muitas vezes grava o CSV na página de código do Windows do seu sistema, não em UTF-8, e um CSV salvo de novo num Excel europeu ou brasileiro usa ponto e vírgula. As duas coisas são detectadas. Se os nomes parecerem errados, troque a codificação no painel do arquivo e veja a prévia mudar.

**De volta para o Outlook?** Para levar contatos *para* o Outlook, o CSV é o caminho mais seguro: o Outlook clássico importa um .vcf com vários contatos um cartão de cada vez. Escolha “CSV do Outlook” em *Baixar como*. [Guia de importação no Outlook](/pt-br/importar-contatos-no-outlook/).
