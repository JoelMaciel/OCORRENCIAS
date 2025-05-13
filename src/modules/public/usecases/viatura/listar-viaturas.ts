import { inject, injectable } from "tsyringe";
import { Viatura } from "../../entities/Viatura";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { ViaturaResponseDTO } from "../../dtos/response/ViaturaResponseDTO";

@injectable()
export class ListarViaturasUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(
    page: number,
    limit: number,
    prefixo?: string,
    status?: string
  ): Promise<{
    viaturas: ViaturaResponseDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [viaturas, total] = await this.viaturaRepository.findAll(page, limit, prefixo, status);

    const totalPages = Math.ceil(total / limit);

    const viaturasDTO = viaturas.map((viatura) => new ViaturaResponseDTO(viatura));

    return { viaturas: viaturasDTO, total, page, totalPages };
  }
}
