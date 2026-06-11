import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/pool.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-troque-em-producao";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Gera um JWT valido por 7 dias com o id e o email do usuario.
function gerarToken(usuario) {
  return jwt.sign({ sub: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// POST /api/auth/register  { nome, email, senha }
export async function register(req, res, next) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatorios: nome, email, senha" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ erro: "E-mail invalido" });
    }
    if (String(senha).length < 6) {
      return res.status(400).json({ erro: "A senha deve ter ao menos 6 caracteres" });
    }

    const emailNorm = String(email).trim().toLowerCase();
    const existe = await query("SELECT id FROM usuarios WHERE email = $1", [emailNorm]);
    if (existe.rows.length) {
      return res.status(409).json({ erro: "E-mail ja cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const { rows } = await query(
      `INSERT INTO usuarios (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING id, nome, email, criado_em`,
      [nome, emailNorm, senhaHash]
    );
    const usuario = rows[0];

    res.status(201).json({ token: gerarToken(usuario), usuario });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login  { email, senha }
export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatorios: email, senha" });
    }

    const { rows } = await query("SELECT * FROM usuarios WHERE email = $1", [
      String(email).trim().toLowerCase(),
    ]);
    const usuario = rows[0];

    // Mesma resposta para email inexistente ou senha errada (nao revela qual falhou).
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos" });
    }

    res.json({
      token: gerarToken(usuario),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        criado_em: usuario.criado_em,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/forgot-password  { email }
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ erro: "Campo obrigatorio: email" });
    }
    // TODO: gerar token de recuperacao e enviar e-mail.
    // Resposta generica de proposito, para nao revelar se o e-mail existe.
    res.json({
      message: "Se existir uma conta com esse e-mail, enviaremos um link de recuperacao.",
    });
  } catch (err) {
    next(err);
  }
}
