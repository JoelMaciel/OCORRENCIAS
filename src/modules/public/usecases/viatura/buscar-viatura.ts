import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import AppError from "../../../../errors/AppError";
import { ViaturaResponseDTO } from "../../dtos/response/ViaturaResponseDTO";

@injectable()
export class BuscarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string): Promise<ViaturaResponseDTO> {
    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new AppError("Viatura não encontrada.", 404);
    }
    return new ViaturaResponseDTO(viatura);
  }
}
