import pg from "pg";

const { Pool } = pg;

// Pool de conexoes com o PostgreSQL. A connection string vem do .env (DATABASE_URL).
// O Pool nao conecta de imediato: a conexao acontece na primeira query.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper para executar queries parametrizadas: query("SELECT ... WHERE id = $1", [id]).
export function query(text, params) {
  return pool.query(text, params);
}
