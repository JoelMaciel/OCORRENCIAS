import { Request, Response, Router } from "express";
import { ViaturasController } from "../controllers/viaturas";

const viaturasRoutes = Router();

const viaturasController = new ViaturasController();

viaturasRoutes.post("/", viaturasController.create);
viaturasRoutes.delete("/:id", viaturasController.delete);
viaturasRoutes.get("/:id", viaturasController.findById);
viaturasRoutes.get("/", viaturasController.findAll);
viaturasRoutes.put("/:id", viaturasController.update);
viaturasRoutes.patch("/vincula-ocorrencia", viaturasController.vincularOcorrencia);

export { viaturasRoutes };
