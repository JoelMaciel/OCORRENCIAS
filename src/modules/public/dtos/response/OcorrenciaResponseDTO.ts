import { Ocorrencia } from "../../entities/Ocorrencia";
import { StatusOcorrencia } from "../../enums/StatusOcorrencia";

export class OcorrenciaResponseDTO {
  id: string;
  mOcorrencia: string;
  viatura: string | null;
  policiaisEnvolvidos: { postoGraduacao: string; nome: string; matricula: string }[];
  fiscal: { postoGraduacao: string; nome: string; matricula: string };
  supervisor: { postoGraduacao: string; nome: string; matricula: string };
  tipoOcorrencia: string;
  artigo: string;
  resumo: string;
  status: StatusOcorrencia;
  createdAt: Date;
  updatedAt: Date;
  dataHoraInicial: string;
  dataHoraFinal: string;
  delegaciaDestino: string;
  delegadoResponsavel: string;
  numeroProcedimento: string;
  comandanteGuarda: string | null;
  registradoPor: { id: string; postoGraduacao: string; nome: string; matricula: string };
  endereco: {
    id: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };

  constructor(ocorrencia: Ocorrencia) {
    this.id = ocorrencia.id;
    this.mOcorrencia = ocorrencia.mOcorrencia;
    this.viatura = ocorrencia.viatura ? ocorrencia.viatura.prefixo : null;
    this.policiaisEnvolvidos = ocorrencia.policiaisEnvolvidos
      ? ocorrencia.policiaisEnvolvidos.map((op) => ({
          postoGraduacao: op.policial.postoGraduacao,
          nome: op.policial?.nome,
          matricula: op.policial?.matricula,
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
    this.comandanteGuarda = ocorrencia.corpoGuarda.comandante?.nome || null;

    this.registradoPor = {
      id: ocorrencia.registradoPor.id,
      postoGraduacao: ocorrencia.registradoPor.postoGraduacao,
      nome: ocorrencia.registradoPor.nome,
      matricula: ocorrencia.registradoPor.matricula,
    };

    this.endereco = {
      id: ocorrencia.endereco.id,
      rua: ocorrencia.endereco.rua,
      numero: ocorrencia.endereco.numero,
      complemento: ocorrencia.endereco.complemento ?? undefined,
      bairro: ocorrencia.endereco.bairro,
      cidade: ocorrencia.endereco.cidade,
      uf: ocorrencia.endereco.uf,
      cep: ocorrencia.endereco.cep,
    };

    this.fiscal = {
      nome: ocorrencia.fiscal.nome,
      postoGraduacao: ocorrencia.fiscal.postoGraduacao,
      matricula: ocorrencia.fiscal.matricula,
    };

    this.supervisor = {
      nome: ocorrencia.supervisor.nome,
      postoGraduacao: ocorrencia.supervisor.postoGraduacao,
      matricula: ocorrencia.supervisor.matricula,
    };
  }
}
