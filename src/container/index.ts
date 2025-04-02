import { container } from "tsyringe";
import { ViaturaRepository } from "../modules/public/repositories/ViaturaRepository";
import { BatalhaoRepository } from "../modules/public/repositories/BatalhaoRepository";
import { PolicialRepository } from "../modules/public/repositories/PolicialRepository";
import { CorpoGuardaRepository } from "../modules/public/repositories/CorpoGuardaRepository";
import { OcorrenciaRepository } from "../modules/public/repositories/OcorrenciaRepository";
import { IRoleRepository } from "../modules/public/repositories/interfaces/IRoleRepository";
import { RoleRepository } from "../modules/public/repositories/RoleRepository";

container.registerSingleton("ViaturaRepository", ViaturaRepository);

container.registerSingleton("BatalhaoRepository", BatalhaoRepository);

container.registerSingleton("PolicialRepository", PolicialRepository);

container.registerSingleton("RoleRepository", RoleRepository);

container.registerSingleton("CorpoGuardaRepository", CorpoGuardaRepository);

container.registerSingleton("OcorrenciaRepository", OcorrenciaRepository);
