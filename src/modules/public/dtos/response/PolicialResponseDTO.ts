import { Policial } from "../../entities/Policial";

export class PolicialResponseDTO {
  id: string;
  nome: string;
  matricula: string;
  postoGraduacao: string;
  cpf: string;
  contato: string;
  email: string;
  batalhao: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(policial: Policial) {
    this.id = policial.id;
    this.nome = policial.nome;
    this.matricula = policial.matricula;
    this.postoGraduacao = policial.postoGraduacao;
    this.cpf = policial.cpf;
    this.contato = policial.contato;
    this.email = policial.email;
    this.batalhao = policial.batalhao?.nome;
    this.createdAt = policial.createdAt;
    this.updatedAt = policial.updatedAt;
  }
}
