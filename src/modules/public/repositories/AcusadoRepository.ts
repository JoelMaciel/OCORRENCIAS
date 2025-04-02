import { AppDataSource } from "../../../../ormconfig";
import { Acusado } from "../entities/Acusado";
import { IAcusadoRepository } from "./interfaces/IAcusadoRepository";

export class AcusadoRepository implements IAcusadoRepository {
  constructor(private readonly acusadoRepository = AppDataSource.getRepository(Acusado)) {}

  public async create(data: Partial<Acusado>): Promise<Acusado> {
    const newAcusado = this.acusadoRepository.create(data);
    return await this.acusadoRepository.save(newAcusado);
  }
}
