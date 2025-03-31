import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import AppError from "../../../../errors/AppError";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import { z } from "zod";
import { CreatePolicialSchema } from "../../dtos/schemas/CreatePolicialSchema";

@injectable()
export class CriarPolicialUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository,
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(
    batalhaoId: string,
    dto: z.infer<typeof CreatePolicialSchema>
  ): Promise<PolicialResponseDTO> {
    const batalhao = await this.batalhaoRepository.findById(batalhaoId);

    if (!batalhao) {
      throw new AppError("Batalhão não encontrado", 404);
    }

    const existsByMatricula = await this.policialRepository.existsByMatricula(dto.matricula);

    if (existsByMatricula) {
      throw new AppError("Já existe um policial cadastrado com essa matrícula", 409);
    }

    const policial = await this.policialRepository.create(batalhaoId, dto);

    return new PolicialResponseDTO(policial);
  }
}
