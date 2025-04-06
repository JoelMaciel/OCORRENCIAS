import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { ViaturaResponseDTO } from "../../dtos/response/ViaturaResponseDTO";
import ViaturaNotFoundException from "../../../../exceptions/ViaturaNotFoundException";

@injectable()
export class BuscarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string): Promise<ViaturaResponseDTO> {
    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new ViaturaNotFoundException();
    }
    return new ViaturaResponseDTO(viatura);
  }
}
