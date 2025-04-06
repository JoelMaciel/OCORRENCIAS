import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import AppError from "../../../../errors/AppError";
import ViaturaNotFoundException from "../../../../exceptions/ViaturaNotFoundException";

@injectable()
export class DeletarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new ViaturaNotFoundException();
    }
    await this.viaturaRepository.delete(id);
  }
}
