import { Router } from "express";
import { viaturasRoutes } from "./modules/public/routes/viaturas";

const routes = Router();
routes.use("/viaturas", viaturasRoutes);

export { routes };
