# Dashboard de Vendas — Projeto de Estudo (DNC)

Resumo
-----

Dashboard de Vendas desenvolvido como projeto didático para a escola DNC. A aplicação demonstra conceitos de visualização de métricas, organização de componentes React em TypeScript e fluxo básico de pages e testes. É um projeto voltado para aprendizado e avaliação, não para produção.

Principais recursos
-------------------

- Painel com métricas de vendas (dados mockados).
- Gráficos e tabelas customizados para acompanhamento de KPIs.
- Componentes reutilizáveis e estilizados (Layout, Botões, Inputs, Avatares).
- Páginas demonstrativas: Login, Home, Leads, Perfil e Registro.
- Suíte de testes: testes unitários (Jest) e testes E2E (Cypress).

Stack tecnológico
-----------------

- React 18+
- TypeScript
- Vite (tooling)
- Styled components / solução CSS-in-JS (configuração do projeto)
- Jest, React Testing Library (testes unitários)
- Cypress (testes E2E)

Estrutura do repositório (visão simplificada)
-------------------------------------------

- `src/`
    - `components/` — componentes reutilizáveis
    - `pages/` — rotas/páginas da aplicação
    - `data/` — fixtures / mocks usados para demonstração
    - `services/` — adaptadores ou stubs para chamadas externas
    - `styles/` — tema e estilos globais
    - `types/` — tipos TypeScript compartilhados

Pré-requisitos
--------------

- Node.js 16+ (recomenda-se 18+)
- npm ou Yarn

Instalação e execução
---------------------

Instale dependências:

```bash
npm install
# ou
yarn
```

Executar em desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Gerar build para produção:

```bash
npm run build
# ou
yarn build
```

Testes
------

- Testes unitários:

```bash
npm run test
# ou
yarn test
```

- Testes E2E (modo interativo):

```bash
npx cypress open
```

Dados e ambiente de desenvolvimento
----------------------------------

- A aplicação consome dados mockados presentes em `src/data/`. Para integrar uma API real, substitua os stubs em `src/services/` por chamadas reais e ajuste o CORS/ambiente conforme necessário.

Boas práticas e considerações
-----------------------------

- Este projeto é um artefato de ensino; evite utilizá-lo diretamente em produção sem revisão de segurança, autenticação e tratamento de dados sensíveis.
- Mantenha os testes atualizados ao modificar componentes que impactam comportamento ou layout.

Contribuição
------------

- Sugestões são bem-vindas. Abra uma issue antes de começar alterações significativas.
- Submeta pull requests com descrição clara, screenshots (se aplicável) e instruções de teste.

Manutenção e contato
--------------------

- Repositório: kleber-goncalves/dashboard-de-vendas
- Mantainer: Kleber Gonçalves

Licença
-------

- Consulte o `package.json` para informações sobre licença ou adicione um arquivo `LICENSE` conforme preferir.

