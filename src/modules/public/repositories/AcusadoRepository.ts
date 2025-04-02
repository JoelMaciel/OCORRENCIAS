import { AppDataSource } from "../../../../ormconfig";
import { Acusado } from "../entities/Acusado";
import { IAcusadoRepository } from "./interfaces/IAcusadoRepository";

export class AcusadoRepository implements IAcusadoRepository {
  constructor(private readonly acusadoRepository = AppDataSource.getRepository(Acusado)) {}

  public async create(data: Partial<Batalhao>): Promise<Batalhao> {
    const newBatalhao = this.batalhaoRepository.create(data);
    return await this.batalhaoRepository.save(newBatalhao);
  }

  public async findById(id: string): Promise<Batalhao | null> {
    return await this.batalhaoRepository.findOne({
      where: { id },
    });
  }

  public async update(id: string, data: Partial<Batalhao>): Promise<Batalhao> {
    const batalhao = await this.batalhaoRepository.findOneOrFail({
      where: { id },
    });

    const batalhaoUpdated = this.batalhaoRepository.merge(batalhao, data);

    await this.batalhaoRepository.save(batalhaoUpdated);

    return batalhaoUpdated;
  }

  public async findAll(page: number, limit: number, nome?: string): Promise<[Batalhao[], number]> {
    const queryBuilder = this.batalhaoRepository
      .createQueryBuilder("batalhao")
      .leftJoinAndSelect("batalhao.endereco", "endereco");

    if (nome) {
      queryBuilder.where("LOWER(batalhao.nome) LIKE LOWER(:nome)", { nome: `%${nome}` });
    }

    const [result, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [result, total];
  }

  public async delete(id: string): Promise<void> {
    await this.batalhaoRepository.delete(id);
  }
}
