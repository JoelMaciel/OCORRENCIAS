import { inject, injectable } from "tsyringe";
import { Ocorrencia } from "../../entities/Ocorrencia";
import { StatusOcorrencia } from "../../enums/StatusOcorrencia";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarStatusConcluidaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, status: StatusOcorrencia): Promise<void> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    this.validateStatus(ocorrencia);

    ocorrencia.status = status;
    await this.ocorrenciaRepository.update(id, ocorrencia);
  }

  private validateStatus(ocorrencia: Ocorrencia): void {
    if (
      ocorrencia?.status === StatusOcorrencia.CONCLUIDA ||
      ocorrencia?.status === StatusOcorrencia.CANCELADA
    ) {
      throw new AppError("Ocorrência não pode ser concluída pois está cancelada ou já concluída");
    }
  }
}
