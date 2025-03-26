import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { StatusViatura } from "../../enums/StatusViatura";

export class ICreateViaturaDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "prefixo" é obrigatório.' })
  prefixo: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "placa" é obrigatório.' })
  placa: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "modelo" é obrigatório.' })
  modelo?: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "unidadePoliciamento" é obrigatório.' })
  unidadePoliciamento?: string;

  @IsEnum(StatusViatura, {
    message: 'O campo "status" deve ser "ATIVA" , "INATIVA", "EM_SERVIÇO" ou "MANUTENÇÃO" .',
  })
  status?: StatusViatura;
}
