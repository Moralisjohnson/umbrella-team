import { Router } from "express";
import itensRoutes from "./itens.routes.js";
import authRoutes from "./auth.routes.js";
import reservasRoutes from "./reservas.routes.js";
import chatRoutes from "./chat.routes.js";
import contaRoutes from "./conta.routes.js";

// Agregador das rotas da API.
const router = Router();

router.use("/itens", itensRoutes);
router.use("/auth", authRoutes);
router.use("/reservas", reservasRoutes);
router.use("/chat", chatRoutes);
router.use("/conta", contaRoutes);

export default router;
