import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Endereco } from "../../entities/Endereco";

export class IUpdateBatalhaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
  nome: string;

  endereco: Endereco;
}
