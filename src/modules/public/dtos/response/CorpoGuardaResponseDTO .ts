import { CorpoGuarda } from "../../entities/CorpoGuarda";

export class CorpoGuardaResponseDTO {
  id: string;
  batalhao: string;
  comandante: string;
  postoGraduacao: string;
  policiais: { name: string; graduacao: string }[];
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(corpoGuarda: CorpoGuarda) {
    this.id = corpoGuarda.id;
    this.batalhao = corpoGuarda.batalhao.nome;
    this.comandante = corpoGuarda.comandante.nome;
    this.postoGraduacao = corpoGuarda.comandante.postoGraduacao;
    this.policiais = corpoGuarda.policiais.map((policial) => ({
      name: policial.nome,
      graduacao: policial.postoGraduacao,
    }));
    this.dataCriacao = corpoGuarda.dataCriacao;
    this.dataAtualizacao = corpoGuarda.dataAtualizacao;
  }
}
