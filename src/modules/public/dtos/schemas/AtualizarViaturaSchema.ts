import { z } from "zod";

export const AtualizarViaturaSchema = z.object({
  prefixo: z.string({ message: "O campo 'nome' é obrigatório." }),
  batalhaoId: z
    .string({ message: "O campo 'batalhaoId' é obrigatório." })
    .uuid({ message: "O campo batalhaoId deve ser um UUID válido" }),
});
