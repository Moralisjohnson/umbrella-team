import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";

// Formato básico de e-mail: algo@algo.algo (sem espaços).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erroLogin, setErroLogin] = useState("");

  // Validação só acontece depois que o usuário clica em "Entrar".
  // Ao digitar, os valores mudam e o estilo vermelho some automaticamente.
  const emailVazio = tentouEnviar && email.trim() === "";
  const emailFormatoInvalido =
    tentouEnviar && email.trim() !== "" && !EMAIL_REGEX.test(email.trim());
  const emailInvalido = emailVazio || emailFormatoInvalido;
  const senhaInvalida = tentouEnviar && senha.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTentouEnviar(true);
    setErroLogin("");

    // Não prossegue com campos vazios ou e-mail em formato inválido.
    if (
      email.trim() === "" ||
      senha.trim() === "" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return;
    }

    // Simulação de chamada à API (substituir pela autenticação real depois).
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);

      // MOCK: enquanto não há backend, só estas credenciais "passam".
      const credenciaisOk =
        email.trim() === "user@hand2hand.com" && senha === "123456";

      if (credenciaisOk) {
        console.log("Login bem-sucedido:", { email });
        // TODO: guardar token e redirecionar o usuário.
      } else {
        setErroLogin("E-mail ou senha incorretos.");
      }
    }, 1200);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center font-sans text-dark"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <style>{`
        .text-aqua { color: #2c7a7b !important; }
        .text-aqua-light { color: #38b2ac !important; }
        .bg-aqua-light { background-color: #e6fffa !important; }
        .bg-aqua { background-color: #38b2ac !important; color: white; }

        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }

        .btn-outline-aqua { border: 2px solid #38b2ac; color: #38b2ac; background-color: white; }
        .btn-outline-aqua:hover { background-color: #e6fffa; color: #2c7a7b; }

        .login-card { width: 100%; max-width: 420px; }
      `}</style>

      <div className="login-card px-3">
        {/* Marca */}
        <div className="text-center mb-4">
          <Link to="/" className="fs-3 fw-bold text-aqua text-decoration-none">
            Hand 2 Hand
          </Link>
          <p className="text-muted small mt-1 mb-0">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Cartão do formulário */}
        <div className="card border-0 shadow-sm rounded-0 bg-white p-4">
          <h1 className="h4 fw-bold text-dark mb-4 text-center">Entrar</h1>

          {erroLogin && (
            <div
              className="alert alert-danger rounded-0 py-2 small"
              role="alert"
            >
              {erroLogin}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* E-mail */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label small fw-bold text-secondary"
              >
                E-MAIL
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white rounded-0 text-muted">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`form-control rounded-0 shadow-none ${
                    emailInvalido ? "is-invalid" : ""
                  }`}
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={emailInvalido}
                  aria-describedby={emailInvalido ? "email-erro" : undefined}
                />
              </div>
              {emailInvalido && (
                <div className="text-danger small mt-1" id="email-erro">
                  {emailVazio
                    ? "Informe o seu e-mail."
                    : "Formato de e-mail inválido."}
                </div>
              )}
            </div>

            {/* Senha */}
            <div className="mb-2">
              <label
                htmlFor="senha"
                className="form-label small fw-bold text-secondary"
              >
                SENHA
              </label>
              <div className="input-group">
                <span
                  className={`input-group-text bg-white rounded-0 ${
                    senhaInvalida ? "text-danger border-danger" : "text-muted"
                  }`}
                >
                  <Lock size={16} />
                </span>
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="current-password"
                  className={`form-control rounded-0 shadow-none border-end-0 ${
                    senhaInvalida ? "is-invalid" : ""
                  }`}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  aria-invalid={senhaInvalida}
                  aria-describedby={senhaInvalida ? "senha-erro" : undefined}
                />
                <button
                  type="button"
                  className="btn btn-light rounded-0 border d-flex align-items-center"
                  onClick={() => setMostrarSenha((v) => !v)}
                  title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {senhaInvalida && (
                <div className="text-danger small mt-1" id="senha-erro">
                  Informe a sua senha.
                </div>
              )}
            </div>

            {/* Esqueci a senha */}
            <div className="text-end mb-4">
              <a
                href="#"
                className="small text-aqua text-decoration-none fw-medium"
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Botão principal */}
            <button
              type="submit"
              disabled={carregando}
              className="btn btn-aqua btn-lg w-100 rounded-0 fw-semibold d-flex align-items-center justify-content-center gap-2"
            >
              {carregando ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Entrar
                </>
              )}
            </button>
          </form>
        </div>

        {/* Rodapé do cartão */}
        <p className="text-center text-secondary small mt-4 mb-0">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-aqua fw-semibold text-decoration-none">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
