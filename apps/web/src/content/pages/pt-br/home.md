---
url: ''
title: 'Converter CSV para VCF grátis (vCard), sem enviar arquivos'
h1: 'Converter CSV para VCF'
description: 'Converta uma lista de contatos em CSV ou Excel para um arquivo VCF (vCard 3.0, 4.0 ou 2.1) para iPhone, Android, Google Contatos e Outlook. Roda no navegador, sem upload.'
lead: 'Transforma uma planilha de contatos em um único arquivo .vcf que o iPhone, o Android, o Google Contatos e o Outlook importam — colunas ligadas aos campos certos, telefones padronizados, duplicados encontrados. O arquivo é lido neste aparelho e nunca é enviado.'
nav: 'CSV para VCF'
summary: 'Qualquer planilha de contatos em um arquivo .vcf, com ligação das colunas e limpeza dos telefones.'
steps:
  - 'Solte o arquivo CSV, Excel ou ODS na caixa acima, ou cole células do Planilhas Google. A codificação e o separador são detectados; se a prévia mostrar símbolos como `Ã§` no lugar das letras, escolha outra codificação.'
  - 'Confira as ligações das colunas. Cada coluna está ligada a um campo do vCard; vale olhar as marcadas como **palpite**. Colunas definidas como “ignorar” ficam de fora.'
  - 'Escolha o país dos números escritos sem código do país. Os números são gravados como `+5511912345678`, então funcionam para ligar de qualquer país e os apps de mensagem, como o WhatsApp, os reconhecem.'
  - 'Baixe o .vcf — vCard 3.0, a menos que algum aparelho peça outra versão — e importe: [iPhone](/pt-br/importar-vcf-no-iphone/), [Android](/pt-br/importar-contatos-vcf-android/), [Google Contatos](/pt-br/importar-vcf-no-google-contatos/), [Outlook](/pt-br/importar-contatos-no-outlook/).'
features:
  - feature: 'Entrada'
    value: 'CSV, TSV e TXT com qualquer separador (vírgula, ponto e vírgula, tabulação, barra vertical, a linha `sep=` do Excel); XLSX, XLS e ODS com escolha da aba; células coladas do Planilhas Google ou do Excel. Vários arquivos de uma vez.'
  - feature: 'Codificações'
    value: 'UTF-8 com ou sem BOM, UTF-16, Windows-1250 a 1258, KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Detectadas automaticamente; dá para trocar vendo a prévia ao vivo.'
  - feature: 'Exportações reconhecidas'
    value: 'CSV do Google Contatos (layout atual e antigo), CSV do Outlook com cabeçalhos em inglês, alemão, francês, russo, espanhol, português ou turco, Connections.csv do LinkedIn, listas simples de “nome + telefone” com ou sem linha de cabeçalho.'
  - feature: 'Telefones'
    value: 'Convertidos para o formato internacional com as regras da libphonenumber; números de celular recebem o tipo celular. Números inválidos são mantidos e sinalizados. O `5,5E+12` do Excel e números salvos sem “+” são detectados.'
  - feature: 'Nomes'
    value: 'Um nome completo numa só célula é dividido em nome, nome do meio e sobrenome — inclusive “Sobrenome, Nome”, patronímicos russos, sobrenomes duplos espanhóis e partículas como *da*, *dos* ou *van*.'
  - feature: 'Duplicados'
    value: 'Encontrados por telefone e e-mail. Mesclar é opcional; você vê os grupos antes de baixar.'
  - feature: 'Saída'
    value: 'vCard 3.0 (padrão), 4.0 ou 2.1; um único .vcf ou um ZIP com um arquivo por contato; CSV do Google Contatos; CSV do Outlook.'
  - feature: 'Tamanho'
    value: 'Testado com 100.000 linhas: alguns segundos num notebook. Sem limite de linhas — o limite é a memória do seu aparelho.'
  - feature: 'Privacidade'
    value: 'Sem upload, sem cadastro, sem rastrear o conteúdo dos arquivos. Funciona off-line depois da primeira visita.'
  - feature: 'Não suportado'
    value: 'Fotos de contato (planilhas não têm), arquivos do Apple Numbers (exporte para CSV antes), arquivos do Excel protegidos por senha.'
