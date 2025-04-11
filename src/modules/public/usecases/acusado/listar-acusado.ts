import { inject, injectable } from "tsyringe";
import { IAcusadoRepository } from "../../repositories/interfaces/IAcusadoRepository";
import { AcusadoResponseDTO } from "../../dtos/response/AcusadoResponseDTO";

@injectable()
export class ListarAcusadoUseCase {
  constructor(
    @inject("AcusadoRepository") private readonly acusadoRepository: IAcusadoRepository
  ) {}

  public async execute(
    page: number,
    limit: number,
    nome?: string,
    cpf?: string
  ): Promise<{ acusados: AcusadoResponseDTO[]; total: number; page: number; totalPages: number }> {
    const [acusados, total] = await this.acusadoRepository.findAll(page, limit, nome, cpf);

    const totalPages = Math.ceil(total / limit);

    const acusadosDTO = acusados.map((acusado) => new AcusadoResponseDTO(acusado));

    return { acusados: acusadosDTO, total, page, totalPages };
  }
}
