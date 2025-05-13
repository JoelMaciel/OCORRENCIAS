import { inject, injectable } from "tsyringe";
import ViaturaNotFoundException from "../../../../exceptions/ViaturaNotFoundException";
import { StatusViatura } from "../../enums/StatusViatura";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";

@injectable()
export class AtualizarStatusViaturaUseCase {
  constructor(
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository
  ) {}

  public async execute(id: string, status: StatusViatura): Promise<void> {
    const viatura = await this.viaturaRepository.findById(id);

    if (!viatura) {
      throw new ViaturaNotFoundException();
    }

    const dataViatura = {
      ...viatura,
      status,
    };

    this.viaturaRepository.update(id, { status });
  }
}
