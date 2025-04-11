import { inject, injectable } from "tsyringe";
import { IAcusadoRepository } from "../../repositories/interfaces/IAcusadoRepository";
import AcusadoNotFoundException from "../../../../exceptions/AcusadoNotFoundException";
import { IEnderecoRepository } from "../../repositories/interfaces/IEnderecoRepository";

@injectable()
export class DeletarAcusadoUseCase {
  constructor(
    @inject("AcusadoRepository") private readonly acusadoRepository: IAcusadoRepository,
    @inject("EnderecoRepository") private readonly enderecoRepository: IEnderecoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const acusado = await this.acusadoRepository.findById(id);

    if (!acusado) {
      throw new AcusadoNotFoundException();
    }
    await this.enderecoRepository.delete(acusado.endereco.id);

    await this.acusadoRepository.delete(acusado);
  }
}
