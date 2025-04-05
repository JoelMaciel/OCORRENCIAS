import { inject, injectable } from "tsyringe";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { AppDataSource } from "../../../../../ormconfig";
import { Policial } from "../../entities/Policial";
import { CorpoGuardaResponseDTO } from "../../dtos/response/CorpoGuardaResponseDTO ";
import AppError from "../../../../errors/AppError";
import { CorpoGuarda } from "../../entities/CorpoGuarda";
import { UpdateCorpoGuardaInput } from "../../dtos/schemas/UpdateCorpoGuardaSchema";

@injectable()
export class AtualizarCorpoGuardaUseCase {
  constructor(
    @inject("CorpoGuardaRepository") private readonly corpoGuardaRepository: ICorpoGuardaRepository
  ) {}

  private policiaRepository = AppDataSource.getRepository(Policial);

  public async execute(id: string, dto: UpdateCorpoGuardaInput): Promise<CorpoGuardaResponseDTO> {
    const corpoGuarda = await this.corpoGuardaRepository.findById(id);

    if (!corpoGuarda) {
      throw new AppError("Corpo Guarda não encontrado", 404);
    }

    const policiais = await this.policiaRepository.find({
      where: dto.policiais.map((id) => ({ id })),
    });

    if (policiais.length !== dto.policiais.length) {
      throw new AppError("Um ou mais policias não foram encontrados", 404);
    }

    const data: Partial<CorpoGuarda> = { policiais };

    const updatedCorpoGuarda = await this.corpoGuardaRepository.update(id, data);
    return new CorpoGuardaResponseDTO(updatedCorpoGuarda);
  }
}
