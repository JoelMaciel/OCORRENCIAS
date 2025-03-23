import { IViaturaRepository } from "./interfaces/IViaturaRepository";
import { AppDataSource } from "../../../../ormconfig";
import { Viatura } from "../entities/Viatura";
import { ICreateViaturaDTO } from "../dtos/ICreateViaturaDTO";
import { IUpdateViaturaDTO } from "../dtos/IUpdateViaturaDTO";
import AppError from "../../../errors/AppError";

export class ViaturaRepository implements IViaturaRepository {
  constructor(private readonly viaturaRepository = AppDataSource.getRepository(Viatura)) {}

  public async create(data: ICreateViaturaDTO): Promise<Viatura> {
    const viatura = this.viaturaRepository.create(data);
    await this.viaturaRepository.save(viatura);
    return viatura;
  }

  public async update(id: string, newData: IUpdateViaturaDTO): Promise<Viatura> {
    const viatura = await this.viaturaRepository.findOne({ where: { id } });

    if (!viatura) {
      throw new Error("Viatura não encontrada");
    }

    const updatedViatura = this.viaturaRepository.merge(viatura, newData);
    await this.viaturaRepository.save(updatedViatura);
    return updatedViatura;
  }

  public async findById(id: string): Promise<Viatura | null> {
    return await this.viaturaRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  public async findAll(): Promise<Viatura[]> {
    return await this.viaturaRepository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.viaturaRepository.delete(id);
  }
}
