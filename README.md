# Circuito Tere Verde 

Aplicacao web para divulgacao de trilhas, eventos e informacoes sobre parques da regiao de Teresopolis, com area administrativa para gestao de conteudo.

## Dados dos Integrantes da Equipe


1. Raphael Correia Soares Loera
2. Valdely Da Costa Francisco Junior

## Situacao-Problema Escolhida

Informacoes sobre ecoturismo local (trilhas, eventos e parques) geralmente ficam dispersas e com atualizacoes irregulares, dificultando o planejamento de visitantes e a comunicacao com a comunidade.

O MVP foi proposto para centralizar essas informacoes em uma unica plataforma, com acesso publico para consulta e um painel administrativo para manter o conteudo atualizado.

## Descricão do MVP

O MVP contem:

- Home com listagem de trilhas e eventos.
- Paginas dedicadas para parques (PARNASO, Tres Picos e Montanhas).
- Autenticacao de usuarios (login e cadastro).
- Controle de acesso para area administrativa.
- Painel admin para criar, editar e excluir trilhas e eventos.
- Gestao de usuarios no painel admin (promover/rebaixar admin).
- Rodape com contatos e links sociais.

## Requisitos Atendidos

Consulte o documento de requisitos detalhado em:

- [REQUISITOS_MVP.md](REQUISITOS_MVP.md)

## Como Executar o MVP Localmente

### 1) Pre-requisitos

- Node.js 20+
- npm 10+
- Backend do projeto em execucao (padrao atual da API: `http://localhost:3000`)

### 2) Instalar dependencias

```bash
npm install
```

### 3) Rodar em desenvolvimento

```bash
npm run dev
```

Por padrao, o frontend abre em `http://localhost:5173` (ou outra porta disponivel).

### 4) Gerar build de producao

```bash
npm run build
```

### 5) Visualizar build localmente

```bash
npm run preview
```

## Como Usar o Projeto Remotamente

Existem duas formas principais:

### Opcao A - Consumir um deploy pronto

Se a equipe publicar o frontend em uma plataforma (ex.: Vercel/Netlify), basta acessar a URL publica do projeto:

- Frontend (URL publica): `https://SEU-FRONTEND.exemplo.com`
- Backend/API (URL publica): `https://SUA-API.exemplo.com`

Observacao: o frontend atualmente utiliza endpoints de API fixos em `http://localhost:3000`. Para uso remoto completo, os endpoints devem apontar para uma API publica.

### Opcao B - Rodar frontend local consumindo backend remoto

1. Deixe o backend publicado em uma URL publica.
2. Atualize os endpoints de API no frontend para a URL remota.
3. Execute localmente com `npm run dev`.

## Rotas Principais da Aplicacao

- `/` - Home
- `/parnaso` - Pagina do PARNASO
- `/tres-picos` - Pagina do Parque Estadual dos Tres Picos
- `/parque-montanhas` - Pagina do Parque Montanhas
- `/login` - Login
- `/register` - Cadastro
- `/admin` - Painel administrativo (somente admin)

## Informacoes Adicionais Relevantes

- Stack: React 19 + TypeScript + Vite + Tailwind CSS.
- Roteamento: `react-router`.
- Scripts disponiveis:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
  - `npm run lint`
- Sessao de autenticacao salva localmente em `localStorage` com a chave `adminAccess`.

## Estado do Projeto

MVP em evolucao incremental, com foco em:

- experiencia do usuario na consulta de trilhas/eventos;
- robustez das operacoes administrativas;
- padronizacao de requisitos e documentacao.
