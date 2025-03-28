import { Batalhao } from "../../entities/Batalhao";

export class BatalhaoResponseDTO {
  id: string;
  nome: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };

  constructor(batalhao: Batalhao) {
    this.id = batalhao.id;
    this.nome = batalhao.nome;
    this.dataCriacao = batalhao.dataCriacao;
    this.dataAtualizacao = batalhao.dataAtualizacao;
    this.endereco = {
      rua: batalhao.endereco.rua,
      numero: batalhao.endereco.numero,
      complemento: batalhao.endereco.complemento,
      bairro: batalhao.endereco.bairro,
      cidade: batalhao.endereco.cidade,
      uf: batalhao.endereco.uf,
      cep: batalhao.endereco.cep,
    };
  }
}
