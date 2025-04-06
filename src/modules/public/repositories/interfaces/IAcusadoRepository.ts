import { Acusado } from "../../entities/Acusado";

export interface IAcusadoRepository {
  create(data: Partial<Acusado>): Promise<Acusado>;
  delete(acusado: Acusado): Promise<void>;
  findById(id: string): Promise<Acusado | null>;

  //   findAll(page: number, limit: number, nome?: string, cpf?: string): Promise<[Acusado[], number]>;

  //   update(id: string, data: Partial<Acusado>): Promise<Acusado>;
}
