import "reflect-metadata";
import express from "express";
import { AppDataSource } from "../ormconfig";
const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco de dados!");

    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados", err);
  });
