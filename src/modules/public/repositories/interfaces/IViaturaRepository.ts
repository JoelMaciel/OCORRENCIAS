import { ICreateViaturaDTO } from "../../dtos/ICreateViaturaDTO";
import { IUpdateViaturaDTO } from "../../dtos/IUpdateViaturaDTO";
import { Viatura } from "../../entities/Viatura";

export interface IViaturaRepository {
  create(data: ICreateViaturaDTO): Promise<Viatura>;
  update(id: string, newData: IUpdateViaturaDTO): Promise<Viatura>;
  findById(id: string): Promise<Viatura | null>;
  findAll(): Promise<Viatura[]>;
  delete(id: string): Promise<void>;
}
