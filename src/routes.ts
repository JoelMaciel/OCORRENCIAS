import { Router } from "express";
import { viaturasRoutes } from "./modules/public/routes/viaturas";
import { batalhoesRoutes } from "./modules/public/routes/batalhoes";

const routes = Router();
routes.use("/viaturas", viaturasRoutes);
routes.use("/batalhoes", batalhoesRoutes);

export { routes };
