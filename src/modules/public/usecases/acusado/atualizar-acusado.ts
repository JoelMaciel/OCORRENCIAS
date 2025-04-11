import { inject, injectable } from "tsyringe";
import { UpdateAcusadoRequestDTO } from "../../dtos/schemas/UpdateAcusadoSchema ";
import { AcusadoResponseDTO } from "../../dtos/response/AcusadoResponseDTO";
import AcusadoNotFoundException from "../../../../exceptions/AcusadoNotFoundException";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import { IAcusadoRepository } from "../../repositories/interfaces/IAcusadoRepository";

@injectable()
export class AtualizarAcusadoUseCase {
  constructor(
    @inject("AcusadoRepository") private readonly acusadoRepository: IAcusadoRepository
  ) {}

  async execute(id: string, dto: UpdateAcusadoRequestDTO): Promise<AcusadoResponseDTO> {
    const acusado = await this.acusadoRepository.findById(id);

    if (!acusado) {
      throw new AcusadoNotFoundException();
    }

    const endereco = toEnderecoEntity(dto.endereco);

    const data = {
      ...dto,
      endereco: endereco,
    };

    const updatedAcusado = await this.acusadoRepository.update(id, data);

    return new AcusadoResponseDTO(updatedAcusado);
  }
}
