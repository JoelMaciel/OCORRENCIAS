import { AppDataSource } from "../../../../ormconfig";
import { Batalhao } from "../entities/Batalhao";
import { CorpoGuarda } from "../entities/CorpoGuarda";
import { Policial } from "../entities/Policial";
import { ICorpoGuardaRepository } from "./interfaces/ICorpoGuardaRepository";

export class CorpoGuardaRepository implements ICorpoGuardaRepository {
  constructor(private readonly corpoGuardaRepository = AppDataSource.getRepository(CorpoGuarda)) {}

  public async create(
    batalhao: Batalhao,
    comandante: Policial,
    policiais: Policial[]
  ): Promise<CorpoGuarda> {
    const corpoGuarda = this.corpoGuardaRepository.create({
      batalhao,
      comandante,
      policiais,
    });
    await this.corpoGuardaRepository.save(corpoGuarda);
    return corpoGuarda;
  }

  public async findById(id: string): Promise<CorpoGuarda | null> {
    return await this.corpoGuardaRepository
      .createQueryBuilder("corpoGuarda")
      .leftJoinAndSelect("corpoGuarda.batalhao", "batalhao")
      .leftJoinAndSelect("corpoGuarda.comandante", "comandante")
      .leftJoinAndSelect("corpoGuarda.policiais", "policiais")
      .where("corpoGuarda.id = :id", { id })
      .getOne();
  }

  public async findAll(
    page: number = 1,
    limit: number = 10,
    dataInicial?: Date,
    dataFinal?: Date
  ): Promise<[CorpoGuarda[], number]> {
    const skip = (page - 1) * limit;
    const query = this.corpoGuardaRepository
      .createQueryBuilder("corpoGuarda")
      .select(["corpoGuarda.id", "corpoGuarda.dataCriacao", "corpoGuarda.dataAtualizacao"])
      .leftJoinAndSelect("corpoGuarda.batalhao", "batalhao")
      .addSelect(["batalhao.nome"])
      .leftJoinAndSelect("corpoGuarda.comandante", "comandante")
      .addSelect(["comandante.nome", "comandante.postoGraduacao"])
      .leftJoinAndSelect("corpoGuarda.policiais", "policiais")
      .addSelect(["policiais.nome", "policiais.postoGraduacao"])
      .skip(skip)
      .take(limit);

    if (dataInicial && dataFinal) {
      query.andWhere("corpoGuarda.dataCriacao BETWEEN :dataInicial AND :dataFinal", {
        dataInicial,
        dataFinal,
      });
    } else if (dataInicial) {
      query.andWhere("corpoGuarda.dataCriacao >= :dataInicial", { dataInicial });
    } else if (dataFinal) {
      query.andWhere("corpoGuarda.dataCriacao <= :dataFinal", { dataFinal });
    }

    return await query.getManyAndCount();
  }

  public async update(id: string, data: Partial<CorpoGuarda>): Promise<CorpoGuarda> {
    const corpoGuarda = await this.corpoGuardaRepository.findOneOrFail({
      where: { id },
    });

    const updatedCorpoGuarda = this.corpoGuardaRepository.merge(corpoGuarda, data);
    return await this.corpoGuardaRepository.save(corpoGuarda);
  }
}
