# Requisitos do MVP - Circuito Tere Verde

## 1. Situacao-problema

A cidade e seus visitantes precisam de um canal unico para consultar trilhas e eventos de ecoturismo, com informacoes atualizadas e uma area administrativa para manter esse conteudo organizado. Hoje, as informacoes costumam estar dispersas, desatualizadas ou sem padrao, dificultando o planejamento de visitas e a comunicacao com o publico.

Este MVP resolve esse problema ao centralizar:

- consulta publica de trilhas e eventos;
- paginas informativas dos parques;
- autenticacao de usuarios;
- gestao administrativa de trilhas, eventos e usuarios.

## 2. Escopo do MVP

- Frontend web responsivo (React + TypeScript).
- Integracao com backend HTTP local (porta 3000) para dados de autenticacao e conteudo.
- Foco em operacao inicial com dados de trilhas, eventos e usuarios.

---

## 3. Requisitos Funcionais (RF)

### RF01 - Navegacao publica

O sistema deve permitir navegacao publica entre:

- Home;
- pagina PARNASO;
- pagina Tres Picos;
- pagina Parque Montanhas.

### RF02 - Exibicao de trilhas na Home

O sistema deve listar trilhas na Home, consumindo dados da API.

- Endpoint: `GET /trilhas`.
- Em caso de indisponibilidade da API, deve exibir fallback de conteudo.
- Deve apresentar dados essenciais da trilha (titulo, nivel, distancia, dias e tempo aproximado).

### RF03 - Paginacao de trilhas

O sistema deve paginar a exibicao de trilhas na Home para melhorar a leitura.

- Navegacao entre paginas: anterior/proxima.
- Controle de limites da paginacao.

### RF04 - Exibicao de eventos na Home

O sistema deve exibir eventos em formato de lista na Home.

- Endpoint: `GET /eventos`.
- Deve indicar status do evento (em andamento/encerrado).
- Deve exibir endereco e periodo (inicio/fim).
- Em caso de erro, deve informar ao usuario.

### RF05 - Exibicao de paginas de parques

O sistema deve apresentar paginas dedicadas para cada parque com conteudo institucional:

- descricao;
- biodiversidade;
- informacoes de visita;
- mapa incorporado.

### RF06 - Cadastro de usuario

O sistema deve permitir cadastro de novo usuario.

- Endpoint: `POST /register`.
- Deve validar campos obrigatorios.
- Deve validar confirmacao de senha.
- Deve tratar e informar erros de negocio (ex.: email ja cadastrado).

### RF07 - Login de usuario

O sistema deve permitir login com email e senha.

- Endpoint: `POST /login`.
- Deve tratar respostas de erro (usuario nao encontrado, senha incorreta, erro interno).
- Em sucesso, deve armazenar sessao local e redirecionar conforme perfil.

### RF08 - Controle de acesso ao painel administrativo

O sistema deve restringir acesso a `/admin` para usuarios administradores.

- Sessao armazenada em `localStorage`.
- Usuarios nao autorizados devem ser redirecionados para login.

### RF09 - Gestao de trilhas (admin)

No painel administrativo, o sistema deve permitir:

- criar trilha (`POST /trilhas`);
- editar trilha (`PUT /trilhas/:id`);
- excluir trilha (`DELETE /trilhas/:id`);
- listar trilhas (`GET /trilhas`).

A trilha deve contemplar, no minimo:

- titulo;
- descricao;
- nivel;
- distanciaKm;
- diasDaTrilha;
- tempoAproximado;
- imagem (upload/base64).

### RF10 - Gestao de eventos (admin)

No painel administrativo, o sistema deve permitir:

- criar evento (`POST /eventos`);
- editar evento (`PUT /eventos/:id`);
- excluir evento (`DELETE /eventos/:id`);
- listar eventos (`GET /eventos`).

O evento deve contemplar, no minimo:

- titulo;
- descricao;
- endereco;
- inicioEm;
- fimEm;
- imagem (upload/base64).

### RF11 - Gestao de usuarios (admin)

No painel administrativo, o sistema deve permitir:

- listar usuarios (`GET /usuarios`);
- alterar permissao administrativa (`PUT /usuarios/:id/admin`).

### RF12 - Logout

O sistema deve permitir logout do usuario autenticado.

- Deve limpar sessao local.
- Deve refletir estado de autenticacao na interface.

### RF13 - Rodape com contatos

O sistema deve exibir no rodape:

- titulo de secao de contatos;
- links para canais sociais/contato (ex.: WhatsApp, Instagram, Telegram).

### RF14 - Mensageria de feedback de operacao

O sistema deve exibir mensagens de sucesso/erro em operacoes criticas:

- login;
- cadastro;
- criacao/edicao/exclusao de trilhas e eventos;
- atualizacao de usuarios.

---

## 4. Requisitos Nao-funcionais (RNF)

### RNF01 - Usabilidade

A interface deve ser simples, objetiva e coerente com a identidade visual do projeto.

- Linguagem em portugues (pt-BR).
- Feedback visual claro para erros e sucesso.

### RNF02 - Responsividade

A aplicacao deve funcionar adequadamente em desktop e dispositivos moveis.

- Layout adaptativo para componentes principais (home, auth, admin).

### RNF03 - Desempenho de carregamento

A aplicacao deve carregar paginas principais em tempo aceitavel para uso real.

- Uso de build otimizado para producao.
- Estrategias de fallback para reduzir impacto de indisponibilidade da API.

### RNF04 - Confiabilidade da integracao

A aplicacao deve tratar falhas de comunicacao com backend de forma resiliente.

- Exibicao de mensagens de erro amigaveis.
- Nao interromper toda a navegacao por erro pontual de endpoint.

### RNF05 - Seguranca basica do MVP

A aplicacao deve implementar controles minimos de acesso por perfil.

- Rota administrativa protegida no frontend.
- Sessao local com dados de usuario autenticado.

### RNF06 - Manutenibilidade

O codigo deve ser organizado por componentes/paginas e tipado em TypeScript.

- Separacao de responsabilidades entre rotas, componentes e dados.
- Facil extensao de funcionalidades futuras.

### RNF07 - Compatibilidade

A aplicacao deve funcionar em navegadores modernos com suporte a ES modules.

### RNF08 - Padrao visual consistente

As telas de Home, autenticacao e administracao devem manter padrao visual consistente de tema, espacos e componentes.

### RNF09 - Auditabilidade funcional minima

A aplicacao deve permitir rastrear operacoes-chave por meio do comportamento da interface e respostas HTTP (mensagens e status), facilitando testes de validacao do MVP.

### RNF10 - Implantacao simplificada

O frontend deve ser executavel com comandos padrao de desenvolvimento e build:

- `npm run dev`
- `npm run build`

---

## 5. Criterios de aceite resumidos

- Usuario visitante consegue navegar entre Home e parques sem autenticacao.
- Trilhas e eventos sao exibidos corretamente com dados da API ou fallback quando aplicavel.
- Usuario consegue cadastrar conta e fazer login.
- Somente admin acessa `/admin`.
- Admin consegue criar, editar e excluir trilhas e eventos.
- Admin consegue visualizar usuarios e promover/rebaixar permissao admin.
- Rodape exibe secao de contatos com links funcionais.
- Aplicacao compila com sucesso em build de producao.