faq:
  - q: 'Minha lista de contatos é enviada para algum lugar?'
    a: 'Não. O navegador lê o arquivo e um Web Worker no seu aparelho faz a conversão. Para conferir, abra as ferramentas do desenvolvedor (F12), vá à aba Rede (Network) e converta um arquivo: nenhuma requisição leva os seus dados. Depois da primeira visita, o conversor também funciona sem internet.'
  - q: 'Qual versão do vCard devo escolher?'
    a: 'vCard 3.0. iPhone, Android, Google Contatos e Outlook importam essa versão. Escolha a 4.0 só se algum app pedir, e a 2.1 para celulares antigos (celulares básicos, Nokia ou Sony Ericsson antigos) que mostram letras embaralhadas com a 3.0.'
  - q: 'Por que meus telefones aparecem como 5,5E+12?'
    a: 'O Excel exibiu o número longo em notação científica e o CSV foi salvo assim, então os dígitos originais não estão mais no arquivo. Formate a coluna de telefone como Texto no Excel e exporte de novo — ou solte o próprio arquivo .xlsx, onde o número completo continua guardado. [Por que isso acontece](/pt-br/excel-telefone-notacao-cientifica/).'
  - q: 'Nomes com acento, cedilha, letras cirílicas ou árabes chegam certos?'
    a: 'Sim, se a codificação for lida corretamente. O conversor detecta a codificação e mostra as primeiras linhas; se aparecer `Ã§`, `Ã£` ou pontos de interrogação, escolha outra codificação na lista. O .vcf é sempre gravado em UTF-8, que todo celular atual lê.'
  - q: 'Dá para adicionar todos os contatos no iPhone de uma vez?'
    a: 'Sim. Mande o .vcf para o iPhone por AirDrop, Mail ou Arquivos, abra o arquivo e toque em “Adicionar Todos os Contatos”. [Passo a passo](/pt-br/importar-vcf-no-iphone/).'
  - q: 'Quantos contatos posso converter?'
    a: 'O conversor não tem limite. O Google Contatos aceita até 3.000 contatos por arquivo importado e 25.000 por conta; divida listas maiores em vários arquivos.'
  - q: 'É grátis mesmo?'
    a: 'Sim — sem cadastro, sem marca d’água, sem limite de linhas. O mecanismo de conversão é de código aberto, sob a licença MIT.'
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard) é o formato padrão de cartões de contato: todo app de celular e de e-mail consegue importar. Um CSV é só uma tabela, e o celular não importa tabelas. O conversor transforma cada linha em um cartão:

```text
BEGIN:VCARD
VERSION:3.0
N:da Silva;João;;;
FN:João da Silva
TEL;TYPE=CELL:+5511912345678
EMAIL;TYPE=INTERNET:joao@example.com.br
ORG:Silva Comércio
BDAY:1990-05-17
END:VCARD
```

**Por que o vCard 3.0 é o padrão.** A versão 3.0 ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)) é o formato que o próprio iPhone, o Android e o Google Contatos usam ao exportar, por isso ela importa sem problemas em qualquer lugar. A versão 4.0 ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) é mais nova, mas não acrescenta nada de que uma agenda precise. A versão 2.1 existe para celulares antigos: texto com acentos ou fora do alfabeto latino é gravado em Quoted-Printable com `CHARSET=UTF-8`, a única forma que esses aparelhos entendem.

**O que vai no arquivo.** Todo cartão tem os dois campos obrigatórios: `N` (partes do nome) e `FN` (nome de exibição). Se uma linha não tem nome, entra a empresa; na falta dela, o e-mail; e por último o número. O texto é escapado, e linhas longas são dobradas em 75 bytes sem partir uma letra ao meio, então acentos, cirílico, árabe, chinês e emojis chegam intactos. As quebras de linha são CRLF, como o padrão exige.

**Tipos de telefone.** Uma coluna chamada “Celular”, “Cel”, “WhatsApp” ou “Mobile” vira `TYPE=CELL`. Numa coluna genérica “Telefone”, quem decide é o plano de numeração: celulares viram celular, fixos ficam como “telefone”. Uma coluna “CEP” é lida como código postal do endereço, não como telefone.

**O que acontece com o resto.** Colunas de que você não precisa podem ser marcadas como *ignorar*. Datas que o conversor não consegue ler não são descartadas; elas vão para a nota. Cada linha pulada aparece listada com o número da linha — como o Excel mostra — e o motivo.

Leia também: [o que é um arquivo VCF e como as versões diferem](/pt-br/o-que-e-arquivo-vcf/), [por que nomes importados viram símbolos](/pt-br/contatos-com-caracteres-estranhos/).
