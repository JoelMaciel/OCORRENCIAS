import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../../../ormconfig";
import { Policial } from "../entities/Policial";

import { IPolicialRepository } from "./interfaces/IPolicialRepository";

export class PolicialRepository implements IPolicialRepository {
  constructor(private readonly policialRepository = AppDataSource.getRepository(Policial)) {}

  public async create(batalhaoId: string, data: Partial<Policial>): Promise<Policial> {
    const policial = this.policialRepository.create({
      ...data,
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

  public async updateBatalhao(id: string, data: DeepPartial<Policial>): Promise<Policial> {
    const policial = await this.policialRepository.findOneOrFail({ where: { id } });

    const updatedPolicia = this.policialRepository.merge(policial, data);
    await this.policialRepository.save(updatedPolicia);
    return updatedPolicia;
  }

  public async updatePostoGraduacao(id: string, data: DeepPartial<Policial>): Promise<Policial> {
    const policial = await this.policialRepository.findOneOrFail({
      where: { id },
    });

    const updatedPolicial = this.policialRepository.merge(policial, data);
    await this.policialRepository.save(updatedPolicial);

    return this.policialRepository.findOneOrFail({
      where: { id },
      relations: ["batalhao"],
      select: ["id", "nome", "matricula", "postoGraduacao", "batalhao"],
    });
  }

  public async findAll(
    page: number,
    limit: number,
    matricula?: string
  ): Promise<[Policial[], number]> {
    const queryBuilder = this.policialRepository
      .createQueryBuilder("policial")
      .leftJoin("policial.batalhao", "batalhao")
      .select([
        "policial.id",
        "policial.nome",
        "policial.matricula",
        "policial.postoGraduacao",
        "policial.createdAt",
        "policial.updatedAt",
        "batalhao.id",
        "batalhao.nome",
      ]);

    if (matricula) {
      queryBuilder.where("LOWER(policial.matricula) LIKE LOWER(:matricula)", {
        matricula: `${matricula}`,
      });
    }

    const [resul, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [resul, total];
  }

  public async delete(id: string): Promise<void> {
    await this.policialRepository.delete(id);
  }

  public async existsByMatricula(matricula: string): Promise<boolean> {
    const count = await this.policialRepository.count({ where: { matricula } });
    return count > 0;
  }
}
