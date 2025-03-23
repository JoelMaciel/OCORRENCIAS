import { inject, injectable } from "tsyringe";
import { Viatura } from "../entities/Viatura";
import { ICreateViaturaDTO } from "../dtos/ICreateViaturaDTO";
import { IViaturaRepository } from "../repositories/interfaces/IViaturaRepository";

@injectable()
export class CriarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(viatura: ICreateViaturaDTO): Promise<Viatura> {
    return this.viaturaRepository.create(viatura);
  }
}
