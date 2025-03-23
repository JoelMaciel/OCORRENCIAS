import { Router } from "express";
import { BatalhoesController } from "../controllers/batalhoes";

const batalhoesRoutes = Router();

const batalhoesController = new BatalhoesController();

batalhoesRoutes.post("/", batalhoesController.create);
batalhoesRoutes.get("/:id", batalhoesController.buscar);
batalhoesRoutes.delete("/:id", batalhoesController.delete);

export { batalhoesRoutes };
