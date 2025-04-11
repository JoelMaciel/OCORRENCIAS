import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { ViaturaResponseDTO } from "../../dtos/response/ViaturaResponseDTO";
import { UpdateViaturaInput } from "../../dtos/schemas/UpdateViaturaSchema";
import BatalhaoNotFoundException from "../../../../exceptions/BatalhaoNotFoundException ";
import ViaturaNotFoundException from "../../../../exceptions/ViaturaNotFoundException";

@injectable()
export class AtualizarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository,
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(id: string, dto: UpdateViaturaInput): Promise<any> {
    const batalhao = await this.batalhaoRepository.findById(dto.batalhaoId);

    if (!batalhao) {
      throw new BatalhaoNotFoundException();
    }

    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new ViaturaNotFoundException();
    }

    const dataViatura = {
      prefixo: dto.prefixo,
      batalhao: batalhao,
    };

    const updatedViatura = await this.viaturaRepository.update(id, dataViatura);

    return new ViaturaResponseDTO(updatedViatura);
  }
}
