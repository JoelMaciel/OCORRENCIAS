import { inject, injectable } from "tsyringe";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { CorpoGuardaResponseDTO } from "../../dtos/response/CorpoGuardaResponseDTO ";

@injectable()
export class ListarCorpoGuardaUseCase {
  constructor(
    @inject("CorpoGuardaRepository") private readonly corpoGuardaRepository: ICorpoGuardaRepository
  ) {}

  public async execute(
    page: number = 1,
    limit: number = 10,
    dataInicial?: Date,
    dataFinal?: Date
  ): Promise<{ data: CorpoGuardaResponseDTO[]; total: number; page: number; totalPages: number }> {
    const [corposGuarda, total] = await this.corpoGuardaRepository.findAll(
      page,
      limit,
      dataInicial,
      dataFinal
    );
    const totalPages = Math.ceil(total / limit);

    const data = corposGuarda.map((corpoGuarda) => new CorpoGuardaResponseDTO(corpoGuarda));

    return { data, total, page, totalPages };
  }
}
