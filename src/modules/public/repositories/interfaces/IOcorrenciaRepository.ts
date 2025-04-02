import { Ocorrencia } from "../../entities/Ocorrencia";

export interface IOcorrenciaRepository {
  create(data: Partial<Ocorrencia>): Promise<Ocorrencia>;
  // findById(id: string): Promise<Ocorrencia | null>;
  // findAll(page: number, limit: number): Promise<[Ocorrencia[], number]>;
  // delete(id: string): Promise<void>;
}
