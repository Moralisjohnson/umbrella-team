import { Router } from "express";
import {
  listarItens,
  obterItem,
  criarItem,
} from "../controllers/itens.controller.js";
import {
  listarAvaliacoes,
  criarAvaliacao,
} from "../controllers/avaliacoes.controller.js";
import { autenticar } from "../middleware/auth.js";

const router = Router();

router.get("/", listarItens); // GET    /api/itens
router.post("/", autenticar, criarItem); //  POST   /api/itens  (protegido)
router.get("/:id", obterItem); // GET    /api/itens/:id

// Avaliacoes aninhadas no item.
router.get("/:id/avaliacoes", listarAvaliacoes); // GET  /api/itens/:id/avaliacoes
router.post("/:id/avaliacoes", criarAvaliacao); // POST  /api/itens/:id/avaliacoes

export default router;
