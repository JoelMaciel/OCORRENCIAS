import { Batalhao } from "../../entities/Batalhao";

export interface IBatalhaoRepository {
  create(data: Partial<Batalhao>): Promise<Batalhao>;
  nameExists(nome: string): Promise<boolean>;
  update(id: string, data: Partial<Batalhao>): Promise<Batalhao>;
  findById(id: string): Promise<Batalhao | null>;
  findAll(page: number, limit: number, nome?: string): Promise<[Batalhao[], number]>;
  delete(id: string): Promise<void>;
}
