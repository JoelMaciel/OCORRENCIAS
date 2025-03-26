import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { Viatura } from "../../entities/Viatura";
import { ICreateViaturaDTO } from "../../dtos/request/ICreateViaturaDTO";

@injectable()
export class CriarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(viatura: ICreateViaturaDTO): Promise<Viatura> {
    return await this.viaturaRepository.create(viatura);
  }
}
