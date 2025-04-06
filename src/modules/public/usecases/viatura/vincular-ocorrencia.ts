import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { VincularOcorrenciaInput } from "../../dtos/schemas/VincularOcorrenciaSchema";
import ViaturaNotFoundException from "../../../../exceptions/ViaturaNotFoundException";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";

@injectable()
export class VincularOcorrenciaAViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository,
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(dto: VincularOcorrenciaInput): Promise<void> {
    const viatura = await this.viaturaRepository.findById(dto.viaturaId);
    if (!viatura) {
      throw new ViaturaNotFoundException();
    }

    const ocorrencia = await this.ocorrenciaRepository.findById(dto.ocorrenciaId);
    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    await this.viaturaRepository.vincularOcorrencia(dto.viaturaId, dto.ocorrenciaId);
  }
}
