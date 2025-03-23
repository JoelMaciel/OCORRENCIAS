import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { ICreateBatalhaoDTO } from "../../dtos/ICreateBatalhaoDTO";
import { Batalhao } from "../../entities/Batalhao";

@injectable()
export class CriarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(batalhao: ICreateBatalhaoDTO): Promise<Batalhao> {
    return await this.batalhaoRepository.create(batalhao);
  }
}
