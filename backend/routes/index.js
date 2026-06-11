import { Router } from "express";
import itensRoutes from "./itens.routes.js";
import authRoutes from "./auth.routes.js";
import reservasRoutes from "./reservas.routes.js";

// Agregador das rotas da API. Novos recursos (chat, conta)
// sao montados aqui nas proximas partes.
const router = Router();

router.use("/itens", itensRoutes);
router.use("/auth", authRoutes);
router.use("/reservas", reservasRoutes);

export default router;
