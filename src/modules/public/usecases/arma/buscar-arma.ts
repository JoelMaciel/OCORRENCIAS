import { inject, injectable } from "tsyringe";
import { ArmaRepository } from "../../repositories/ArmaRepository";
import { IArmaRepository } from "../../repositories/interfaces/IArmaRepository";
import { ArmaResponseDTO } from "../../dtos/response/ArmaResponseDTO";
import ArmaNotFoundException from "../../../../exceptions/ArmaNotFoundException";

@injectable()
export class BuscarArmaUseCase {
  constructor(@inject("ArmaRepository") private readonly armaRepository: IArmaRepository) {}
  public async execute(id: string): Promise<ArmaResponseDTO> {
    const arma = await this.armaRepository.findById(id);

    if (!arma) {
      throw new ArmaNotFoundException();
    }
    return new ArmaResponseDTO(arma);
  }
}
