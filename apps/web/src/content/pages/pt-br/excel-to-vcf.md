---
url: converter-excel-para-vcf
title: 'Converter Excel para VCF: planilha de contatos em vCard'
h1: 'Converter planilha Excel para VCF'
description: 'Transforme uma planilha de contatos do Excel (.xlsx ou .xls) em arquivo VCF para iPhone, Android e Google. Lê a planilha direto, sem cortar os telefones. Sem upload.'
lead: 'Abre a sua planilha do Excel diretamente — sem passar por “Salvar como CSV” — e transforma cada linha em um cartão de contato num único .vcf. Telefones guardados como número recebem de volta o código do país; o arquivo nunca sai deste aparelho.'
nav: 'Excel para VCF'
summary: 'Planilha XLSX ou XLS direto para vCard, com escolha da aba.'
steps:
  - 'Solte o arquivo do Excel (.xlsx, .xls ou .ods) acima. Se a pasta de trabalho tiver várias abas, escolha a que tem os contatos; abas ocultas aparecem marcadas.'
  - 'Confira se a linha de cabeçalho foi encontrada e se as colunas estão ligadas aos campos certos — “Nome”, “Celular”, “E-mail”, “Empresa” são reconhecidos em vários idiomas.'
  - 'Defina o país dos números. O Excel tira o 0 inicial e o “+” dos números guardados como número; o país serve para devolvê-los.'
  - 'Baixe o .vcf e importe no celular: [iPhone](/pt-br/importar-vcf-no-iphone/), [Android](/pt-br/importar-contatos-vcf-android/).'
features:
  - feature: 'Arquivos do Excel'
    value: '.xlsx e .xlsm (Excel 2007 em diante), .xls (Excel 97–2003 e anteriores, inclusive as páginas de código do Excel 95), .ods. Qualquer aba; abas ocultas são listadas.'
  - feature: 'Valores das células'
    value: 'Números são lidos por inteiro (`5511912345678`, nunca `5,51191E+12`). Células de data viram aniversários. Fórmulas são lidas pelo último valor calculado.'
  - feature: 'Linha de cabeçalho'
    value: 'Encontrada automaticamente, mesmo com linhas de título acima dela. Desmarque “Primeira linha é cabeçalho” se a sua planilha começa direto nos dados.'
  - feature: 'Limpeza dos telefones'
    value: 'Números sem “+” ou sem o 0 inicial são completados a partir do país escolhido e gravados no formato internacional, no estilo `+55 11 91234-5678`. Números inválidos são sinalizados, não descartados.'
  - feature: 'Saída'
    value: 'Um .vcf (vCard 3.0, 4.0 ou 2.1), um ZIP com um cartão por contato, ou um CSV do Google / do Outlook.'
  - feature: 'Não suportado'
    value: 'Pastas de trabalho protegidas por senha (tire a senha no Excel antes), arquivos do Apple Numbers, fotos de contato inseridas nas células.'
faq:
  - q: 'Preciso salvar o arquivo do Excel como CSV antes?'
    a: 'Não — e é melhor não salvar. Quando o Excel grava um CSV, ele escreve os números do jeito que aparecem na tela, então um telefone exibido como `5,51191E+12` é salvo sem os últimos dígitos. Ler o .xlsx diretamente mantém todos os dígitos.'
  - q: 'Meus números estão sem o zero ou sem o sinal de mais. Vão funcionar?'
    a: 'Sim. Escolha o país em “Formato do telefone”; um número como `11912345678` com Brasil selecionado vira `+5511912345678`. Números que começam com o código do país sem “+” (`5511912345678`) também são reconhecidos.'
  - q: 'As primeiras linhas da minha planilha são um título e uma linha em branco. Isso é problema?'
    a: 'Não. As linhas acima do cabeçalho de verdade são puladas, e os números de linha do relatório batem com os que o Excel mostra à esquerda.'
  - q: 'Posso converter várias abas ou várias planilhas de uma vez?'
    a: 'Solte vários arquivos juntos e eles viram um só resultado. Dentro de uma mesma pasta de trabalho, converta uma aba, depois troque de aba e baixe de novo.'
  - q: 'Funciona com o Excel do Mac ou com o LibreOffice?'
    a: 'Sim. O conversor lê o arquivo, não o programa: .xlsx do Excel para Mac, do Excel online ou baixado do Planilhas Google e .ods do LibreOffice funcionam.'
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

Arquivos do Excel não são um formato de contatos, então o celular não consegue importá-los. Um arquivo **VCF** (vCard) é importado em qualquer lugar, com um cartão por pessoa. O conversor lê as células da aba, liga as colunas aos campos do vCard e grava um cartão por linha.

**Por que ler a planilha é melhor do que ler um CSV.** Dentro de um .xlsx, o telefone fica guardado como número completo (até 15 dígitos), mesmo que a célula mostre `5,5E+12`. Só quando o Excel *salva um CSV* ele grava o texto exibido, e os dígitos escondidos se perdem. Por isso esta página abre .xlsx e .xls diretamente. Saiba mais em [por que o Excel mostra telefones como 5,5E+12](/pt-br/excel-telefone-notacao-cientifica/).

**O que o Excel faz com os telefones.** Um número digitado numa célula com formato Geral perde o zero inicial (`011912345678` → `11912345678`) e o sinal de mais (`+5521998765432` → `5521998765432`). O conversor não chuta. Ele interpreta cada número com as regras de numeração do país escolhido e confere se o resultado é um número que existe naquele país. Se o número começa com o código de discagem desse país, ele é tratado como internacional. O relatório conta quantos números foram completados assim, e os cartões mostram o resultado antes do download.

**Datas.** Células de aniversário formatadas como data são lidas como data, seja qual for o formato de exibição da planilha. Datas em texto, como `17/05/1990` ou `05/17/1990`, também são lidas; o conversor olha a coluna inteira para decidir se o dia vem antes do mês ou depois.

**Colunas que não são campos de contato** — “Observações”, “Código do cliente”, “Último pedido” — podem ir para a nota ou ser ignoradas. Nada do que você marcar como *ignorar* é exportado.
