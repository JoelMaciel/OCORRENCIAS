import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";

@injectable()
export class ListarPolicialUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(
    page: number,
    limit: number,
    matricula?: string
  ): Promise<{
    policiais: PolicialResponseDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [policiais, total] = await this.policialRepository.findAll(page, limit, matricula);

    const totalPages = Math.ceil(total / limit);

    const policiaisDTO = policiais.map((policial) => new PolicialResponseDTO(policial));

    return { policiais: policiaisDTO, total, page, totalPages };
  }
}
