# Rodando o Hand 2 Hand no Windows

Guia para subir o projeto inteiro (backend + frontend + banco) em uma maquina
Windows que **ja tem o PostgreSQL instalado**.

O projeto tem duas partes que rodam ao mesmo tempo, em terminais separados:

- **backend/** - API em Node/Express (porta 3001), conecta no PostgreSQL.
- **frontend/** - app React/Vite (porta 5173), consome a API.

> A URL da API esta fixa em `frontend/src/api/client.js` como
> `http://localhost:3001/api`. Por isso o backend precisa ficar mesmo na porta 3001.

---

## 1. Pre-requisitos

- **Node.js LTS** (versao 18 ou superior; recomendado 20 ou 22).
  Baixe em https://nodejs.org e instale. Confira no terminal:
  ```
  node -v
  npm -v
  ```
- **PostgreSQL** ja instalado e o servico rodando (voce disse que ja tem).
  O instalador inclui o **psql** e o **pgAdmin**.

---

## 2. Criar o banco de dados

O backend espera, por padrao, um banco e um usuario chamados `hand2hand`.
Abra o **"SQL Shell (psql)"** (menu Iniciar) e entre como o superusuario
`postgres` (a senha foi definida na instalacao). Depois rode:

```sql
CREATE USER hand2hand WITH PASSWORD 'hand2hand';
CREATE DATABASE hand2hand OWNER hand2hand;
GRANT ALL PRIVILEGES ON DATABASE hand2hand TO hand2hand;
```

> **Alternativa:** se preferir usar o usuario `postgres` que voce ja tem, pule o
> CREATE USER, crie so o banco (`CREATE DATABASE hand2hand;`) e ajuste a
> `DATABASE_URL` no passo 3 para o seu usuario/senha.

---

## 3. Subir o backend

Abra um terminal (PowerShell ou Prompt de Comando) na pasta do projeto:

```powershell
cd backend

REM cria o arquivo de configuracao a partir do exemplo
copy .env.example .env
```

Abra `backend\.env` em um editor e confira/ajuste a linha da conexao. Se voce
criou o usuario `hand2hand` exatamente como no passo 2, ja esta certo:

```
DATABASE_URL=postgresql://hand2hand:hand2hand@localhost:5432/hand2hand
JWT_SECRET=troque_por_qualquer_texto
PORT=3001
```

> Se usou outro usuario/senha (ex.: `postgres`), o formato e:
> `postgresql://USUARIO:SENHA@localhost:5432/hand2hand`

Agora instale as dependencias, crie as tabelas + popule os dados e suba a API:

```powershell
npm install
npm run db:setup
npm run dev
```

- `npm run db:setup` cria todas as tabelas e insere os **18 itens de exemplo**
  (com imagens) e a conta de teste.
- `npm run dev` deixa a API rodando em **http://localhost:3001**
  (mensagem: "Hand 2 Hand API rodando em http://localhost:3001").

**Deixe esse terminal aberto.**

---

## 4. Subir o frontend

Abra **outro** terminal (o backend continua rodando no primeiro):

```powershell
cd frontend
npm install
npm run dev
```

O Vite vai mostrar algo como `Local: http://localhost:5173/`.
Abra esse endereco no navegador.

---

## 5. Entrar no sistema

Use a conta de teste criada pelo seed:

- **E-mail:** admin@hand2hand.com
- **Senha:** admin123

Voce tambem pode criar uma conta nova pela tela de cadastro.

---

## Observacoes

- **Sao dois terminais ao mesmo tempo:** um para o backend (`backend`,
  `npm run dev`) e outro para o frontend (`frontend`, `npm run dev`).
- **Imagens dos itens:** sao URLs do Unsplash, entao a maquina precisa de
  **internet** para exibir as fotos do catalogo.
- **Repopular o banco:** rodar `npm run db:setup` de novo apaga os itens e
  avaliacoes e reinsere os dados de exemplo (TRUNCATE). Reservas e contas de
  usuarios criadas a parte tambem podem ser afetadas pelo CASCADE - rode so
  quando quiser "zerar" o catalogo.
- **Telas extras (apresentacao/desenho):** com o frontend rodando, da para abrir
  `http://localhost:5173/pitch.html` (pitch) e `http://localhost:5173/armarios.html`
  (desenho do armario).

---

## Erros comuns

| Sintoma | Causa provavel | Solucao |
|---|---|---|
| `ECONNREFUSED ::1:5432` no backend | PostgreSQL nao esta rodando ou porta errada | Inicie o servico do PostgreSQL (services.msc) e confira a porta na `DATABASE_URL` |
| `password authentication failed` | usuario/senha da `DATABASE_URL` errados | Ajuste a `DATABASE_URL` no `.env` |
| `database "hand2hand" does not exist` | banco nao foi criado | Refaca o passo 2 |
| Front abre mas nao carrega itens | backend nao esta rodando na 3001 | Confira o terminal do backend |
| Itens aparecem sem foto | sem internet | conecte a internet (imagens vem do Unsplash) |
