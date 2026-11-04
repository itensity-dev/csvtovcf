---
url: importar-contatos-no-outlook
title: 'Como importar contatos no Outlook (VCF e CSV)'
h1: 'Como importar contatos no Outlook'
description: 'Importe muitos contatos no Outlook: CSV para o novo Outlook, o Outlook.com e o Outlook clássico (um .vcf com vários contatos entra um por vez), e o Outlook para Mac.'
lead: 'No Outlook, o CSV é o caminho para importar em massa. O novo Outlook e o Outlook.com só importam CSV, e o Outlook clássico pede confirmação para cada cartão de um .vcf com vários contatos. O conversor gera os dois formatos.'
nav: 'Importar no Outlook'
summary: 'CSV para o novo Outlook e o Outlook.com; CSV ou vCard para o Outlook clássico e o Mac.'
steps:
  - 'No [conversor](/pt-br/), escolha **CSV do Outlook** em *Baixar como* e baixe o arquivo.'
  - '**Novo Outlook / Outlook.com:** Pessoas → **Gerenciar contatos** → **Importar contatos** → Procurar → escolha o CSV → **Importar**.'
  - '**Outlook clássico para Windows:** Arquivo → **Abrir e Exportar** → **Importar/Exportar** → *Importar de outro programa ou arquivo* → *Valores Separados por Vírgula* → escolha o arquivo e o que fazer com duplicatas → escolha a pasta **Contatos** → **Concluir**.'
  - 'Confira alguns contatos. Se faltarem campos, importe de novo e use **Mapear Campos Personalizados** na última etapa do assistente.'
faq:
  - q: 'Por que não importar o .vcf no Outlook?'
    a: 'O novo Outlook e o Outlook.com não importam arquivos vCard. O Outlook clássico abre um .vcf com vários contatos um de cada vez — você confirma cada cartão, e muitos usuários relatam que só o primeiro contato entra. A própria Microsoft recomenda passar pelo CSV quando são muitos contatos.'
  - q: 'Meu Outlook está em português. Os cabeçalhos em inglês do CSV funcionam?'
    a: 'A Microsoft observa que o idioma dos cabeçalhos do CSV deve ser o mesmo do Outlook. Se algum campo ficar vazio depois da importação, use **Mapear Campos Personalizados** no assistente e arraste cada coluna para o campo do Outlook — Mobile Phone → Celular, e assim por diante.'
  - q: 'Os nomes aparecem como `Ã§` ou `???` depois da importação.'
    a: 'O Outlook clássico às vezes lê errado arquivos CSV em UTF-8. Teste o caminho do .vcf com alguns contatos para conferir, ou abra o CSV no Excel, salve como “CSV (separado por vírgulas)” no idioma do seu Windows e importe esse arquivo.'
  - q: 'Como importar no Outlook para Mac?'
    a: 'Arraste o .vcf para Pessoas, ou use Arquivo → Importar. A Microsoft documenta que só o primeiro contato aparece na janela, mas todos os contatos do vCard são salvos.'
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## Que arquivo usar em cada Outlook

| Outlook | Melhor arquivo | Caminho |
| --- | --- | --- |
| Novo Outlook para Windows, Outlook.com, Outlook na Web | CSV do Outlook | Pessoas → Gerenciar contatos → Importar contatos |
| Outlook clássico para Windows (2016–2024, Microsoft 365) | CSV do Outlook | Arquivo → Abrir e Exportar → Importar/Exportar |
| Outlook para Mac | .vcf (vCard 3.0) | Arrastar para Pessoas, ou Arquivo → Importar |
| Um contato em qualquer Outlook | .vcf | Abrir o arquivo → Salvar e Fechar |

## Outlook clássico: o assistente de importação

1. **Arquivo** → **Abrir e Exportar** → **Importar/Exportar**.
2. Escolha **Importar de outro programa ou arquivo** → **Avançar**.
3. Escolha **Valores Separados por Vírgula** → **Avançar**.
4. Procure o CSV. Escolha o que fazer com duplicatas: *Substituir duplicatas por itens importados*, *Permitir a criação de duplicatas* ou *Não importar itens duplicados*. → **Avançar**.
5. Selecione a pasta **Contatos** da conta certa → **Avançar**.
6. Marque a ação para o arquivo. Se o Outlook não estiver em inglês, clique em **Mapear Campos Personalizados**, confira se cada coluna cai no campo certo e clique em **OK** → **Concluir**.

## O que tem no CSV do Outlook gerado por este conversor

As colunas usam os nomes que o próprio Outlook usa em inglês: `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday` e assim por diante. Os telefones vão para o campo correspondente ao tipo. Números extras vão para *Other Phone*, *Car Phone* e *Callback*. O que não couber (um quarto e-mail, um quarto endereço) é acrescentado em *Notes* em vez de ser descartado. Os aniversários são gravados como `M/D/AAAA` (mês antes do dia), a forma que o próprio Outlook usa ao exportar.

## Se você só precisa de alguns contatos

Abra cada .vcf (escolha “ZIP, um .vcf por contato” no conversor). O Outlook mostra a janela do contato; clique em **Salvar e Fechar**. Funciona bem para dez contatos e é cansativo para mil.
