import { Router } from "express";
import { PoliciasController } from "../controllers/policiais";

const policiaisRoutes = Router();

const policiaisController = new PoliciasController();

policiaisRoutes.post("/:id", policiaisController.create);
policiaisRoutes.get("/", policiaisController.findAll);
policiaisRoutes.get("/:id", policiaisController.findById);
policiaisRoutes.delete("/:id", policiaisController.delete);
policiaisRoutes.patch("/:id/batalhao", policiaisController.updateBatalhao);
policiaisRoutes.patch("/:id/posto-graduacao", policiaisController.updatePostoGraduacao);

export { policiaisRoutes };
