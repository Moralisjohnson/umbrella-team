import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register); //         POST /api/auth/register
router.post("/login", login); //                POST /api/auth/login
router.post("/forgot-password", forgotPassword); // POST /api/auth/forgot-password

export default router;
