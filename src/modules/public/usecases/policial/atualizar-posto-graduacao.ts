import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import AppError from "../../../../errors/AppError";
import { AtualizarPostoGraduacaoInput } from "../../dtos/schemas/AtualizarPostoGraduacaoSchema";

@injectable()
export class AtualizarPostoGraduacaolUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(
    id: string,
    dto: AtualizarPostoGraduacaoInput
  ): Promise<PolicialResponseDTO> {
    const exists = await this.policialRepository.findById(id);
    if (!exists) {
      throw new AppError("Policial não encontrado", 404);
    }

    const updatedPolicial = await this.policialRepository.updatePostoGraduacao(id, {
      postoGraduacao: dto.postoGraduacao,
      contato: dto.contato,
    });

    return new PolicialResponseDTO(updatedPolicial);
  }
}
