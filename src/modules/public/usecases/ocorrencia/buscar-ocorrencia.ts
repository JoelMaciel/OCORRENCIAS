import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";

@injectable()
export class BuscarOcorrenciaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string): Promise<OcorrenciaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    return new OcorrenciaResponseDTO(ocorrencia);
  }
}
