import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tag, DollarSign, MapPin, ImagePlus, ArrowLeft } from "lucide-react";

const CATEGORIAS = ["Ferramentas", "Camping", "Eventos", "Limpeza", "Lazer", "Outros"];

const Anunciar = () => {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [local, setLocal] = useState("");
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [publicado, setPublicado] = useState(false);

  // Validacao so aparece depois do primeiro clique em "Publicar".
  const tituloInvalido = tentouEnviar && titulo.trim() === "";
  const categoriaInvalida = tentouEnviar && categoria === "";
  const descricaoInvalida = tentouEnviar && descricao.trim() === "";
  const precoInvalido = tentouEnviar && (preco === "" || Number(preco) <= 0);
  const localInvalido = tentouEnviar && local.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTentouEnviar(true);
    setPublicado(false);

    if (
      titulo.trim() === "" ||
      categoria === "" ||
      descricao.trim() === "" ||
      preco === "" ||
      Number(preco) <= 0 ||
      local.trim() === ""
    ) {
      return;
    }

    // Simulacao de chamada a API (substituir pelo cadastro real do anuncio).
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setPublicado(true);
      console.log("Anuncio publicado:", { titulo, categoria, preco: Number(preco), local });
      // TODO: enviar o anuncio ao backend e redirecionar para os detalhes.
    }, 1200);
  };

  return (
    <div
      className="min-vh-100 font-sans text-dark py-4"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <style>{`
        .text-aqua { color: #2c7a7b !important; }
        .bg-aqua { background-color: #38b2ac !important; color: white; }
        .btn-aqua { background-color: #38b2ac; color: white; border: none; }
        .btn-aqua:hover { background-color: #319795; color: white; }
        .anuncio-card { width: 100%; max-width: 640px; }
      `}</style>

      <div className="container-fluid d-flex justify-content-center">
        <div className="anuncio-card px-3">
          <Link
            to="/"
            className="text-aqua text-decoration-none d-inline-flex align-items-center gap-2 fw-medium mb-3"
          >
            <ArrowLeft size={16} /> Voltar para a home
          </Link>

          <div className="card border-0 shadow-sm rounded-0 bg-white p-4">
            <h1 className="h4 fw-bold text-dark mb-1">Anunciar um item</h1>
            <p className="text-muted small mb-4">
              Preencha os dados do objeto que voce quer disponibilizar para aluguel.
            </p>

            {publicado && (
              <div className="alert alert-success rounded-0 py-2 small" role="alert">
                Anuncio publicado com sucesso!
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Titulo */}
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label small fw-bold text-secondary">
                  TITULO DO ITEM
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white rounded-0 text-muted">
                    <Tag size={16} />
                  </span>
                  <input
                    id="titulo"
                    type="text"
                    className={`form-control rounded-0 shadow-none ${tituloInvalido ? "is-invalid" : ""}`}
                    placeholder="Ex: Furadeira Profissional Bosch 750W"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    aria-invalid={tituloInvalido}
                    aria-describedby={tituloInvalido ? "titulo-erro" : undefined}
                  />
                </div>
                {tituloInvalido && (
                  <div className="text-danger small mt-1" id="titulo-erro">
                    Informe um titulo para o item.
                  </div>
                )}
              </div>

              {/* Categoria */}
              <div className="mb-3">
                <label htmlFor="categoria" className="form-label small fw-bold text-secondary">
                  CATEGORIA
                </label>
                <select
                  id="categoria"
                  className={`form-select rounded-0 shadow-none ${categoriaInvalida ? "is-invalid" : ""}`}
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  aria-invalid={categoriaInvalida}
                  aria-describedby={categoriaInvalida ? "categoria-erro" : undefined}
                >
                  <option value="">Selecione uma categoria</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {categoriaInvalida && (
                  <div className="text-danger small mt-1" id="categoria-erro">
                    Escolha uma categoria.
                  </div>
                )}
              </div>

              {/* Descricao */}
              <div className="mb-3">
                <label htmlFor="descricao" className="form-label small fw-bold text-secondary">
                  DESCRICAO
                </label>
                <textarea
                  id="descricao"
                  rows={4}
                  className={`form-control rounded-0 shadow-none ${descricaoInvalida ? "is-invalid" : ""}`}
                  placeholder="Detalhe o item: estado, acessorios inclusos, regras de uso..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  aria-invalid={descricaoInvalida}
                  aria-describedby={descricaoInvalida ? "descricao-erro" : undefined}
                />
                {descricaoInvalida && (
                  <div className="text-danger small mt-1" id="descricao-erro">
                    Escreva uma descricao do item.
                  </div>
                )}
              </div>

              <div className="row g-3">
                {/* Preco por dia */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="preco" className="form-label small fw-bold text-secondary">
                    PRECO POR DIA (R$)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white rounded-0 text-muted">
                      <DollarSign size={16} />
                    </span>
                    <input
                      id="preco"
                      type="number"
                      min="1"
                      step="1"
                      className={`form-control rounded-0 shadow-none ${precoInvalido ? "is-invalid" : ""}`}
                      placeholder="25"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      aria-invalid={precoInvalido}
                      aria-describedby={precoInvalido ? "preco-erro" : undefined}
                    />
                  </div>
                  {precoInvalido && (
                    <div className="text-danger small mt-1" id="preco-erro">
                      Informe um preco maior que zero.
                    </div>
                  )}
                </div>

                {/* Localizacao */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="local" className="form-label small fw-bold text-secondary">
                    LOCAL DE RETIRADA
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white rounded-0 text-muted">
                      <MapPin size={16} />
                    </span>
                    <input
                      id="local"
                      type="text"
                      className={`form-control rounded-0 shadow-none ${localInvalido ? "is-invalid" : ""}`}
                      placeholder="Bairro / Locker"
                      value={local}
                      onChange={(e) => setLocal(e.target.value)}
                      aria-invalid={localInvalido}
                      aria-describedby={localInvalido ? "local-erro" : undefined}
                    />
                  </div>
                  {localInvalido && (
                    <div className="text-danger small mt-1" id="local-erro">
                      Informe o local de retirada.
                    </div>
                  )}
                </div>
              </div>

              {/* Foto (placeholder de upload) */}
              <div className="mb-4">
                <label htmlFor="foto" className="form-label small fw-bold text-secondary">
                  FOTO DO ITEM (opcional)
                </label>
                <label
                  htmlFor="foto"
                  className="d-flex flex-column align-items-center justify-content-center text-muted bg-light rounded-0 p-4"
                  style={{ border: "1px dashed #cbd5e0", cursor: "pointer" }}
                >
                  <ImagePlus size={28} className="mb-2" />
                  <span className="small">Clique para enviar uma imagem</span>
                </label>
                <input id="foto" type="file" accept="image/*" className="d-none" />
              </div>

              {/* Botao principal */}
              <button
                type="submit"
                disabled={carregando}
                className="btn btn-aqua btn-lg w-100 rounded-0 fw-semibold d-flex align-items-center justify-content-center gap-2"
              >
                {carregando ? (
                  <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    Publicando...
                  </>
                ) : (
                  "Publicar anuncio"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anunciar;
