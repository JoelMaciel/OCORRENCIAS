import { inject, injectable } from "tsyringe";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import { BatalhaoResponseDTO } from "../../dtos/response/BatalhaoResponseDTO";
import { CreateBatalhaoInput } from "../../dtos/schemas/CreateBatalhaoSchema";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import AppError from "../../../../errors/AppError";

@injectable()
export class CriarBatalhaoUseCase {
  constructor(
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository
  ) {}

  public async execute(dto: CreateBatalhaoInput): Promise<BatalhaoResponseDTO> {
    const endereco = toEnderecoEntity(dto.endereco);
    await this.validateName(dto.nome);

    const batalhaoData = {
      nome: dto.nome,
      contato: dto.contato,
      endereco: endereco,
    };

    const savedBatalhao = await this.batalhaoRepository.create(batalhaoData);

    return new BatalhaoResponseDTO(savedBatalhao);
  }

  private async validateName(nome: string): Promise<void> {
    const existsName = await this.batalhaoRepository.nameExists(nome);
    if (existsName) {
      throw new AppError("Já existe um batalhão cadastrado com esse nome", 409);
    }
  }
}
