import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { z } from "zod";
import { UpdateBatalhaoSchema } from "../../dtos/schemas/UpdateBatalhaoSchema";
import { BatalhaoResponseDTO } from "../../dtos/response/BatalhaoResponseDTO";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import AppError from "../../../../errors/AppError";

@injectable()
export class AtualizarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(
    id: string,
    dto: z.infer<typeof UpdateBatalhaoSchema>
  ): Promise<BatalhaoResponseDTO> {
    const batalhao = await this.batalhaoRepository.findById(id);

    if (!batalhao) {
      throw new AppError("Batalhão não encontrado", 404);
    }

    const endereco = toEnderecoEntity(dto.endereco);

    const updatedData = {
      nome: dto.nome || batalhao.nome,
      contato: dto.contato,
      endereco: endereco,
    };

    const updatedBatalhao = await this.batalhaoRepository.update(id, updatedData);
    return updatedBatalhao;
  }
}
