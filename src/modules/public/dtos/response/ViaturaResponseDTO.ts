import { Viatura } from "../../entities/Viatura";
import { StatusViatura } from "../../enums/StatusViatura";

export class ViaturaResponseDTO {
  id: string;
  prefixo: string;
  placa: string;
  modelo: string;
  status: StatusViatura;
  batalhao: string;

  constructor(viatura: Viatura) {
    this.id = viatura.id;
    this.prefixo = viatura.prefixo;
    this.placa = viatura.placa;
    this.modelo = viatura.modelo;
    this.status = viatura.status;
    this.batalhao = viatura.batalhao.nome;
  }
}
