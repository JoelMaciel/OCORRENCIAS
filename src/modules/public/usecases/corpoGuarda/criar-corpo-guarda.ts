import { inject, injectable } from "tsyringe";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { CorpoGuardaResponseDTO } from "../../dtos/response/CorpoGuardaResponseDTO ";
import AppError from "../../../../errors/AppError";
import { AppDataSource } from "../../../../../ormconfig";
import { Batalhao } from "../../entities/Batalhao";
import { Policial } from "../../entities/Policial";
import { z } from "zod";
import { CreateCorpoGuardaSchema } from "../../dtos/schemas/CreateCorpoGuardaSchema";

@injectable()
export class CriarCorpoGuardaUseCase {
  constructor(
    @inject("CorpoGuardaRepository") private readonly corpoGuardaRepository: ICorpoGuardaRepository
  ) {}

  private batalhaoRepository = AppDataSource.getRepository(Batalhao);
  private policialRepository = AppDataSource.getRepository(Policial);

  public async execute(
    dto: z.infer<typeof CreateCorpoGuardaSchema>
  ): Promise<CorpoGuardaResponseDTO> {
    const batalhao = await this.batalhaoRepository.findOne({
      where: { id: dto.batalhaoId },
    });

    if (!batalhao) {
      throw new AppError("Batalhão não encontrado", 404);
    }

    const comandante = await this.policialRepository.findOne({
      where: { id: dto.comandanteId },
    });

    if (!comandante) {
      throw new AppError("Comandante náo encontrado", 404);
    }

    const policiais = await this.policialRepository.find({
      where: dto.policiais.map((id) => ({ id })),
    });

    if (policiais.length !== dto.policiais.length) {
      throw new AppError("Um ou mais policias não foram encontrados");
    }
    const corpoGurda = await this.corpoGuardaRepository.create(batalhao, comandante, policiais);
    return new CorpoGuardaResponseDTO(corpoGurda);
  }
}
