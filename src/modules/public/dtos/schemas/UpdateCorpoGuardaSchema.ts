import { z } from "zod";

export const UpdateCorpoGuardaSchema = z.object({
  policiais: z
    .array(z.string().uuid({ message: "Cada policial deve ser um UUID válido" }), {
      required_error: "O campo policiais não pode estar vazio.",
    })
    .nonempty({ message: "O campo policias nao deve estar vazio" }),
});

export type UpdateCorpoGuardaInput = z.infer<typeof UpdateCorpoGuardaSchema>;
