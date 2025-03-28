import { inject, injectable } from "tsyringe";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { AppDataSource } from "../../../../../ormconfig";
import { Policial } from "../../entities/Policial";
import { CorpoGuardaResponseDTO } from "../../dtos/response/CorpoGuardaResponseDTO ";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarCorpoGuardaUseCase {
  constructor(
    @inject("CorpoGuardaRepository") private readonly corpoGuardaRepository: ICorpoGuardaRepository
  ) {}

  private policiaRepository = AppDataSource.getRepository(Policial);

  public async execute(id: string, policialsIds: string[]): Promise<CorpoGuardaResponseDTO> {
    const policiais = await this.policiaRepository.find({
      where: policialsIds.map((id) => ({ id })),
    });

    if (policiais.length !== policialsIds.length) {
      throw new AppError("Um ou mais policias não foram encontrados", 404);
    }

    const corpoGuarda = await this.corpoGuardaRepository.update(id, policiais);
    return new CorpoGuardaResponseDTO(corpoGuarda);
  }
}
