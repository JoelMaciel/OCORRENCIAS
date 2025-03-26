import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../../../ormconfig";
import AppError from "../../../errors/AppError";
import { ICreatePolicialDTO } from "../dtos/request/ICreatePolicialDTO";
import { Policial } from "../entities/Policial";

import { IPolicialRepository } from "./interfaces/IPolicialRepository";

export class PolicialRepository implements IPolicialRepository {
  constructor(private readonly policialRepository = AppDataSource.getRepository(Policial)) {}

  public async create(
    batalhaoId: string,
    iCreatePolicialDTO: ICreatePolicialDTO
  ): Promise<Policial> {
    const policial = this.policialRepository.create({
      ...iCreatePolicialDTO,
      batalhao: { id: batalhaoId },
    });

    const savedPolicial = await this.policialRepository.save(policial);

    return this.policialRepository.findOneOrFail({
      where: { id: savedPolicial.id },
      relations: ["batalhao"],
    });
  }

  public async findById(id: string): Promise<Policial | null> {
    return await this.policialRepository
      .createQueryBuilder("policial")
      .leftJoinAndSelect("policial.batalhao", "batalhao")
      .select([
        "policial.id",
        "policial.nome",
        "policial.matricula",
        "policial.postoGraduacao",
        "batalhao.id",
        "batalhao.nome",
      ])
      .where("policial.id = :id", { id })
      .getOne();
  }

  public async updateBatalhao(id: string, dto: DeepPartial<Policial>): Promise<Policial> {
    const policial = await this.policialRepository.findOne({ where: { id } });

    if (!policial) {
      throw new AppError("Policial não encontrado", 404);
    }

    const updatedPolicia = this.policialRepository.merge(policial, dto);
    await this.policialRepository.save(updatedPolicia);
    return updatedPolicia;
  }

  public async updatePostoGraduacao(id: string, dto: DeepPartial<Policial>): Promise<Policial> {
    const policial = await this.policialRepository.findOne({ where: { id } });

    if (!policial) {
      throw new AppError("Policial não encontrado", 404);
    }

    const updatedPolicial = this.policialRepository.merge(policial, dto);
    await this.policialRepository.save(updatedPolicial);

    return this.policialRepository.findOneOrFail({
      where: { id },
      relations: ["batalhao"],
      select: ["id", "nome", "matricula", "postoGraduacao", "batalhao"],
    });
  }

  public async findAll(): Promise<Policial[]> {
    return await this.policialRepository.find({
      relations: ["batalhao"],
    });
  }

  public async delete(id: string): Promise<void> {
    await this.policialRepository.delete(id);
  }

  public async existsByMatricula(matricula: string): Promise<boolean> {
    const count = await this.policialRepository.count({ where: { matricula } });
    return count > 0;
  }
}
