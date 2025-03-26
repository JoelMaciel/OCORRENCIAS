import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { IUpdateViaturaDTO } from "../../dtos/request/IUpdateViaturaDTO";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string, data: IUpdateViaturaDTO): Promise<any> {
    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new AppError("Viatura não encontrada.", 404);
    }

    const updatedViatura = await this.viaturaRepository.update(id, data);

    return updatedViatura;
  }
}
