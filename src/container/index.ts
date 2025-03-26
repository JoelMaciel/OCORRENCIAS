import { container } from "tsyringe";
import { ViaturaRepository } from "../modules/public/repositories/ViaturaRepository";
import { BatalhaoRepository } from "../modules/public/repositories/BatalhaoRepository";
import { PolicialRepository } from "../modules/public/repositories/PolicialRepository";

container.registerSingleton("ViaturaRepository", ViaturaRepository);

container.registerSingleton("BatalhaoRepository", BatalhaoRepository);

container.registerSingleton("PolicialRepository", PolicialRepository);
