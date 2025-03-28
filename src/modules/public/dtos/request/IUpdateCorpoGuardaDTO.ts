import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class IUpdateCorpoGuardaDTO {
  @IsArray()
  @IsUUID("4", { each: true, message: "Cada policialId deve ser um UUID válido." })
  @IsNotEmpty({ message: 'O campo "policiais" não pode estar vazio.' })
  policiais: string[];
}
