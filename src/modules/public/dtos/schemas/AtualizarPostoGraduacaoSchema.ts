import { z } from "zod";

export const AtualizarPostoGraduacaoSchema = z.object({
  postoGraduacao: z.string({ message: "O campo postoGraduacao é obrigatorio" }),
});
