import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import { UpdatePostoGraduacaoInput } from "../../dtos/schemas/AtualizarPostoGraduacaoSchema";
import PoliciaNotFoundException from "../../../../exceptions/PoliciaNotFoundException";

@injectable()
export class AtualizarPostoGraduacaolUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(id: string, dto: UpdatePostoGraduacaoInput): Promise<PolicialResponseDTO> {
    const exists = await this.policialRepository.findById(id);
    if (!exists) {
      throw new PoliciaNotFoundException();
    }

    const updatedPolicial = await this.policialRepository.updatePostoGraduacao(id, {
      postoGraduacao: dto.postoGraduacao,
      contato: dto.contato,
    });

    return new PolicialResponseDTO(updatedPolicial);
  }
}
