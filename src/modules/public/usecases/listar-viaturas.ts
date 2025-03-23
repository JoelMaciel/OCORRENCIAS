import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../repositories/interfaces/IViaturaRepository";
import { Viatura } from "../entities/Viatura";

@injectable()
export class ListarViaturasUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(): Promise<Viatura[]> {
    const viaturas = await this.viaturaRepository.findAll();
    return viaturas;
  }
}
