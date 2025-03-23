import { Ocorrencia } from "../entities/Ocorrencia";
import { AppDataSource } from "../../../../ormconfig";
import { singleton } from "tsyringe";
import { IOcorrenciaRepository } from "./interfaces/IOcorrenciaRepository";

@singleton()
export class OcorrenciaRepository implements IOcorrenciaRepository {
  constructor(private readonly ocorrenciaRepository = AppDataSource.getRepository(Ocorrencia)) {}

  async buscarOcorrenciaPorId(id: string): Promise<Ocorrencia | null> {
    return this.ocorrenciaRepository.findOne({ where: { id } });
  }

  async criarOcorrencia(ocorrencia: Ocorrencia): Promise<Ocorrencia> {
    return this.ocorrenciaRepository.save(ocorrencia);
  }
}
