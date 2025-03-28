import { IsDefined, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IEnderecoDTO } from "./IEnderecoDTO";

export class ICreateBatalhaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
  nome: string;

  @IsDefined({ message: 'O campo "endereco" é obrigatório.' })
  @ValidateNested({ message: 'O campo "endereco" deve ser um objeto válido.' })
  @Type(() => IEnderecoDTO)
  endereco: IEnderecoDTO;
}
