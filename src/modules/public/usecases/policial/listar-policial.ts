import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";

@injectable()
export class ListarPolicialUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(): Promise<PolicialResponseDTO[]> {
    const policiais = await this.policialRepository.findAll();
    return policiais.map((policial) => new PolicialResponseDTO(policial));
  }
}
