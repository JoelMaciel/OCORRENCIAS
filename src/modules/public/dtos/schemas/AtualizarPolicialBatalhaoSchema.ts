import { z } from "zod";

export const AtualizarPolicialBatalhaoSchema = z.object({
  batalhaoId: z.string({ message: "O campo postoGraducao é obrigatorio" }),
});
