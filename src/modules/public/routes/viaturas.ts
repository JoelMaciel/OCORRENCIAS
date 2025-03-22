import { Router } from "express";
import { ViaturasController } from "../controllers/viaturas";

const viaturasRoutes = Router();

const viaturasController = new ViaturasController();

viaturasRoutes.post("/", viaturasController.create as any);
viaturasRoutes.delete("/:id", viaturasController.delete as any);

export { viaturasRoutes };
