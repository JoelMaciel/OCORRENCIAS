import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import AppError from "../../../../errors/AppError";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";

@injectable()
export class BuscarOcorrenciaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string): Promise<OcorrenciaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new AppError("Ocorreência não encontrada", 404);
    }

    return new OcorrenciaResponseDTO(ocorrencia);
  }
}
