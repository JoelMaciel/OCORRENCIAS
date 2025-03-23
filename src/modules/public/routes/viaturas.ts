import { Request, Response, Router } from "express";
import { ViaturasController } from "../controllers/viaturas";

const viaturasRoutes = Router();

const viaturasController = new ViaturasController();

viaturasRoutes.post("/", viaturasController.create);
viaturasRoutes.delete("/:id", viaturasController.delete);
viaturasRoutes.get("/:id", viaturasController.buscarViatura);
viaturasRoutes.get("/", viaturasController.listar);
viaturasRoutes.put("/:id", viaturasController.atualizar);

export { viaturasRoutes };
