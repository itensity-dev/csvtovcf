---
url: converter-xlsx-para-vcf
title: 'Converter XLSX para VCF: contatos da planilha do Excel em vCard'
h1: 'Converter XLSX para VCF'
description: 'Converta uma planilha de contatos .xlsx em VCF (vCard). Escolha a aba, mantenha telefones e datas completos e gere um .vcf para iPhone, Android ou Google. Sem upload.'
lead: 'Escolha uma aba do seu arquivo .xlsx e receba um .vcf com um cartão por linha. Os telefones são lidos por inteiro e as células de data viram aniversários.'
nav: 'XLSX para VCF'
summary: 'Planilhas modernas do Excel (.xlsx) para vCard, com escolha da aba.'
steps:
  - 'Solte o .xlsx acima. A primeira aba visível com dados é aberta; troque de aba na lista “Aba”.'
  - 'Veja a prévia das primeiras linhas: as letras das colunas são as mesmas do Excel, e os números das linhas também.'
  - 'Confira as ligações das colunas e defina o país dos telefones e a versão do vCard (a 3.0 serve para todos os celulares atuais).'
  - 'Baixe o .vcf — ou um ZIP com um arquivo por contato, se precisar anexar os cartões um a um.'
features:
  - feature: 'Pastas de trabalho'
    value: '.xlsx, .xlsm e .xlsb; qualquer aba pode ser escolhida, e as ocultas aparecem marcadas.'
  - feature: 'Fórmulas'
    value: 'Vale o último valor calculado, por exemplo um nome montado com `=B2&" "&C2`.'
  - feature: 'Células mescladas e vazias'
    value: 'Uma célula mesclada é lida uma vez, na sua célula superior esquerda. Colunas vazias ficam escondidas no painel de ligações.'
  - feature: 'Números longos'
    value: 'Até 15 dígitos são lidos com exatidão — o limite de precisão do próprio Excel. Sequências maiores de dígitos precisam estar guardadas como texto no Excel.'
  - feature: 'Saída'
    value: 'vCard 3.0, 4.0 ou 2.1; arquivo único ou ZIP; CSV do Google ou do Outlook.'
faq:
  - q: 'Por que não exportar a aba como CSV e converter o CSV?'
    a: 'Porque a exportação para CSV do Excel grava o que a célula mostra. Um telefone exibido como `5,51191E+12` é exportado com os dígitos cortados. O .xlsx ainda tem o número inteiro, então converta a própria planilha.'
  - q: 'Meus contatos estão espalhados em várias abas. Dá para juntar?'
    a: 'Converta cada aba e importe os arquivos um depois do outro, ou antes copie as linhas para uma aba só. Juntar vários arquivos é possível: solte todos juntos.'
  - q: 'Como são lidos os aniversários guardados no Excel?'
    a: 'Células formatadas como data são lidas como data, qualquer que seja o formato de exibição. Datas em texto também: `17/05/1990`, `17.05.1990`, `05/17/1990`, `1990-05-17`, `17 de maio de 1990`, com nomes de meses em 13 idiomas.'
  - q: 'Fórmulas ou macros são executadas?'
    a: 'Não. Macros nunca rodam. Células com fórmula são lidas pelos valores que o Excel salvou no arquivo.'
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

Um arquivo **.xlsx** é um arquivo ZIP com partes em XML: uma por aba, mais o texto compartilhado e os estilos das células. O conversor descompacta o arquivo no seu navegador com o [SheetJS](https://sheetjs.com/) e lê as células da aba que você escolher. Nada é enviado para lugar nenhum.

**Números e texto.** O Excel guarda um telefone como número ou como texto. Números perdem o `0` inicial e o `+`. O conversor os devolve usando o país escolhido e confere cada resultado com o plano de numeração desse país. Números que não passam são gravados sem alteração e marcados, para que nada desapareça sem aviso. Se mais do que alguns números de uma coluna forem afetados, um aviso abaixo do nome do arquivo diz quantos.

**Datas.** O Excel guarda uma data como o número de dias desde 1900 (ou 1904, nas planilhas antigas de Mac). O conversor lê o tipo da célula e transforma as células de data de verdade em valores `BDAY`. Um aniversário sem ano (`--05-17`) continua sem ano.

**Ligações.** O painel de ligações mostra cada coluna não vazia com a letra, o cabeçalho e valores de exemplo. Troque qualquer ligação na lista dela; uma segunda lista define o tipo, então você pode marcar uma coluna como celular, trabalho ou casa. As mudanças aparecem na hora na prévia dos cartões.

Para o caso geral e para arquivos CSV, veja o [conversor de CSV para VCF](/pt-br/).
