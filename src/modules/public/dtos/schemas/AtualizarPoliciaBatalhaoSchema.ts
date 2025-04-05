import { z } from "zod";

export const UpdatePoliciaBatalhaoSchema = z.object({
  batalhaoId: z.string({ message: "O campo postoGraducao é obrigatorio" }),
  contato: z
    .string({ required_error: "O campo 'contato' é obrigatório." })
    .min(8, { message: "O campo 'contato' deve ter no mínimo 8 caracteres." })
    .max(15, { message: "O campo 'contato' deve ter no máximo 15 caracteres." }),
});

export type UpdatePoliciaBatalhaoInput = z.infer<typeof UpdatePoliciaBatalhaoSchema>;
