import { Router } from "express";
import { BatalhoesController } from "../controllers/batalhoes";

const batalhoesRoutes = Router();

const batalhoesController = new BatalhoesController();

batalhoesRoutes.post("/", batalhoesController.create);
batalhoesRoutes.get("/:id", batalhoesController.findById);
batalhoesRoutes.delete("/:id", batalhoesController.delete);
batalhoesRoutes.get("/", batalhoesController.findAll);
batalhoesRoutes.put("/:id", batalhoesController.update);

export { batalhoesRoutes };
