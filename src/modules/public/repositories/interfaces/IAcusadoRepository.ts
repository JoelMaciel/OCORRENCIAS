import { Acusado } from "../../entities/Acusado";

export interface IAcusadoRepository {
  create(data: Partial<Acusado>): Promise<Acusado>;
  delete(acusado: Acusado): Promise<void>;
  findById(id: string): Promise<Acusado | null>;
  update(id: string, data: Partial<Acusado>): Promise<Acusado>;
  existsByCpf(cpf: string): Promise<boolean>;
  findAll(page: number, limit: number, nome?: string, cpf?: string): Promise<[Acusado[], number]>;
}
