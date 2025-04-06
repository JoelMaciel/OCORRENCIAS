import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import AppError from "../../../../errors/AppError";
import PoliciaNotFoundException from "../../../../exceptions/PoliciaNotFoundException";

@injectable()
export class DeletarPolicialUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const policial = await this.policialRepository.findById(id);

    if (!policial) {
      throw new PoliciaNotFoundException();
    }

    await this.policialRepository.delete(id);
  }
}
