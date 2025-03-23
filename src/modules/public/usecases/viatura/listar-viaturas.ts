import { inject, injectable } from "tsyringe";
import { Viatura } from "../../entities/Viatura";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";

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
