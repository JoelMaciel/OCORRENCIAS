import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EnderecoDTO } from "./IEnderecoDTO";

export class IUpdateBatalhaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
  nome: string;

  @ValidateNested({ message: 'O campo "endereco" deve ser um objeto válido.' })
  @Type(() => EnderecoDTO)
  endereco: EnderecoDTO;
}
