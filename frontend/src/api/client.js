// Cliente HTTP da API do Hand 2 Hand.
// Centraliza a URL base, o envio/recebimento de JSON e o token JWT.

// TODO: mover para variavel de ambiente (import.meta.env.VITE_API_URL).
const BASE_URL = "http://localhost:3001/api";

const TOKEN_KEY = "h2h_token";
const USUARIO_KEY = "h2h_usuario";

// --- Sessao (token + usuario) guardada no localStorage ---

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setSessao(token, usuario) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (usuario) localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export function getUsuario() {
  const raw = localStorage.getItem(USUARIO_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function limparSessao() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USUARIO_KEY);
}

export function estaLogado() {
  return Boolean(getToken());
}

// --- Requisicao ---

// api("/itens")                                  -> GET
// api("/auth/login", { method: "POST", body })   -> POST com corpo JSON
// api("/reservas", { method: "POST", body, auth: true }) -> anexa o token
//
// Retorna o JSON da resposta. Em caso de erro (status >= 400), lanca um Error
// com a mensagem vinda do backend (campo "erro").
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const resp = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const dados = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(dados.erro || `Erro ${resp.status}`);
  }
  return dados;
}
