import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { DeepPartial } from "typeorm";
import { Policial } from "../../entities/Policial";
import AppError from "../../../../errors/AppError";
import { UpdatePoliciaBatalhaoInput } from "../../dtos/schemas/UpdatePoliciaBatalhaoSchema";

@injectable()
export class AtualizarPoliciaBatalhaoUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository,
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(id: string, dto: UpdatePoliciaBatalhaoInput): Promise<PolicialResponseDTO> {
    const policial = await this.policialRepository.findById(id);

    if (!policial) {
      throw new AppError("Policial não encontrado", 404);
    }

    const batalhao = await this.batalhaoRepository.findById(dto.batalhaoId);

    if (!batalhao) {
      throw new AppError("Batalhão não encontrado", 404);
    }

    const updateData: DeepPartial<Policial> = {
      batalhao: batalhao,
      contato: dto.contato,
    };

    const updatedPolicial = await this.policialRepository.updateBatalhao(id, updateData);
    return new PolicialResponseDTO(updatedPolicial);
  }
}
