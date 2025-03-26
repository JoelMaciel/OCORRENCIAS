import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { StatusViatura } from "../../enums/StatusViatura";

export class IUpdateViaturaDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "prefixo" é obrigatório.' })
  prefixo: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "unidadePoliciamento" é obrigatório.' })
  unidadePoliciamento?: string;

  @IsEnum(StatusViatura, {
    message: 'O campo "status" deve ser "ATIVA" , "INATIVA", "EM_SERVIÇO" ou "MANUTENÇÃO" .',
  })
  status?: StatusViatura;
}
