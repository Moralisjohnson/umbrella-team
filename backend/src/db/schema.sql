-- Esquema do banco do Hand 2 Hand (PostgreSQL).
-- Executado pelo seed (npm run db:setup). Use IF NOT EXISTS para ser idempotente.

CREATE TABLE IF NOT EXISTS itens (
  id          SERIAL PRIMARY KEY,
  nome        TEXT NOT NULL,
  categoria   TEXT NOT NULL,
  preco       NUMERIC(10, 2) NOT NULL,
  nota        NUMERIC(2, 1) DEFAULT 0,
  avaliacoes  INTEGER DEFAULT 0,
  dono        TEXT,
  local       TEXT,
  endereco    TEXT,
  locker      TEXT,
  descricao   TEXT
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id          SERIAL PRIMARY KEY,
  item_id     INTEGER NOT NULL REFERENCES itens(id) ON DELETE CASCADE,
  autor       TEXT NOT NULL,
  nota        INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario  TEXT,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_avaliacoes_item_id ON avaliacoes (item_id);

CREATE TABLE IF NOT EXISTS usuarios (
  id          SERIAL PRIMARY KEY,
  nome        TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  senha_hash  TEXT NOT NULL,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservas (
  id            SERIAL PRIMARY KEY,
  item_id       INTEGER NOT NULL REFERENCES itens(id) ON DELETE CASCADE,
  usuario_id    INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  retirada      TIMESTAMPTZ NOT NULL,
  devolucao     TIMESTAMPTZ NOT NULL,
  pagamento     TEXT NOT NULL,
  total         NUMERIC(10, 2) NOT NULL,
  taxa          NUMERIC(10, 2) NOT NULL DEFAULT 0,
  chave_locker  TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'confirmada',
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reservas_usuario_id ON reservas (usuario_id);

CREATE TABLE IF NOT EXISTS mensagens (
  id          SERIAL PRIMARY KEY,
  item_id     INTEGER NOT NULL REFERENCES itens(id) ON DELETE CASCADE,
  usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  de          TEXT NOT NULL CHECK (de IN ('usuario', 'locador')),
  texto       TEXT NOT NULL,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mensagens_item_usuario ON mensagens (item_id, usuario_id);
