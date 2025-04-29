import { z } from "zod";
import { EnderecoSchema } from "./EnderecoSchema";

export const UpdateBatalhaoSchema = z.object({
  nome: z.string({ message: "O campo 'nome' é obrigatório." }),
  contato: z.string({ message: "O campo 'contato' é obrigatório." }),

  endereco: EnderecoSchema,
});
