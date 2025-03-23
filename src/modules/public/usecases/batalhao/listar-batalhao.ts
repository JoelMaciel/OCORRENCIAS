import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { Batalhao } from "../../entities/Batalhao";

@injectable()
export class ListarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(): Promise<Batalhao[]> {
    return await this.batalhaoRepository.findAll();
  }
}
