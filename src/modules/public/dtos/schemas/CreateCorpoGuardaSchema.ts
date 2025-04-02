import { z } from "zod";

export const CreateCorpoGuardaSchema = z.object({
  batalhaoId: z
    .string({ message: "O campo batalhaoId é obrigatório" })
    .uuid({ message: "O campode batalhaoId deve ser um UUID válido" }),

  comandanteId: z
    .string({ message: "O campo comandanteId é obrigatório" })
    .uuid({ message: "O campo comandanteId deve ser um UUID válido" }),

  policiais: z
    .array(z.string().uuid({ message: "Cada policial deve ser um UUID válido" }), {
      required_error: "O campo policiais não pode estar vazio.",
    })
    .nonempty({ message: "O campo policias nao deve estar vazio" }),
});

export type CreateCorpoGuardaInput = z.infer<typeof CreateCorpoGuardaSchema>;
