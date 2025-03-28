import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class ICreateCorpoGuardaDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'O campo "batalhaoId" é obrigatório.' })
  batalhaoId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O campo "comandanteId" é obrigatório.' })
  comandanteId: string;

  @IsArray()
  @IsUUID(undefined, { each: true, message: "Cada policialId deve ser um UUID válido." })
  @IsNotEmpty({ message: 'O campo "policiais" não pode estar vazio.' })
  policiais: string[];
}
