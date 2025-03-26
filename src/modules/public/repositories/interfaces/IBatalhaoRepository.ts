import { ICreateBatalhaoDTO } from "../../dtos/request/ICreateBatalhaoDTO";
import { IUpdateBatalhaoDTO } from "../../dtos/request/IUpdateBatalhaoDTO";
import { Batalhao } from "../../entities/Batalhao";

export interface IBatalhaoRepository {
  create(data: ICreateBatalhaoDTO): Promise<Batalhao>;
  update(id: string, newData: IUpdateBatalhaoDTO): Promise<Batalhao>;
  findById(id: string): Promise<Batalhao | null>;
  findAll(): Promise<Batalhao[]>;
  delete(id: string): Promise<void>;
}
