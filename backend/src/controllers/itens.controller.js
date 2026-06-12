import { query } from "../db/pool.js";

// GET /api/itens?busca=&categoria=&ordenar=
// Filtra por termo (nome) e categoria, e ordena. Espelha a tela de Busca do front.
export async function listarItens(req, res, next) {
  try {
    const { busca = "", categoria = "Todas", ordenar = "relevancia" } = req.query;

    // So lista anuncios ativos (pausados ficam fora das listagens publicas).
    const condicoes = ["ativo = true"];
    const params = [];

    if (String(busca).trim()) {
      params.push(`%${String(busca).trim().toLowerCase()}%`);
      condicoes.push(`LOWER(nome) LIKE $${params.length}`);
    }
    if (categoria && categoria !== "Todas") {
      params.push(categoria);
      condicoes.push(`categoria = $${params.length}`);
    }

    let sql = "SELECT * FROM itens";
    if (condicoes.length) sql += " WHERE " + condicoes.join(" AND ");

    if (ordenar === "menor-preco") sql += " ORDER BY preco ASC";
    else if (ordenar === "maior-preco") sql += " ORDER BY preco DESC";
    else if (ordenar === "melhor-nota") sql += " ORDER BY nota DESC";
    else sql += " ORDER BY id ASC";

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/itens/:id
export async function obterItem(req, res, next) {
  try {
    const { rows } = await query("SELECT * FROM itens WHERE id = $1", [
      req.params.id,
    ]);
    if (!rows.length) {
      return res.status(404).json({ erro: "Item nao encontrado" });
    }
    const item = rows[0];

    // Embute as avaliacoes do item (formato esperado pelo front: avaliacoesLista).
    const av = await query(
      "SELECT autor, nota, comentario FROM avaliacoes WHERE item_id = $1 ORDER BY criado_em DESC",
      [item.id]
    );
    item.avaliacoesLista = av.rows;

    res.json(item);
  } catch (err) {
    next(err);
  }
}

// POST /api/itens  { nome|titulo, categoria, descricao, preco, local, ... }
// Cria um novo anuncio (tela Anunciar do front).
export async function criarItem(req, res, next) {
  try {
    const { titulo, nome, categoria, descricao, preco, local, endereco, locker, imagem } =
      req.body;
    const nomeItem = nome || titulo;

    if (!nomeItem || !categoria || preco == null || Number(preco) <= 0) {
      return res.status(400).json({
        erro: "Campos obrigatorios: nome (ou titulo), categoria e preco maior que zero",
      });
    }

    // Rota protegida: req.usuario existe. Usa o nome do usuario logado como dono.
    const u = await query("SELECT nome FROM usuarios WHERE id = $1", [
      req.usuario.id,
    ]);
    const dono = u.rows[0].nome;

    const { rows } = await query(
      `INSERT INTO itens (nome, categoria, descricao, preco, dono, local, endereco, locker, usuario_id, imagem)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        nomeItem,
        categoria,
        descricao || "",
        Number(preco),
        dono,
        local || "",
        endereco || "",
        locker || "N/A",
        req.usuario.id,
        imagem || null,
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/itens/:id  (protegido)
// Edita os campos enviados e/ou pausa/reativa (ativo). So o dono pode alterar.
export async function atualizarItem(req, res, next) {
  try {
    const dono = await query("SELECT usuario_id FROM itens WHERE id = $1", [
      req.params.id,
    ]);
    if (!dono.rows.length) {
      return res.status(404).json({ erro: "Item nao encontrado" });
    }
    if (dono.rows[0].usuario_id !== req.usuario.id) {
      return res.status(403).json({ erro: "Voce nao e o dono deste anuncio" });
    }

    // Monta o SET dinamico so com os campos enviados (lista fixa = sem injecao).
    const permitidos = ["nome", "categoria", "descricao", "local", "imagem", "preco", "ativo"];
    const sets = [];
    const params = [];

    for (const campo of permitidos) {
      if (req.body[campo] === undefined) continue;
      let valor = req.body[campo];
      if (campo === "preco") {
        valor = Number(valor);
        if (!(valor > 0)) {
          return res.status(400).json({ erro: "Preco deve ser maior que zero" });
        }
      }
      if (campo === "ativo" && typeof valor !== "boolean") {
        return res.status(400).json({ erro: "Campo 'ativo' deve ser boolean" });
      }
      params.push(valor);
      sets.push(`${campo} = $${params.length}`);
    }

    if (!sets.length) {
      return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    params.push(req.params.id);
    const { rows } = await query(
      `UPDATE itens SET ${sets.join(", ")} WHERE id = $${params.length} RETURNING *`,
      params
    );
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/itens/:id  (protegido)
// Remove o anuncio (so o dono). Cascata em reservas/avaliacoes/mensagens do item.
export async function removerItem(req, res, next) {
  try {
    const dono = await query("SELECT usuario_id FROM itens WHERE id = $1", [
      req.params.id,
    ]);
    if (!dono.rows.length) {
      return res.status(404).json({ erro: "Item nao encontrado" });
    }
    if (dono.rows[0].usuario_id !== req.usuario.id) {
      return res.status(403).json({ erro: "Voce nao e o dono deste anuncio" });
    }
    await query("DELETE FROM itens WHERE id = $1", [req.params.id]);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
