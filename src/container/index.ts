import { container } from "tsyringe";
import { ViaturaRepository } from "../modules/public/repositories/ViaturaRepository";

container.registerSingleton("ViaturaRepository", ViaturaRepository);
