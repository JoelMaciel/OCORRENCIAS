import { Ocorrencia } from "../../entities/Ocorrencia";

export interface IOcorrenciaRepository {
  create(data: Partial<Ocorrencia>): Promise<Ocorrencia>;
  existsByMOcorrencia(mOcorrencia: string): Promise<boolean>;
  findById(id: string): Promise<Ocorrencia | null>;
  update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia>;
  findAll(
    page: number,
    limit: number,
    mOcorrencia?: string,
    prefixoViatura?: string,
    dataHoraInicial?: string,
    dataHoraFinal?: string,
    status?: string
  ): Promise<[Ocorrencia[], number]>;
  // delete(id: string): Promise<void>;
}
