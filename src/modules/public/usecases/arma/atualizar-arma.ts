import { inject, injectable } from "tsyringe";
import { IArmaRepository } from "../../repositories/interfaces/IArmaRepository";
import { CreateArmaInput } from "../../dtos/schemas/CreateArmaSchema";
import { ArmaResponseDTO } from "../../dtos/response/ArmaResponseDTO";
import ArmaNotFoundException from "../../../../exceptions/ArmaNotFoundException";

@injectable()
export class AtualizaArmaUseCase {
  constructor(@inject("ArmaRepository") private readonly armaRepository: IArmaRepository) {}

  public async execute(id: string, dto: CreateArmaInput): Promise<ArmaResponseDTO> {
    const arma = await this.armaRepository.findById(id);

    if (!arma) {
      throw new ArmaNotFoundException();
    }

    const updatedArma = await this.armaRepository.update(id, dto);

    return new ArmaResponseDTO(updatedArma);
  }
}
