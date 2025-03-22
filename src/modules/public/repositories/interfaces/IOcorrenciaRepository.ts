import { Ocorrencia } from "../../entities/Ocorrencia";

export interface IOcorrenciaRepository {
  buscarOcorrenciaPorId(id: string): Promise<Ocorrencia | null>;

  criarOcorrencia(ocorrencia: Ocorrencia): Promise<Ocorrencia>;
}
