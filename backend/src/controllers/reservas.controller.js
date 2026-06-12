import { randomInt } from "node:crypto";
import { query } from "../db/pool.js";

const TAXA_LOCKER = 5;

// Numero de dias do periodo (inclusivo), igual ao calculo do front.
function calcularDias(retirada, devolucao) {
  const ini = new Date(retirada);
  const fim = new Date(devolucao);
  const diff = Math.ceil(Math.abs(fim - ini) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
}

// POST /api/reservas  (protegido)  { itemId, retirada, devolucao, pagamento }
// Cria a reserva do usuario logado e gera a chave do locker.
export async function criarReserva(req, res, next) {
  try {
    const { itemId, retirada, devolucao, pagamento } = req.body;

    if (!itemId || !retirada || !devolucao || !pagamento) {
      return res.status(400).json({
        erro: "Campos obrigatorios: itemId, retirada, devolucao, pagamento",
      });
    }

    const itemRes = await query("SELECT * FROM itens WHERE id = $1", [itemId]);
    const item = itemRes.rows[0];
    if (!item) {
      return res.status(404).json({ erro: "Item nao encontrado" });
    }

    const dias = calcularDias(retirada, devolucao);
    if (dias <= 0) {
      return res.status(400).json({ erro: "Periodo de reserva invalido" });
    }

    const total = Number(item.preco) * dias + TAXA_LOCKER;
    const chaveLocker = `${item.locker}-${randomInt(1000, 9999)}`;

    const { rows } = await query(
      `INSERT INTO reservas
         (item_id, usuario_id, retirada, devolucao, pagamento, total, taxa, chave_locker)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        itemId,
        req.usuario.id,
        retirada,
        devolucao,
        pagamento,
        total,
        TAXA_LOCKER,
        chaveLocker,
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// GET /api/reservas  (protegido)
// Lista as reservas do usuario logado (com dados do item).
export async function listarReservas(req, res, next) {
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
