import { Ocorrencia } from "../entities/Ocorrencia";
import { AppDataSource } from "../../../../ormconfig";
import { IOcorrenciaRepository } from "./interfaces/IOcorrenciaRepository";

export class OcorrenciaRepository implements IOcorrenciaRepository {
  constructor(private readonly ocorrenciaRepository = AppDataSource.getRepository(Ocorrencia)) {}

  public async create(data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = this.ocorrenciaRepository.create(data);

    const savedOcorrencia = await this.ocorrenciaRepository.save(ocorrencia);

    return savedOcorrencia;
  }

  public async existsByMOcorrencia(mOcorrencia: string): Promise<boolean> {
    const ocorrenciaExistente = await this.ocorrenciaRepository.findOne({
      where: { mOcorrencia },
    });

    return !!ocorrenciaExistente;
  }
}
