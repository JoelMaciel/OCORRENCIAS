import { inject, injectable } from "tsyringe";
import { IAcusadoRepository } from "../../repositories/interfaces/IAcusadoRepository";
import { AcusadoResponseDTO } from "../../dtos/response/AcusadoResponseDTO";
import AcusadoNotFoundException from "../../../../exceptions/AcusadoNotFoundException";

@injectable()
export class BuscarAcusadoUseCase {
  constructor(
    @inject("AcusadoRepository") private readonly acusadoRepository: IAcusadoRepository
  ) {}

  public async execute(id: string): Promise<AcusadoResponseDTO> {
    const acusado = await this.acusadoRepository.findById(id);
    if (!acusado) {
      throw new AcusadoNotFoundException();
    }
    return new AcusadoResponseDTO(acusado);
  }
}
