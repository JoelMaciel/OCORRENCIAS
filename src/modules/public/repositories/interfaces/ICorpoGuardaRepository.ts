import { CorpoGuarda } from "../../entities/CorpoGuarda";
import { Batalhao } from "../../entities/Batalhao";
import { Policial } from "../../entities/Policial";

export interface ICorpoGuardaRepository {
  create(batalhao: Batalhao, comandante: Policial, policiais: Policial[]): Promise<CorpoGuarda>;
  findById(id: string): Promise<CorpoGuarda | null>;
  findAll(
    page: number,
    limit: number,
    dataInicial?: Date,
    dataFinal?: Date
  ): Promise<[CorpoGuarda[], number]>;
  update(id: string, policiais: Policial[]): Promise<CorpoGuarda>;
}
