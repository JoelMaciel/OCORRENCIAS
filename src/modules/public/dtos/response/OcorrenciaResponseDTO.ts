import { Ocorrencia } from "../../entities/Ocorrencia";

export class OcorrenciaResponseDTO {
  id: string;
  mOcorrencia: string;
  tipoOcorrencia: string;
  artigo: string;
  resumo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  guardaQuartel: string;
  registradoPor: string;
  policiaisEnvolvidos: string[];
  viatura: string | null;
  dataHoraInicial: Date;
  dataHoraFinal: Date;
  delegaciaDestino: string;
  delegadoResponsavel: string;
  numeroProcedimento: string;

  constructor(ocorrencia: Ocorrencia) {
    this.id = ocorrencia.id;
    this.mOcorrencia = ocorrencia.mOcorrencia;
    this.dataHoraInicial = ocorrencia.dataHoraInicial;
    this.dataHoraFinal = ocorrencia.dataHoraFinal;
    this.tipoOcorrencia = ocorrencia.tipoOcorrencia;
    this.artigo = ocorrencia.artigo;
    this.resumo = ocorrencia.resumo;
    this.status = ocorrencia.status;
    this.createdAt = ocorrencia.createdAt;
    this.updatedAt = ocorrencia.updatedAt;

    //this.guardaQuartel = ocorrencia.guardaQuartel?.comandante || "Não informado";
    this.registradoPor = ocorrencia.registradoPor?.nome || "Não informado";
    this.policiaisEnvolvidos =
      ocorrencia.policiaisEnvolvidos?.map((policial) => policial.nome) || [];
    this.viatura = ocorrencia.viatura?.placa || null;

    // Campos adicionais
    this.delegaciaDestino = ocorrencia.delegaciaDestino;
    this.delegadoResponsavel = ocorrencia.delegadoResponsavel;
    this.numeroProcedimento = ocorrencia.numeroProcedimento;
  }
}
