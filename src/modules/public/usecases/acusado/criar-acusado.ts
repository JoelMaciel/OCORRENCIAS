import { inject, injectable } from "tsyringe";
import { IAcusadoRepository } from "../../repositories/interfaces/IAcusadoRepository";

@injectable()
export class CriarAcusadoUseCase {
  constructor(
    @inject("AcusadoRepository") private readonly acusadoRepository: IAcusadoRepository
  ) {}
}
