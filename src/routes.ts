import { Router } from "express";
import { viaturasRoutes } from "./modules/public/routes/viaturas";
import { batalhoesRoutes } from "./modules/public/routes/batalhoes";
import { policiaisRoutes } from "./modules/public/routes/policiais";

const routes = Router();
routes.use("/viaturas", viaturasRoutes);
routes.use("/batalhoes", batalhoesRoutes);
routes.use("/policiais", policiaisRoutes);

export { routes };
