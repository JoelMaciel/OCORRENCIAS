import { AppDataSource } from "../../../../ormconfig";
import { Arma } from "../entities/Arma";
import { IArmaRepository } from "./interfaces/IArmaRepository";

export class ArmaRepository implements IArmaRepository {
  constructor(private readonly armaRepository = AppDataSource.getRepository(Arma)) {}

  async create(data: Partial<Arma>): Promise<Arma> {
    const arma = this.armaRepository.create(data);
    return this.armaRepository.save(arma);
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
}
