import { Router } from "express";
import { AcusadosController } from "../controllers/acusados";

const acusadosRoutes = Router();

const acusadosController = new AcusadosController();

acusadosRoutes.post("/:id", acusadosController.create);

export { acusadosRoutes };
