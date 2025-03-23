import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { Viatura } from "../../entities/Viatura";
import AppError from "../../../../errors/AppError";

@injectable()
export class BuscarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string): Promise<Viatura | null> {
    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new AppError("Viatura não encontrada.", 404);
    }
    return viatura;
  }
}
