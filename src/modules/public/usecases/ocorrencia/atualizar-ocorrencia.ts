import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";
import { UpdateOcorrenciaInput } from "../../dtos/schemas/UpdateOcorrenciaSchema";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import MOcorrenciaAlredyExistsException from "../../../../exceptions/MOcorrenciaAlreadyExistsException";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import { Ocorrencia } from "../../entities/Ocorrencia";

@injectable()
export class AtualizarOcorrenciaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, dto: UpdateOcorrenciaInput): Promise<OcorrenciaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    await this.validateMOcorrenciaDuplicado(dto.mOcorrencia);

    const updateData = this.prepareDataUpdate(dto);

    const updatedOcorrencia = await this.ocorrenciaRepository.update(id, updateData);
    return new OcorrenciaResponseDTO(updatedOcorrencia);
  }

  private async validateMOcorrenciaDuplicado(mOcorrencia: string) {
    const mOcorrenciaDuplicado = await this.ocorrenciaRepository.existsByMOcorrencia(mOcorrencia);
    if (mOcorrenciaDuplicado) {
      throw new MOcorrenciaAlredyExistsException(mOcorrencia);
    }
  }

  private prepareDataUpdate(dto: UpdateOcorrenciaInput): Partial<Ocorrencia> {
    return {
      ...dto,
      endereco: toEnderecoEntity(dto.endereco),
    };
  }
}
