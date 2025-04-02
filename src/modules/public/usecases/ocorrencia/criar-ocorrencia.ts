import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { IViaturaRepository } from "../../repositories/interfaces/IViaturaRepository";
import { z } from "zod";
import { CreateOcorrenciaSchema } from "../../dtos/schemas/CreateOcorrenciaSchema";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";
import AppError from "../../../../errors/AppError";

@injectable()
export class CriarOcorrenciaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly correnciaRepository: IOcorrenciaRepository,
    @inject("CorpoGuardaRepository") private readonly corpoGuardaRepository: ICorpoGuardaRepository,
    @inject("ViaturaRepository") private readonly viaturaRepository: IViaturaRepository,
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(
    dto: z.infer<typeof CreateOcorrenciaSchema>
  ): Promise<OcorrenciaResponseDTO> {
    const dataHoraInicial = new Date(dto.dataHoraInicial);
    const dataHoraFinal = new Date(dto.dataHoraFinal);

    if (isNaN(dataHoraInicial.getTime()) || isNaN(dataHoraFinal.getTime())) {
      throw new AppError("Datas inválidas fornecidas.", 400);
    }

    const registradoPor = await this.policialRepository.findById(dto.registradoPorId);
    if (!registradoPor) {
      throw new AppError("Policial responsável não encontrado.", 404);
    }

    const guardaQuartel = await this.corpoGuardaRepository.findById(dto.guardaQuartelId);

    if (!guardaQuartel) {
      throw new AppError("Corpo de guarda não encontrado.", 404);
    }

    const policiaisEnvolvidos = await this.policialRepository.findByIds(dto.policiaisEnvolvidos);

    if (policiaisEnvolvidos.length !== dto.policiaisEnvolvidos.length) {
      throw new AppError("Um ou mais policiais envolvidos não foram encontrados.", 404);
    }

    console.log(
      "Policiais Envolvidos:",
      policiaisEnvolvidos.map((policial) => policial)
    );

    const viatura = await this.viaturaRepository.findById(dto.viaturaId);

    if (!viatura) {
      throw new AppError("Viatura não encontrada", 404);
    }

    const dadosOcorrencia = {
      ...dto,
      dataHoraInicial,
      dataHoraFinal,
      registradoPor,
      guardaQuartel,
      policiaisEnvolvidos,
      viatura,
    };

    const newOcorrencia = await this.correnciaRepository.create(dadosOcorrencia);

    console.log("**************////////////////////-----------", newOcorrencia);

    return new OcorrenciaResponseDTO(newOcorrencia);
  }
}
