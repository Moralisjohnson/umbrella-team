import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Send, ArrowLeft, MessageCircle } from "lucide-react";
import { api, estaLogado } from "../api/client";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  // Mensagens vindas do backend: { id, de, texto, criado_em }
  // onde de e 'usuario' (usuario logado) ou 'locador'.
  const [mensagens, setMensagens] = useState([]);

  const [texto, setTexto] = useState("");

  // Exige login: sem sessao, vai para /login.
  useEffect(() => {
    if (!estaLogado()) {
      navigate("/login");
    }
  }, [navigate]);

  // Busca item e mensagens na montagem (e quando o id muda).
  useEffect(() => {
    if (!estaLogado()) return;

    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setNaoEncontrado(false);
      try {
        // Item: usado para o nome do dono/locador e o nome do item.
        const itemDados = await api(`/itens/${id}`);
        if (!ativo) return;
        setItem(itemDados);

        // Historico de mensagens do chat deste item.
        const msgs = await api(`/chat/${id}`, { auth: true });
        if (!ativo) return;
        setMensagens(Array.isArray(msgs) ? msgs : []);
      } catch (err) {
        if (!ativo) return;
        setNaoEncontrado(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [id]);

  // Estado de carregamento simples.
  if (carregando) {
    return (
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <p className="text-muted mb-0">Carregando conversa...</p>
      </div>
    );
  }

  // Item inexistente (id invalido) ou erro ao carregar.
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valor = texto.trim();
    if (!valor) return;

    try {
      // POST retorna um array com 2 mensagens: a do usuario e a resposta do locador.
      const novas = await api(`/chat/${id}`, {
        method: "POST",
        body: { texto: valor },
        auth: true,
      });
      setMensagens((prev) => [...prev, ...(Array.isArray(novas) ? novas : [])]);
      setTexto("");
    } catch (err) {
      // Falha no envio: mantem o texto digitado para nova tentativa.
    }
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
          {mensagens.map((msg) => {
            // Backend usa 'usuario' (usuario logado) e 'locador'.
            const ehUsuario = msg.de === "usuario";
            return (
              <div
                key={msg.id}
                className={`d-flex ${ehUsuario ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded ${ehUsuario ? "bg-aqua text-white" : "bg-aqua-light text-dark"}`}
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
