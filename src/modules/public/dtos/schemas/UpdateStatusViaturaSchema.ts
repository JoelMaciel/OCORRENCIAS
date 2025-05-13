import { z } from "zod";
import { StatusViatura } from "../../enums/StatusViatura";

export const UpdateStatusViaturaSchema = z.object({
  status: z.nativeEnum(StatusViatura, {
    message:
      "O campo 'status' é obrigatório e deve ser um dos seguintes valores: ATIVA, INATIVA, EM_SERVIÇO, MANUTENÇÃO",
  }),
});
export type UpdateStatusViaturaInput = z.infer<typeof UpdateStatusViaturaSchema>;
