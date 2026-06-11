import { Router } from "express";
import {
  listarItens,
  obterItem,
  criarItem,
} from "../controllers/itens.controller.js";

const router = Router();

router.get("/", listarItens); // GET    /api/itens
router.post("/", criarItem); //  POST   /api/itens
router.get("/:id", obterItem); // GET    /api/itens/:id

export default router;
