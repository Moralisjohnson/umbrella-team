import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Search,
  Filter,
  Star,
  Calendar,
  MapPin,
  MessageCircle,
  Key,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { api } from "../api/client";
import Avaliacoes from "../components/Avaliacoes";

const ItemDetailsApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Item buscado na API real (preco/nota chegam como string).
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    api(`/itens/${id}`)
      .then((i) => setItem(i))
      .catch(() => setNaoEncontrado(true))
      .finally(() => setCarregando(false));
  }, [id]);

  // Calculo simples de dias para demonstracao na interface.
  const calculateTotal = () => {
    if (!startDate || !endDate || !item) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays * Number(item.preco) : 0;
  };

  // Estado de carregamento simples enquanto a API responde.
  if (carregando) {
    return (
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <p className="text-muted mb-0">Carregando...</p>
      </div>
    );
  }

  // Item inexistente (id invalido na URL) ou erro na busca.
  if (naoEncontrado || !item) {
    return (
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <h1 className="h4 fw-bold text-dark mb-2">Item nao encontrado</h1>
        <p className="text-muted mb-4">
          O item que voce procura nao existe ou foi removido.
        </p>
        <Link to="/busca" className="btn btn-aqua rounded-0 px-4">
          Voltar para a busca
        </Link>
        <style>{`.btn-aqua { background-color: #38b2ac; color: white; border: none; }`}</style>
      </div>
    );
  }

  return (
    <div className="min-vh-100 font-sans text-dark" style={{ backgroundColor: "#f7fafc" }}>
      <style>{`
        .text-aqua { color: #2c7a7b !important; }
        .text-aqua-light { color: #38b2ac !important; }
        .bg-aqua-light { background-color: #e6fffa !important; }
        .bg-aqua { background-color: #38b2ac !important; color: white; }

        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }

        .btn-outline-aqua { border: 2px solid #38b2ac; color: #38b2ac; background-color: white; }
        .btn-outline-aqua:hover { background-color: #e6fffa; color: #2c7a7b; }

        .sticky-sidebar {
          position: sticky;
          top: 90px;
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid py-3 d-flex align-items-center justify-content-between">
          <div className="fs-4 fw-bold text-aqua d-flex align-items-center gap-2">
            <Link to="/busca" className="btn btn-link text-aqua p-0 me-2 d-md-none">
              <ArrowLeft size={24} />
            </Link>
            <Link to="/" className="text-aqua text-decoration-none">
              Hand 2 Hand
            </Link>
          </div>

          <nav className="d-none d-md-flex gap-4">
            <Link to="/" className="text-secondary text-decoration-none fw-medium">
              Home
            </Link>
            <Link to="/busca" className="text-secondary text-decoration-none fw-medium">
              Buscar
            </Link>
          </nav>

          <form
            className="d-flex align-items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/busca");
            }}
            role="search"
          >
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 rounded-0 text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="form-control border-start-0 rounded-0 shadow-none"
              />
            </div>
            <button
              type="submit"
              className="btn btn-light rounded-0 p-2 d-flex align-items-center justify-content-center"
              title="Buscar"
              aria-label="Buscar"
            >
              <Filter size={18} className="text-secondary" />
            </button>
          </form>
        </div>
      </header>

      {/* CONTEUDO PRINCIPAL */}
      <main className="container-fluid py-5">
        <div className="mb-4 d-none d-md-block">
          <Link
            to="/busca"
            className="text-aqua text-decoration-none d-inline-flex align-items-center gap-2 fw-medium"
          >
            <ArrowLeft size={16} /> Voltar para a busca
          </Link>
        </div>

        <div className="row g-4">
          {/* COLUNA ESQUERDA: INFOS DO PRODUTO */}
          <div className="col-lg-7">
            <div
              className="bg-aqua-light d-flex align-items-center justify-content-center text-aqua-light rounded-0 mb-4 position-relative"
              style={{ height: "400px" }}
            >
              <span className="text-aqua opacity-50 fs-4">Imagem do Produto</span>
              <span className="position-absolute top-0 end-0 bg-aqua text-white px-3 py-1 m-3 small fw-bold">
                DISPONIVEL
              </span>
            </div>

            <div className="mb-4">
              <h1 className="h2 fw-bold text-dark mb-2">{item.nome}</h1>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center gap-1 text-warning small">
                  <Star size={18} fill="currentColor" />
                  <span className="text-dark fw-bold ms-1">{item.nota}</span>
                  <span className="text-muted">({item.avaliacoes} avaliacoes)</span>
                </div>
                <span className="text-muted">|</span>
                <span className="text-secondary small">
                  Dono: <strong className="text-dark">{item.dono}</strong>
                </span>
                <span className="badge bg-aqua-light text-aqua rounded-0">{item.categoria}</span>
              </div>
            </div>

            <hr className="text-muted my-4" />

            <div className="mb-4">
              <h2 className="h5 text-aqua fw-bold mb-3">Descricao do item</h2>
              <p className="text-secondary">{item.descricao}</p>
            </div>

            <hr className="text-muted my-4" />

            <div className="mb-4">
              <h2 className="h5 text-aqua fw-bold mb-3">Local de Retirada (Armario Digital)</h2>
              <div className="d-flex gap-3 align-items-start bg-white p-3 border shadow-sm rounded-0">
                <div className="bg-aqua-light p-2 text-aqua">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1">{item.local}</h3>
                  <p className="small text-muted mb-2">{item.endereco}</p>
                  <span className="badge bg-aqua-light text-aqua rounded-0 border border-info small">
                    Locker #{item.locker}
                  </span>
                </div>
              </div>
            </div>

            <hr className="text-muted my-4" />

            <div className="mb-4">
              <h2 className="h5 text-aqua fw-bold mb-3">Termos de Uso e Penalidades</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex gap-2 text-secondary small align-items-start">
                    <Clock size={16} className="text-warning flex-shrink-0 mt-1" />
                    <span>
                      <strong>Atraso na devolucao:</strong> Multa automatica de R$ 15 por hora
                      excedente apos o prazo final contratado.
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 text-secondary small align-items-start">
                    <AlertTriangle size={16} className="text-danger flex-shrink-0 mt-1" />
                    <span>
                      <strong>Danos ou Extravio:</strong> Taxa de reparo/reposicao integral do item
                      baseada no valor de mercado.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="text-muted my-4" />

            <Avaliacoes itemId={item.id} avaliacoes={item.avaliacoesLista} />
          </div>

          {/* COLUNA DIREITA: WIDGET DE AGENDAMENTO (STICKY) */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-0 bg-white p-4 sticky-sidebar">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className="fs-3 fw-bold text-aqua">R$ {item.preco}</span>
                  <span className="text-muted small"> / dia</span>
                </div>
                <span className="small text-secondary d-flex align-items-center gap-1">
                  <Shield size={14} className="text-aqua-light" /> Seguro Incluso
                </span>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">RETIRADA AGENDADA</label>
                <div className="input-group">
                  <span className="input-group-text bg-white rounded-0 text-muted">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="datetime-local"
                    className="form-control rounded-0 shadow-none"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">DEVOLUCAO AGENDADA</label>
                <div className="input-group">
                  <span className="input-group-text bg-white rounded-0 text-muted">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="datetime-local"
                    className="form-control rounded-0 shadow-none"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {calculateTotal() > 0 && (
                <div className="bg-light p-3 mb-4 rounded-0 small">
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      R$ {item.preco} x {calculateTotal() / Number(item.preco)} dias
                    </span>
                    <span>R$ {calculateTotal()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Taxa de servico Locker</span>
                    <span>R$ 5,00</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold text-dark fs-6">
                    <span>Total estimado</span>
                    <span className="text-aqua">R$ {calculateTotal() + 5}</span>
                  </div>
                </div>
              )}

              <button
                className="btn btn-aqua btn-lg w-100 rounded-0 mb-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate(`/reserva/${item.id}`)}
              >
                <Key size={18} /> Reservar e Gerar Chave
              </button>

              <button
                className="btn btn-outline-aqua w-100 rounded-0 fw-semibold d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate(`/chat/${item.id}`)}
              >
                <MessageCircle size={18} /> Falar com Locador {item.dono}
              </button>

              <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "11px" }}>
                O locador possui prioridade de uso. Respostas no chat demoradas geram penalidades ao
                locador.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetailsApp;
