import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { IUpdateBatalhaoDTO } from "../../dtos/request/IUpdateBatalhaoDTO";
import { Batalhao } from "../../entities/Batalhao";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(id: string, newData: IUpdateBatalhaoDTO): Promise<Batalhao> {
    const batalhao = await this.batalhaoRepository.findById(id);

    const updatedBatalhao = await this.batalhaoRepository.update(id, newData);
    return updatedBatalhao;
  }
}
