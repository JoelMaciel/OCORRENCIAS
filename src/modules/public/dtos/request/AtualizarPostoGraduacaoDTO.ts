import { IsNotEmpty, IsString } from "class-validator";

export class AtualizarPostoGraduacaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "postoGraduacao" é obrigatório.' })
  postoGraduacao: string;
}
