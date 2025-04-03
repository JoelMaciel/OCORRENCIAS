import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { ICorpoGuardaRepository } from "../../repositories/interfaces/ICorpoGuardaRepository";
import { CreateOcorrenciaInput } from "../../dtos/schemas/CreateOcorrenciaSchema";
import { OcorrenciaResponseDTO } from "../../dtos/response/OcorrenciaResponseDTO";
import AppError from "../../../../errors/AppError";
import { Policial } from "../../entities/Policial";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import { IOcorrenciaPolicialRepository } from "../../repositories/interfaces/IOcorrenciaPolicialRepository";
import { CorpoGuarda } from "../../entities/CorpoGuarda";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";

@injectable()
export class CriarOcorrenciaUseCase {
  constructor(
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository,
    @inject("CorpoGuardaRepository") private readonly corpoGuardaRepository: ICorpoGuardaRepository,
    @inject("OcorrenciaPolicialRepository")
    private readonly ocorrenciaPolicialRepository: IOcorrenciaPolicialRepository,
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository
  ) {}

  public async execute(dto: CreateOcorrenciaInput): Promise<OcorrenciaResponseDTO> {
    const guardaQuartel = await this.validateCorpoGuarda(dto.guardaQuartelId);
    const registradoPor = this.validateRegistradoPor(guardaQuartel, dto.registradoPorId);
    await this.validateMOcorrenciaDuplicado(dto.mOcorrencia);
    await this.validatePoliciaisEnvolvidos(dto.policiaisEnvolvidos);

    const endereco = toEnderecoEntity(dto.endereco);

    const dadosOcorrencia = {
      mOcorrencia: dto.mOcorrencia,
      dataHoraInicial: dto.dataHoraInicial,
      dataHoraFinal: dto.dataHoraFinal,
      tipoOcorrencia: dto.tipoOcorrencia,
      artigo: dto.artigo,
      resumo: dto.resumo,
      delegaciaDestino: dto.delegaciaDestino,
      delegadoResponsavel: dto.delegadoResponsavel,
      numeroProcedimento: dto.numeroProcedimento,
      registradoPor: registradoPor,
      corpoGuarda: guardaQuartel,
      endereco: endereco,
    };

    const ocorrenciaSalva = await this.ocorrenciaRepository.create(dadosOcorrencia);

    await this.ocorrenciaPolicialRepository.associatePoliciaisToOcorrencia(
      ocorrenciaSalva.id,
      dto.policiaisEnvolvidos
    );

    return new OcorrenciaResponseDTO(ocorrenciaSalva);
  }

  private async validateCorpoGuarda(guardaQuartelId: string) {
    const guardaQuartel = await this.corpoGuardaRepository.findById(guardaQuartelId);
    if (!guardaQuartel) {
      throw new AppError("Corpo de guarda não encontrado.", 404);
    }
    return guardaQuartel;
  }

  private validateRegistradoPor(guardaQuartel: CorpoGuarda, registradoPorId: string): Policial {
    let registradoPor: Policial | undefined;

    if (guardaQuartel.comandante?.id === registradoPorId) {
      registradoPor = guardaQuartel.comandante;
    } else {
      registradoPor = guardaQuartel.policiais.find((policial) => policial.id === registradoPorId);
    }

    if (!registradoPor) {
      throw new AppError("Erro ao identificar o policial responsável.", 500);
    }

    return registradoPor;
  }

  private async validateMOcorrenciaDuplicado(mOcorrencia: string) {
    const mOcorrenciaDuplicado = await this.ocorrenciaRepository.existsByMOcorrencia(mOcorrencia);
    if (mOcorrenciaDuplicado) {
      throw new AppError("Já existe um M-Ocorrência com este número.", 409);
    }
  }
  private async validatePoliciaisEnvolvidos(policiaisIds: string[]) {
    const policiaisEncontrados = await this.policialRepository.findByIds(policiaisIds);

    if (policiaisEncontrados.length !== policiaisIds.length) {
      const idsNaoEncontrados = policiaisIds.filter(
        (id) => !policiaisEncontrados.some((policial) => policial.id === id)
      );
      throw new AppError(
        `Os seguintes IDs de policiais não foram encontrados: ${idsNaoEncontrados.join(", ")}`,
        404
      );
    }
  }
}
