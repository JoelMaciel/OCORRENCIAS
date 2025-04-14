import { Arma } from "../../entities/Arma";

export interface IArmaRepository {
  create(data: Partial<Arma>): Promise<Arma>;
  findById(id: string): Promise<Arma | null>;
  update(id: string, data: Partial<Arma>): Promise<Arma>;
  findAll(
    page: number,
    limit: number,
    dataInicial?: string,
    dataFinal?: string,
    ocorrenciaId?: string
  ): Promise<[Arma[], number]>;
  delete(id: string): Promise<void>;
}
