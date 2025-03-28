import { IsNotEmpty, IsString } from "class-validator";
import { Endereco } from "../../entities/Endereco";

export class IEnderecoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "rua" é obrigatório.' })
  rua: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "numero" é obrigatório.' })
  numero: string;

  @IsString()
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

  public static toEntity(dto: IEnderecoDTO): Endereco {
    const endereco = new Endereco();
    endereco.rua = dto.rua;
    endereco.numero = dto.numero;
    endereco.bairro = dto.bairro;
    endereco.cidade = dto.cidade;
    endereco.complemento = dto.complemento;
    endereco.uf = dto.uf;
    endereco.cep = dto.cep;
    return endereco;
  }
}
