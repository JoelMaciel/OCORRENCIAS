import { AppDataSource } from "../../../../ormconfig";
import AppError from "../../../errors/AppError";
import { ICreateBatalhaoDTO } from "../dtos/request/ICreateBatalhaoDTO";
import { IUpdateBatalhaoDTO } from "../dtos/request/IUpdateBatalhaoDTO";
import { Batalhao } from "../entities/Batalhao";
import { IBatalhaoRepository } from "./interfaces/IBatalhaoRepository";

export class BatalhaoRepository implements IBatalhaoRepository {
  constructor(private readonly batalhaoRepository = AppDataSource.getRepository(Batalhao)) {}

  public async create(data: Partial<Batalhao>): Promise<Batalhao> {
    const newBatalhao = this.batalhaoRepository.create(data);
    return await this.batalhaoRepository.save(newBatalhao);
  }

  public async findById(id: string): Promise<Batalhao | null> {
    return await this.batalhaoRepository.findOne({
      where: { id },
    });
  }

  public async update(id: string, newData: IUpdateBatalhaoDTO): Promise<Batalhao> {
    const batalhao = await this.batalhaoRepository.findOne({
      where: { id },
    });

    if (!batalhao) {
      throw new AppError("Batalhao não encontrada");
    }

    const batalhaoUpdated = this.batalhaoRepository.merge(batalhao, newData);

    await this.batalhaoRepository.save(batalhaoUpdated);

    return batalhaoUpdated;
  }

  public async findAll(): Promise<Batalhao[]> {
    return await this.batalhaoRepository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.batalhaoRepository.delete(id);
  }
}
