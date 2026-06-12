# Hand 2 Hand - API (backend)

API REST do **Hand 2 Hand**, o marketplace de aluguel ponto a ponto. Atende o front-end
React (Vite) que consome os dados de itens, autenticacao, reservas, avaliacoes, chat e conta.

> Construido em partes. Ja entrega: setup do servidor, endpoints de **itens** e
> persistencia em **PostgreSQL**. Proximas partes: avaliacoes, autenticacao, reservas, chat, conta.

## Stack

- **Node.js + Express** (ESM)
- **PostgreSQL** via `pg` (node-postgres), SQL explicito (sem ORM)
- **dotenv** para variaveis de ambiente
- **CORS** liberado para o front (Vite em `http://localhost:5173`)

## Pre-requisitos

- Node.js 20+
- PostgreSQL 14+ rodando, com um banco criado (ex.: `hand2hand`)

## Como rodar

```bash
npm install                  # express, cors, pg, dotenv

cp .env.example .env         # ajuste DATABASE_URL com seu usuario/senha/banco
npm run db:setup             # cria as tabelas e popula com os itens de exemplo

npm run dev                  # sobe a API em http://localhost:3001 (auto-reload)
# ou
npm start
```

Teste rapido:

```bash
curl http://localhost:3001/            # healthcheck
curl http://localhost:3001/api/itens   # lista de itens (do banco)
```

## Conta de teste

O `npm run db:setup` cria uma conta fixa para testes (apenas para desenvolvimento):

| E-mail | Senha |
|---|---|
| `admin@hand2hand.com` | `admin123` |

## Endpoints

| Metodo | Rota | Descricao |
|---|---|---|
| GET | `/` | Healthcheck |
| GET | `/api/itens` | Lista itens (filtros: `?busca=`, `?categoria=`, `?ordenar=menor-preco\|maior-preco\|melhor-nota`) |
| GET | `/api/itens/:id` | Detalhe de um item (inclui `avaliacoesLista`) |
| POST | `/api/itens` | Cria um item (anuncio) |
| GET | `/api/itens/:id/avaliacoes` | Lista as avaliacoes do item |
| POST | `/api/itens/:id/avaliacoes` | Cria avaliacao e recalcula a nota do item |
| POST | `/api/auth/register` | Cria conta (retorna token JWT) |
| POST | `/api/auth/login` | Autentica (retorna token JWT) |
| POST | `/api/auth/forgot-password` | Solicita recuperacao de senha |
| POST | `/api/reservas` | Cria reserva e gera a chave do locker (requer token JWT) |
| GET | `/api/reservas` | Lista as reservas do usuario logado (requer token JWT) |
| GET | `/api/chat/:itemId` | Lista mensagens da conversa do item (requer token JWT) |
| POST | `/api/chat/:itemId` | Envia mensagem e gera resposta mock do locador (requer token JWT) |
| GET | `/api/conta/perfil` | Dados do usuario logado (requer token JWT) |
| GET | `/api/conta/alugueis` | Reservas do usuario logado (requer token JWT) |
| GET | `/api/conta/anuncios` | Itens anunciados pelo usuario logado (requer token JWT) |

> Rotas protegidas exigem o header `Authorization: Bearer <token>` (token obtido no login/register).

## Estrutura

```
backend/
├── package.json
├── .env.example          # PORT, DATABASE_URL, JWT_SECRET
├── src/
│   ├── server.js         # ponto de entrada (carrega .env, sobe o servidor)
│   ├── app.js            # Express: middlewares + monta /api
│   ├── db/
│   │   ├── pool.js       # pool de conexoes pg + helper query()
│   │   ├── schema.sql    # CREATE TABLE (itens, avaliacoes, usuarios, reservas)
│   │   └── seed.js       # cria schema e popula (npm run db:setup)
│   ├── data/
│   │   └── store.js      # dados de exemplo usados pelo seed
│   ├── routes/
│   │   ├── index.js      # agregador de rotas
│   │   ├── itens.routes.js
│   │   ├── auth.routes.js
│   │   └── reservas.routes.js
│   ├── controllers/
│   │   ├── itens.controller.js
│   │   ├── avaliacoes.controller.js
│   │   ├── auth.controller.js
│   │   └── reservas.controller.js
│   └── middleware/
│       ├── errorHandler.js
│       └── auth.js       # exige token JWT (rotas protegidas)
```

## Variaveis de ambiente

| Variavel | Padrao | Descricao |
|---|---|---|
| `PORT` | `3001` | Porta da API |
| `DATABASE_URL` | - | Conexao do PostgreSQL: `postgresql://user:senha@host:5432/banco` |
| `JWT_SECRET` | - | Segredo para assinar os tokens JWT |
