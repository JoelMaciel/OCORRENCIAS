import { Viatura } from "../../entities/Viatura";

export interface IViaturaRepository {
  create(data: Partial<Viatura>): Promise<Viatura>;
  prefixExists(prefixo: string): Promise<boolean>;
  update(id: string, data: Partial<Viatura>): Promise<Viatura>;
  findById(id: string): Promise<Viatura | null>;
  findAll(page: number, limit: number, prefixo?: string): Promise<[Viatura[], number]>;
  delete(id: string): Promise<void>;
  linkOccurrence(viaturaId: string, ocorrenciaId: string): Promise<void>;
}
