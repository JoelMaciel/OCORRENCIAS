import { container } from "tsyringe";
import { ViaturaRepository } from "../modules/public/repositories/ViaturaRepository";
import { BatalhaoRepository } from "../modules/public/repositories/BatalhaoRepository";

container.registerSingleton("ViaturaRepository", ViaturaRepository);

container.registerSingleton("BatalhaoRepository", BatalhaoRepository);
