import { Arma } from "../../entities/Arma";

export class ArmaResponseDTO {
  id: string;
  calibre: string;
  numeracao: string;
  ocorrenciaId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(arma: Arma) {
    this.id = arma.id;
    this.calibre = arma.calibre;
    this.numeracao = arma.numeracao;
    this.ocorrenciaId = arma.ocorrencia.id;
    this.createdAt = arma.createdAt || new Date();
    this.updatedAt = arma.updatedAt || new Date();
  }
}
