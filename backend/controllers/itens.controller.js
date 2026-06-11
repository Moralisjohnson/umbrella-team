import { query } from "../db/pool.js";

// GET /api/itens?busca=&categoria=&ordenar=
// Filtra por termo (nome) e categoria, e ordena. Espelha a tela de Busca do front.
export async function listarItens(req, res, next) {
  try {
    const { busca = "", categoria = "Todas", ordenar = "relevancia" } = req.query;

    const condicoes = [];
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
    const { titulo, nome, categoria, descricao, preco, local, dono, endereco, locker } =
      req.body;
    const nomeItem = nome || titulo;

    if (!nomeItem || !categoria || preco == null || Number(preco) <= 0) {
      return res.status(400).json({
        erro: "Campos obrigatorios: nome (ou titulo), categoria e preco maior que zero",
      });
    }

    const { rows } = await query(
      `INSERT INTO itens (nome, categoria, descricao, preco, dono, local, endereco, locker)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        nomeItem,
        categoria,
        descricao || "",
        Number(preco),
        dono || "Voce",
        local || "",
        endereco || "",
        locker || "N/A",
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}
