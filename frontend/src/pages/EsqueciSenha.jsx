import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { api } from "../api/client";

// Formato basico de e-mail: algo@algo.algo (sem espacos).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const emailVazio = tentouEnviar && email.trim() === "";
  const emailFormatoInvalido =
    tentouEnviar && email.trim() !== "" && !EMAIL_REGEX.test(email.trim());
  const emailInvalido = emailVazio || emailFormatoInvalido;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTentouEnviar(true);

    if (email.trim() === "" || !EMAIL_REGEX.test(email.trim())) {
      return;
    }

    setCarregando(true);
    try {
      // O backend responde de forma generica (200 com message),
      // entao tratamos sucesso simplesmente exibindo o estado "enviado".
      await api("/auth/forgot-password", {
        method: "POST",
        body: { email: email.trim() },
      });
      setEnviado(true);
    } catch (err) {
      // Falha de rede ou erro inesperado: nao quebramos a tela.
      // Mantemos a resposta generica para nao vazar se o e-mail existe.
      console.error("Falha ao solicitar recuperacao de senha:", err);
      setEnviado(true);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center font-sans text-dark"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <style>{`
        .text-aqua { color: #2c7a7b !important; }
        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }
        .recuperar-card { width: 100%; max-width: 420px; }
      `}</style>

      <div className="recuperar-card px-3">
        {/* Marca */}
        <div className="text-center mb-4">
          <Link to="/" className="fs-3 fw-bold text-aqua text-decoration-none">
            Hand 2 Hand
          </Link>
        </div>

        <div className="card border-0 shadow-sm rounded-0 bg-white p-4">
          <h1 className="h4 fw-bold text-dark mb-2 text-center">
            Recuperar senha
          </h1>
          <p className="text-muted small text-center mb-4">
            Informe o e-mail da sua conta e enviaremos um link para redefinir a
            senha.
          </p>

          {enviado ? (
            <div className="text-center">
              <div
                className="alert alert-success rounded-0 py-2 small"
                role="alert"
              >
                Se existe uma conta com esse e-mail, enviamos um link de
                recuperacao.
              </div>
              <Link
                to="/login"
                className="btn btn-aqua w-100 rounded-0 fw-semibold mt-2"
              >
                Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
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
                      : "Formato de e-mail invalido."}
                  </div>
                )}
              </div>

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
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Enviar link de recuperacao
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-4 mb-0">
          <Link
            to="/login"
            className="text-aqua text-decoration-none small d-inline-flex align-items-center gap-1"
          >
            <ArrowLeft size={14} /> Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EsqueciSenha;
