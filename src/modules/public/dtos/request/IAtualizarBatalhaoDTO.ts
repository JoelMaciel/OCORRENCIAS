import { IsString, IsNotEmpty } from "class-validator";

export class IAtualizarBatalhaoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo "batalhaoId" é obrigatório.' })
  batalhaoId: string;
}
