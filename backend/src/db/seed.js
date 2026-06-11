import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { pool } from "./pool.js";
import { itens } from "../data/store.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cria o schema e popula o banco com os itens de exemplo.
// Rode com: npm run db:setup
async function seed() {
  // 1. Cria as tabelas (idempotente).
  const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
  await pool.query(schema);

  // 2. Limpa e reinsere os dados de exemplo.
  await pool.query("TRUNCATE avaliacoes, itens RESTART IDENTITY CASCADE");

  for (const item of itens) {
    const { rows } = await pool.query(
      `INSERT INTO itens (nome, categoria, preco, nota, avaliacoes, dono, local, endereco, locker, descricao)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id`,
      [
        item.nome,
        item.categoria,
        item.preco,
        item.nota,
        item.avaliacoes,
        item.dono,
        item.local,
        item.endereco,
        item.locker,
        item.descricao,
      ]
    );
    const itemId = rows[0].id;

    for (const av of item.avaliacoesLista || []) {
      await pool.query(
        `INSERT INTO avaliacoes (item_id, autor, nota, comentario)
         VALUES ($1, $2, $3, $4)`,
        [itemId, av.autor, av.nota, av.comentario]
      );
    }
  }

  console.log(`Seed concluido: ${itens.length} itens inseridos.`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
