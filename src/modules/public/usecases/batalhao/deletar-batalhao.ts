import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import AppError from "../../../../errors/AppError";

@injectable()
export class DeletarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const batalhao = await this.batalhaoRepository.findById(id);
    if (!batalhao) {
      throw new AppError("Batalhão não encontrado", 404);
    }
    await this.batalhaoRepository.delete(id);
  }
}
