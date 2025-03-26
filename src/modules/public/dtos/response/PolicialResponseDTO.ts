import { Policial } from "../../entities/Policial";

export class PolicialResponseDTO {
  id: string;
  nome: string;
  matricula: string;
  postoGraduacao: string;
  batalhaoId: string | null;
  batalhao: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(policial: Policial) {
    this.id = policial.id;
    this.nome = policial.nome;
    this.matricula = policial.matricula;
    this.postoGraduacao = policial.postoGraduacao;
    this.batalhaoId = policial.batalhao?.id || null;
    this.batalhao = policial.batalhao?.nome || null;
    this.createdAt = policial.createdAt;
    this.updatedAt = policial.updatedAt;
  }
}
