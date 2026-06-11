import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from "lucide-react";

// Formato básico de e-mail: algo@algo.algo (sem espaços).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_MIN = 6;

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Validação só aparece depois do primeiro clique em "Criar conta".
  const nomeInvalido = tentouEnviar && nome.trim() === "";

  const emailVazio = tentouEnviar && email.trim() === "";
  const emailFormatoInvalido =
    tentouEnviar && email.trim() !== "" && !EMAIL_REGEX.test(email.trim());
  const emailInvalido = emailVazio || emailFormatoInvalido;

  const senhaVazia = tentouEnviar && senha === "";
  const senhaCurta = tentouEnviar && senha !== "" && senha.length < SENHA_MIN;
  const senhaInvalida = senhaVazia || senhaCurta;

  const confirmacaoInvalida =
    tentouEnviar && confirmarSenha !== "" && confirmarSenha !== senha;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTentouEnviar(true);

    // Não prossegue se houver qualquer problema de validação.
    if (
      nome.trim() === "" ||
      email.trim() === "" ||
      !EMAIL_REGEX.test(email.trim()) ||
      senha.length < SENHA_MIN ||
      confirmarSenha !== senha
    ) {
      return;
    }

    // Simulação de chamada à API (substituir pelo cadastro real depois).
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      console.log("Cadastro realizado:", { nome, email });
      // TODO: criar a conta no backend e redirecionar/logar o usuário.
    }, 1200);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center font-sans text-dark py-5"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <style>{`
        .text-aqua { color: #2c7a7b !important; }
        .bg-aqua { background-color: #38b2ac !important; color: white; }
        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }
        .signup-card { width: 100%; max-width: 440px; }
      `}</style>

      <div className="signup-card px-3">
        {/* Marca */}
        <div className="text-center mb-4">
          <Link to="/" className="fs-3 fw-bold text-aqua text-decoration-none">
            Hand 2 Hand
          </Link>
          <p className="text-muted small mt-1 mb-0">
            Crie sua conta para começar
          </p>
        </div>

        {/* Cartão do formulário */}
        <div className="card border-0 shadow-sm rounded-0 bg-white p-4">
          <h1 className="h4 fw-bold text-dark mb-4 text-center">Criar conta</h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div className="mb-3">
              <label
                htmlFor="nome"
                className="form-label small fw-bold text-secondary"
              >
                NOME COMPLETO
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white rounded-0 text-muted">
                  <User size={16} />
                </span>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  className={`form-control rounded-0 shadow-none ${
                    nomeInvalido ? "is-invalid" : ""
                  }`}
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  aria-invalid={nomeInvalido}
                  aria-describedby={nomeInvalido ? "nome-erro" : undefined}
                />
              </div>
              {nomeInvalido && (
                <div className="text-danger small mt-1" id="nome-erro">
                  Informe o seu nome.
                </div>
              )}
            </div>

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
            <div className="mb-3">
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
                  autoComplete="new-password"
                  className={`form-control rounded-0 shadow-none border-end-0 ${
                    senhaInvalida ? "is-invalid" : ""
                  }`}
                  placeholder={`Mínimo de ${SENHA_MIN} caracteres`}
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
                  {senhaVazia
                    ? "Informe uma senha."
                    : `A senha deve ter ao menos ${SENHA_MIN} caracteres.`}
                </div>
              )}
            </div>

            {/* Confirmar senha */}
            <div className="mb-4">
              <label
                htmlFor="confirmarSenha"
                className="form-label small fw-bold text-secondary"
              >
                CONFIRMAR SENHA
              </label>
              <div className="input-group">
                <span
                  className={`input-group-text bg-white rounded-0 ${
                    confirmacaoInvalida
                      ? "text-danger border-danger"
                      : "text-muted"
                  }`}
                >
                  <Lock size={16} />
                </span>
                <input
                  id="confirmarSenha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="new-password"
                  className={`form-control rounded-0 shadow-none ${
                    confirmacaoInvalida ? "is-invalid" : ""
                  }`}
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  aria-invalid={confirmacaoInvalida}
                  aria-describedby={
                    confirmacaoInvalida ? "confirmar-erro" : undefined
                  }
                />
              </div>
              {confirmacaoInvalida && (
                <div className="text-danger small mt-1" id="confirmar-erro">
                  As senhas não conferem.
                </div>
              )}
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
                  Criando conta...
                </>
              ) : (
                <>
                  <UserPlus size={18} /> Criar conta
                </>
              )}
            </button>
          </form>
        </div>

        {/* Rodapé do cartão */}
        <p className="text-center text-secondary small mt-4 mb-0">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-aqua fw-semibold text-decoration-none">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
