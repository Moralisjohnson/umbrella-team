// Tratador de erros central do Express.
// Nos controllers, chame next(err) (ou lance um erro com .status) para cair aqui.
export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    erro: err.message || "Erro interno do servidor",
  });
}
