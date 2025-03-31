import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { BatalhaoResponseDTO } from "../../dtos/response/BatalhaoResponseDTO";

@injectable()
export class ListarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(
    page: number,
    limit: number,
    nome?: string
  ): Promise<{
    batalhoes: BatalhaoResponseDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [batalhoes, total] = await this.batalhaoRepository.findAll(page, limit, nome);

    const totalPages = Math.ceil(total / limit);

    const batalhoesDTO = batalhoes.map((batalhao) => new BatalhaoResponseDTO(batalhao));

    return { batalhoes: batalhoesDTO, total, page, totalPages };
  }
}
