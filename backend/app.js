import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares globais.
app.use(cors()); // libera o front (Vite em localhost:5173) a consumir a API
app.use(express.json()); // parseia corpo JSON das requisicoes

// Healthcheck / raiz da API.
app.get("/", (req, res) => {
  res.json({ nome: "Hand 2 Hand API", status: "ok", versao: "0.1.0" });
});

// Rotas de dominio da API.
app.use("/api", routes);

// Tratador de erros (sempre por ultimo).
app.use(errorHandler);

export default app;
