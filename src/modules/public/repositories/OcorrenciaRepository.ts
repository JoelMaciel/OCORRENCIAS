import { Ocorrencia } from "../entities/Ocorrencia";
import { AppDataSource } from "../../../../ormconfig";
import { IOcorrenciaRepository } from "./interfaces/IOcorrenciaRepository";

export class OcorrenciaRepository implements IOcorrenciaRepository {
  constructor(private readonly ocorrenciaRepository = AppDataSource.getRepository(Ocorrencia)) {}

  public async create(data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = this.ocorrenciaRepository.create(data);
    console.log(ocorrencia);

    const savedOcorrencia = await this.ocorrenciaRepository.save(ocorrencia);
    console.log(" +++++++++++++++++++++++*********************Ocorrência salva:", savedOcorrencia);

    return savedOcorrencia;
  }
}
