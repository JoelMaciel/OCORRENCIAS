import { IViaturaRepository } from "./interfaces/IViaturaRepository";
import { AppDataSource } from "../../../../ormconfig";
import { Viatura } from "../entities/Viatura";

export class ViaturaRepository implements IViaturaRepository {
  constructor(private readonly viaturaRepository = AppDataSource.getRepository(Viatura)) {}

  public async create(data: Partial<Viatura>): Promise<Viatura> {
    const viatura = this.viaturaRepository.create(data);
    await this.viaturaRepository.save(viatura);
    return viatura;
  }

  public async update(id: string, data: Partial<Viatura>): Promise<Viatura> {
    const viatura = await this.viaturaRepository.findOneOrFail({ where: { id } });

    const updatedViatura = this.viaturaRepository.merge(viatura, data);
    await this.viaturaRepository.save(updatedViatura);
    return updatedViatura;
  }

  public async vincularOcorrencia(viaturaId: string, ocorrenciaId: string): Promise<void> {
    await this.viaturaRepository
      .createQueryBuilder()
      .update(Viatura)
      .set({ ocorrencia: { id: ocorrenciaId } })
      .where("id = :id", { id: viaturaId })
      .execute();
  }

  public async findById(id: string): Promise<Viatura | null> {
    return await this.viaturaRepository
      .createQueryBuilder("viatura")
      .leftJoinAndSelect("viatura.batalhao", "batalhao")
      .select([
        "viatura.id",
        "viatura.prefixo",
        "viatura.placa",
        "viatura.modelo",
        "viatura.status",
        "batalhao.id",
        "batalhao.nome",
      ])
      .where("viatura.id = :id", { id })
      .getOne();
  }

  public async findAll(
    page: number,
    limit: number,
    prefixo?: string
  ): Promise<[Viatura[], number]> {
    const queryBuilder = this.viaturaRepository
      .createQueryBuilder("viatura")
      .leftJoin("viatura.batalhao", "batalhao")
      .select([
        "viatura.id",
        "viatura.prefixo",
        "viatura.placa",
        "viatura.modelo",
        "viatura.status",
        "viatura.batalhao_id",
        "batalhao.id",
        "batalhao.nome",
      ]);

    if (prefixo) {
      queryBuilder.where("LOWER(viatura.prefixo) LIKE LOWER(:prefixo)", { prefixo: `%${prefixo}` });
    }

    const [result, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return [result, total];
  }

  public async delete(id: string): Promise<void> {
    await this.viaturaRepository.delete(id);
  }
}
