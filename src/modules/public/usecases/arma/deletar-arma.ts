import { inject, injectable } from "tsyringe";
import { IArmaRepository } from "../../repositories/interfaces/IArmaRepository";
import ArmaNotFoundException from "../../../../exceptions/ArmaNotFoundException";

@injectable()
export class DeletarArmaUseCase {
  constructor(@inject("ArmaRepository") private readonly armaRepository: IArmaRepository) {}
  public async execute(id: string): Promise<void> {
    const arma = await this.armaRepository.findById(id);

    if (!arma) {
      throw new ArmaNotFoundException();
    }
    await this.armaRepository.delete(id);
  }
}
