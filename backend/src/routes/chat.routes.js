import { Router } from "express";
import { autenticar } from "../middleware/auth.js";
import {
  listarMensagens,
  enviarMensagem,
} from "../controllers/chat.controller.js";

const router = Router();

// Ambas as rotas exigem usuario autenticado (token JWT).
router.get("/:itemId", autenticar, listarMensagens); // GET  /api/chat/:itemId
router.post("/:itemId", autenticar, enviarMensagem); // POST /api/chat/:itemId

export default router;
