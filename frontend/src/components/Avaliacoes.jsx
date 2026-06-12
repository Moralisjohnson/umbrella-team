import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import { api, getUsuario } from "../api/client";

// Renderiza N estrelas; as primeiras `nota` ficam preenchidas (text-warning).
const Estrelas = ({ nota, size = 16 }) => (
  <span className="text-warning d-inline-flex align-items-center">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        fill={n <= nota ? "currentColor" : "none"}
        className={n <= nota ? "text-warning" : "text-muted"}
      />
    ))}
  </span>
);

const Avaliacoes = ({ itemId, avaliacoes }) => {
  const lista = avaliacoes || [];

  // Estado local com a lista de avaliacoes ja carregada do item.
  const [itens, setItens] = useState(lista);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [erro, setErro] = useState("");

  // Nota media com uma casa decimal (0,0 quando nao ha avaliacoes).
  const total = itens.length;
  const media =
    total > 0
      ? (itens.reduce((soma, av) => soma + (av.nota || 0), 0) / total).toFixed(1)
      : "0.0";
  const mediaArredondada = Math.round(Number(media));

  const notaInvalida = tentouEnviar && nota <= 0;
  const comentarioInvalido = tentouEnviar && comentario.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTentouEnviar(true);
    setErro("");

    if (nota <= 0 || comentario.trim() === "") {
      return;
    }

    // Envia a avaliacao ao backend usando o nome do usuario logado como autor.
    const autor = getUsuario()?.nome || "Voce";
    const corpo = { autor, nota, comentario: comentario.trim() };

    try {
      const criada = await api(`/itens/${itemId}/avaliacoes`, {
        method: "POST",
        body: corpo,
      });

      setItens((anteriores) => [...anteriores, criada || corpo]);

      // Limpa o formulario apos adicionar.
      setNota(0);
      setComentario("");
      setTentouEnviar(false);
    } catch (e) {
      setErro("Nao foi possivel enviar a avaliacao. Tente novamente.");
    }
  };

  return (
    <div className="mb-4">
      {/* CABECALHO + NOTA MEDIA */}
      <h2 className="text-aqua fw-bold mb-3">Avaliacoes</h2>

      <div className="d-flex align-items-center gap-3 flex-wrap mb-4">
        <span className="fs-2 fw-bold text-dark">{media}</span>
        <div>
          <Estrelas nota={mediaArredondada} size={20} />
          <div className="text-muted small">
            {total} {total === 1 ? "avaliacao" : "avaliacoes"}
          </div>
        </div>
      </div>

      {/* LISTA DE AVALIACOES */}
      {itens.length === 0 ? (
        <p className="text-secondary">Ainda nao ha avaliacoes para este item.</p>
      ) : (
        <div className="d-flex flex-column gap-3 mb-4">
          {itens.map((av, index) => (
            <div key={index} className="border rounded-0 bg-white p-3">
              <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <span className="fw-bold text-dark">{av.autor}</span>
                <Estrelas nota={av.nota} />
              </div>
              <p className="text-secondary mb-0">{av.comentario}</p>
            </div>
          ))}
        </div>
      )}

      {/* FORMULARIO PARA ADICIONAR AVALIACAO */}
      <div className="border rounded-0 bg-aqua-light p-3">
        <h3 className="h6 text-aqua fw-bold mb-3">Deixe a sua avaliacao</h3>

        <form onSubmit={handleSubmit} noValidate>
          {/* Seletor de nota por estrelas clicaveis */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary d-block">
              SUA NOTA
            </label>
            <div className="d-flex align-items-center gap-1" role="group" aria-label="Selecione a nota">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="btn btn-link p-0 border-0 d-flex align-items-center"
                  onClick={() => setNota(n)}
                  aria-label={`Nota ${n}`}
                  aria-pressed={nota === n}
                >
                  <Star
                    size={28}
                    fill={n <= nota ? "currentColor" : "none"}
                    className={n <= nota ? "text-warning" : "text-muted"}
                  />
                </button>
              ))}
            </div>
            {notaInvalida && (
              <div className="text-danger small mt-1">Selecione uma nota.</div>
            )}
          </div>

          {/* Comentario */}
          <div className="mb-3">
            <label
              htmlFor="comentario"
              className="form-label small fw-bold text-secondary"
            >
              COMENTARIO
            </label>
            <textarea
              id="comentario"
              rows={3}
              className={`form-control rounded-0 shadow-none ${
                comentarioInvalido ? "is-invalid" : ""
              }`}
              placeholder="Conte como foi a sua experiencia com este item..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              aria-invalid={comentarioInvalido}
              aria-describedby={comentarioInvalido ? "comentario-erro" : undefined}
            />
            {comentarioInvalido && (
              <div className="text-danger small mt-1" id="comentario-erro">
                Escreva um comentario.
              </div>
            )}
          </div>

          {erro && <div className="text-danger small mb-2">{erro}</div>}

          <button
            type="submit"
            className="btn btn-aqua rounded-0 fw-semibold d-flex align-items-center justify-content-center gap-2"
          >
            <Send size={16} /> Enviar avaliacao
          </button>
        </form>
      </div>
    </div>
  );
};

export default Avaliacoes;
