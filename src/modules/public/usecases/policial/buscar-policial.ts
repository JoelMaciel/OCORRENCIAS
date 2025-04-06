import { inject, injectable } from "tsyringe";
import { PolicialRepository } from "../../repositories/PolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import PoliciaNotFoundException from "../../../../exceptions/PoliciaNotFoundException";

@injectable()
export class BuscarPolicialUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: PolicialRepository
  ) {}

  public async execute(id: string): Promise<PolicialResponseDTO> {
    const policial = await this.policialRepository.findById(id);

    if (!policial) {
      throw new PoliciaNotFoundException();
    }

    return new PolicialResponseDTO(policial);
  }
}
