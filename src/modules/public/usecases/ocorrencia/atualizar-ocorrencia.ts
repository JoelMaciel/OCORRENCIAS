import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";
import { UpdateOcorrenciaInput } from "../../dtos/schemas/UpdateOcorrenciaSchema";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarOcorrenciaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, dto: UpdateOcorrenciaInput): Promise<OcorrenciaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new AppError("Ocorrencia não encontrada", 404);
    }
    await this.validateMOcorrenciaDuplicado(dto.mOcorrencia);

    const updatedOcorrencia = await this.ocorrenciaRepository.update(id, dto);
    return new OcorrenciaResponseDTO(updatedOcorrencia);
  }

  private async validateMOcorrenciaDuplicado(mOcorrencia: string) {
    const mOcorrenciaDuplicado = await this.ocorrenciaRepository.existsByMOcorrencia(mOcorrencia);
    if (mOcorrenciaDuplicado) {
      throw new AppError("Já existe um M-Ocorrência com este número.", 409);
    }
  }
}
