import app from "./app.js";

// Porta vem do ambiente (.env) ou cai no padrao 3001.
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Hand 2 Hand API rodando em http://localhost:${PORT}`);
});
