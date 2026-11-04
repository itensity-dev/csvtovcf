---
url: privacidade
title: 'Privacidade — csvtovcf'
h1: 'Privacidade'
description: 'Seus contatos são processados no seu aparelho e nunca enviados. O que o csvtovcf guarda, quais registros existem e quais serviços de terceiros são usados e por quê.'
lead: 'Resumo: seus arquivos nunca saem do seu aparelho. O site não tem cadastro, não usa cookies de rastreamento e não vê os nomes, números ou cabeçalhos de coluna que você converte.'
nav: 'Privacidade'
summary: 'O que é processado onde, o que fica registrado, quais serviços são usados.'
updated: 2026-11-04
---

## Seus arquivos

- Os arquivos que você solta, escolhe ou cola são lidos pelo seu navegador e processados num **Web Worker no seu aparelho**. Eles não são enviados, não são guardados em servidor e não são compartilhados com ninguém.
- Você pode conferir: abra as ferramentas do desenvolvedor do navegador, vá à aba Rede (Network) e converta um arquivo. Enquanto o conversor trabalha, ele só carrega o próprio código a partir de csvtovcf.com (o leitor de planilhas é baixado na primeira vez que você abre um arquivo do Excel). Nenhuma requisição contém os seus dados.
- A Content-Security-Policy do site limita as conexões de rede ao próprio csvtovcf.com. Se as estatísticas de acesso estiverem ligadas, ela também permite o contador anônimo descrito abaixo. Os scripts de estatística nunca recebem dados do conversor.
- Quando você fecha ou recarrega a aba, os dados somem. Nada é gravado no armazenamento do navegador.

## O que o servidor vê

O servidor entrega as páginas e mantém um registro de acesso padrão: endereço IP, horário, página pedida, tipo de navegador e página de origem. Esse registro serve para manter o serviço funcionando e impedir abusos. Ele é guardado por no máximo 14 dias e não é cruzado com outros dados. Ele nunca contém os seus arquivos, porque eles nunca são enviados.

## Armazenamento no navegador

- `localStorage`: o tema de cores que você escolheu (claro, escuro ou automático), se você mudou.
- `sessionStorage`: se você fechou o aviso “esta página está disponível no seu idioma”.
- Um service worker guarda em cache os arquivos do próprio site, para o conversor funcionar off-line. Ele nunca guarda os seus arquivos nem os resultados.

O csvtovcf não define nenhum cookie próprio.

## Estatísticas de acesso

Por padrão, o site funciona **sem estatísticas de acesso**. Se elas forem ligadas, usamos o Plausible Analytics: sem cookies, sem dados pessoais, e os endereços IP não são guardados. Só são contadas as visualizações de página e um evento anônimo por conversão. O evento registra a versão do vCard, o formato de saída, o tipo de origem detectado (por exemplo “CSV do Google”) e o número de contatos como uma faixa (como “11–100”). Nomes, números, endereços, nomes de arquivos e cabeçalhos de coluna nunca são enviados.

## Publicidade

A publicidade está **desligada** no momento. Se for ligada, os anúncios aparecem só fora do conversor. No Espaço Econômico Europeu, no Reino Unido e na Suíça, a janela de consentimento certificada do Google pede a sua escolha antes de usar qualquer cookie de anúncio. Os scripts de anúncio não conseguem ler os seus dados de contato, porque eles ficam no Web Worker e não na página. Esta página vai informar o provedor de anúncios antes de os anúncios entrarem no ar.

## Links para outros sites

Os guias têm links para páginas de ajuda da Apple, do Google e da Microsoft, e o rodapé tem links para outras ferramentas do mesmo autor. Esses sites têm as suas próprias políticas de privacidade.

## Seus direitos e contato

Como não coletamos dados pessoais pelo conversor, não há nada para consultar, exportar ou apagar. Para dúvidas sobre os registros do servidor ou sobre qualquer coisa nesta página, escreva para **hello@csvtovcf.com**. Você também tem o direito de reclamar à autoridade de proteção de dados (no Brasil, a ANPD).
