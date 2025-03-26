import { DeepPartial } from "typeorm";
import { ICreatePolicialDTO } from "../../dtos/request/ICreatePolicialDTO";
import { Policial } from "../../entities/Policial";

export interface IPolicialRepository {
  create(batalhaoId: string, dto: ICreatePolicialDTO): Promise<Policial>;
  existsByMatricula(matricula: string): Promise<boolean>;
  findAll(): Promise<Policial[]>;
  findById(policialId: string): Promise<Policial | null>;
  updateBatalhao(id: string, dto: DeepPartial<Policial>): Promise<Policial>;
  updatePostoGraduacao(id: string, dto: DeepPartial<Policial>): Promise<Policial>;
  delete(id: string): Promise<void>;
}
