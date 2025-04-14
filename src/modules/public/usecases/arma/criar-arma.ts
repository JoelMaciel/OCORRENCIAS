import { inject, injectable } from "tsyringe";
import { IArmaRepository } from "../../repositories/interfaces/IArmaRepository";
import { CreateArmaInput } from "../../dtos/schemas/CreateArmaSchema";
import { ArmaResponseDTO } from "../../dtos/response/ArmaResponseDTO";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";

@injectable()
export class CriarArmaUseCase {
  constructor(
    @inject("ArmaRepository") private readonly armaRepository: IArmaRepository,
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, dto: CreateArmaInput): Promise<ArmaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);
    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }
    const savedArma = await this.armaRepository.create({
      ...dto,
      ocorrencia: ocorrencia,
    });

    return new ArmaResponseDTO(savedArma);
  }
}
