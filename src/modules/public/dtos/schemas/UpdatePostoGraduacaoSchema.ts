import { z } from "zod";

export const UpdatePostoGraduacaoSchema = z.object({
  postoGraduacao: z.string({ message: "O campo postoGraduacao é obrigatorio" }),
  contato: z
    .string({ required_error: "O campo 'contato' é obrigatório." })
    .min(8, { message: "O campo 'contato' deve ter no mínimo 8 caracteres." })
    .max(15, { message: "O campo 'contato' deve ter no máximo 15 caracteres." }),
});

export type UpdatePostoGraduacaoInput = z.infer<typeof UpdatePostoGraduacaoSchema>;
