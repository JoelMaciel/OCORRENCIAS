import { StatusViatura } from "../enums/StatusViatura";

export interface ICreateViaturaDTO {
  prefixo: string;
  placa: string;
  modelo?: string;
  unidadePoliciamento?: string;
  status?: StatusViatura;
}
