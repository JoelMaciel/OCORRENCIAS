import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { AtualizarPostoGraduacaoDTO } from "../../dtos/request/AtualizarPostoGraduacaoDTO";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarPostoGraduacaolUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(id: string, dto: AtualizarPostoGraduacaoDTO): Promise<PolicialResponseDTO> {
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
