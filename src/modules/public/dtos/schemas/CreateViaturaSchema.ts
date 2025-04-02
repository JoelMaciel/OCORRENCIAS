import { z } from "zod";

export const CreateViaturaSchema = z.object({
  prefixo: z.string({ message: "O campo 'nome' é obrigatório." }),
  placa: z.string({ message: "O campo 'placa' é obrigatório." }),
  modelo: z.string({ message: "O campo 'modelo' é obrigatório." }),
  batalhaoId: z
    .string({ message: "O campo 'batalhaoId' é obrigatório." })
    .uuid({ message: "O campo batalhaoId deve ser um UUID válido" }),
});

export type CreateViaturaInput = z.infer<typeof CreateViaturaSchema>;
