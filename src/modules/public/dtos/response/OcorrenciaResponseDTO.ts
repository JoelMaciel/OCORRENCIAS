import { Ocorrencia } from "../../entities/Ocorrencia";

export class OcorrenciaResponseDTO {
  id: string;
  mOcorrencia: string;
  viatura: string | null;
  policiaisEnvolvidos: { nome: string; matricula: string }[];
  tipoOcorrencia: string;
  artigo: string;
  resumo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  dataHoraInicial: string;
  dataHoraFinal: string;
  delegaciaDestino: string;
  delegadoResponsavel: string;
  numeroProcedimento: string;
  comandanteGuarda: string;
  registradoPor: { id: string; nome: string; matricula: string } | null;

  constructor(ocorrencia: Ocorrencia) {
    this.id = ocorrencia.id;
    this.mOcorrencia = ocorrencia.mOcorrencia;
    if (ocorrencia.viatura) {
      this.viatura = ocorrencia.viatura.prefixo;
    }
    this.policiaisEnvolvidos = ocorrencia.policiaisEnvolvidos
      ? ocorrencia.policiaisEnvolvidos.map((op) => ({
          nome: op.policial.nome,
          matricula: op.policial.matricula,
        }))
      : [];
    this.dataHoraInicial = ocorrencia.dataHoraInicial;
    this.dataHoraFinal = ocorrencia.dataHoraFinal;
    this.tipoOcorrencia = ocorrencia.tipoOcorrencia;
    this.artigo = ocorrencia.artigo;
    this.resumo = ocorrencia.resumo;
    this.status = ocorrencia.status;
    this.createdAt = ocorrencia.createdAt;
    this.updatedAt = ocorrencia.updatedAt;
    this.delegaciaDestino = ocorrencia.delegaciaDestino;
    this.delegadoResponsavel = ocorrencia.delegadoResponsavel;
    this.numeroProcedimento = ocorrencia.numeroProcedimento;
    this.comandanteGuarda = ocorrencia.corpoGuarda.comandante.nome;
    this.registradoPor = ocorrencia.registradoPor
      ? {
          id: ocorrencia.registradoPor.id,
          nome: ocorrencia.registradoPor.nome,
          matricula: ocorrencia.registradoPor.matricula,
        }
      : null;
  }
}
