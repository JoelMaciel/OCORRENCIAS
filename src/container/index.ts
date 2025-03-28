import { container } from "tsyringe";
import { ViaturaRepository } from "../modules/public/repositories/ViaturaRepository";
import { BatalhaoRepository } from "../modules/public/repositories/BatalhaoRepository";
import { PolicialRepository } from "../modules/public/repositories/PolicialRepository";
import { CorpoGuardaRepository } from "../modules/public/repositories/CorpoGuardaRepository";

container.registerSingleton("ViaturaRepository", ViaturaRepository);

container.registerSingleton("BatalhaoRepository", BatalhaoRepository);

container.registerSingleton("PolicialRepository", PolicialRepository);

container.registerSingleton("CorpoGuardaRepository", CorpoGuardaRepository);
