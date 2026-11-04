---
url: planilhas-google-para-vcf
title: 'Transformar planilha do Google em VCF (Google Sheets para vCard)'
h1: 'Converter Planilhas Google para VCF'
description: 'Copie as células de contatos do Planilhas Google (Google Sheets), cole aqui e baixe um VCF para iPhone, Android ou Google Contatos. Nada a instalar, sem acesso à conta.'
lead: 'Selecione as linhas de contatos no Planilhas Google, copie, cole aqui — e baixe um .vcf. Sem complemento e sem acesso à sua Conta do Google: as células vão da área de transferência para esta página e para mais nenhum lugar.'
nav: 'Planilhas Google para VCF'
summary: 'Cole células do Planilhas Google e baixe um .vcf.'
steps:
  - 'No Planilhas Google, selecione as linhas de contatos junto com o cabeçalho (clique no número da primeira linha e dê Shift+clique no da última) e copie com Ctrl+C (⌘C no Mac).'
  - 'Clique em **Colar células** acima, cole com Ctrl+V e clique em **Usar estas células**. As células coladas chegam separadas por tabulação, então vírgulas dentro de nomes ou endereços não atrapalham.'
  - 'Confira as ligações das colunas e escolha o país dos números sem código do país.'
  - 'Baixe o .vcf e importe: no [Android](/pt-br/importar-contatos-vcf-android/), no [iPhone](/pt-br/importar-vcf-no-iphone/) ou no [Google Contatos](/pt-br/importar-vcf-no-google-contatos/).'
features:
  - feature: 'Entrada'
    value: 'Células coladas do Planilhas Google, do Excel, do LibreOffice ou do Numbers (separadas por tabulação); ou um arquivo baixado em Arquivo → Fazer download → .xlsx ou .csv.'
  - feature: 'Acesso à conta'
    value: 'Nenhum. Sem complemento, sem login, sem API do Google: o conversor só vê o que você colar.'
  - feature: 'Telefones'
    value: 'O Planilhas costuma guardar telefones como número (sem “+”, sem o 0 inicial). Eles são completados a partir do país escolhido e gravados no formato internacional.'
  - feature: 'Saída'
    value: 'vCard 3.0, 4.0 ou 2.1; um arquivo ou um ZIP; CSV do Google Contatos, se você preferir importar a lista no Google Contatos como tabela.'
  - feature: 'Limites'
    value: 'Nenhum no conversor. Colagens muito grandes (mais de 100.000 linhas) funcionam melhor como arquivo .xlsx baixado.'
faq:
  - q: 'Existe um complemento do Planilhas Google para isso?'
    a: 'Esta página é a alternativa a um complemento: um complemento precisa de permissão para ler as suas planilhas, enquanto copiar e colar entrega a esta página só as células que você selecionou.'
  - q: 'Devo baixar a planilha como CSV ou como Excel?'
    a: 'Tanto faz. Arquivo → Fazer download → Microsoft Excel (.xlsx) mantém números e datas como valores; o CSV também serve, porque o Planilhas Google grava CSV em UTF-8.'
  - q: 'Os números colados perderam o zero inicial. Dá para consertar?'
    a: 'Sim, se você escolher o país certo: o número nacional é completado com o código do país. Para manter os números como foram digitados daqui em diante, formate a coluna no Planilhas em Formatar → Número → Texto simples.'
  - q: 'Dá para mandar os contatos direto para o Google Contatos?'
    a: 'Importe o .vcf baixado em contacts.google.com → Importar. O Google aceita até 3.000 contatos por arquivo. [Guia](/pt-br/importar-vcf-no-google-contatos/).'
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

O Planilhas Google é onde muitas listas de contatos são guardadas e compartilhadas: inscrições em eventos, listas de equipe, exportações de clientes. Para levar essas pessoas para o celular, a planilha precisa virar um arquivo **VCF** (vCard).

**Por que colar em vez de usar um complemento.** Complementos que criam vCards a partir de uma planilha pedem permissão para ver as suas planilhas. Copiar células entrega a esta página exatamente o que você selecionou, e nada mais. Quando você copia do Planilhas, a área de transferência guarda as células como texto separado por tabulação. O conversor lê esse formato com exatidão, inclusive quebras de linha dentro das células e aspas.

**Cabeçalhos.** Copie também a linha de cabeçalho: “Nome”, “Telefone”, “E-mail” são então reconhecidos e ligados automaticamente. Sem cabeçalho, as colunas são identificadas pelo conteúdo. Uma coluna de e-mail, uma de telefone e uma com valores de duas palavras ainda são encontradas, mas confira as ligações.

**Números no Planilhas.** Assim como o Excel, o Planilhas Google trata `011912345678` como número, a menos que a coluna esteja como texto simples, e tira o zero inicial. O conversor conhece o plano de numeração de cada país. Com Brasil selecionado, `11912345678` vira `+5511912345678` e é validado como número de celular.

**Duplicados.** Planilhas compartilhadas costumam ter a mesma pessoa duas vezes. Abra a aba *Duplicados* depois de colar: pessoas com o mesmo telefone ou e-mail ficam agrupadas, e você pode mesclá-las antes de baixar.
