import { z } from "zod";
import { EnderecoSchema } from "./EnderecoSchema";

export const UpdateBatalhaoSchema = z.object({
  nome: z
    .string({ message: "O campo 'nome' é obrigatório." })
    .min(4, { message: "O campo não pode estar vazio" }),
  contato: z
    .string({ message: "O campo 'contato' é obrigatório." })
    .min(7, { message: "O campo não pode estar vazio" }),

  endereco: EnderecoSchema,
});
