import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import AppError from "../../../../errors/AppError";
import { Batalhao } from "../../entities/Batalhao";
import { BatalhaoResponseDTO } from "../../dtos/response/BatalhaoResponseDTO";

@injectable()
export class BuscarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(id: string): Promise<BatalhaoResponseDTO> {
    const batalhao = await this.batalhaoRepository.findById(id);

    if (!batalhao) {
      throw new AppError("Batalhão não encontrado", 404);
    }
    return new BatalhaoResponseDTO(batalhao);
  }
}
