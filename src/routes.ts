import { Router } from "express";
import { viaturasRoutes } from "./modules/public/routes/viaturas";
import { batalhoesRoutes } from "./modules/public/routes/batalhoes";
import { policiaisRoutes } from "./modules/public/routes/policiais";
import { corpoGuardaRoutes } from "./modules/public/routes/corpoGuarda";

const routes = Router();
routes.use("/viaturas", viaturasRoutes);
routes.use("/batalhoes", batalhoesRoutes);
routes.use("/policiais", policiaisRoutes);
routes.use("/corpoGuarda", corpoGuardaRoutes);

export { routes };
