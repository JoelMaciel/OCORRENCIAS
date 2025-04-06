import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";

@injectable()
export class ListarOcorrenciasUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(
    page: number = 1,
    limit: number = 10,
    mOcorrencia?: string,
    prefixoViatura?: string,
    dataHoraInicial?: string,
    dataHoraFinal?: string,
    status?: string
  ): Promise<{
    data: OcorrenciaResponseDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [ocorrencia, total] = await this.ocorrenciaRepository.findAll(
      page,
      limit,
      mOcorrencia,
      prefixoViatura,
      dataHoraInicial,
      dataHoraFinal,
      status
    );

    const totalPages = Math.ceil(total / limit);

    const data = ocorrencia.map((ocorrencia) => new OcorrenciaResponseDTO(ocorrencia));
    return { data, total, page, totalPages };
  }
}
