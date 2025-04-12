import { Arma } from "../../entities/Arma";

export interface IArmaRepository {
  create(data: Partial<Arma>): Promise<Arma>;
  findById(id: string): Promise<Arma | null>;
  update(id: string, data: Partial<Arma>): Promise<Arma>;
}
