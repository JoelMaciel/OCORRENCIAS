import { Router } from "express";
import { ArmasController } from "../controllers/armas";

const armasRoutes = Router();
const armasContoller = new ArmasController();

armasRoutes.post("/:id", armasContoller.create);
armasRoutes.get("/:id", armasContoller.findById);
armasRoutes.put("/:id", armasContoller.update);

export { armasRoutes };
