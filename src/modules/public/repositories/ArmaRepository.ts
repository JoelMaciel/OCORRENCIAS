import { AppDataSource } from "../../../../ormconfig";
import { Arma } from "../entities/Arma";
import { IArmaRepository } from "./interfaces/IArmaRepository";

export class ArmaRepository implements IArmaRepository {
  constructor(private readonly armaRepository = AppDataSource.getRepository(Arma)) {}

  async create(data: Partial<Arma>): Promise<Arma> {
    const arma = this.armaRepository.create(data);
    return this.armaRepository.save(arma);
  }

  async findAll(
    page: number,
    limit: number,
    dataInicial?: string,
    dataFinal?: string,
    ocorrenciaId?: string
  ): Promise<[Arma[], number]> {
    const queryBuilder = this.armaRepository
      .createQueryBuilder("arma")
      .leftJoinAndSelect("arma.ocorrencia", "ocorrencia")
      .select([
        "arma.id",
        "arma.tipo",
        "arma.calibre",
        "arma.numeracao",
        "arma.createdAt",
        "ocorrencia.id",
      ]);

    if (dataInicial && dataFinal) {
      queryBuilder.andWhere("arma.createdAt BETWEEN :dataInicial AND :dataFinal", {
        dataInicial: new Date(dataInicial),
        dataFinal: new Date(dataFinal),
      });
    } else if (dataInicial) {
      queryBuilder.andWhere("arma.createdAt >= :dataInicial", {
        dataInicial: new Date(dataInicial),
      });
    } else if (dataFinal) {
      queryBuilder.andWhere("arma.createdAt <= :dataFinal", {
        dataFinal: new Date(dataFinal),
      });
    }

    if (ocorrenciaId) {
      queryBuilder.andWhere("ocorrencia.id = :ocorrenciaId", { ocorrenciaId });
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [resultados, total] = await queryBuilder.getManyAndCount();

    return [resultados, total];
  }

  async findById(id: string): Promise<Arma | null> {
    return await this.armaRepository
      .createQueryBuilder("arma")
      .leftJoinAndSelect("arma.ocorrencia", "ocorrencia")
      .select(["arma.id", "arma.tipo", "arma.calibre", "arma.numeracao", "ocorrencia.id"])
      .where("arma.id = :id", { id })
      .getOne();
  }

  async update(id: string, data: Partial<Arma>): Promise<Arma> {
    const arma = await this.armaRepository
      .createQueryBuilder("arma")
      .leftJoinAndSelect("arma.ocorrencia", "ocorrencia")
      .select(["arma.id", "arma.tipo", "arma.calibre", "arma.numeracao", "ocorrencia.id"])
      .where("arma.id = :id", { id })
      .getOneOrFail();

    const updatedArma = this.armaRepository.merge(arma, data);
    return await this.armaRepository.save(updatedArma);
  }

  async delete(id: string): Promise<void> {
    await this.armaRepository.delete(id);
  }
}
