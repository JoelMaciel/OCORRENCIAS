import { Acusado } from "../../entities/Acusado";

export interface IAcusadoRepository {
  create(data: Partial<Acusado>): Promise<Acusado>;

  //   findById(id: string): Promise<Acusado>;

  //   findAll(page: number, limit: number, nome?: string, cpf?: string): Promise<[Acusado[], number]>;

  //   update(id: string, data: Partial<Acusado>): Promise<Acusado>;

  //   delete(id: string): Promise<void>;
}
