import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../repositories/interfaces/IViaturaRepository";

@injectable()
export class DeletarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string): Promise<void> {
    await this.viaturaRepository.delete(id);
  }
}
