import { Router } from "express";
import { OcorrenciasController } from "../controllers/ocorrencias";

const ocorrenciasRoutes = Router();

const ocorrenciasController = new OcorrenciasController();

ocorrenciasRoutes.post("/", ocorrenciasController.create);
// ocorrenciasRoutes.get("/:id", ocorrenciasController.findById);
// ocorrenciasRoutes.delete("/:id", ocorrenciasController.delete);
// ocorrenciasRoutes.get("/", ocorrenciasController.findAll);
// ocorrenciasRoutes.put("/:id", ocorrenciasController.update);

export { ocorrenciasRoutes };
