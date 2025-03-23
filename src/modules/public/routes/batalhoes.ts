import { Router } from "express";
import { BatalhoesController } from "../controllers/batalhoes";

const batalhoesRoutes = Router();

const batalhoesController = new BatalhoesController();

batalhoesRoutes.post("/", batalhoesController.create);

export { batalhoesRoutes };
