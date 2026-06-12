import { query } from "../db/pool.js";

// GET /api/conta/perfil  (protegido)
// Dados do perfil do usuario logado.
export async function perfil(req, res, next) {
  try {
    const { rows } = await query(
      "SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1",
      [req.usuario.id]
    );
    const usuario = rows[0];
    if (!usuario) {
      return res.status(404).json({ erro: "Usuario nao encontrado" });
    }
    res.json(usuario);
  } catch (err) {
    next(err);
  }
}

// GET /api/conta/alugueis  (protegido)
// Reservas do usuario logado (com dados do item).
export async function alugueis(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT r.*, i.nome AS item_nome, i.preco AS item_preco, i.local AS item_local
       FROM reservas r
       JOIN itens i ON i.id = r.item_id
       WHERE r.usuario_id = $1
       ORDER BY r.criado_em DESC`,
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/conta/anuncios  (protegido)
// Itens anunciados pelo usuario logado.
export async function anuncios(req, res, next) {
  try {
    // TODO: ligar itens a usuarios via FK (usuario_id) para anuncios reais
    const { rows } = await query(
      `SELECT * FROM itens
       WHERE dono = (SELECT nome FROM usuarios WHERE id = $1)
       ORDER BY id`,
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
