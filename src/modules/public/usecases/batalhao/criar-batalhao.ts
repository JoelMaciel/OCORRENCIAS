import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { BatalhaoResponseDTO } from "../../dtos/response/BatalhaoResponseDTO";
import { z } from "zod";
import { CreateBatalhaoSchema } from "../../dtos/schemas/CreateBatalhaoSchema";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";

@injectable()
export class CriarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(dto: z.infer<typeof CreateBatalhaoSchema>): Promise<BatalhaoResponseDTO> {
    const endereco = toEnderecoEntity(dto.endereco);

    const batalhaoData = {
      nome: dto.nome,
      endereco: endereco,
    };

    const savedBatalhao = await this.batalhaoRepository.create(batalhaoData);

    return new BatalhaoResponseDTO(savedBatalhao);
  }
}
