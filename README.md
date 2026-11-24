# Aurora Celebrações — site da agência de casamentos e eventos

Site feito com **React, Vite, HTML5, CSS3 e Bootstrap 5.3**, sem back-end e sem banco de dados.

## Como executar
Instale o Node.js, abra um terminal nesta pasta e rode:

```bash
npm install
npm run dev
```

Abra o endereço local indicado pelo Vite. Para gerar os arquivos de publicação, rode `npm run build`; a versão pronta fica em `dist/`.
Bootstrap, ícones, fontes e fotos continuam sendo carregados pela internet.

## Páginas
| Arquivo | Página |
|---|---|
| index.html | Início (hero, busca de fornecedores, serviços, números, processo, galeria, depoimentos, blog) |
| sobre.html | Sobre a agência (história, missão/visão/valores, trajetória, equipe) |
| servicos.html | Serviços + comparativo |
| servico.html?id=... | Detalhes do serviço (pacotes, FAQ, galeria, relacionados) |
| fornecedores.html | Fornecedores com filtros, busca, ordenação e favoritos |
| portfolio.html | Galeria com filtros e lightbox (setas do teclado e Esc) |
| depoimentos.html | Depoimentos + formulário para publicar o seu |
| blog.html | Blog com destaque, filtros, busca e leitura em modal |
| contato.html | Contato com formulário validado e mapa |
| orcamento.html | Orçamento em 4 etapas com estimativa automática |

## Onde ficam os dados
- Conteúdo (serviços, fornecedores, portfólio, posts, depoimentos): `assets/js/data.js`. Edite ali para trocar textos, preços e fotos.
- Envios dos visitantes ficam no **localStorage** do navegador:
  `aurora_orcamentos`, `aurora_orcamento_rascunho`, `aurora_mensagens`, `aurora_depoimentos`, `aurora_favoritos`, `aurora_newsletter`.
  Os filtros de fornecedores podem ser ajustados em cada visita.
- As telas de serviços, fornecedores, portfólio, depoimentos e blog usam componentes React em `src/main.jsx`.
- O conteúdo dessas telas vem de `assets/js/data.js`, compartilhado com React por `window.AURORA_DATA`.
- Como não há servidor, as mensagens **não chegam a nenhum e-mail**. Para receber os pedidos de verdade sem back-end próprio, dá para ligar os formulários a um serviço como Formspree ou ao WhatsApp.

## Personalização rápida
- Cores e fontes: variáveis no topo de `assets/css/style.css` (`--gold`, `--rose`, `--nude`...).
- Telefone, e-mail, endereço e WhatsApp: busque por `98765-4321` e `auroracelebracoes` nos arquivos.
- Fotos: são do Unsplash (uso livre). Se alguma não carregar, aparece um fundo nude elegante no lugar.

> Nome da agência, equipe, fornecedores, preços e depoimentos são **fictícios**: substitua pelos dados reais antes de publicar.
