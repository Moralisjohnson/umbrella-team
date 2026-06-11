import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Calendar,
  CreditCard,
  Key,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { getItemById } from "../data/itens";

const Reserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id);

  // Estado do checkout.
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");

  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  // Calculo simples de dias para demonstracao na interface (igual DetalhesAgendamento).
  const calculateTotal = () => {
    if (!startDate || !endDate || !item) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays * item.preco : 0;
  };

  // Validacao so aparece depois do primeiro clique em "Confirmar reserva".
  const retiradaInvalida = tentouEnviar && startDate === "";
  const devolucaoInvalida = tentouEnviar && endDate === "";
  const pagamentoInvalido = tentouEnviar && pagamento === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTentouEnviar(true);

    // Nao confirma sem datas e metodo de pagamento.
    if (startDate === "" || endDate === "" || pagamento === "") {
      return;
    }

    // Simulacao de chamada a API (substituir pela reserva real depois).
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setConfirmado(true);
      // TODO: criar a reserva no backend, cobrar o pagamento e gerar a chave real do locker.
    }, 1200);
  };

  // Item inexistente (id invalido na URL).
  if (!item) {
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

  // Chave digital do locker gerada de forma mock.
  const chaveLocker = `Locker #${item.locker} — codigo ${item.id}4827`;

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
      `}</style>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid py-3 d-flex align-items-center justify-content-between">
          <div className="fs-4 fw-bold text-aqua">
            <Link to="/" className="text-aqua text-decoration-none">
              Hand 2 Hand
            </Link>
          </div>

          <Link
            to={`/detalhes/${id}`}
            className="text-aqua text-decoration-none d-inline-flex align-items-center gap-2 fw-medium"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
        </div>
      </header>

      {/* CONTEUDO PRINCIPAL */}
      <main className="container-fluid py-5">
        {confirmado ? (
          /* ESTADO DE CONFIRMACAO */
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="alert alert-success rounded-0 d-flex align-items-center gap-2 mb-4">
                <CheckCircle size={20} />
                <span className="fw-semibold">
                  Reserva confirmada! O item {item.nome} esta a sua espera.
                </span>
              </div>

              <div className="card border-0 shadow-sm rounded-0 bg-white p-4 mb-4">
                <h1 className="h4 fw-bold text-aqua mb-3 d-flex align-items-center gap-2">
                  <Key size={22} /> Sua chave digital
                </h1>
                <div className="bg-aqua-light p-4 rounded-0 text-center mb-3">
                  <span className="fs-4 fw-bold text-aqua">{chaveLocker}</span>
                </div>
                <div className="d-flex gap-3 align-items-start bg-light p-3 rounded-0">
                  <div className="bg-aqua-light p-2 text-aqua">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h2 className="h6 fw-bold mb-1">{item.local}</h2>
                    <p className="small text-muted mb-0">{item.endereco}</p>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-0 bg-white p-4 mb-4">
                <h2 className="h5 text-aqua fw-bold mb-3">Como retirar</h2>
                <ol className="text-secondary small mb-0 ps-3">
                  <li className="mb-2">
                    Va ate o armario digital no endereco informado acima.
                  </li>
                  <li className="mb-2">
                    Informe o codigo da chave no painel do locker para abri-lo.
                  </li>
                  <li className="mb-0">
                    Devolva o item no mesmo locker dentro do prazo agendado para evitar multas.
                  </li>
                </ol>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/" className="btn btn-outline-aqua rounded-0 fw-semibold flex-fill">
                  Voltar para a home
                </Link>
                <Link to="/minha-conta" className="btn btn-aqua rounded-0 fw-semibold flex-fill">
                  Ver meus alugueis
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* ESTADO DE CHECKOUT */
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <h1 className="h3 fw-bold text-dark mb-1">Finalizar reserva</h1>
              <p className="text-muted mb-0">{item.nome}</p>
            </div>

            <div className="row g-4">
              {/* COLUNA ESQUERDA: DATAS E PAGAMENTO */}
              <div className="col-lg-7">
                <div className="card border-0 shadow-sm rounded-0 bg-white p-4 mb-4">
                  <h2 className="h5 text-aqua fw-bold mb-3 d-flex align-items-center gap-2">
                    <Calendar size={18} /> Periodo do aluguel
                  </h2>

                  <div className="mb-3">
                    <label
                      htmlFor="retirada"
                      className="form-label small fw-bold text-secondary"
                    >
                      RETIRADA AGENDADA
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white rounded-0 text-muted">
                        <Calendar size={16} />
                      </span>
                      <input
                        id="retirada"
                        type="datetime-local"
                        className={`form-control rounded-0 shadow-none ${
                          retiradaInvalida ? "is-invalid" : ""
                        }`}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        aria-invalid={retiradaInvalida}
                        aria-describedby={retiradaInvalida ? "retirada-erro" : undefined}
                      />
                    </div>
                    {retiradaInvalida && (
                      <div className="text-danger small mt-1" id="retirada-erro">
                        Informe a data de retirada.
                      </div>
                    )}
                  </div>

                  <div className="mb-0">
                    <label
                      htmlFor="devolucao"
                      className="form-label small fw-bold text-secondary"
                    >
                      DEVOLUCAO AGENDADA
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white rounded-0 text-muted">
                        <Calendar size={16} />
                      </span>
                      <input
                        id="devolucao"
                        type="datetime-local"
                        className={`form-control rounded-0 shadow-none ${
                          devolucaoInvalida ? "is-invalid" : ""
                        }`}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        aria-invalid={devolucaoInvalida}
                        aria-describedby={devolucaoInvalida ? "devolucao-erro" : undefined}
                      />
                    </div>
                    {devolucaoInvalida && (
                      <div className="text-danger small mt-1" id="devolucao-erro">
                        Informe a data de devolucao.
                      </div>
                    )}
                  </div>
                </div>

                <div className="card border-0 shadow-sm rounded-0 bg-white p-4">
                  <h2 className="h5 text-aqua fw-bold mb-3 d-flex align-items-center gap-2">
                    <CreditCard size={18} /> Forma de pagamento
                  </h2>

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input shadow-none"
                      type="radio"
                      name="pagamento"
                      id="pagamento-pix"
                      value="pix"
                      checked={pagamento === "pix"}
                      onChange={(e) => setPagamento(e.target.value)}
                      aria-invalid={pagamentoInvalido}
                    />
                    <label className="form-check-label" htmlFor="pagamento-pix">
                      Pix
                    </label>
                  </div>

                  <div className="form-check mb-0">
                    <input
                      className="form-check-input shadow-none"
                      type="radio"
                      name="pagamento"
                      id="pagamento-cartao"
                      value="cartao"
                      checked={pagamento === "cartao"}
                      onChange={(e) => setPagamento(e.target.value)}
                      aria-invalid={pagamentoInvalido}
                    />
                    <label className="form-check-label" htmlFor="pagamento-cartao">
                      Cartao de credito
                    </label>
                  </div>

                  {pagamentoInvalido && (
                    <div className="text-danger small mt-2" id="pagamento-erro">
                      Selecione uma forma de pagamento.
                    </div>
                  )}

                  {/* Campos mock do cartao (apenas visuais). */}
                  {pagamento === "cartao" && (
                    <div className="row g-3 mt-2">
                      <div className="col-12">
                        <label
                          htmlFor="numero-cartao"
                          className="form-label small fw-bold text-secondary"
                        >
                          NUMERO DO CARTAO
                        </label>
                        <input
                          id="numero-cartao"
                          type="text"
                          inputMode="numeric"
                          className="form-control rounded-0 shadow-none"
                          placeholder="0000 0000 0000 0000"
                          value={numeroCartao}
                          onChange={(e) => setNumeroCartao(e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <label
                          htmlFor="validade-cartao"
                          className="form-label small fw-bold text-secondary"
                        >
                          VALIDADE
                        </label>
                        <input
                          id="validade-cartao"
                          type="text"
                          className="form-control rounded-0 shadow-none"
                          placeholder="MM/AA"
                          value={validadeCartao}
                          onChange={(e) => setValidadeCartao(e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <label
                          htmlFor="cvv-cartao"
                          className="form-label small fw-bold text-secondary"
                        >
                          CVV
                        </label>
                        <input
                          id="cvv-cartao"
                          type="text"
                          inputMode="numeric"
                          className="form-control rounded-0 shadow-none"
                          placeholder="000"
                          value={cvvCartao}
                          onChange={(e) => setCvvCartao(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* COLUNA DIREITA: RESUMO DE VALORES */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm rounded-0 bg-white p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <span className="fs-3 fw-bold text-aqua">R$ {item.preco}</span>
                      <span className="text-muted small"> / dia</span>
                    </div>
                    <span className="small text-secondary d-flex align-items-center gap-1">
                      <ShieldCheck size={14} className="text-aqua-light" /> Seguro Incluso
                    </span>
                  </div>

                  <h2 className="h6 fw-bold text-secondary mb-3">Resumo da reserva</h2>

                  {calculateTotal() > 0 ? (
                    <div className="bg-light p-3 mb-4 rounded-0 small">
                      <div className="d-flex justify-content-between mb-2">
                        <span>
                          R$ {item.preco} x {calculateTotal() / item.preco} dias
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
                  ) : (
                    <p className="text-muted small mb-4">
                      Escolha as datas de retirada e devolucao para ver o total.
                    </p>
                  )}

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
                        Processando...
                      </>
                    ) : (
                      <>
                        <Key size={18} /> Confirmar reserva
                      </>
                    )}
                  </button>

                  <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "11px" }}>
                    Ao confirmar, voce concorda com os termos de uso e penalidades do item.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Reserva;
