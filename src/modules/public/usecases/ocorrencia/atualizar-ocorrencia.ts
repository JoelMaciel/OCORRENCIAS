import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";
import { UpdateOcorrenciaInput } from "../../dtos/schemas/UpdateOcorrenciaSchema";
import AppError from "../../../../errors/AppError";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";

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

    const endereco = toEnderecoEntity(dto.endereco);
    const data = {
      ...dto,
      endereco: endereco,
    };

    const updatedOcorrencia = await this.ocorrenciaRepository.update(id, data);
    return new OcorrenciaResponseDTO(updatedOcorrencia);
  }
}
