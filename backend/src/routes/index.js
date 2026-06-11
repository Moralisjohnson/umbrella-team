import { Router } from "express";
import itensRoutes from "./itens.routes.js";

// Agregador das rotas da API. Novos recursos (auth, reservas, chat, conta)
// sao montados aqui nas proximas partes.
const router = Router();

router.use("/itens", itensRoutes);

export default router;
