import "reflect-metadata";
import "./container";
import express from "express";
import { AppDataSource } from "../ormconfig";
import { routes } from "./routes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco de dados!");

    app.use(routes);
    app.use(errorHandler);

    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados", err);
  });
