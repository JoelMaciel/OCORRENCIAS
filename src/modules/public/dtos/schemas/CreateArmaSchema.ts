import { z } from "zod";

export const CreateArmaSchema = z.object({
  tipo: z.string({ message: "O campo 'tipo' é obrigatório" }),
  calibre: z.string().optional(),
  numeracao: z.string().optional(),
});

export type CreateArmaInput = z.infer<typeof CreateArmaSchema>;
