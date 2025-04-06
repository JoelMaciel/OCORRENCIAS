import { Router } from "express";
import { OcorrenciasController } from "../controllers/ocorrencias";

const ocorrenciasRoutes = Router();

const ocorrenciasController = new OcorrenciasController();

ocorrenciasRoutes.post("/", ocorrenciasController.create);
ocorrenciasRoutes.get("/:id", ocorrenciasController.findById);
ocorrenciasRoutes.patch("/:id", ocorrenciasController.update);
ocorrenciasRoutes.get("/", ocorrenciasController.findAll);

export { ocorrenciasRoutes };
