---
url: importar-vcf-no-google-contatos
title: 'Como importar arquivo VCF ou CSV no Google Contatos'
h1: 'Como importar contatos no Google Contatos'
description: 'Importe um .vcf (ou CSV do Google) no Google Contatos pela web: Importar → Selecionar arquivo. Limites (3.000 por arquivo, 25.000 por conta), marcadores e duplicados.'
lead: 'O Google Contatos na web importa um .vcf ou um CSV do Google pelo botão Importar. Depois os contatos sincronizam com todos os celulares Android, com o Gmail e com um iPhone que tenha a conta Google adicionada.'
nav: 'Importar no Google Contatos'
summary: 'Importar um .vcf ou CSV em contacts.google.com, com os limites.'
steps:
  - 'Converta a sua planilha no [conversor](/pt-br/) — .vcf (vCard 3.0) ou “CSV do Google Contatos” em *Baixar como*.'
  - 'Abra [contacts.google.com](https://contacts.google.com/) e entre com a conta que deve receber os contatos.'
  - 'Clique em **Importar** no menu à esquerda, depois em **Selecionar arquivo**, escolha o arquivo e clique em **Importar**.'
  - 'Os contatos importados recebem um marcador como “Importado em 04/11/2026” (Imported on). Abra **Mesclar e corrigir** para juntar duplicados com os contatos que você já tinha.'
faq:
  - q: 'VCF ou CSV do Google: qual é melhor para o Google?'
    a: 'Os dois importam por completo. O vCard mantém os tipos de telefone e e-mail e serve também para outros apps; o CSV do Google é prático se você quiser olhar ou editar a lista numa planilha antes de importar.'
  - q: 'Quantos contatos posso importar?'
    a: 'O Google pede para dividir arquivos com mais de 3.000 contatos, e uma conta guarda até 25.000 contatos (cerca de 20 MB sem fotos). Divida listas maiores em vários arquivos.'
  - q: 'Como desfaço uma importação?'
    a: 'Clique no marcador “Importado em …” no menu à esquerda, selecione todos os contatos dele (caixa de seleção no topo) e exclua. Eles ficam na lixeira por 30 dias.'
  - q: 'Os contatos importados não aparecem no meu celular.'
    a: 'Confira se o celular sincroniza essa conta Google: no Android, Configurações → Senhas e contas → Google → Sincronização da conta → Contatos; no iPhone, Ajustes → Apps → Contatos → Contas → Gmail → Contatos ativado.'
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Importar passo a passo

1. Acesse [contacts.google.com](https://contacts.google.com/) no computador.
2. No menu à esquerda, clique em **Importar**.
3. Clique em **Selecionar arquivo** e escolha o .vcf ou o .csv.
4. Clique em **Importar**.

O Google coloca todos os contatos importados num marcador novo com a data da importação. Isso facilita conferir o resultado — ou apagar o lote inteiro se algo der errado.

## Limites que vale conhecer

| Limite | Valor |
| --- | --- |
| Contatos por arquivo importado | cerca de 3.000 — divida arquivos maiores |
| Contatos por conta | 25.000 |
| Armazenamento dos contatos | 20 MB (fotos não contam) |
| Um contato | até 128 KB, 500 campos |

O conversor gera um único arquivo para qualquer quantidade de contatos. Para mais de 3.000 linhas, filtre a planilha em partes e converta cada parte, ou importe o mesmo .vcf num celular Android, que não tem limite por arquivo.

## Duplicados

O Google não mescla na importação. Se você importar a mesma pessoa duas vezes, fica com dois cartões. Há dois jeitos de evitar isso:

- **antes** da importação: abra a aba *Duplicados* no conversor e marque “Mesclar” — pessoas com o mesmo telefone ou e-mail viram um só cartão;
- **depois** da importação: Google Contatos → **Mesclar e corrigir** sugere duplicados na conta inteira.

## Números de telefone

O Google guarda os números como texto, exatamente como foram importados. Números no formato internacional (`+55 11 91234-5678`) aparecem corretamente em qualquer país, e os apps de mensagem conseguem associá-los. Números sem código do país são interpretados com a região do celular e podem ficar errados no exterior. Por isso o conversor grava os números com `+` por padrão.
