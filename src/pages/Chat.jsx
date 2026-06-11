import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Send, ArrowLeft, MessageCircle } from "lucide-react";
import { getItemById } from "../data/itens";

const Chat = () => {
  const { id } = useParams();
  const item = getItemById(id);

  // Mensagens iniciais mock (algumas do locador, alguma do usuario).
  const [mensagens, setMensagens] = useState([
    { de: "locador", texto: "Ola! Vi que voce tem interesse neste item. Posso ajudar?" },
    { de: "voce", texto: "Oi! O item esta disponivel para o proximo fim de semana?" },
    { de: "locador", texto: "Esta sim! E so agendar a retirada no locker pelo app." },
  ]);

  const [texto, setTexto] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const valor = texto.trim();
    if (!valor) return;

    // TODO: integrar com backend de mensagens real (ex.: POST /chats/:id/mensagens).
    setMensagens((prev) => [...prev, { de: "voce", texto: valor }]);
    setTexto("");

    // Resposta automatica mock do locador para simular a conversa.
    setTimeout(() => {
      setMensagens((prev) => [
        ...prev,
        { de: "locador", texto: "Recebi sua mensagem! Ja te respondo com os detalhes." },
      ]);
    }, 800);
  };

  return (
    <div className="min-vh-100 font-sans text-dark d-flex flex-column" style={{ backgroundColor: "#f7fafc" }}>
      <style>{`
        .text-aqua { color: #2c7a7b !important; }
        .text-aqua-light { color: #38b2ac !important; }
        .bg-aqua-light { background-color: #e6fffa !important; }
        .bg-aqua { background-color: #38b2ac !important; color: white; }

        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }
      `}</style>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid py-3 d-flex align-items-center gap-3">
          <Link to={`/detalhes/${id}`} className="btn btn-link text-aqua p-0" aria-label="Voltar">
            <ArrowLeft size={24} />
          </Link>
          <div className="d-flex align-items-center gap-2">
            <div className="bg-aqua-light p-2 text-aqua d-flex align-items-center justify-content-center rounded-circle">
              <MessageCircle size={20} />
            </div>
            <div>
              <h1 className="h6 fw-bold text-dark mb-0">Conversa com {item.dono}</h1>
              <p className="small text-muted mb-0">{item.nome}</p>
            </div>
          </div>
        </div>
      </header>

      {/* AREA DE MENSAGENS */}
      <main className="container-fluid flex-grow-1 py-4">
        <div
          className="bg-white border shadow-sm rounded-0 p-3 d-flex flex-column gap-3 overflow-auto"
          style={{ height: "60vh" }}
        >
          {mensagens.map((msg, index) => {
            const ehVoce = msg.de === "voce";
            return (
              <div
                key={index}
                className={`d-flex ${ehVoce ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded ${ehVoce ? "bg-aqua text-white" : "bg-aqua-light text-dark"}`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.texto}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* CAMPO DE ENVIO */}
      <footer className="bg-white border-top">
        <div className="container-fluid py-3">
          <form className="d-flex align-items-stretch gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control rounded-0 shadow-none"
              placeholder="Digite sua mensagem..."
              aria-label="Mensagem"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-aqua rounded-0 px-3 d-flex align-items-center justify-content-center"
              aria-label="Enviar"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
