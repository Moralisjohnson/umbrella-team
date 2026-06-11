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
