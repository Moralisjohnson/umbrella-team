import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, SlidersHorizontal, Star, MapPin } from "lucide-react";

// Dados de exemplo (mock) ate haver um backend de busca.
const ITENS = [
  { id: 1, nome: "Furadeira Profissional Bosch 750W", preco: 25, nota: 4.8, local: "Batel - Curitiba/PR", categoria: "Ferramentas" },
  { id: 2, nome: "Barraca de Camping 4 Pessoas", preco: 40, nota: 4.6, local: "Centro - Curitiba/PR", categoria: "Camping" },
  { id: 3, nome: "Caixa de Som JBL PartyBox", preco: 60, nota: 4.9, local: "Agua Verde - Curitiba/PR", categoria: "Eventos" },
  { id: 4, nome: "Lavadora de Alta Pressao", preco: 35, nota: 4.5, local: "Portao - Curitiba/PR", categoria: "Limpeza" },
  { id: 5, nome: "Projetor Full HD 3000 lumens", preco: 55, nota: 4.7, local: "Bigorrilho - Curitiba/PR", categoria: "Eventos" },
  { id: 6, nome: "Kit Churrasqueira Portatil", preco: 30, nota: 4.4, local: "Cabral - Curitiba/PR", categoria: "Lazer" },
];

const CATEGORIAS = ["Todas", "Ferramentas", "Camping", "Eventos", "Limpeza", "Lazer"];

const Busca = () => {
  const [termo, setTermo] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [ordenar, setOrdenar] = useState("relevancia");

  // Filtra por termo e categoria, depois ordena (tudo no front, sobre o mock).
  const resultados = ITENS
    .filter((i) =>
      i.nome.toLowerCase().includes(termo.trim().toLowerCase())
    )
    .filter((i) => categoria === "Todas" || i.categoria === categoria)
    .sort((a, b) => {
      if (ordenar === "menor-preco") return a.preco - b.preco;
      if (ordenar === "maior-preco") return b.preco - a.preco;
      if (ordenar === "melhor-nota") return b.nota - a.nota;
      return 0;
    });

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
      `}</style>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid py-3 d-flex align-items-center justify-content-between gap-3">
          <Link to="/" className="fs-4 fw-bold text-aqua text-decoration-none">
            Hand 2 Hand
          </Link>
          <div className="input-group" style={{ maxWidth: "520px" }}>
            <span className="input-group-text bg-white border-end-0 rounded-0 text-muted">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="O que voce procura?"
              className="form-control border-start-0 rounded-0 shadow-none"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
          <Link to="/login" className="text-secondary text-decoration-none fw-medium d-none d-md-inline">
            Entrar
          </Link>
        </div>
      </header>

      <main className="container-fluid py-4">
        <div className="row g-4">
          {/* FILTROS */}
          <aside className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-0 p-3">
              <h2 className="h6 fw-bold text-aqua d-flex align-items-center gap-2 mb-3">
                <SlidersHorizontal size={16} /> Filtros
              </h2>

              <label className="form-label small fw-bold text-secondary">
                CATEGORIA
              </label>
              <div className="d-flex flex-column gap-1 mb-3">
                {CATEGORIAS.map((c) => (
                  <div className="form-check" key={c}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="categoria"
                      id={`cat-${c}`}
                      checked={categoria === c}
                      onChange={() => setCategoria(c)}
                    />
                    <label className="form-check-label small" htmlFor={`cat-${c}`}>
                      {c}
                    </label>
                  </div>
                ))}
              </div>

              <label htmlFor="ordenar" className="form-label small fw-bold text-secondary">
                ORDENAR POR
              </label>
              <select
                id="ordenar"
                className="form-select rounded-0 shadow-none"
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
              >
                <option value="relevancia">Relevancia</option>
                <option value="menor-preco">Menor preco</option>
                <option value="maior-preco">Maior preco</option>
                <option value="melhor-nota">Melhor avaliacao</option>
              </select>
            </div>
          </aside>

          {/* RESULTADOS */}
          <section className="col-lg-9">
            <div className="d-flex align-items-baseline justify-content-between mb-3">
              <h1 className="h5 fw-bold text-dark mb-0">
                {termo.trim() ? `Resultados para "${termo.trim()}"` : "Itens disponiveis"}
              </h1>
              <span className="text-muted small">
                {resultados.length} item(ns)
              </span>
            </div>

            {resultados.length === 0 ? (
              <div className="text-center text-muted py-5">
                <p className="mb-1 fw-medium">Nenhum item encontrado.</p>
                <p className="small">Tente outro termo ou remova os filtros.</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
                {resultados.map((item) => (
                  <div className="col" key={item.id}>
                    <Link
                      to="/detalhes"
                      className="text-decoration-none text-reset"
                    >
                      <div className="card h-100 border-0 shadow-sm rounded-0 overflow-hidden">
                        <div
                          className="bg-aqua-light d-flex align-items-center justify-content-center"
                          style={{ height: "160px" }}
                        >
                          <span className="text-aqua opacity-50 small">
                            Imagem do Produto
                          </span>
                        </div>
                        <div className="card-body">
                          <span className="badge bg-aqua-light text-aqua rounded-0 mb-2">
                            {item.categoria}
                          </span>
                          <h3 className="h6 fw-bold text-dark mb-2">{item.nome}</h3>
                          <div className="d-flex align-items-center gap-1 small mb-2">
                            <Star size={14} className="text-warning" fill="currentColor" />
                            <span className="fw-medium text-dark">{item.nota}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1 small text-muted mb-2">
                            <MapPin size={14} /> {item.local}
                          </div>
                          <div className="text-aqua fw-bold fs-5">
                            R$ {item.preco}
                            <span className="fs-6 text-muted fw-normal"> / dia</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Busca;
