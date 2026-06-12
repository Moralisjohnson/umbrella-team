import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  User,
  Package,
  Tag,
  Calendar,
  Mail,
  Edit,
  KeyRound,
  PauseCircle,
  Trash2,
} from "lucide-react";
import { api, estaLogado, getToken, setSessao } from "../api/client";

const MinhaConta = () => {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("alugueis");

  // Dados reais vindos do backend.
  const [perfil, setPerfil] = useState(null);
  const [alugueis, setAlugueis] = useState([]);
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Edicao do perfil.
  const [editando, setEditando] = useState(false);
  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroPerfil, setErroPerfil] = useState("");

  const iniciarEdicao = () => {
    setFormNome(perfil?.nome || "");
    setFormEmail(perfil?.email || "");
    setErroPerfil("");
    setEditando(true);
  };

  const salvarPerfil = async (e) => {
    e.preventDefault();
    setErroPerfil("");
    setSalvando(true);
    try {
      const atualizado = await api("/conta/perfil", {
        method: "PUT",
        body: { nome: formNome, email: formEmail },
        auth: true,
      });
      setPerfil(atualizado);
      // Atualiza o usuario guardado na sessao (mantem o mesmo token).
      setSessao(getToken(), atualizado);
      setEditando(false);
    } catch (err) {
      setErroPerfil(err.message || "Nao foi possivel salvar.");
    } finally {
      setSalvando(false);
    }
  };

  // Pausa ou reativa um anuncio (pausado some das listagens publicas).
  const togglePausa = async (item) => {
    try {
      const atualizado = await api(`/itens/${item.id}`, {
        method: "PATCH",
        body: { ativo: !item.ativo },
        auth: true,
      });
      setAnuncios((lista) =>
        lista.map((a) => (a.id === atualizado.id ? atualizado : a))
      );
    } catch (err) {
      console.error("Falha ao pausar/reativar:", err);
    }
  };

  // Exclui um anuncio (com confirmacao).
  const removerAnuncio = async (item) => {
    if (
      !window.confirm(
        `Excluir o anuncio "${item.nome}"? Esta acao nao pode ser desfeita.`
      )
    ) {
      return;
    }
    try {
      await api(`/itens/${item.id}`, { method: "DELETE", auth: true });
      setAnuncios((lista) => lista.filter((a) => a.id !== item.id));
    } catch (err) {
      console.error("Falha ao excluir:", err);
    }
  };

  useEffect(() => {
    // Exige login: sem token, vai para /login.
    if (!estaLogado()) {
      navigate("/login");
      return;
    }

    let ativo = true;

    async function carregar() {
      try {
        const [perfilResp, alugueisResp, anunciosResp] = await Promise.all([
          api("/conta/perfil", { auth: true }),
          api("/conta/alugueis", { auth: true }),
          api("/conta/anuncios", { auth: true }),
        ]);

        if (!ativo) return;

        setPerfil(perfilResp);
        setAlugueis(Array.isArray(alugueisResp) ? alugueisResp : []);
        setAnuncios(Array.isArray(anunciosResp) ? anunciosResp : []);
      } catch (erro) {
        if (!ativo) return;
        // Sessao invalida/expirada -> volta para o login.
        if (String(erro.message).includes("401")) {
          navigate("/login");
          return;
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [navigate]);

  const abas = [
    { id: "alugueis", label: "Meus alugueis", icone: Calendar },
    { id: "anuncios", label: "Meus anuncios", icone: Tag },
    { id: "perfil", label: "Perfil", icone: User },
  ];

  // Nome/email exibidos no cabecalho e no perfil.
  const nome = perfil?.nome || "";
  const email = perfil?.email || "";

  return (
    <div
      className="min-vh-100 font-sans text-dark"
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

        .tab-aqua {
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          color: #718096;
          font-weight: 600;
          padding: 0.75rem 1rem;
        }
        .tab-aqua:hover { color: #2c7a7b; }
        .tab-aqua[aria-selected="true"] {
          color: #2c7a7b;
          border-bottom-color: #38b2ac;
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid py-3 d-flex align-items-center justify-content-between">
          <div className="fs-4 fw-bold text-aqua">
            <Link to="/" className="text-aqua text-decoration-none">
              Hand 2 Hand
            </Link>
          </div>

          <nav className="d-flex gap-4 align-items-center">
            <Link to="/" className="text-secondary text-decoration-none fw-medium">
              Home
            </Link>
            <Link
              to="/busca"
              className="text-secondary text-decoration-none fw-medium"
            >
              Buscar
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTEUDO PRINCIPAL */}
      <main className="container-fluid py-5">
        {/* BLOCO DE PERFIL */}
        <section className="d-flex align-items-center gap-3 mb-4">
          <div
            className="bg-aqua-light text-aqua rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "72px", height: "72px" }}
          >
            <User size={36} />
          </div>
          <div>
            <h1 className="h4 fw-bold text-dark mb-1">{nome}</h1>
            <p className="text-muted mb-0 small">{email}</p>
          </div>
        </section>

        {/* ABAS */}
        <div
          className="d-flex gap-2 border-bottom mb-4 flex-wrap"
          role="tablist"
          aria-label="Secoes da minha conta"
        >
          {abas.map((aba) => {
            const Icone = aba.icone;
            return (
              <button
                key={aba.id}
                type="button"
                role="tab"
                aria-selected={abaAtiva === aba.id}
                className="tab-aqua d-flex align-items-center gap-2"
                onClick={() => setAbaAtiva(aba.id)}
              >
                <Icone size={18} /> {aba.label}
              </button>
            );
          })}
        </div>

        {/* ABA: MEUS ALUGUEIS */}
        {abaAtiva === "alugueis" && (
          <section>
            <h2 className="h5 text-aqua fw-bold mb-3">Meus alugueis</h2>
            {!carregando && alugueis.length === 0 ? (
              <p className="text-muted">Voce ainda nao tem alugueis.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {alugueis.map((aluguel, index) => (
                  <div key={aluguel.id ?? index} className="col">
                    <div className="card h-100 border-0 shadow-sm rounded-0">
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h3 className="h6 fw-bold text-dark mb-0">
                            {aluguel.item_nome}
                          </h3>
                          <span
                            className={`badge rounded-0 ms-2 ${
                              aluguel.status === "Concluido"
                                ? "bg-secondary"
                                : "bg-aqua"
                            }`}
                          >
                            {aluguel.status}
                          </span>
                        </div>
                        {aluguel.item_local && (
                          <p className="small text-muted mb-2">
                            {aluguel.item_local}
                          </p>
                        )}
                        <div className="text-aqua fw-bold fs-5 mb-2">
                          R$ {aluguel.total}
                        </div>
                        {aluguel.chave_locker && (
                          <p className="small text-muted mb-0">
                            Chave do locker:{" "}
                            <span className="fw-semibold text-dark">
                              {aluguel.chave_locker}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ABA: MEUS ANUNCIOS */}
        {abaAtiva === "anuncios" && (
          <section>
            <h2 className="h5 text-aqua fw-bold mb-3">Meus anuncios</h2>
            {!carregando && anuncios.length === 0 ? (
              <p className="text-muted">Voce ainda nao tem anuncios.</p>
            ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {anuncios.map((item) => (
                <div key={item.id} className="col">
                  <div className="card h-100 border-0 shadow-sm rounded-0">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h6 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                          <Package size={18} className="text-aqua-light" />
                          {item.nome}
                        </h3>
                        <span
                          className={`badge rounded-0 ms-2 ${
                            item.ativo ? "bg-aqua" : "bg-secondary"
                          }`}
                        >
                          {item.ativo ? "Ativo" : "Pausado"}
                        </span>
                      </div>
                      <p className="small text-muted mb-2">
                        {item.categoria} - {item.local}
                      </p>
                      <div className="text-aqua fw-bold fs-5 mb-3">
                        R$ {item.preco}{" "}
                        <span className="fs-6 text-muted fw-normal">/ dia</span>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <Link
                          to={`/anunciar/${item.id}`}
                          className="btn btn-outline-aqua btn-sm rounded-0 fw-semibold d-flex align-items-center gap-1"
                        >
                          <Edit size={14} /> Editar
                        </Link>
                        <button
                          type="button"
                          className="btn btn-light btn-sm rounded-0 fw-semibold d-flex align-items-center gap-1 text-secondary"
                          onClick={() => togglePausa(item)}
                        >
                          <PauseCircle size={14} /> {item.ativo ? "Pausar" : "Reativar"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm rounded-0 fw-semibold d-flex align-items-center gap-1"
                          onClick={() => removerAnuncio(item)}
                        >
                          <Trash2 size={14} /> Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </section>
        )}

        {/* ABA: PERFIL */}
        {abaAtiva === "perfil" && (
          <section>
            <h2 className="h5 text-aqua fw-bold mb-3">Perfil</h2>
            <div className="card border-0 shadow-sm rounded-0">
              <div className="card-body">
                {erroPerfil && (
                  <div className="alert alert-danger rounded-0 py-2 small" role="alert">
                    {erroPerfil}
                  </div>
                )}

                {editando ? (
                  <form onSubmit={salvarPerfil}>
                    <div className="mb-3">
                      <label htmlFor="perfil-nome" className="form-label small fw-bold text-secondary">
                        NOME
                      </label>
                      <input
                        id="perfil-nome"
                        type="text"
                        className="form-control rounded-0 shadow-none"
                        value={formNome}
                        onChange={(e) => setFormNome(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="perfil-email" className="form-label small fw-bold text-secondary">
                        E-MAIL
                      </label>
                      <input
                        id="perfil-email"
                        type="email"
                        className="form-control rounded-0 shadow-none"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        disabled={salvando}
                        className="btn btn-aqua rounded-0 fw-semibold d-flex align-items-center gap-2"
                      >
                        {salvando ? "Salvando..." : "Salvar"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-0 fw-semibold"
                        onClick={() => setEditando(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="mb-3 d-flex align-items-center gap-2">
                      <User size={18} className="text-aqua-light" />
                      <div>
                        <div className="small text-muted">Nome</div>
                        <div className="fw-semibold text-dark">{nome}</div>
                      </div>
                    </div>
                    <div className="mb-4 d-flex align-items-center gap-2">
                      <Mail size={18} className="text-aqua-light" />
                      <div>
                        <div className="small text-muted">E-mail</div>
                        <div className="fw-semibold text-dark">{email}</div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-aqua rounded-0 fw-semibold d-flex align-items-center gap-2"
                        onClick={iniciarEdicao}
                      >
                        <Edit size={16} /> Editar perfil
                      </button>
                      <Link
                        to="/esqueci-senha"
                        className="btn btn-outline-aqua rounded-0 fw-semibold d-flex align-items-center gap-2"
                      >
                        <KeyRound size={16} /> Trocar senha
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MinhaConta;
