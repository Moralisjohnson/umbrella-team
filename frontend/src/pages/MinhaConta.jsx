import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  User,
  Package,
  Tag,
  Calendar,
  Mail,
  Phone,
  Edit,
  PauseCircle,
} from "lucide-react";
import { ITENS } from "../data/itens";

const MinhaConta = () => {
  const [abaAtiva, setAbaAtiva] = useState("alugueis");

  // Perfil mock (ate haver autenticacao real).
  // TODO: substituir por dados do usuario logado vindos do backend.
  const usuario = {
    nome: "Guilherme A.",
    email: "guilherme.a@email.com",
    telefone: "(41) 99999-0000",
  };

  // Alugueis mock montados a partir de itens reais.
  const meusAlugueis = ITENS.slice(0, 3).map((item, index) => ({
    item,
    status: index === 2 ? "Concluido" : "Em andamento",
    inicio: "10/06/2026",
    fim: "15/06/2026",
    valor: item.preco * 5,
  }));

  // Anuncios mock: itens que o usuario estaria anunciando.
  const meusAnuncios = ITENS.slice(3, 5);

  const abas = [
    { id: "alugueis", label: "Meus alugueis", icone: Calendar },
    { id: "anuncios", label: "Meus anuncios", icone: Tag },
    { id: "perfil", label: "Perfil", icone: User },
  ];

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
            <h1 className="h4 fw-bold text-dark mb-1">{usuario.nome}</h1>
            <p className="text-muted mb-0 small">{usuario.email}</p>
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
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {meusAlugueis.map(({ item, status, inicio, fim, valor }) => (
                <div key={item.id} className="col">
                  <div className="card h-100 border-0 shadow-sm rounded-0">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h6 fw-bold text-dark mb-0">
                          {item.nome}
                        </h3>
                        <span
                          className={`badge rounded-0 ms-2 ${
                            status === "Concluido"
                              ? "bg-secondary"
                              : "bg-aqua"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                      <p className="small text-muted mb-2 d-flex align-items-center gap-1">
                        <Calendar size={14} /> {inicio} ate {fim}
                      </p>
                      <div className="text-aqua fw-bold fs-5 mb-3">
                        R$ {valor}
                      </div>
                      <Link
                        to={`/detalhes/${item.id}`}
                        className="btn btn-outline-aqua btn-sm rounded-0 mt-auto fw-semibold"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABA: MEUS ANUNCIOS */}
        {abaAtiva === "anuncios" && (
          <section>
            <h2 className="h5 text-aqua fw-bold mb-3">Meus anuncios</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {meusAnuncios.map((item) => (
                <div key={item.id} className="col">
                  <div className="card h-100 border-0 shadow-sm rounded-0">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h6 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                          <Package size={18} className="text-aqua-light" />
                          {item.nome}
                        </h3>
                        <span className="badge bg-aqua rounded-0 ms-2">
                          Ativo
                        </span>
                      </div>
                      <p className="small text-muted mb-2">
                        {item.categoria} - {item.local}
                      </p>
                      <div className="text-aqua fw-bold fs-5 mb-3">
                        R$ {item.preco}{" "}
                        <span className="fs-6 text-muted fw-normal">/ dia</span>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-aqua btn-sm rounded-0 fw-semibold d-flex align-items-center gap-1"
                        >
                          <Edit size={14} /> Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-light btn-sm rounded-0 fw-semibold d-flex align-items-center gap-1 text-secondary"
                        >
                          <PauseCircle size={14} /> Pausar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABA: PERFIL */}
        {abaAtiva === "perfil" && (
          <section>
            <h2 className="h5 text-aqua fw-bold mb-3">Perfil</h2>
            <div className="card border-0 shadow-sm rounded-0">
              <div className="card-body">
                <div className="mb-3 d-flex align-items-center gap-2">
                  <User size={18} className="text-aqua-light" />
                  <div>
                    <div className="small text-muted">Nome</div>
                    <div className="fw-semibold text-dark">{usuario.nome}</div>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                  <Mail size={18} className="text-aqua-light" />
                  <div>
                    <div className="small text-muted">E-mail</div>
                    <div className="fw-semibold text-dark">{usuario.email}</div>
                  </div>
                </div>
                <div className="mb-4 d-flex align-items-center gap-2">
                  <Phone size={18} className="text-aqua-light" />
                  <div>
                    <div className="small text-muted">Telefone</div>
                    <div className="fw-semibold text-dark">
                      {usuario.telefone}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-aqua rounded-0 fw-semibold d-flex align-items-center gap-2"
                >
                  <Edit size={16} /> Editar perfil
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MinhaConta;
