import { AppDataSource } from "../../../../ormconfig";
import { ICreateBatalhaoDTO } from "../dtos/ICreateBatalhaoDTO";
import { Batalhao } from "../entities/Batalhao";
import { IBatalhaoRepository } from "./interfaces/IBatalhaoRepository";

export class BatalhaoRepository implements IBatalhaoRepository {
  constructor(private readonly batalhaoRepository = AppDataSource.getRepository(Batalhao)) {}

  public async create(data: ICreateBatalhaoDTO): Promise<Batalhao> {
    const batalhao = this.batalhaoRepository.create(data);
    return await this.batalhaoRepository.save(batalhao);
  }
}
