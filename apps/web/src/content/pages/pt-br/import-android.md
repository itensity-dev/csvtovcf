---
url: importar-contatos-vcf-android
title: 'Como importar arquivo VCF no Android (Samsung, Motorola, Xiaomi)'
h1: 'Como importar um arquivo VCF no Android'
description: 'Importe todos os contatos de um .vcf no Android: app Google Contatos (Motorola e a maioria dos celulares), Contatos da Samsung e Xiaomi. Caminhos dos menus e soluções.'
lead: 'O Android importa um .vcf com vários contatos de uma vez. O caminho no menu depende do app de contatos: Google Contatos no Motorola, no Pixel e em muitos outros, ou o app próprio da Samsung nos Galaxy.'
nav: 'Importar no Android'
summary: 'Caminhos dos menus no Google Contatos, na Samsung e na Xiaomi.'
steps:
  - 'Gere o .vcf no [conversor](/pt-br/) (vCard 3.0) e coloque no celular: baixe direto nele ou mova o arquivo para a pasta Downloads.'
  - '**App Google Contatos:** abra Contatos → **Organizar** (aba na parte de baixo) → **Importar do arquivo** → escolha o .vcf → escolha a conta Google.'
  - '**Contatos da Samsung:** abra Contatos → menu ☰ → **Gerenciar contatos** → **Importar ou exportar contatos** → **Importar** → escolha onde está o arquivo → marque o .vcf → escolha onde salvar (conta Samsung, Google, telefone) → **Importar**.'
  - 'Abra o app Contatos e confira alguns cartões. Salve na conta Google se quiser os contatos nos outros aparelhos e no Gmail.'
faq:
  - q: 'Não acho “Importar” no app Google Contatos.'
    a: 'Nas versões atuais fica na aba **Organizar**, na parte de baixo → Importar do arquivo. Em versões antigas: menu (☰) → Configurações → Importar, ou “Corrigir e gerenciar” → Importar do arquivo. As versões recentes levaram a opção para a aba Organizar.'
  - q: 'Onde os contatos devem ser salvos?'
    a: 'Na sua conta Google, se você quiser backup e os contatos em todos os aparelhos (e no Gmail). O armazenamento “Telefone” ou “Dispositivo” deixa os contatos só neste celular, e eles se perdem junto com ele.'
  - q: 'Os nomes aparecem como símbolos no meu Samsung.'
    a: 'Converta de novo com vCard 3.0, não 2.1. A versão 2.1 grava texto com acentos ou fora do alfabeto latino em Quoted-Printable, e alguns celulares decodificam isso errado.'
  - q: 'O WhatsApp não mostra os novos contatos.'
    a: 'O WhatsApp associa os contatos pelo número internacional completo. Converta com o formato de telefone “+E.164” e o país certo, depois atualize os contatos no WhatsApp (Nova conversa → ⋮ → Atualizar).'
  - q: 'Dá para importar um CSV direto no Android?'
    a: 'O app Google Contatos não importa CSV no celular; a versão web em contacts.google.com importa. Convertendo para .vcf, você importa direto no celular.'
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## App Google Contatos (Motorola, Pixel, Nokia, OnePlus e outros)

O app Google Contatos vem instalado nos celulares Motorola e Pixel e em muitos outros. Ele também está disponível para qualquer Android na Google Play.

1. Abra **Contatos**.
2. Toque em **Organizar**, na parte de baixo da tela.
3. Toque em **Importar do arquivo**.
4. Escolha o .vcf no seletor de arquivos (geralmente em *Downloads*).
5. Se você tiver mais de uma conta, escolha a conta Google onde salvar. Todos os cartões do arquivo são importados de uma vez.

O Google Contatos aceita até 25.000 contatos por conta. Para listas muito grandes, importe em partes de alguns milhares.

## Samsung Galaxy (Contatos da Samsung, One UI)

1. Abra **Contatos**.
2. Toque no menu **☰** (três linhas).
3. Toque em **Gerenciar contatos** (Manage contacts).
4. Toque em **Importar ou exportar contatos** (em versões antigas: *Importar/Exportar contatos*).
5. Toque em **Importar**, escolha o armazenamento onde está o arquivo (*Armazenamento interno*), marque o .vcf e toque em **Concluído**.
6. Escolha onde salvar — *Conta Samsung*, uma conta *Google* ou *Telefone* — e toque em **Importar**.

Os nomes das opções podem mudar um pouco entre versões da One UI, mas o caminho por **Gerenciar contatos** é o mesmo há anos.

## Xiaomi, Redmi, POCO (MIUI / HyperOS)

Nos celulares com o app Contatos próprio da Xiaomi: Contatos → **⋮** → **Configurações** → **Importar e exportar** → **Importar do armazenamento** (Import from storage) e escolha o arquivo. Os aparelhos que usam o app Google Contatos seguem os passos do Google acima.

## Qualquer celular: abrir o arquivo

Tocar num .vcf no app Arquivos (ou em outro gerenciador de arquivos) ou num anexo de e-mail costuma oferecer *Abrir com → Contatos*. Isso faz a mesma importação, e você escolhe a conta na janela seguinte. É o caminho para marcas e versões do Android que não estão descritas aqui.

## Antes de importar

- **vCard 3.0, UTF-8.** É o que este conversor grava por padrão e o que o próprio Android exporta.
- **Números internacionais.** `+5511912345678` em vez de `(11) 91234-5678` permite que os apps de mensagem, como o WhatsApp, reconheçam o contato, e funciona em roaming.
- **Um arquivo só.** Um único .vcf com todos os contatos é mais prático que centenas de arquivos pequenos; use a opção ZIP só se algum sistema pedir um cartão por arquivo.
