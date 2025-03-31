import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import AppError from "../../../../errors/AppError";
import { AtualizarViaturaSchema } from "../../dtos/schemas/AtualizarViaturaSchema";
import { z } from "zod";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { ViaturaResponseDTO } from "../../dtos/response/ViaturaResponseDTO";

@injectable()
export class AtualizarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository,
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(id: string, dto: z.infer<typeof AtualizarViaturaSchema>): Promise<any> {
    const batalhao = await this.batalhaoRepository.findById(dto.batalhaoId);

    if (!batalhao) {
      throw new AppError("Batalhão não encotrado", 404);
    }

    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new AppError("Viatura não encontrada.", 404);
    }

    const dataViatura = {
      prefixo: dto.prefixo,
      batalhao: batalhao,
    };

    const updatedViatura = await this.viaturaRepository.update(id, dataViatura);

    return new ViaturaResponseDTO(updatedViatura);
  }
}
