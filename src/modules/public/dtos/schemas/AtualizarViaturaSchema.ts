import { z } from "zod";

export const UpdateViaturaSchema = z.object({
  prefixo: z.string({ message: "O campo 'nome' é obrigatório." }),
  batalhaoId: z
    .string({ message: "O campo 'batalhaoId' é obrigatório." })
    .uuid({ message: "O campo batalhaoId deve ser um UUID válido" }),
});

export type UpdateViaturaInput = z.infer<typeof UpdateViaturaSchema>;
