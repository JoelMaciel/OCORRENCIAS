import { z } from "zod";

export const AtualizarPolicialBatalhaoSchema = z.object({
  batalhaoId: z.string({ message: "O campo postoGraducao é obrigatorio" }),
  contato: z
    .string({ required_error: "O campo 'contato' é obrigatório." })
    .min(8, { message: "O campo 'contato' deve ter no mínimo 8 caracteres." })
    .max(15, { message: "O campo 'contato' deve ter no máximo 15 caracteres." }),
});

export type AtualizarPoliciaBatalhaoInput = z.infer<typeof AtualizarPolicialBatalhaoSchema>;
