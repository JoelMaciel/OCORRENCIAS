import { IsNotEmpty, IsString } from "class-validator";

export class IAtualizarPostoGraduacaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "postoGraduacao" é obrigatório.' })
  postoGraduacao: string;
}
