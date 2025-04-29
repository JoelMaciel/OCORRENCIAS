import { Batalhao } from "../../entities/Batalhao";

export class BatalhaoResponseDTO {
  id: string;
  nome: string;
  contato: string;
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
  } | null;

  constructor(batalhao: Batalhao) {
    this.id = batalhao.id;
    this.contato = batalhao.contato;
    this.nome = batalhao.nome;
    this.dataCriacao = batalhao.dataCriacao;
    this.dataAtualizacao = batalhao.dataAtualizacao;

    if (batalhao.endereco) {
      this.endereco = {
        rua: batalhao.endereco.rua,
        numero: batalhao.endereco.numero,
        complemento: batalhao.endereco.complemento,
        bairro: batalhao.endereco.bairro,
        cidade: batalhao.endereco.cidade,
        uf: batalhao.endereco.uf,
        cep: batalhao.endereco.cep,
      };
    } else {
      this.endereco = null;
    }
  }
}
