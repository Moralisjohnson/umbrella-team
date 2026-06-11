# Hand 2 Hand - API (backend)

API REST do **Hand 2 Hand**, o marketplace de aluguel ponto a ponto. Atende o front-end
React (Vite) que consome os dados de itens, autenticacao, reservas, avaliacoes, chat e conta.

> Construido em partes. Esta etapa entrega o **setup base do servidor** (healthcheck);
> as rotas de dominio sao adicionadas nas proximas partes.

## Stack

- **Node.js + Express** (ESM)
- **CORS** liberado para o front (Vite em `http://localhost:5173`)
- **Dados em memoria** (mock) nas primeiras versoes - um banco real entra depois (`// TODO`)

## Como rodar

Pre-requisitos: Node.js 20+.

```bash
npm install        # instala express e cors
npm run dev        # sobe com auto-reload (node --watch) em http://localhost:3001
# ou
npm start          # sobe sem watch
```

Teste rapido:

```bash
curl http://localhost:3001/
# {"nome":"Hand 2 Hand API","status":"ok","versao":"0.1.0"}
```

## Estrutura

```
hand2hand-backend/
├── package.json
├── .env.example          # copie para .env para customizar a PORT
├── src/
│   ├── server.js         # ponto de entrada (sobe o servidor)
│   ├── app.js            # configura o Express (middlewares + rotas)
│   └── middleware/
│       └── errorHandler.js
```

## Variaveis de ambiente

| Variavel | Padrao | Descricao |
|---|---|---|
| `PORT` | `3001` | Porta da API |
