import { AppDataSource } from "../../../../ormconfig";
import { Acusado } from "../entities/Acusado";
import { IAcusadoRepository } from "./interfaces/IAcusadoRepository";

export class AcusadoRepository implements IAcusadoRepository {
  constructor(private readonly acusadoRepository = AppDataSource.getRepository(Acusado)) {}

  public async create(data: Partial<Acusado>): Promise<Acusado> {
    const newAcusado = this.acusadoRepository.create(data);
    return await this.acusadoRepository.save(newAcusado);
  }

  public async findAll(
    page: number,
    limit: number,
    nome?: string,
    cpf?: string
  ): Promise<[Acusado[], number]> {
    const queryBuilder = this.acusadoRepository
      .createQueryBuilder("acusado")
      .leftJoinAndSelect("acusado.endereco", "endereco");

    if (nome) {
      queryBuilder.where("LOWER(acusado.nome) ILIKE LOWER(:nome)", { nome: `%${nome}%` });
    }

    if (cpf) {
      queryBuilder.andWhere("LOWER(acusado.cpf) ILIKE LOWER(:cpf)", { cpf: `%${cpf}%` });
    }

    const [result, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [result, total];
  }

  public async findById(id: string): Promise<Acusado | null> {
    return await this.acusadoRepository
      .createQueryBuilder("acusado")
      .leftJoinAndSelect("acusado.endereco", "endereco")
      .where("acusado.id = :id", { id })
      .select([
        "acusado.id",
        "acusado.nome",
        "acusado.cpf",
        "acusado.dataNascimento",
        "acusado.nomeMae",
        "acusado.nomePai",
        "acusado.naturalidade",
        "acusado.nacionalidade",
        "acusado.createdAt",
        "acusado.updatedAt",
        "endereco.rua",
        "endereco.numero",
        "endereco.complemento",
        "endereco.bairro",
        "endereco.cidade",
        "endereco.uf",
        "endereco.cep",
      ])
      .getOne();
  }

  public async update(id: string, data: Partial<Acusado>): Promise<Acusado> {
    const acusado = await this.acusadoRepository.findOneOrFail({
      where: { id },
    });

    const updatedAcusado = this.acusadoRepository.merge(acusado, data);

    return this.acusadoRepository.save(updatedAcusado);
  }

  public async delete(acusado: Acusado): Promise<void> {
    await this.acusadoRepository.remove(acusado);
  }

  public async existsByCpf(cpf: string): Promise<boolean> {
    const cpfExistente = await this.acusadoRepository.findOne({
      where: { cpf },
    });
    return !!cpfExistente;
  }
}
