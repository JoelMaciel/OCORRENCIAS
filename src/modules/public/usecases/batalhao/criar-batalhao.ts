import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { ICreateBatalhaoDTO } from "../../dtos/request/ICreateBatalhaoDTO";
import { BatalhaoResponseDTO } from "../../dtos/response/BatalhaoResponseDTO";
import { IEnderecoDTO } from "../../dtos/request/IEnderecoDTO";

@injectable()
export class CriarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(dto: ICreateBatalhaoDTO): Promise<BatalhaoResponseDTO> {
    const endereco = IEnderecoDTO.toEntity(dto.endereco);

    const batalhaoData = {
      nome: dto.nome,
      endereco: endereco,
    };

    const savedBatalhao = await this.batalhaoRepository.create(batalhaoData);

    return new BatalhaoResponseDTO(savedBatalhao);
  }
}
