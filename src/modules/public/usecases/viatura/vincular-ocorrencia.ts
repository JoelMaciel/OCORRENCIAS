import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { VincularOcorrenciaInput } from "../../dtos/schemas/VincularOcorrenciaSchema";
import AppError from "../../../../errors/AppError";

@injectable()
export class VincularOcorrenciaAViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository,
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(dto: VincularOcorrenciaInput): Promise<void> {
    const viatura = await this.viaturaRepository.findById(dto.viaturaId);
    if (!viatura) {
      throw new AppError("Viatura não encontrada.", 404);
    }

    const ocorrencia = await this.ocorrenciaRepository.findById(dto.ocorrenciaId);
    if (!ocorrencia) {
      throw new AppError("Ocorrência não encontrada", 404);
    }

    await this.viaturaRepository.vincularOcorrencia(dto.viaturaId, dto.ocorrenciaId);
  }
}
