import { IsString, IsNotEmpty } from "class-validator";

export class AtualizarBatalhaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "batalhaoId" é obrigatório.' })
  batalhaoId: string;
}
