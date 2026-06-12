# Hand 2 Hand - Monorepo

Um marketplace moderno de aluguel ponto a ponto (peer-to-peer) de objetos, com facilidade de retirada em lockers digitais.
Este repositório é um monorepo que contém tanto a interface de usuário (Front-end) quanto a API de dados e regras de negócio (Back-end).

## Tecnologias Utilizadas
**Front-end**
- **React** (com Vite para build e desenvolvimento rápido)
- **React Router DOM** para roteamento de páginas.
- **Bootstrap 5** para estilização responsiva e componentes de interface.
- **Lucide React** para iconografia.
**Back-end**
- **Node.js**
- **Express** para construção da API RESTful.
- **CORS** para permissão de consumo da API pelo front-end.
- **Dotenv** para gerenciamento de variáveis de ambiente.

## Estrutura
O repositório está dividido em dois projetos independentes, cada um com seu próprio gerenciador de pacotes (package.json):

```
project_umbrella/
├── frontend/   # aplicacao React + Vite + Bootstrap (interface do usuario)
└── backend/    # API REST em Node.js + Express (dados, regras de negocio)
```


## Como executar o projeto localmente
Para rodar o projeto em sua máquina, você precisará iniciar o Front-end e o Back-end em terminais separados. Certifique-se de ter o Node.js instalado.

1. Inicializando o Back-end (API)
A API rodará por padrão na porta 3001.
**Back-end**:
```bash
cd backend
npm install
npm run dev
```
A API estará disponível em: http://localhost:3001

2. Inicializando o Front-end (Interface)
O front-end rodará por padrão na porta 5173 e consumirá a API iniciada no passo anterior.
**Front-end**:
```bash
cd frontend
npm install
npm run dev
```

Acesse a aplicação no navegador através de: http://localhost:5173


## Autenticação e Segurança
Algumas rotas da API (como o envio e leitura de mensagens no Chat) são protegidas por um middleware de autenticação (middleware/auth.js). O front-end deve enviar um Token JWT válido no cabeçalho das requisições para acessar esses recursos.

## Documentacao

- [`frontend/README.md`](frontend/README.md) - telas, rotas e detalhes do front
- [`backend/README.md`](backend/README.md) - endpoints e estrutura da API
