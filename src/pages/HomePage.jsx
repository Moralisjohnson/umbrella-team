import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Filter, Star, Globe } from "lucide-react";
import { ITENS } from "../data/itens";

const Hand2HandApp = () => {
  const navigate = useNavigate();

  const handleBusca = (e) => {
    e.preventDefault();
    navigate("/busca");
  };

  return (
    <div
      className="min-vh-100 font-sans text-dark"
      style={{ backgroundColor: "#f7fafc" }}
    >
      {/* ESTILO VERDE N É O AZUL!!! */}
      <style>{`
      
        .text-aqua { color: #2c7a7b !important; }
        .text-aqua-light { color: #38b2ac !important; }
        .bg-aqua-light { background-color: #e6fffa !important; }
        .bg-aqua { background-color: #38b2ac !important; color: white; }
        
        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }
        
        .btn-outline-aqua { border: 2px solid #38b2ac; color: #38b2ac; background-color: white; }
        .btn-outline-aqua:hover { background-color: #e6fffa; color: #2c7a7b; }
        
        /* Animação suave para o placeholder do globo */
        .globe-spin {
          animation: spin 30s linear infinite;
          color: #81e6d9;
        }
        @keyframes spin { 
          100% { transform: rotate(360deg); } 
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid py-3 d-flex align-items-center justify-content-between">
          <div className="fs-4 fw-bold text-aqua">Hand 2 Hand</div>

          <nav className="d-none d-md-flex gap-4 align-items-center">
            <Link to="/" className="text-aqua text-decoration-none fw-semibold">
              Home
            </Link>
            <Link
              to="/busca"
              className="text-secondary text-decoration-none fw-medium"
            >
              Buscar
            </Link>
            <Link
              to="/anunciar"
              className="text-secondary text-decoration-none fw-medium"
            >
              Anunciar
            </Link>
            <Link
              to="/login"
              className="text-secondary text-decoration-none fw-medium"
            >
              Entrar
            </Link>
          </nav>

          <form
            className="d-flex align-items-center gap-2"
            onSubmit={handleBusca}
            role="search"
          >
            <div className="input-group">
              {/* Barra de pesquisa */}
              <span className="input-group-text bg-white border-end-0 rounded-0 text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="form-control border-start-0 rounded-0 shadow-none"
              />
            </div>
            {/* Botão leva para a tela de busca */}
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

      {/* HERO SECTION COM O GLOBO */}
      <main className="container-fluid py-5">
        <section className="bg-aqua-light rounded-4 p-4 p-md-5 shadow-sm border-0 mb-5 overflow-hidden relative">
          <div className="row align-items-center">
            {/* Textos e Botões */}
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0 z-1">
              <h1 className="display-5 fw-bolder text-aqua mb-4">
                Crie rendimento com objetos parados.
              </h1>
              <p className="lead text-secondary mb-4">
                O Hand 2 Hand é a ferramenta ideal para conectar você ao mundo.
                Seja um Locatário ou Locador de forma segura e tranquila.
                Economize já!
              </p>
              <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                {/* Botões principais */}
                <Link
                  to="/busca"
                  className="btn btn-aqua btn-lg rounded-0 px-5 shadow-sm fw-semibold"
                >
                  Alugar
                </Link>
                <Link
                  to="/anunciar"
                  className="btn btn-outline-aqua btn-lg rounded-0 px-5 shadow-sm fw-semibold"
                >
                  Anunciar
                </Link>
              </div>
            </div>

            {/* Placeholder do Globo */}
            <div className="col-lg-6 d-flex justify-content-center align-items-center position-relative">
              <div
                className="bg-white rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                style={{ width: "320px", height: "320px" }}
              >
                <Globe size={260} strokeWidth={1} className="globe-spin" />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTOS / DESTAQUES */}
        <section>
          <h2 className="h4 text-aqua fw-bold mb-4">Destaques para Alugar</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {ITENS.slice(0, 4).map((item) => (
              <div key={item.id} className="col">
                <Link
                  to={`/detalhes/${item.id}`}
                  className="text-decoration-none text-reset"
                >
                  <div className="card h-100 border-0 shadow-sm rounded-0 overflow-hidden">
                    <div
                      className="card-img-top bg-aqua-light d-flex align-items-center justify-content-center text-aqua-light rounded-0"
                      style={{ height: "180px" }}
                    >
                      <span className="text-aqua opacity-50 small">
                        Imagem do Produto
                      </span>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title h6 fw-bold mb-2 text-dark">
                        {item.nome}
                      </h3>
                      <div className="d-flex align-items-center gap-1 small text-warning mb-3">
                        <Star size={16} fill="currentColor" />
                        <span className="text-secondary fw-medium text-dark">
                          {item.nota} (Reputacao)
                        </span>
                      </div>
                      <div className="text-aqua fw-bold fs-5">
                        R$ {item.preco}{" "}
                        <span className="fs-6 text-muted fw-normal">/ dia</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main> 


      {/* FOOTER (podera ser global depois) */}
      <footer className="bg-white border-top py-5 mt-5 text-secondary">
        <div className="container-fluid">
          <div className="row gy-4">
            <div className="col-md-3">
              <h4 className="h5 text-aqua fw-bold mb-3">Hand 2 Hand</h4>
              <p className="small">
                Transformando objetos sem uso em novas oportunidades, de forma
                sustentável.
              </p>
            </div>
            <div className="col-md-3">
              <h5 className="h6 text-dark fw-semibold mb-3">Plataforma</h5>
              <ul className="list-unstyled small space-y-2">
                <li className="mb-2">
                  <a href="#" className="text-secondary text-decoration-none">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="h6 text-dark fw-semibold mb-3">Ajuda</h5>
              <ul className="list-unstyled small space-y-2">
                <li className="mb-2">
                  <a href="#" className="text-secondary text-decoration-none">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Best practices
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="h6 text-dark fw-semibold mb-3">Legal</h5>
              <ul className="list-unstyled small space-y-2">
                <li className="mb-2">
                  <a href="#" className="text-secondary text-decoration-none">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hand2HandApp;
