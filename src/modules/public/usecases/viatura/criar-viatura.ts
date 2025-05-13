import { inject, injectable } from "tsyringe";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { CreateViaturaInput } from "../../dtos/schemas/CreateViaturaSchema";
import { ViaturaResponseDTO } from "../../dtos/response/ViaturaResponseDTO";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { StatusViatura } from "../../enums/StatusViatura";
import BatalhaoNotFoundException from "../../../../exceptions/BatalhaoNotFoundException ";
import PrefixoAlreadyExistsException from "../../../../exceptions/PrefixoAlreadyExistsException";

@injectable()
export class CriarViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository,
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(dto: CreateViaturaInput): Promise<ViaturaResponseDTO> {
    const batalhao = await this.batalhaoRepository.findById(dto.batalhaoId);

    if (!batalhao) {
      throw new BatalhaoNotFoundException();
    }
    await this.validatePrefixo(dto.prefixo);

    const dataViatura = {
      prefixo: dto.prefixo,
      placa: dto.placa,
      modelo: dto.modelo,
      status: StatusViatura.ATIVA,
      batalhao: batalhao,
    };

    const savedViatura = await this.viaturaRepository.create(dataViatura);
    return new ViaturaResponseDTO(savedViatura);
  }

  private async validatePrefixo(prefixo: string): Promise<void> {
    const existsPrefixo = await this.viaturaRepository.prefixExists(prefixo);
    if (existsPrefixo) {
      throw new PrefixoAlreadyExistsException();
    }
  }
}
