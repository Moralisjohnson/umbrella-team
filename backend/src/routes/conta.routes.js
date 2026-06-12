import { Router } from "express";
import { autenticar } from "../middleware/auth.js";
import {
  perfil,
  alugueis,
  anuncios,
} from "../controllers/conta.controller.js";

const router = Router();

// Todas as rotas exigem usuario autenticado (token JWT).
router.get("/perfil", autenticar, perfil); // GET /api/conta/perfil
router.get("/alugueis", autenticar, alugueis); // GET /api/conta/alugueis
router.get("/anuncios", autenticar, anuncios); // GET /api/conta/anuncios

export default router;
