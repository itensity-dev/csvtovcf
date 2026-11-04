---
url: converter-xls-para-vcf
title: 'Converter XLS para VCF: contatos de Excel antigo em vCard'
h1: 'Converter XLS para VCF'
description: 'Converta listas de contatos .xls do Excel 97–2003, de sistemas antigos e de programas de celular em arquivo VCF. Páginas de código antigas são decodificadas. Sem upload.'
lead: 'Lê o formato binário antigo do Excel (.xls) — inclusive arquivos do Excel 95, de programas de contabilidade e de software de sincronização de celular — e gera um .vcf que os celulares atuais importam.'
nav: 'XLS para VCF'
summary: 'Arquivos de contatos .xls antigos (Excel 97–2003 e anteriores) para vCard.'
steps:
  - 'Solte o arquivo .xls acima. O formato é detectado pelo conteúdo do arquivo, então uma planilha com a extensão errada abre do mesmo jeito.'
  - 'Escolha a aba, se houver várias, e confira a prévia: nomes com acentos ou com letras cirílicas, gregas, turcas ou da Europa Central devem aparecer corretos.'
  - 'Confira as ligações das colunas e escolha o país dos números sem código do país.'
  - 'Baixe o .vcf. Escolha o vCard 2.1 só se o arquivo for voltar para um celular antigo; os celulares atuais pedem a 3.0.'
features:
  - feature: 'Formatos'
    value: 'BIFF8 (.xls do Excel 97–2003), BIFF5 (Excel 95), BIFF2–4 e Excel 2003 XML, além de .xlsx e .ods.'
  - feature: 'Páginas de código antigas'
    value: 'Texto em arquivos .xls anteriores ao Unicode (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5…) é decodificado com a página de código gravada no próprio arquivo.'
  - feature: 'Números e datas'
    value: 'Telefones são lidos por inteiro; células de data, inclusive no sistema de datas de 1904 das planilhas antigas de Mac, viram aniversários.'
  - feature: 'Saída'
    value: 'vCard 3.0 (padrão), 4.0 ou 2.1, um arquivo só ou um por contato; CSV do Google; CSV do Outlook.'
  - feature: 'Não suportado'
    value: '.xls criptografado (com senha para abrir), arquivos do Lotus 1-2-3 e do Quattro.'
faq:
  - q: 'Qual a diferença entre XLS e XLSX?'
    a: '.xls é o formato binário que o Excel usou até a versão 2003; .xlsx é o formato XML compactado usado desde o Excel 2007. Aqui os dois são lidos do mesmo jeito. Programas antigos e algumas ferramentas de sincronização de celular ainda exportam .xls.'
  - q: 'Os nomes do meu arquivo antigo aparecem como `Ãëåá` ou com pontos de interrogação. E agora?'
    a: 'Neste conversor isso não deveria acontecer: arquivos .xls guardam a sua página de código, e ela é aplicada na leitura. Se as letras continuarem erradas, provavelmente o texto já estava corrompido quando foi digitado no Excel. Abra o arquivo no Excel e confira as células por lá.'
  - q: 'Dá para converter um .xls com milhares de contatos?'
    a: 'Sim. Não há limite de linhas; 100.000 linhas são convertidas em poucos segundos. Para o Google Contatos, divida o resultado em arquivos de até 3.000 contatos.'
  - q: 'Qual versão do vCard serve para um celular antigo?'
    a: 'vCard 2.1. Ela grava texto com acentos ou fora do alfabeto latino em Quoted-Printable com `CHARSET=UTF-8`, que os celulares dos anos 2000 entendem. Smartphones devem receber a 3.0.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS** é o formato de arquivo que o Excel usava antes de 2007. Ele ainda é comum em listas de contatos exportadas de CRMs antigos, programas de contabilidade, centrais telefônicas e programas de sincronização de celular. O celular não lê esse formato, e o Google Contatos só importa CSV ou vCard. O conversor lê o próprio .xls, então você não precisa ter o Excel instalado.

**Páginas de código.** O Excel 97–2003 guarda o texto em Unicode, mas arquivos do Excel 95 e de alguns geradores usam a página de código do computador que os criou — Windows-1252 para português e outras línguas da Europa Ocidental, 1251 para russo, 1250 para polonês ou tcheco, 1254 para turco. O conversor aplica a página de código registrada no arquivo, então `Conceição` continua `Conceição` e `Иванов` continua `Иванов`. O .vcf é sempre gravado em UTF-8.

**De linhas para cartões.** A linha de cabeçalho é encontrada automaticamente. As colunas são reconhecidas pelo nome em vários idiomas: “Telefone”, “Celular”, “Teléfono”, “Handy” e “Телефон” viram números de telefone. Cada linha vira um cartão com os campos obrigatórios `N` e `FN`; linhas sem nome, telefone, e-mail, empresa ou endereço são puladas e listadas com o número da linha.

**Qual versão baixar.** O vCard 3.0 importa no iPhone, no Android, no Google Contatos e no Outlook. O vCard 2.1 existe para os aparelhos de onde esses .xls costumavam vir: celulares básicos e os primeiros modelos da Nokia ou da Sony Ericsson. [Como as versões diferem](/pt-br/o-que-e-arquivo-vcf/).
