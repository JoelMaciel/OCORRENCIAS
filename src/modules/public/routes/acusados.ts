import { Router } from "express";
import { AcusadosController } from "../controllers/acusados";

const acusadosRoutes = Router();

const acusadosController = new AcusadosController();

acusadosRoutes.post("/:id", acusadosController.create);
acusadosRoutes.delete("/:id", acusadosController.delete);
acusadosRoutes.put("/:id", acusadosController.update);
acusadosRoutes.get("/:id", acusadosController.findById);
acusadosRoutes.get("/", acusadosController.findAll);

export { acusadosRoutes };
