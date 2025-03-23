import { IsNotEmpty, IsString } from "class-validator";

export class EnderecoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "rua" é obrigatório.' })
  rua: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "numero" é obrigatório.' })
  numero: string;

  complemento: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "bairro" é obrigatório.' })
  bairro: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "cidade" é obrigatório.' })
  cidade: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "uf" é obrigatório.' })
  uf: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "cep" é obrigatório.' })
  cep: string;
}
