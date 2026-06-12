import { Router } from "express";
import itensRoutes from "./itens.routes.js";
import authRoutes from "./auth.routes.js";
import reservasRoutes from "./reservas.routes.js";
import chatRoutes from "./chat.routes.js";

// Agregador das rotas da API. Novos recursos (conta)
// sao montados aqui na proxima parte.
const router = Router();

router.use("/itens", itensRoutes);
router.use("/auth", authRoutes);
router.use("/reservas", reservasRoutes);
router.use("/chat", chatRoutes);

export default router;
