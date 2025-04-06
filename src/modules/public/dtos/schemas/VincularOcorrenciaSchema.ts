import { z } from "zod";

export const VincularOcorrenciaSchema = z.object({
  viaturaId: z
    .string({ message: "O campo 'viaturaId' é obrigatório." })
    .uuid({ message: "O campo viaturaId deve ser um UUID válido" }),

  ocorrenciaId: z
    .string({ message: "O campo 'ocorrenciaId é obrigatório'" })
    .uuid({ message: " O campo 'ocorrenciaId' deve ser um UUID válido." }),
});

export type VincularOcorrenciaInput = z.infer<typeof VincularOcorrenciaSchema>;
