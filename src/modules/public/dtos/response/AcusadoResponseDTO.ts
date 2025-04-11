import { Acusado } from "../../entities/Acusado";

export class AcusadoResponseDTO {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai?: string | null;
  naturalidade: string;
  nacionalidade: string;
  createdAt: Date;
  updatedAt: Date;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  } | null;

  constructor(acusado: Acusado) {
    this.id = acusado.id;
    this.nome = acusado.nome;
    this.cpf = acusado.cpf;
    this.dataNascimento = acusado.dataNascimento;
    this.nomeMae = acusado.nomeMae;
    this.nomePai = acusado.nomePai || "Não informado";
    this.naturalidade = acusado.naturalidade;
    this.nacionalidade = acusado.nacionalidade;
    this.createdAt = acusado.createdAt || new Date();
    this.updatedAt = acusado.updatedAt || new Date();

    if (acusado.endereco) {
      this.endereco = {
        rua: acusado.endereco.rua,
        numero: acusado.endereco.numero,
        complemento: acusado.endereco.complemento || null,
        bairro: acusado.endereco.bairro,
        cidade: acusado.endereco.cidade,
        uf: acusado.endereco.uf,
        cep: acusado.endereco.cep,
      };
    } else {
      this.endereco = null;
    }
  }
}
