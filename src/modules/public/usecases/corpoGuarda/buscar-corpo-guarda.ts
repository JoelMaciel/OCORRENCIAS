import { inject, injectable } from "tsyringe";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { CorpoGuardaResponseDTO } from "../../dtos/response/CorpoGuardaResponseDTO ";
import AppError from "../../../../errors/AppError";

@injectable()
export class BuscarCorpoGuardaUseCase {
  constructor(
    @inject("CorpoGuardaRepository")
    private readonly corpoGuardaRepository: ICorpoGuardaRepository
  ) {}

  public async execute(id: string): Promise<CorpoGuardaResponseDTO> {
    const corpoGuarda = await this.corpoGuardaRepository.findById(id);

    if (!corpoGuarda) {
      throw new AppError("Corpo Guarda não encontrado", 404);
    }

    return new CorpoGuardaResponseDTO(corpoGuarda);
  }
}
