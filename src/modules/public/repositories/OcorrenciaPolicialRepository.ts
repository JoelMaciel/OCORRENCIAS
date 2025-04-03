import { OcorrenciaPolicial } from "../entities/OcorrenciaPolicial";
import { IOcorrenciaPolicialRepository } from "./interfaces/IOcorrenciaPolicialRepository";
import { AppDataSource } from "../../../../ormconfig";

export class OcorrenciaPolicialRepository implements IOcorrenciaPolicialRepository {
  constructor(
    private readonly ocorrenciaPolicialRepository = AppDataSource.getRepository(OcorrenciaPolicial)
  ) {}

  public async associatePoliciaisToOcorrencia(
    ocorrenciaId: string,
    policiaisIds: string[]
  ): Promise<void> {
    const associations = policiaisIds.map((policialId) =>
      this.ocorrenciaPolicialRepository.create({
        ocorrencia: { id: ocorrenciaId },
        policial: { id: policialId },
      })
    );

    await this.ocorrenciaPolicialRepository.save(associations);
  }
}
