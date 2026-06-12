import { query } from "../db/pool.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

// PUT /api/conta/perfil  (protegido)
// Atualiza nome e e-mail do usuario logado.
export async function atualizarPerfil(req, res, next) {
  try {
    const { nome, email } = req.body;
    if (!nome || !nome.trim()) {
      return res.status(400).json({ erro: "Informe o nome" });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ erro: "E-mail invalido" });
    }
    const emailNorm = email.trim().toLowerCase();

    // E-mail deve ser unico (exceto o do proprio usuario).
    const existe = await query(
      "SELECT id FROM usuarios WHERE email = $1 AND id <> $2",
      [emailNorm, req.usuario.id]
    );
    if (existe.rows.length) {
      return res.status(409).json({ erro: "E-mail ja cadastrado" });
    }

    const { rows } = await query(
      `UPDATE usuarios SET nome = $1, email = $2
       WHERE id = $3
       RETURNING id, nome, email, criado_em`,
      [nome.trim(), emailNorm, req.usuario.id]
    );
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/conta  (protegido)
// Exclui a conta do usuario logado e seus anuncios.
// Reservas e mensagens do usuario caem por cascata (FK ON DELETE CASCADE).
export async function removerConta(req, res, next) {
  try {
    await query("DELETE FROM itens WHERE usuario_id = $1", [req.usuario.id]);
    await query("DELETE FROM usuarios WHERE id = $1", [req.usuario.id]);
    res.status(204).end();
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
    const { rows } = await query(
      "SELECT * FROM itens WHERE usuario_id = $1 ORDER BY id",
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
