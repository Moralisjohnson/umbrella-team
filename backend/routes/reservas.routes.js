import { Router } from "express";
import { autenticar } from "../middleware/auth.js";
import {
  criarReserva,
  listarReservas,
} from "../controllers/reservas.controller.js";

const router = Router();

// Ambas as rotas exigem usuario autenticado (token JWT).
router.post("/", autenticar, criarReserva); // POST /api/reservas
router.get("/", autenticar, listarReservas); // GET  /api/reservas

export default router;
