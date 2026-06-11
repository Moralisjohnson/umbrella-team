import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-troque-em-producao";

// Middleware de autenticacao: exige um token JWT valido no header
// Authorization: Bearer <token>. Em caso de sucesso, popula req.usuario.
export function autenticar(req, res, next) {
  const header = req.headers.authorization || "";
  const [tipo, token] = header.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ erro: "Token nao fornecido" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ erro: "Token invalido ou expirado" });
  }
}
