import { AppDataSource } from "../../../../ormconfig";
import { Batalhao } from "../entities/Batalhao";
import { IBatalhaoRepository } from "./interfaces/IBatalhaoRepository";

export class BatalhaoRepository implements IBatalhaoRepository {
  constructor(private readonly batalhaoRepository = AppDataSource.getRepository(Batalhao)) {}

  async create(data: Partial<Batalhao>): Promise<Batalhao> {
    const newBatalhao = this.batalhaoRepository.create(data);
    return await this.batalhaoRepository.save(newBatalhao);
  }

  async nameExists(nome: string): Promise<boolean> {
    return await this.batalhaoRepository.exists({
      where: { nome },
    });
  }

  async findById(id: string): Promise<Batalhao | null> {
    return await this.batalhaoRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Batalhao>): Promise<Batalhao> {
    const batalhao = await this.batalhaoRepository.findOneOrFail({
      where: { id },
    });

    const batalhaoUpdated = this.batalhaoRepository.merge(batalhao, data);

    await this.batalhaoRepository.save(batalhaoUpdated);

    return batalhaoUpdated;
  }

  async findAll(page: number, limit: number, nome?: string): Promise<[Batalhao[], number]> {
    const queryBuilder = this.batalhaoRepository
      .createQueryBuilder("batalhao")
      .leftJoinAndSelect("batalhao.endereco", "endereco");

    if (nome) {
      queryBuilder.where("LOWER(batalhao.nome) LIKE LOWER(:nome)", { nome: `%${nome}%` });
    }

    const [result, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [result, total];
  }

  async delete(id: string): Promise<void> {
    await this.batalhaoRepository.delete(id);
  }
}
