---
url: importar-vcf-no-iphone
title: 'Como importar arquivo VCF no iPhone (todos os contatos de uma vez)'
h1: 'Como importar um arquivo VCF no iPhone'
description: 'Adicione de uma vez todos os contatos de um .vcf ao iPhone: por AirDrop, Mail ou Arquivos no celular, ou pelo iCloud.com no computador. Passos do iOS 26 e soluções.'
lead: 'Dois caminhos importam um .vcf inteiro com muitos contatos: abrir o arquivo no iPhone e tocar em “Adicionar Todos os Contatos”, ou importar pelo iCloud.com e deixar sincronizar.'
nav: 'Importar no iPhone'
summary: 'Todos os contatos de um .vcf no iPhone: pelo próprio celular ou pelo iCloud.com.'
steps:
  - 'Gere o .vcf no [conversor](/pt-br/) — vCard 3.0, formato de telefone “+E.164”.'
  - 'Mande o arquivo para o iPhone: por AirDrop a partir de um Mac, por e-mail para você mesmo, ou salve no iCloud Drive e abra no app Arquivos.'
  - 'Toque no arquivo. O iOS mostra os contatos que ele contém; toque em **Adicionar Todos os Contatos** (Add All Contacts) — o iOS mostra o número, por exemplo “Adicionar Todos os 248 Contatos”. Se o Arquivos mostrar só uma prévia, toque em Compartilhar → **Contatos**.'
  - 'Confira se os contatos foram para a conta certa: em Ajustes → Apps → Contatos, a opção **Conta Padrão** decide se eles vão para o iCloud, para o Gmail ou para “No Meu iPhone”.'
faq:
  - q: 'O iPhone só mostra o primeiro contato. Onde estão os outros?'
    a: 'Se o arquivo abriu numa prévia (Visualização Rápida), só um cartão aparece. Use Compartilhar → Contatos, ou abra o arquivo pelo Mail, pelo Mensagens ou pelo Arquivos, que mostram a lista completa com “Adicionar Todos os Contatos”. Ou importe pelo iCloud.com: cada cartão vira um contato separado.'
  - q: 'Preciso do iCloud para importar contatos?'
    a: 'Não. Abrir o .vcf no celular funciona sem iCloud; os contatos são salvos na conta padrão. O iCloud.com é útil quando o arquivo está no computador.'
  - q: 'Alguns contatos não foram adicionados. Por quê?'
    a: 'Quando você importa pelo Mensagens, o iOS adiciona só os cartões que ainda não estão nos seus contatos. Confira os duplicados e a lista de linhas puladas no relatório do conversor.'
  - q: 'Os nomes aparecem com caracteres estranhos depois de importar.'
    a: 'Provavelmente o vCard era 2.1 ou não estava em UTF-8. Converta de novo com vCard 3.0 — o conversor sempre grava em UTF-8. [Por que os nomes ficam embaralhados](/pt-br/contatos-com-caracteres-estranhos/).'
  - q: 'Aniversários sem ano aparecem com 1604.'
    a: 'O iOS usa 1604 internamente como “sem ano”. Contatos convertidos aqui mantêm aniversários sem ano como `--05-17`; se a sua versão do iOS mostrar um ano, edite o cartão uma vez e apague o ano.'
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## Método 1: no iPhone

É o jeito mais rápido quando o arquivo já está no celular ou na sua caixa de entrada.

1. **Leve o arquivo para o iPhone.** Mande por AirDrop de um Mac, por e-mail para você mesmo, pelo Mensagens, ou coloque no iCloud Drive.
2. **Abra o arquivo.** No Mail ou no Mensagens, toque no anexo. No Arquivos, toque no arquivo; se aparecer só a prévia de um cartão, toque no botão Compartilhar e escolha **Contatos**.
3. **Adicione todos.** A lista mostra todos os cartões do arquivo. Toque em **Adicionar Todos os Contatos**; o texto exato depende da versão do iOS e pode incluir o número de contatos.
4. **Pronto.** Os contatos aparecem no app Contatos e no app Telefone. WhatsApp, Telegram e outros apps passam a vê-los na próxima sincronização de contatos.

## Método 2: iCloud.com no computador

A Apple documenta este caminho. Ele também dá conta de arquivos com muitos contatos e é prático quando o .vcf está no computador.

1. Entre em [icloud.com](https://www.icloud.com/) e abra **Contatos**.
2. Clique no botão **+** e escolha **Importar Contato** (Import Contact). Algumas versões da página mostram um ícone de engrenagem com **Importar vCard** no lugar.
3. Escolha o arquivo .vcf. Cada pessoa do arquivo vira um contato separado em *Todos os Contatos*.
4. No iPhone, os Contatos do iCloud precisam estar ativados: Ajustes → [seu nome] → iCloud → Contatos. Os novos contatos chegam em cerca de um minuto.

## Antes de importar

- **Use vCard 3.0.** É o que o próprio iPhone exporta. O vCard 2.1 é só para celulares antigos.
- **Escreva os números no formato internacional.** `+5511912345678` funciona em viagens e nos apps de mensagem; números sem código do país podem não ser associados às contas do WhatsApp.
- **Tire os duplicados antes.** A aba *Duplicados* do conversor mostra pessoas que aparecem duas vezes na planilha; marque “Mesclar” para juntá-las.
- **Faça backup.** Importar é fácil de repetir, mas chato de desfazer: exporte os seus contatos atuais pelo iCloud.com antes de importar centenas de novos.

## Desfazer uma importação

O iOS não tem “desfazer importação”. No iCloud.com dá para selecionar vários contatos com Shift-clique ou Cmd-clique e apagar todos juntos, então teste o arquivo com algumas linhas antes de importar milhares.
