import { AppDataSource } from "../../../../ormconfig";
import { Acusado } from "../entities/Acusado";
import { IAcusadoRepository } from "./interfaces/IAcusadoRepository";

export class AcusadoRepository implements IAcusadoRepository {
  constructor(private readonly acusadoRepository = AppDataSource.getRepository(Acusado)) {}

  public async create(data: Partial<Acusado>): Promise<Acusado> {
    const newAcusado = this.acusadoRepository.create(data);
    return await this.acusadoRepository.save(newAcusado);
  }

  public async findById(id: string): Promise<Acusado | null> {
    return await this.acusadoRepository.findOne({
      where: { id },
      relations: ["endereco"],
    });
  }

  public async delete(acusado: Acusado): Promise<void> {
    await this.acusadoRepository.remove(acusado);
  }
}
