import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import AppError from "../../../../errors/AppError";

import { z } from "zod";
import { AtualizarPostoGraduacaoSchema } from "../../dtos/schemas/AtualizarPostoGraduacaoSchema";

@injectable()
export class AtualizarPostoGraduacaolUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(
    id: string,
    dto: z.infer<typeof AtualizarPostoGraduacaoSchema>
  ): Promise<PolicialResponseDTO> {
    const exists = await this.policialRepository.findById(id);
    if (!exists) {
      throw new AppError("Policial não encontrado", 404);
    }

    const updatedPolicial = await this.policialRepository.updatePostoGraduacao(id, {
      postoGraduacao: dto.postoGraduacao,
    });

    return new PolicialResponseDTO(updatedPolicial);
  }
}
