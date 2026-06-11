import { query } from "../db/pool.js";

// GET /api/itens/:id/avaliacoes
// Lista as avaliacoes de um item, mais recentes primeiro.
export async function listarAvaliacoes(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT id, autor, nota, comentario, criado_em
       FROM avaliacoes
       WHERE item_id = $1
       ORDER BY criado_em DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// POST /api/itens/:id/avaliacoes  { autor, nota, comentario }
// Cria uma avaliacao e recalcula a nota media e a contagem do item.
export async function criarAvaliacao(req, res, next) {
  const itemId = req.params.id;
  const { autor, nota, comentario } = req.body;

  if (!autor || !comentario || nota == null) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatorios: autor, nota e comentario" });
  }
  const notaNum = Number(nota);
  if (!Number.isInteger(notaNum) || notaNum < 1 || notaNum > 5) {
    return res.status(400).json({ erro: "nota deve ser um inteiro de 1 a 5" });
  }

  try {
    // Garante que o item existe antes de avaliar.
    const item = await query("SELECT id FROM itens WHERE id = $1", [itemId]);
    if (!item.rows.length) {
      return res.status(404).json({ erro: "Item nao encontrado" });
    }

    const inserida = await query(
      `INSERT INTO avaliacoes (item_id, autor, nota, comentario)
       VALUES ($1, $2, $3, $4)
       RETURNING id, autor, nota, comentario, criado_em`,
      [itemId, autor, notaNum, comentario]
    );

    // Recalcula nota media (1 casa) e total de avaliacoes do item.
    await query(
      `UPDATE itens SET
         nota = ROUND((SELECT AVG(nota) FROM avaliacoes WHERE item_id = $1)::numeric, 1),
         avaliacoes = (SELECT COUNT(*) FROM avaliacoes WHERE item_id = $1)
       WHERE id = $1`,
      [itemId]
    );

    res.status(201).json(inserida.rows[0]);
  } catch (err) {
    next(err);
  }
}
