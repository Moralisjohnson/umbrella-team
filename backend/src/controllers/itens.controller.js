import { itens, proximoIdItem } from "../data/store.js";

// GET /api/itens?busca=&categoria=&ordenar=
// Filtra por termo (nome) e categoria, e ordena. Espelha a tela de Busca do front.
export function listarItens(req, res) {
  const { busca = "", categoria = "Todas", ordenar = "relevancia" } = req.query;

  let resultado = itens.filter((i) =>
    i.nome.toLowerCase().includes(String(busca).trim().toLowerCase())
  );

  if (categoria && categoria !== "Todas") {
    resultado = resultado.filter((i) => i.categoria === categoria);
  }

  if (ordenar === "menor-preco") {
    resultado = [...resultado].sort((a, b) => a.preco - b.preco);
  } else if (ordenar === "maior-preco") {
    resultado = [...resultado].sort((a, b) => b.preco - a.preco);
  } else if (ordenar === "melhor-nota") {
    resultado = [...resultado].sort((a, b) => b.nota - a.nota);
  }

  res.json(resultado);
}

// GET /api/itens/:id
export function obterItem(req, res) {
  const item = itens.find((i) => String(i.id) === String(req.params.id));
  if (!item) {
    return res.status(404).json({ erro: "Item nao encontrado" });
  }
  res.json(item);
}

// POST /api/itens  { nome|titulo, categoria, descricao, preco, local, ... }
// Cria um novo anuncio (tela Anunciar do front).
export function criarItem(req, res) {
  const { titulo, nome, categoria, descricao, preco, local } = req.body;
  const nomeItem = nome || titulo;

  if (!nomeItem || !categoria || preco == null || Number(preco) <= 0) {
    return res.status(400).json({
      erro: "Campos obrigatorios: nome (ou titulo), categoria e preco maior que zero",
    });
  }

  const novo = {
    id: proximoIdItem(),
    nome: nomeItem,
    categoria,
    descricao: descricao || "",
    preco: Number(preco),
    nota: 0,
    avaliacoes: 0,
    dono: req.body.dono || "Voce",
    local: local || "",
    endereco: req.body.endereco || "",
    locker: req.body.locker || "N/A",
    avaliacoesLista: [],
  };

  itens.push(novo);
  res.status(201).json(novo);
}
