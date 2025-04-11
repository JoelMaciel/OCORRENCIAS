import { Router } from "express";
import { viaturasRoutes } from "./modules/public/routes/viaturas";
import { batalhoesRoutes } from "./modules/public/routes/batalhoes";
import { policiaisRoutes } from "./modules/public/routes/policiais";
import { corpoGuardaRoutes } from "./modules/public/routes/corpoGuarda";
import { ocorrenciasRoutes } from "./modules/public/routes/ocorrencias";
import { acusadosRoutes } from "./modules/public/routes/acusados";

const routes = Router();

routes.use("/viaturas", viaturasRoutes);
routes.use("/batalhoes", batalhoesRoutes);
routes.use("/policiais", policiaisRoutes);
routes.use("/corpoGuarda", corpoGuardaRoutes);
routes.use("/ocorrencias", ocorrenciasRoutes);
routes.use("/acusados", acusadosRoutes);

export { routes };
