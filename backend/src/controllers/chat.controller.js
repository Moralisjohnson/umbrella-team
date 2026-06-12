import { query } from "../db/pool.js";

// GET /api/chat/:itemId  (protegido)
// Lista as mensagens da conversa do item com o usuario logado, em ordem cronologica.
export async function listarMensagens(req, res, next) {
  try {
    const { itemId } = req.params;

    const { rows } = await query(
      `SELECT *
       FROM mensagens
       WHERE item_id = $1 AND usuario_id = $2
       ORDER BY criado_em ASC`,
      [itemId, req.usuario.id]
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// POST /api/chat/:itemId  (protegido)  { texto }
// Envia uma mensagem do usuario e gera uma resposta automatica do locador.
export async function enviarMensagem(req, res, next) {
  try {
    const { itemId } = req.params;
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({ erro: "Texto da mensagem obrigatorio" });
    }

    const itemRes = await query("SELECT * FROM itens WHERE id = $1", [itemId]);
    const item = itemRes.rows[0];
    if (!item) {
      return res.status(404).json({ erro: "Item nao encontrado" });
    }

    const usuarioRes = await query(
      `INSERT INTO mensagens (item_id, usuario_id, de, texto)
       VALUES ($1, $2, 'usuario', $3)
       RETURNING *`,
      [itemId, req.usuario.id, texto.trim()]
    );

    // TODO: resposta automatica mock do locador. Substituir por chat real do dono do item.
    const locadorRes = await query(
      `INSERT INTO mensagens (item_id, usuario_id, de, texto)
       VALUES ($1, $2, 'locador', $3)
       RETURNING *`,
      [itemId, req.usuario.id, "Recebido! Em breve respondo."]
    );

    res.status(201).json([usuarioRes.rows[0], locadorRes.rows[0]]);
  } catch (err) {
    next(err);
  }
}
