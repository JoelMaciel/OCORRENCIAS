import { inject, injectable } from "tsyringe";
import { IArmaRepository } from "../../repositories/interfaces/IArmaRepository";
import { ArmaResponseDTO } from "../../dtos/response/ArmaResponseDTO";

@injectable()
export class ListarArmaUseCase {
  constructor(@inject("ArmaRepository") private readonly armaRepository: IArmaRepository) {}

  public async execute(
    page: number,
    limit: number,
    dataInicial?: string,
    dataFinal?: string,
    ocorrenciaId?: string
  ): Promise<{ armas: ArmaResponseDTO[]; total: number; page: number; totalPages: number }> {
    const [armas, total] = await this.armaRepository.findAll(
      page,
      limit,
      dataInicial,
      dataFinal,
      ocorrenciaId
    );

    const totalPages = Math.ceil(total / limit);

    const armasDTO = armas.map((arma) => new ArmaResponseDTO(arma));
    return { armas: armasDTO, total, page, totalPages };
  }
}
