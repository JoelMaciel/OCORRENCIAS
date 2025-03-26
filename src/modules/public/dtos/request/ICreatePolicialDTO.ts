import { IsString, IsNotEmpty, IsEnum } from "class-validator";

export class ICreatePolicialDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "matricula" é obrigatório.' })
  matricula: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo "postoGraduacao" é obrigatório.' })
  postoGraduacao: string;
}
