# Hand 2 Hand - Monorepo

Marketplace de aluguel ponto a ponto de objetos, com retirada em lockers digitais.
Este repositorio reune o front-end e o back-end do projeto.

## Estrutura

```
project_umbrella/
├── frontend/   # aplicacao React + Vite + Bootstrap (interface do usuario)
└── backend/    # API REST em Node.js + Express (dados, regras de negocio)
```

Cada pasta e um projeto Node independente, com seu proprio `package.json`.

## Como rodar

**Front-end** (interface, porta 5173):
```bash
cd frontend
npm install
npm run dev
```

**Back-end** (API, porta 3001):
```bash
cd backend
npm install
npm run dev
```

Com os dois rodando, o front (`localhost:5173`) consome a API (`localhost:3001`).

## Documentacao

- [`frontend/README.md`](frontend/README.md) - telas, rotas e detalhes do front
- [`backend/README.md`](backend/README.md) - endpoints e estrutura da API
